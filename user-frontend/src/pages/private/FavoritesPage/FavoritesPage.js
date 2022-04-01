import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import BottomNav from '../../../components/BottomNav/BottomNav';
import ExperienceBox from '../../../components/ExperienceBox/ExperienceBox';
import Navbar from '../../../components/Navbar/Navbar';
import styles from './FavoritesPage.module.css';

export default function FavoritesPage(props) {
  const initialIndex = props.location.search
    ? Number(props.location.search.split('-')[1])
    : 1;
  const [index, setIndex] = useState(initialIndex);

  const signinSlice = useSelector((state) => state.signinSlice);
  const { user } = signinSlice;

  return (
    <div className={`page ${styles.page_wrapper}`}>
      <Navbar favorites user={user} />
      <div className={styles.container}>
        <h1 className={styles.page_heading}>Your Favorites</h1>
        <ul className={styles.tabs}>
          <li>
            <button
              className={`${styles.tab_button} ${
                index === 0 ? styles.active : ''
              }`}
              onClick={() => setIndex(0)}
            >
              Members
            </button>
          </li>
          <li>
            <button
              className={`${styles.tab_button} ${
                index === 1 ? styles.active : ''
              }`}
              onClick={() => setIndex(1)}
            >
              Experiences
            </button>
          </li>
          <li>
            <button
              className={`${styles.tab_button} ${
                index === 2 ? styles.active : ''
              }`}
              onClick={() => setIndex(2)}
            >
              Groups
            </button>
          </li>
        </ul>
        <div className={styles.content}>
          {index === 0 ? (
            <div
              className={
                user.favorites.members.length === 0 ? styles.center : ''
              }
            >
              {user.favorites.members.length === 0 && (
                <div className={styles.no_favorites_container}>
                  You have no favorited members.{' '}
                  <Link className="link link-blue" to="/members">
                    Explore Members
                  </Link>
                </div>
              )}
            </div>
          ) : index === 1 ? (
            <div
              className={
                user.favorites.experiences.length === 0 ? styles.center : ''
              }
            >
              {user.favorites.experiences.length === 0 ? (
                <div className={styles.no_favorites_container}>
                  You have no favorited experiences.{' '}
                  <Link className="link link-blue" to="/experiences">
                    Explore Experiences
                  </Link>
                </div>
              ) : (
                user.favorites.experiences.map((experience) => (
                  <div className={styles.experience_container}>
                    <ExperienceBox
                      key={experience._id}
                      showGroup={false}
                      showLearnMore={false}
                      experience={experience}
                      user={user}
                    />
                    <Link
                      to={`/experiences/${experience._id}?back=/favorites?index-1`}
                      className="link link-blue"
                    >
                      See experience and group
                    </Link>
                  </div>
                ))
              )}
            </div>
          ) : (
            <div
              className={
                user.favorites.groups.length === 0 ? styles.center : ''
              }
            >
              {user.favorites.groups.length === 0 ? (
                <div className={styles.no_favorites_container}>
                  You have no favorited groups.{' '}
                  <Link className="link link-blue" to="/experiences">
                    Explore Experiences
                  </Link>
                </div>
              ) : (
                user.favorites.groups.map((group) => (
                  <div className={styles.group_container} key={group._id}>
                    <div>
                      <p className={styles.group_name}>
                        {group.groupLead.firstName}'s Group
                      </p>
                      <p className={styles.group_date}>{group.dateText}</p>
                      <ExperienceBox
                        showGroup={false}
                        showLearnMore={false}
                        experience={group.experience}
                        user={user}
                      />
                    </div>
                    <div className="flex-box gap-1">
                      <img
                        className={styles.profile}
                        src={group.groupLead.profilepic}
                        alt="user profile"
                      />
                      <p>{group.groupLead.firstName} (Group Creator)</p>
                    </div>
                    <Link
                      to={`/experiences/${group.experience._id}?back=/favorites?index-2`}
                      className="link link-blue"
                    >
                      See experience and group
                    </Link>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
      <BottomNav favorites user={user} />
    </div>
  );
}
