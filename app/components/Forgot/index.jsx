import React from 'react';
import {ForgotText, RecoveryText, TestText} from './styled';
import Input from './Input'
import Button from './Button'

const Logo = ({ title, recoveryText, test }) => (
    <>
    <ForgotText>
        {title}   
    </ForgotText>
    <RecoveryText>
        {recoveryText}
    </RecoveryText>
    <Input 
        text="Email:"
    />
    <Button 
        text="Recuperar Senha"
    />
    <TestText>
        {test}
    </TestText>
    </>
);

export default Logo;