import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import BottomNav from '../../../components/BottomNav/BottomNav';
import ExperienceBox from '../../../components/ExperienceBox/ExperienceBox';
import Navbar from '../../../components/Navbar/Navbar';
import styles from './FavoritesPage.module.css';

export default function FavoritesPage() {
  const [index, setIndex] = useState(1);

  const signinSlice = useSelector((state) => state.signinSlice);
  const { user } = signinSlice;

  return (
    <div className="page">
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
          {index === 1 ? (
            <div>
              {user.favorites.experiences.map((experience) => (
                <ExperienceBox
                  key={experience._id}
                  showGroup={false}
                  experience={experience}
                  user={user}
                />
              ))}
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
      <BottomNav favorites user={user} />
    </div>
  );
}
