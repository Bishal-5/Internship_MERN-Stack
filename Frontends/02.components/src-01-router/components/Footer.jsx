import React from 'react'

const Footer = () => {
    return (
        <footer className="footer">
            © {new Date().getFullYear()} My Website. All rights reserved.
        </footer>
    );
};

export default Footer