import React from 'react';
import {InputBox, PlaceHolder} from './styled';

const Input = ({ text }) => (
    <>
    <PlaceHolder>{text}</PlaceHolder>
    <InputBox/>
    </>
);

export default Input;