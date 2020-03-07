import React from 'react';
import { ButtonContainer, ButtonText } from './styled';

const CustomButton = ({ backgroundColor, textColor, text, onPress }) => (
  <ButtonContainer onPress={onPress} backgroundColor={backgroundColor}>
    <ButtonText textColor={textColor}>{text}</ButtonText>
  </ButtonContainer>
);

export default CustomButton;
