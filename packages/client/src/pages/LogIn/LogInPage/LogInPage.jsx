import LogInForm from './LogInForm/LogInForm';

import * as S from './LogInPage.styled';

const LogInPage = () => {
  return (
    <S.LogInPage>
      <S.Title>Log In</S.Title>
      <LogInForm />
    </S.LogInPage>
  );
};

export default LogInPage;
