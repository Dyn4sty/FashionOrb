import React from 'react';
import { Container } from 'react-bootstrap';
const Footer = () => (
    <footer className="footer navbar-static-bottom">
      <Container>
        <a href="#top" aria-label="Back To Top" className="back-to-top">
          <i className="fa fa-angle-up fa-2x" aria-hidden="true" />
        </a>
        <div className="social-links">
                <a
                  href={'https://github.com/cobidev/gatsby-simplefolio'}
                  rel="noopener noreferrer"
                  target="_blank"
                  aria-label='Whatsup'
                >
                  <i className={`fa fa-$'refresh' fa-inverse`} />
                </a>
        </div>
      </Container>
    </footer>
  );
;

export default Footer;
