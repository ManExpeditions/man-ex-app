import { Link } from "react-router-dom";
import styles from "./BottomNav.module.css";
import { FaSearch, FaUser } from "react-icons/fa";

export default function BottomNav() {
  return (
    <div className={styles.nav}>
      <ul className={`flex-box ${styles.nav_list}`}>
        <li className={styles.nav_item}>
          <Link
            to="/experiences"
            className={`link link-primary ${styles.nav_link}`}
          >
            <FaSearch size={18}></FaSearch>
            Explore
          </Link>
        </li>
        <li className={styles.nav_item}>
          <Link to="/signin" className={`link link-primary ${styles.nav_link}`}>
            <FaUser size={18}></FaUser>
            Login/Register
          </Link>
        </li>
      </ul>
    </div>
  );
}
