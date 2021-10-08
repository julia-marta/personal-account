import React from 'react';
import {Heart, Github} from 'react-bootstrap-icons';

const Footer = () => {

  return (
    <footer className="footer">
      <p>&#169; 2021</p>
      <p>made with <Heart /> by Julia Nabiulina</p>
      <p>me on <a className="footer__link" href="https://github.com/julia-marta" target="blank"><Github /></a></p>
    </footer>
  );
};

export default Footer;
