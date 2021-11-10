import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <ul className="flex-box">
          <li>
            <i class="fas fa-bars fa-2x"></i>
          </li>
          <li>
            <Link to="/home" className="link">
              <img
                className={styles.logo}
                src="/logo192.png"
                alt="Man Expeditions Logo"
              />
            </Link>
          </li>
        </ul>
      </nav>
      <nav className={styles.nav}>
        <ul className="flex-box">
          <li className={styles.nav_item}>
            <Link to="/experiences" className="link link-primary">
              Experiences
            </Link>
          </li>
          <li className={styles.nav_item}>
            <Link to="/aboutus" className="link link-primary">
              About Us
            </Link>
          </li>
          <li className={styles.nav_item}>
            <Link to="/press" className="link link-primary">
              Press
            </Link>
          </li>
          <li className={styles.nav_item}>
            <Link to="/contact" className="link link-primary">
              Contact
            </Link>
          </li>
          <li className={styles.nav_item}>
            <Link to="/contact" className="link link-primary">
              Google Translate
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
