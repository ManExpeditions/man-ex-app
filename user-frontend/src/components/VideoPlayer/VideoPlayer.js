import ReactPlayer from "react-player";

export default function VideoPlayer({ src }) {
  return (
    <div>
      <ReactPlayer height="auto" url={src} controls width="100%"></ReactPlayer>
    </div>
  );
}
