import React from 'react';
import Button from '../components/Button';
import Page from '../components/Page';

const Login = () => {
  return (
    <Page>
      <Button
        backgroundColor="#ff0000"
        text="Ola mundo"
        textColor="#fff"
        onPress={() => alert('Funcionou')}
      >
        Botão
      </Button>
    </Page>
  );
};

export default Login;
