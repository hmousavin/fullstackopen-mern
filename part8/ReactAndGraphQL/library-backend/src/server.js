const { ApolloServer } = require('@apollo/server');
const { ApolloServerPluginLandingPageGraphQLPlayground } = require('apollo-server-core');
const { startStandaloneServer } = require('@apollo/server/standalone');
const { seedData } = require('./seeder')
const { v1: uuid } = require('uuid');

const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const Author = require('./models/author')
const Book = require('./models/book')

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
    allAuthors: [Author!]!    
  }

  input AuthorInput {
    name: String!
  }

  type Mutation {
    addBook(title: String!, author: AuthorInput!, published: Int!, genres: [String!]!): Book!
    setBirthYear(name: String!, born: Int!): Author!
  }
`;

const resolvers = {
  Query: {
    bookCount: async () => await Book.collection.countDocuments(),
    authorCount: async () => await Author.collection.countDocuments(),
    allBooks: async (parent, { author, genre }) => {
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
    addBook: async (root, args) => {
      const authorName = args.author.name;
      let author = await Author.findOne({ name: authorName });

      if (!author) {
        author = new Author({ name: authorName, id: uuid() });
        await author.save();
      }
      
      const book = new Book({ ...args, author, id: uuid() });
      await book.save();

      return book;
    },
    setBirthYear: async (root, args) => {
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
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
