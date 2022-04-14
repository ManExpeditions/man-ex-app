import React from 'react';
import styles from './ProfilesBox.module.css';

export default function ProfilesBox({ users, ...props }) {
  return (
    <div className={styles.interested_users_images}>
      {users.slice(0, 4).map((user, interestedIdx) => (
        <div className={styles.interested_user_wrapper} key={user._id}>
          <div
            className={
              interestedIdx === users.length - 1 && users.length > 2
                ? styles.interested_user_wrapper_more
                : ''
            }
          >
            <img
              {...props}
              className={styles.interested_user_profile}
              src={user.profilepic}
              alt="User profile"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
