import { useState } from 'react';
import { Link } from 'react-router-dom';
import OutsideAlerter from '../OutsideAlerter';
import styles from './Navbar.module.css';
import { BiUser } from 'react-icons/bi';

export default function Navbar({ user, ...props }) {
  const [hamburgerOpen, setHamburgerOpen] = useState(false);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.wrapper}>
          <nav className={styles.nav}>
            <ul className="flex-box">
              <li className={styles.hamburger_btn}>
                <div
                  className={hamburgerOpen ? 'none-pointer' : ''}
                  onClick={() => setHamburgerOpen(true)}
                >
                  <i className="fas fa-bars fa-2x"></i>
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
                <Link
                  to="/experiences"
                  className={`link link-primary ${styles.nav_link}`}
                  style={{ color: props.experiences ? '#56c1ff' : '' }}
                >
                  Experiences
                </Link>
              </li>
              {user ? (
                <>
                  <li className={styles.nav_item}>
                    <Link
                      to="/messages"
                      className={`link link-primary ${styles.nav_link}`}
                      style={{ color: props.messages ? '#56c1ff' : '' }}
                    >
                      Messages
                    </Link>
                  </li>
                  <li className={styles.nav_item}>
                    <Link
                      to="/members"
                      className={`link link-primary ${styles.nav_link}`}
                      style={{ color: props.members ? '#56c1ff' : '' }}
                    >
                      Members
                    </Link>
                  </li>
                  <li className={styles.nav_item}>
                    <Link
                      to="/favorites"
                      className={`link link-primary ${styles.nav_link}`}
                      style={{ color: props.favorites ? '#56c1ff' : '' }}
                    >
                      Favorites
                    </Link>
                  </li>
                  <li className={styles.nav_item}>
                    <Link
                      to="/profile"
                      className={`link link-primary ${styles.nav_link}`}
                    >
                      <div className={styles.nav_profile_container}>
                        {user.profilepic ? (
                          <img
                            className={styles.nav_profile}
                            src={user.profilepic ? user.profilepic : ''}
                            alt="profile"
                          />
                        ) : (
                          <BiUser size={18}></BiUser>
                        )}
                      </div>
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className={styles.nav_item}>
                    <Link
                      to="/aboutus"
                      className={`link link-primary ${styles.nav_link}`}
                      style={{ color: props.aboutus ? '#56c1ff' : '' }}
                    >
                      About Us
                    </Link>
                  </li>
                  <li className={styles.nav_item}>
                    <Link
                      to="/press"
                      className={`link link-primary ${styles.nav_link}`}
                      style={{ color: props.press ? '#56c1ff' : '' }}
                    >
                      Press
                    </Link>
                  </li>
                  <li className={styles.nav_item}>
                    <a
                      href="mailto:hello@manexpeditions.com?subject=Contact us"
                      className="link link-primary"
                      style={{ color: props.contact ? '#56c1ff' : '' }}
                    >
                      Contact
                    </a>
                  </li>
                </>
              )}
            </ul>
            {!user && (
              <div className={styles.nav_item}>
                <Link to="/contact" className="link link-primary">
                  Google Translate
                </Link>
              </div>
            )}
          </nav>
        </div>
        {hamburgerOpen && (
          <OutsideAlerter setState={setHamburgerOpen} stateValue={false}>
            <div className={styles.hamburger_menu_wrapper}>
              <ul className={styles.hamburger_menu_list}>
                <li className={styles.nav_item}>
                  <Link
                    to="/experiences"
                    className={`link link-primary ${styles.hamburger_link}`}
                    style={{ color: props.experiences ? '#56c1ff' : '' }}
                  >
                    Experiences
                  </Link>
                </li>
                <li className={styles.nav_item}>
                  <Link
                    to="/aboutus"
                    className={`link link-primary ${styles.hamburger_link}`}
                    style={{ color: props.aboutus ? '#56c1ff' : '' }}
                  >
                    About Us
                  </Link>
                </li>
                <li className={styles.nav_item}>
                  <Link
                    to="/press"
                    className={`link link-primary ${styles.hamburger_link}`}
                    style={{ color: props.press ? '#56c1ff' : '' }}
                  >
                    Press
                  </Link>
                </li>
                <li className={styles.nav_item}>
                  <Link
                    to="/contact"
                    className={`link link-primary ${styles.hamburger_link}`}
                    style={{ color: props.contact ? '#56c1ff' : '' }}
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </OutsideAlerter>
        )}
      </header>
    </>
  );
}
