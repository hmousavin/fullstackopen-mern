const { ApolloServer } = require('@apollo/server');
const { ApolloServerPluginLandingPageDisabled } = require('@apollo/server/plugin/disabled');
const { startStandaloneServer } = require('@apollo/server/standalone');
const { v1: uuid } = require('uuid');

let authors = [
  {
    name: 'Robert Martin',
    id: 'afa51ab0-344d-11e9-a414-719c6709cf3e',
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: 'afa5b6f0-344d-11e9-a414-719c6709cf3e',
    born: 1963,
  },
  {
    name: 'Fyodor Dostoevsky',
    id: 'afa5b6f1-344d-11e9-a414-719c6709cf3e',
    born: 1821,
  },
  {
    name: 'Joshua Kerievsky', // birthyear not known
    id: 'afa5b6f2-344d-11e9-a414-719c6709cf3e',
  },
  {
    name: 'Sandi Metz', // birthyear not known
    id: 'afa5b6f3-344d-11e9-a414-719c6709cf3e',
  },
];

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: 'afa5b6f4-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring'],
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: 'afa5b6f5-344d-11e9-a414-719c6709cf3e',
    genres: ['agile', 'patterns', 'design'],
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: 'afa5de00-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring'],
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: 'afa5de01-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring', 'patterns'],
  },
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: 'afa5de02-344d-11e9-a414-719c6709cf3e',
    genres: ['refactoring', 'design'],
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: 'afa5de03-344d-11e9-a414-719c6709cf3e',
    genres: ['classic', 'crime'],
  },
  {
    title: 'The Demon ',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: 'afa5de04-344d-11e9-a414-719c6709cf3e',
    genres: ['classic', 'revolution'],
  },
];

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
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allBooks: (parent, { author, genre }) =>
      books
        .filter(
          (b) =>
          (author ? b.author.toLowerCase() === author.toLowerCase() : true) &&
          (genre  ? b.genres.includes(genre.toLowerCase()) : true)
        )
        .map((b) => {
          const author = authors.find((a) => a.name === b.author)
          return {
            title: b.title,
            author: author,
            published: b.published,
            genres: b.genres,
          }
        }),
    allAuthors: () =>
      authors.map((a) => ({
        name: a.name,
        born: a.born,
        bookCount: books.filter((b) => b.author === a.name).length,
      })),
  },
  Mutation: {
    addBook: (root, args) => {
      const authorName = args.author.name;
      let author = authors.find((a) => a.name === authorName);

      // If the author does not exist, create a new author
      if (!author) {
        author = { name: authorName, id: uuid() };
        authors = authors.concat(author);
      }
      
      const book = { ...args, author, id: uuid() };
      books = books.concat(book);
      return book;
    },
    setBirthYear: (root, args) => {
      const author = {...args}
      const target = authors.find(a => a.name == author.name)
      if (target) {
        target.born = author.born
        return author
      }
      else {
        console.log(`target ${author} doesn't exist on ${authors}`)
        return null
      }
    }
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  // plugins: [ApolloServerPluginLandingPageDisabled()],
});

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
