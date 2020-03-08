import React from 'react';
import { ButtonContainer, ButtonText } from './styled';

const Button = ({ text }) => (
  <ButtonContainer >
    <ButtonText>{text}</ButtonText>
  </ButtonContainer>
);

export default Button;
