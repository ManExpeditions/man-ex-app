import { useState } from 'react';
import ReactPlayer from 'react-player';
import styles from './VideoPlayer.module.css';
import { motion } from 'framer-motion';

export default function VideoPlayer({ src, thumbnail, videoTitle }) {
  const [thumbnailVisible, setThumbnailVisible] = useState(true);

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.5 }}
      className={styles.container}
    >
      {thumbnailVisible && thumbnail && (
        <img
          className={styles.thumbnail}
          src={thumbnail}
          alt={videoTitle ? videoTitle : 'Video thumbnail.'}
        />
      )}
      <ReactPlayer
        height="auto"
        url={src}
        controls
        width="100%"
        style={{ lineHeight: 0 }}
        onPlay={() => setThumbnailVisible(false)}
        onEnded={() => setThumbnailVisible(true)}
      ></ReactPlayer>
    </motion.div>
  );
}
