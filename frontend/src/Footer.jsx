import React from 'react';

function Footer() {
  return (
    <footer className="bg-dark text-white py-4 mt-5">
      <div className="container text-center">
        <p className="mb-0">Crpto-informer. All rights reserved.</p>
        <p>Made with 💻 using React and Bootstrap</p>
        <div>
          <a href="#" className="text-white mx-2">
            Privacy Policy
          </a>
          <a href="#" className="text-white mx-2">
            Terms of Service
          </a>
          <a href="#" className="text-white mx-2">
            Contact Us
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
