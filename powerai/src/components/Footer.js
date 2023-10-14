import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  position: relative;
  bottom: 0;
  width: 100%;
  background-color: #333;
  color: #fff;
  text-align: center;
  padding: 20px 0;
`;

const FooterText = styled.p`
  margin: 0;
`;

const FooterLink = styled.a`
  color: #fff;
  text-decoration: none;
  margin-left: 5px;

  &:hover {
    text-decoration: underline;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterText>
        © {new Date().getFullYear()} POWERAI. All rights reserved. | 
        <FooterLink href="#">Privacy Policy</FooterLink>
      </FooterText>
    </FooterContainer>
  );
};

export default Footer;
