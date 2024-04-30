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
    allGenres: [String!]!,
    allBooksByGenre(genre: String): [Book!]!,
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

  type Subscription {
    bookAdded: Book!
  }
`;

module.exports = { typeDefs }