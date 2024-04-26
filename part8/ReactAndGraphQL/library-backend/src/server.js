const { ApolloServer } = require('@apollo/server');
const { ApolloServerPluginLandingPageGraphQLPlayground } = require('apollo-server-core');
const { startStandaloneServer } = require('@apollo/server/standalone');
const { seedData } = require('./seeder')
const { v1: uuid } = require('uuid');

const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const Author = require('./models/author')
const Book = require('./models/book');
const User = require('./models/user')
const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const saltRounds = 10;

require('dotenv').config()

const MONGODB_URI = process.env.TEST_MONGODB_URI

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
        .then(() => {
          console.log('connected to MongoDB')
        })
        .catch((error) => {
          console.log('error connection to MongoDB:', error.message)
        })

seedData()

const typeDefs = `
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  
  type Token {
    value: String!
  }

  type Book {
    title: String!,
    published: Int!,
    author: Author!
    id: ID!,
    genres: [String!]!
  }

  type Author {
    name: String!,
    born: Int,
    bookCount: Int!
  }

  type Query {
    bookCount: Int!,
    authorCount: Int!,
    allBooks(author: String, genre: String): [Book!]!,
    allAuthors: [Author!]!,
    me: User
  }

  input AuthorInput {
    name: String!
  }

  type Mutation {
    addBook(title: String!, author: AuthorInput!, published: Int!, genres: [String!]!): Book!
    setBirthYear(name: String!, born: Int!): Author!
    createUser(username: String!, favoriteGenre: String!): User
    login(username: String!, password: String!): Token
  }
`;

const resolvers = {
  Query: {
    me: async(root, args, context) => {
      const currentUser = context.currentUser;
      if (currentUser)
        return currentUser
      else
        throw new GraphQLError("not authenticated");
    },
    bookCount: async () => await Book.collection.countDocuments(),
    authorCount: async () => await Author.collection.countDocuments(),
    allBooks: async (parent, { author, genre }, context) => {
      const currentUser = context.currentUser;
      if (!currentUser)
        throw new GraphQLError("not authenticated");

      let books = await Book.find({}).populate('author');
      return books.filter(
                    (b) =>
                    (!author || b.author.name.toLowerCase() === author.toLowerCase()) &&
                    (!genre  || b.genres.includes(genre.toLowerCase()))
                  )
                  .map((b) => {
                    return {
                      title: b.title,
                      author: b.author, // this is now the populated author document
                      published: b.published,
                      genres: b.genres,
                    };
                  });
    },
    allAuthors: async () => {
      const authors = await Author.find({});
      return Promise.all(authors.map(async (a) => {
        const bookCount = await Book.countDocuments({ 'author.name': a.name });
        return {
          name: a.name,
          born: a.born,
          bookCount: bookCount,
        };
      }));
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser;
      if (!currentUser)
        throw new GraphQLError("not authenticated");

      const authorName = args.author.name;
      let author = await Author.findOne({ name: authorName });
      
      try {
          if (!author) {
            author = new Author({ name: authorName, id: uuid() });
            await author.save();
          }

          const book = new Book({ ...args, author, id: uuid() });
          await book.save();
        } catch (error) {
          throw new GraphQLError(error.message, {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: book ? book.title : authorName,
              error
            }
          })
        }

      return book;
    },
    setBirthYear: async (root, args, context) => {
      const currentUser = context.currentUser;
      if (!currentUser)
        throw new GraphQLError("not authenticated");

      const author = {...args};
      const target = await Author.findOne({ name: author.name });
      if (target) {
        target.born = author.born;
        await target.save();
        return author;
      }
      else {
        console.log(`target ${author} doesn't exist on ${authors}`);
        return null;
      }
    },
    createUser: async (root, args) => {
      try {
        const { username, favoriteGenre, password = '123' } = {...args} // suppose every password is 123! 
        const passwordHash = await bcrypt.hash(password, saltRounds)
        const user = new User({id: uuid(), username, passwordHash, favoriteGenre})
        user.save()
        
        return user
      } catch (error) {
        throw new GraphQLError(error.message, {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args,
            error
          }
        })
      }
    },
    login: async (root, args) => {
      const { username, password } = {...args}
      const user = await User.findOne({ username })
      const passwordIsCorrect = user === null
        ? false
        : await bcrypt.compare(password, user.passwordHash)        

      if (user && passwordIsCorrect) {
        const token = jwt.sign({ username, id: user._id }, process.env.SECRET)
        return { value: token }
      }
      else 
        return null
    }
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,

  csrfPrevention: false,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

startStandaloneServer(server, {
  listen: { port: 4000 },

  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), process.env.SECRET)
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});