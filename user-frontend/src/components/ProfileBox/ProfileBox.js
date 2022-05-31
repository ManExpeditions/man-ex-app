import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ProfileBox.module.css';

export default function ProfileBox({ user }) {
  return (
    <div className={styles.container}>
      <Link to={`/profile/${user._id}`}>
        <img
          className={styles.image}
          src={user.profilepic}
          alt="User profile"
        />
      </Link>
      <p className={styles.name}>{user.firstName}</p>
    </div>
  );
}
