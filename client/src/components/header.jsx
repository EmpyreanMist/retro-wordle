import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/header.css";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-container">
        <button
          className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          <span className="bar top-bar" />
          <span className="bar middle-bar" />
          <span className="bar bottom-bar" />
        </button>

        <nav className={`header-nav ${menuOpen ? "open" : ""}`}>
          <ul onClick={() => setMenuOpen(false)}>
            <li>
              <Link to="/info">Info Page</Link>
            </li>
            <li>
              <Link to="/">Play Wordle</Link>
            </li>
            <li>
              <Link to="/scoreboard">Scoreboard</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
