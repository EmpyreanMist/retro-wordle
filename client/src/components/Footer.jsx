import "../styles/footer.css";

function Footer() {
  return (
    <footer>
      <hr />
      <div className="icons">
        <a
          href="https://github.com/EmpyreanMist"
          aria-label="Christian Fryksten on GitHub"
          target="_blank"
        >
          <i className="fa-brands fa-github" aria-hidden="true"></i>
        </a>
        <a
          href="https://linkedin.com/in/christian-fryksten"
          aria-label="Christian Fryksten on LinkedIn"
          target="_blank"
        >
          <i className="fa-brands fa-linkedin" aria-hidden="true"></i>
        </a>
        <a
          href="mailto:christianfryksten1@gmail.com"
          aria-label="Send email to Christian Fryksten"
        >
          <i className="fa-solid fa-envelope" aria-hidden="true"></i>
        </a>
      </div>
    </footer>
  );
}

export default Footer;
