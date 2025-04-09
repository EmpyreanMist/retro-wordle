import { NavLink } from "react-router-dom";
import "../styles/header.css";

function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <nav className="header-nav">
          <ul>
            <li>
              <NavLink to="/info">Info Page</NavLink>
            </li>
            <li>
              <NavLink to="/">Play Wordle</NavLink>
            </li>
            <li>
              <a href="/scoreboard">Scoreboard</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
