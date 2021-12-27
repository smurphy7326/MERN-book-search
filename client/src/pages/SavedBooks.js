import React from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';

import { removeBookId } from "../utils/localStorage";

// had to get rid of the Auth because I am not using it 

// having to call all of these compared to calling up above
import { useMutation, useQuery } from '@apollo/client';
import { REMOVE_BOOK } from '../utils/mutations';
import { GET_ME } from '../utils/queries'

const SavedBooks = () => {
  const { loading, data: userData } = useQuery(GET_ME);
  const[removeBook] = useMutation(REMOVE_BOOK);

  // Function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteBook = async (bookId) => {
    try {
      // Calls the removeBook function to use the REMOVE_BOOK mutation on the book with the corresponding bookId
      await removeBook({ variables: { bookId: bookId }
      });

      // Upon success, remove book's id from localStorage
      removeBookId(bookId);
    // Forces a refetch of the GET_ME query so that the the updated userData and component is displayed without reloading of the page
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <h2>LOADING...</h2>;
  }

    // Sets the userData variable to the data retrieved from the GET_ME query 
    // the .me with the user data is what i was missing and just receiving errors, the .me receives the userData to get it to the page.
  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {userData.me.savedBooks.length
            ? `Viewing ${userData.me.savedBooks.length} saved ${userData.me.savedBooks.length === 1 ? 'book' : 'books'}:`
            : 'You have no saved books!'}
        </h2>
        <CardColumns>
          {userData.me.savedBooks.map((book) => {
            return (
              <Card key={book.bookId} border='dark'>
                {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className='small'>Authors: {book.authors}</p>
                  <Card.Text>{book.description}</Card.Text>
                  <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.bookId)}>
                    Delete this Book!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SavedBooks;
