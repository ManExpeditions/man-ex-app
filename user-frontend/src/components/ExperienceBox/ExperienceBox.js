import React from 'react';
import { Link } from 'react-router-dom';
import ProfilesBox from '../ProfilesBox/ProfilesBox';
import VideoPlayer from '../VideoPlayer/VideoPlayer';
import styles from './ExperienceBox.module.css';

export default function ExperienceBox({
  experience,
  user,
  showGroup = true,
  showLearnMore = true,
  back = ''
}) {
  return (
    <div key={experience._id}>
      <VideoPlayer
        thumbnail={experience.videoThumbnailImage}
        src={experience.video}
      ></VideoPlayer>
      {showGroup && <h1 className={styles.call_to_action}>Join a group</h1>}
      <div className={styles.bottom_container}>
        {experience.groups &&
        experience.groups.length > 0 &&
        experience.interestedUsers.length > 0 ? (
          <div className={styles.profiles_wrapper}>
            <ProfilesBox
              style={{ height: '50px', width: '50px' }}
              users={experience.interestedUsers.slice(0, 4)}
            />
          </div>
        ) : experience.groups && experience.groups.length === 0 ? (
          <Link
            className="link"
            to={
              user
                ? `/experiences/${experience._id}${
                    back ? `?back=${back}` : ''
                  }?`
                : '/register'
            }
          >
            <div className="flex-box">
              <div className={styles.circle}></div>
              Create a group
            </div>
          </Link>
        ) : (
          ''
        )}
        {showLearnMore && (
          <Link
            to={
              user
                ? `/experiences/${experience._id}${
                    back ? `?back=${back}` : ''
                  }?`
                : '/register'
            }
            className={`link btn-primary ${styles.btn_video_info}`}
          >
            Learn more
          </Link>
        )}
      </div>
    </div>
  );
}
