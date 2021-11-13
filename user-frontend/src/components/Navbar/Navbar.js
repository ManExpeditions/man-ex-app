import { useState } from "react";
import { Link } from "react-router-dom";
import OutsideAlerter from "../OutsideAlerter";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [hamburgerOpen, setHamburgerOpen] = useState(false);

  return (
    <>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <ul className="flex-box">
            <li className={styles.hamburger_btn}>
              <div
                className={hamburgerOpen && "none-pointer"}
                onClick={() => setHamburgerOpen(true)}
              >
                <i class="fas fa-bars fa-2x"></i>
              </div>
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
          <ul className={`flex-box ${styles.nav_list_right}`}>
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
          </ul>
          <div className={styles.nav_item}>
            <Link to="/contact" className="link link-primary">
              Google Translate
            </Link>
          </div>
        </nav>
      </header>
      {hamburgerOpen && (
        <OutsideAlerter setState={setHamburgerOpen} stateValue={false}>
          <div className={styles.hamburger_menu_wrapper}>
            <ul className={styles.hamburger_menu_list}>
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
            </ul>
          </div>
        </OutsideAlerter>
      )}
    </>
  );
}
