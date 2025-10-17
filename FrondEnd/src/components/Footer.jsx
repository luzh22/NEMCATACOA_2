import React from "react";
import "../App.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <span>© {new Date().getFullYear()} NEMCATACOA. Todos los derechos reservados.</span>
        <span style={{marginLeft: '1rem'}}>
          <a href="https://github.com/luzh22/NEMCATACOA_2" target="_blank" rel="noopener noreferrer">GitHub</a>
        </span>
      </div>
    </footer>
  );
}
