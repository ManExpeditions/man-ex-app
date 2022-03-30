import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import BottomNav from '../../../components/BottomNav/BottomNav';
import ExperienceBox from '../../../components/ExperienceBox/ExperienceBox';
import Navbar from '../../../components/Navbar/Navbar';
import styles from './FavoritesPage.module.css';

export default function FavoritesPage() {
  const [index, setIndex] = useState(1);

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
                  <ExperienceBox
                    key={experience._id}
                    showGroup={false}
                    experience={experience}
                    user={user}
                  />
                ))
              )}
            </div>
          ) : (
            <div
              className={
                user.favorites.groups.length === 0 ? styles.center : ''
              }
            >
              {user.favorites.groups.length === 0 && (
                <div className={styles.no_favorites_container}>
                  You have no favorited groups.{' '}
                  <Link className="link link-blue" to="/experiences">
                    Explore Experiences
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <BottomNav favorites user={user} />
    </div>
  );
}
