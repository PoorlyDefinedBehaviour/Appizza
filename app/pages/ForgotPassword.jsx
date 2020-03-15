import React from 'react';
import Logo from '../components/Logo';
import Page from '../components/Page';
import Forgot from '../components/Forgot';

const ForgotPassword = () => {
    return (
        <Page>
          <Logo
            text="Appizza">
          Texto</Logo>
          <Forgot
            title="Esqueceu sua senha?"
            recoveryText="Por favor, nos informe o email para recuperação de senha!"
            test="Voltar"
          ></Forgot>
        </Page>
      );
};

export default ForgotPassword;