const { v1: uuid } = require('uuid');
const Author = require('./models/author')
const Book = require('./models/book');
const User = require('./models/user')
const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const saltRounds = 10;

const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

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
        allGenres: async(parent, {}, context) => {
            const currentUser = context.currentUser;
            if (!currentUser)
                throw new GraphQLError("not authenticated");

            const allBooks = await Book.find({})
            return new Set(allBooks.map(b => b.genres).flat())
        },
        allBooksByGenre: async (parent, { genre }, context) => {
            const currentUser = context.currentUser;
            if (!currentUser)
                throw new GraphQLError("not authenticated");

            let books = await Book.find({}).populate('author');
            return books.filter(
                            (b) =>
                            (!genre || b.genres.includes(genre.toLowerCase()))
                        )
                        .map((b) => {
                            return {
                            title: b.title,
                            author: b.author, // the populated
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
            let book
            
            try {
                if (!author) {
                    author = new Author({ name: authorName, id: uuid() });
                    await author.save();
                }

                book = new Book({ ...args, author, id: uuid() });
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

            pubsub.publish('BOOK_ADDED', { bookAdded: book })

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
                throw new GraphQLError(
                    error.message, {
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
    Subscription: {
        bookAdded: {
            subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
        }
    }
};

module.exports = { resolvers } 