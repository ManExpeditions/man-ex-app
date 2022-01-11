import { Link } from "react-router-dom";
import styles from "./BottomNav.module.css";
import { BiSearch, BiUser, BiEnvelope, BiHeart } from "react-icons/bi";
import { FiUsers } from "react-icons/fi";

export default function BottomNav({ user }) {
  return (
    <div className={styles.nav}>
      <ul className={styles.nav_list}>
        <li className={styles.nav_item}>
          <Link
            to="/experiences"
            className={`link link-primary ${styles.nav_link}`}
          >
            <BiSearch size={18}></BiSearch>
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
                <FiUsers size={18}></FiUsers>
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
                <BiUser size={18}></BiUser>
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
              <BiUser size={18}></BiUser>
              Login/Register
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
}
