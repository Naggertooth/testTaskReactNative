import React from 'react';
import styled from 'styled-components/native';

export default function Chrest(props) {
  return (
    <Container {...props}>
      <ChrestImage
        source={props.reversedColor
          ? require('../assets/ChrestWhite.png')
          : require('../assets/Chrest.png')}
      />
    </Container>
  );
}

const Container = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 28px;
  height: 28px;
  border-radius: 14px;
  background: ${props => props.reversedColor ? '#9EA0A3' : 'white'};
`;
const ChrestImage = styled.Image``;
