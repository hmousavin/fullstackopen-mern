import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`
export const ME = gql`
  query {
    me {
      username
    }
  }
`
export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name, born, bookCount
    }
  }
`
export const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      published
      genres
      author {
        name
      }
    }
  } 
`
export const ALL_GENRES = gql`
  query {
    allGenres
  }
`
export const ALL_BOOKS_BY_GENRE = gql`
  query($genre: String!) {
    allBooksByGenre(genre: $genre) {
      title
      published
      genres
      author {
        name
      }
    }
  }
`
export const ADD_BOOK = gql`
  mutation($title: String!, $author: AuthorInput!, $published: Int!, $genres: [String!]!) {
    addBook(title: $title, author: $author, published: $published, genres: $genres) {
      title
      author {
        name
      }
      published
      genres
    }
  }
`
export const SET_DOB = gql`
  mutation($name: String!, $born: Int!) {
    setBirthYear(name: $name, born: $born) {
      name
      born
    }
  }
`
export const MY_FAVORITE_GENRE = gql`
  query {
    me {
      favoriteGenre
    }
  }
`