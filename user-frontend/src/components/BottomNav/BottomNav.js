import { Link } from 'react-router-dom';
import styles from './BottomNav.module.css';
import { BiSearch, BiUser, BiEnvelope, BiHeart } from 'react-icons/bi';
import { FiUsers } from 'react-icons/fi';

export default function BottomNav({ user, ...props }) {
  return (
    <div className={styles.nav}>
      <ul className={styles.nav_list}>
        <li className={styles.nav_item}>
          <Link
            to="/experiences"
            className={`link link-primary ${styles.nav_link}`}
          >
            <BiSearch
              className={props.experiences ? 'accent_color' : ''}
              size={18}
            ></BiSearch>
            <span className={props.experiences ? 'accent_color' : ''}>
              Explore
            </span>
          </Link>
        </li>
        {user ? (
          <>
            <li className={styles.nav_item}>
              <Link
                to="/messages"
                className={`link link-primary ${styles.nav_link}`}
              >
                <BiEnvelope
                  className={props.messages ? 'accent_color' : ''}
                  size={18}
                ></BiEnvelope>
                <span className={props.messages ? 'accent_color' : ''}>
                  Messages
                </span>
              </Link>
            </li>
            <li className={styles.nav_item}>
              <Link
                to="/members"
                className={`link link-primary ${styles.nav_link}`}
              >
                <FiUsers
                  className={props.members ? 'accent_color' : ''}
                  size={18}
                ></FiUsers>
                <span className={props.members ? 'accent_color' : ''}>
                  Members
                </span>
              </Link>
            </li>
            <li className={styles.nav_item}>
              <Link
                to="/favorites"
                className={`link link-primary ${styles.nav_link}`}
              >
                <BiHeart
                  className={props.favorites ? 'accent_color' : ''}
                  size={18}
                ></BiHeart>
                <span className={props.favorites ? 'accent_color' : ''}>
                  Favorites
                </span>
              </Link>
            </li>
            <li className={styles.nav_item}>
              <Link
                to="/profile"
                className={`link link-primary ${styles.nav_link}`}
              >
                {user.profilepic ? (
                  <img
                    src={user.profilepic}
                    alt="User profile"
                    className={styles.user_profilepic}
                  />
                ) : (
                  <BiUser
                    className={props.profile ? 'accent_color' : ''}
                    size={18}
                  ></BiUser>
                )}
                <span className={props.profile ? 'accent_color' : ''}>
                  Profile
                </span>
              </Link>
            </li>
          </>
        ) : (
          <li className={styles.nav_item}>
            <Link
              to="/signin"
              className={`link link-primary ${styles.nav_link}`}
            >
              <BiUser
                className={props.login || props.register ? 'accent_color' : ''}
                size={18}
              ></BiUser>
              <span
                className={props.login || props.register ? 'accent_color' : ''}
              >
                Login/Regiser
              </span>{' '}
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
}
