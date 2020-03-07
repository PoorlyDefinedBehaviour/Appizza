import styled from 'styled-components';

export const ButtonContainer = styled.TouchableOpacity`
	padding: 16px 32px;
	border-radius: 4px;
	background-color: ${props => props.backgroundColor};
`;

export const ButtonText = styled.Text`
	font-size: 16px;
	text-transform: uppercase;
	font-weight: bold;
	color: ${props => props.textColor};
	text-align: center;
`;
