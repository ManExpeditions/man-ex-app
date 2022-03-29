import React from 'react';
import { Link } from 'react-router-dom';
import VideoPlayer from '../VideoPlayer/VideoPlayer';
import styles from './ExperienceBox.module.css';

export default function ExperienceBox({ experience, user }) {
  return (
    <div key={experience._id}>
      <VideoPlayer
        thumbnail={experience.videoThumbnailImage}
        src={experience.video}
      ></VideoPlayer>
      <Link
        to={user ? `/experiences/${experience._id}` : '/register'}
        className={`link btn-primary ${styles.btn_video_info}`}
      >
        Learn more
      </Link>
    </div>
  );
}
