import * as S from './BooksTable.styled';

const BooksTable = ({ books }) => {
  const bookRows = books.map((b) => (
    <tr key={b.title}>
      <td>{b.title}</td>
      <td>{b.author.name}</td>
      <td>{b.published}</td>
    </tr>
  ));

  return (
    <table>
      <tbody>
        <tr>
          <S.TableHeader>Title</S.TableHeader>
          <S.TableHeader>Author</S.TableHeader>
          <S.TableHeader>Published</S.TableHeader>
        </tr>
        {bookRows}
      </tbody>
    </table>
  );
};

export default BooksTable;
