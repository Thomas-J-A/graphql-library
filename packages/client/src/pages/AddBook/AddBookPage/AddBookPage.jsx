import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import {
  ADD_BOOK_MUTATION,
  GET_BOOKS_QUERY,
  GET_AUTHORS_QUERY,
} from '../../../queries';

import * as S from './AddBookPage.styled';

const AddBookPage = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [published, setPublished] = useState('');
  const [genres, setGenres] = useState([]);
  const [newGenre, setNewGenre] = useState('');
  const navigate = useNavigate();
  const [addBook] = useMutation(ADD_BOOK_MUTATION, {
    refetchQueries: [{ query: GET_BOOKS_QUERY }, { query: GET_AUTHORS_QUERY }],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await addBook({
      variables: { title, author, published: Number(published), genres },
    });

    navigate('/books');
  };

  const handleAddGenre = () => {
    // Don't add empty strings
    if (!newGenre) return;

    // Add new genre to genres list
    setGenres((prev) => [...prev, newGenre]);
    setNewGenre('');
  };

  const genresList = (
    <ul>
      {genres.map((g, i) => (
        <li key={i}>{g}</li>
      ))}
    </ul>
  );

  return (
    <S.AddBookPage>
      <S.Title>Add Book</S.Title>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Title:
            <input
              type="text"
              value={title}
              onChange={({ target }) => setTitle(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Author:
            <input
              type="text"
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Published:
            <input
              type="number"
              value={published}
              onChange={({ target }) => setPublished(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Add Genre:
            <input
              type="text"
              value={newGenre}
              onChange={({ target }) => setNewGenre(target.value)}
            />
          </label>
          <button type="button" onClick={handleAddGenre}>
            Add
          </button>
        </div>
        {genresList}
        <button type="submit">Add Book</button>
      </form>
    </S.AddBookPage>
  );
};

export default AddBookPage;
