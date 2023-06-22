import * as S from './AuthorsTable.styled';

const AuthorsTable = ({ authors }) => {
  const authorRows = authors.map((a) => (
    <tr key={a.name}>
      <td>{a.name}</td>
      <td>{a.born}</td>
      <td>{a.bookCount}</td>
    </tr>
  ));

  return (
    <table>
      <tbody>
        <tr>
          <S.TableHeader>Name</S.TableHeader>
          <S.TableHeader>Born</S.TableHeader>
          <S.TableHeader>Book Count</S.TableHeader>
        </tr>
        {authorRows}
      </tbody>
    </table>
  );
};

export default AuthorsTable;
