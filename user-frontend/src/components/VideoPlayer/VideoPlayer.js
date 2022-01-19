import { useState } from "react";
import ReactPlayer from "react-player";
import styles from "./VideoPlayer.module.css";

export default function VideoPlayer({ src, thumbnail, videoTitle }) {
  const [thumbnailVisible, setThumbnailVisible] = useState(true);

  return (
    <div className={styles.container}>
      {thumbnailVisible && thumbnail && (
        <img
          className={styles.thumbnail}
          src={thumbnail}
          alt={videoTitle ? videoTitle : "Video thumbnail."}
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
    </div>
  );
}
