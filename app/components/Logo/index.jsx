import React from 'react';
import {LogoContainer, LogoText} from './styled';

const Logo = ({ text }) => (
    <LogoContainer>
        <LogoText>{text}</LogoText>
    </LogoContainer>
 );

export default Logo;