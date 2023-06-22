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
          <th>Name</th>
          <th>Born</th>
          <th>Book Count</th>
        </tr>
        {authorRows}
      </tbody>
    </table>
  );
};

export default AuthorsTable;
