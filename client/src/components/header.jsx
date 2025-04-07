import { Link } from 'react-router-dom';
import '../styles/header.css';

function Header() {
  return (
    <header className="header">
      <nav className="header-nav">
        <ul>
          <li>
            <Link to="/info">Info Page</Link>
          </li>
          <li>
            <Link to="/">Play Wordle</Link>
          </li>
          <li>
            <a href="/scoreboard">Scoreboard</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
