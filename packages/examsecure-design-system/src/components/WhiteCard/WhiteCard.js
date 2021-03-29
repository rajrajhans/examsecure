import React from 'react';
import styled from 'styled-components';

const StyledWhiteCard = styled.div`
  padding: 20px;
  box-shadow: 0px 4px 6px 5px rgba(0, 0, 0, 0.2);
  border-radius: 25px;
  background-color: #fff;
  width: 50%;
  margin: auto;
`;

const WhiteCard = ({ children }) => {
  return <StyledWhiteCard>{children}</StyledWhiteCard>;
};

export default WhiteCard;
