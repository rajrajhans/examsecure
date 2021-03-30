import React from 'react';
import styled from 'styled-components';
import colors from '../../colors';

const StyledTitle = styled.div`
  font-family: 'Playfair Display', serif;
  font-size: 27px;
`;

const StyledHR = styled.hr`
  width: 50px;
  background-color: ${colors.primary};
  height: 2px;
  margin: 8px 0 0 0;
`;

const Title = ({ value, style }) => {
  return (
    <div style={style}>
      <StyledTitle>{value}</StyledTitle>
      <StyledHR />
    </div>
  );
};

export default Title;
