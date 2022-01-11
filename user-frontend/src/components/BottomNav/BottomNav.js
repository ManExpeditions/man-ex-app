import { Link } from "react-router-dom";
import styles from "./BottomNav.module.css";
import { FaSearch, FaUser } from "react-icons/fa";
import { BiEnvelope, BiHeart } from "react-icons/bi";

export default function BottomNav({ user }) {
  return (
    <div className={styles.nav}>
      <ul className={styles.nav_list}>
        <li className={styles.nav_item}>
          <Link
            to="/experiences"
            className={`link link-primary ${styles.nav_link}`}
          >
            <FaSearch size={18}></FaSearch>
            Explore
          </Link>
        </li>
        {user ? (
          <>
            <li className={styles.nav_item}>
              <Link
                to="/signin"
                className={`link link-primary ${styles.nav_link}`}
              >
                <BiEnvelope size={18}></BiEnvelope>
                Messages
              </Link>
            </li>
            <li className={styles.nav_item}>
              <Link
                to="/signin"
                className={`link link-primary ${styles.nav_link}`}
              >
                <FaUser size={18}></FaUser>
                Members
              </Link>
            </li>
            <li className={styles.nav_item}>
              <Link
                to="/signin"
                className={`link link-primary ${styles.nav_link}`}
              >
                <BiHeart size={18}></BiHeart>
                Favorites
              </Link>
            </li>
            <li className={styles.nav_item}>
              <Link
                to="/signin"
                className={`link link-primary ${styles.nav_link}`}
              >
                <FaUser size={18}></FaUser>
                Profile
              </Link>
            </li>
          </>
        ) : (
          <li className={styles.nav_item}>
            <Link
              to="/signin"
              className={`link link-primary ${styles.nav_link}`}
            >
              <FaUser size={18}></FaUser>
              Login/Register
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
}
