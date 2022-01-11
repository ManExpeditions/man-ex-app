import ReactPlayer from "react-player";
import styles from "./VideoPlayer.module.css";

export default function VideoPlayer({ src }) {
  return (
    <div className={styles.container}>
      <ReactPlayer
        height="auto"
        url={src}
        controls
        width="100%"
        style={{ lineHeight: 0 }}
      ></ReactPlayer>
    </div>
  );
}
