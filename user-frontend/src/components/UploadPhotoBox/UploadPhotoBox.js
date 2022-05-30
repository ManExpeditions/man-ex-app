import styles from './UploadPhotoBox.module.css';

export default function UploadPhotoBox({ photoState, setPhotoState }) {
  const previewPhoto = () => {
    if (typeof photoState === 'string') {
      return photoState;
    } else if (photoState) {
      return URL.createObjectURL(photoState);
    }
  };

  return (
    <div>
      <div className={`${styles.container} ${photoState && styles.no_border}`}>
        <i className="fas fa-plus"></i>
        <input
          className={styles.input}
          type="file"
          accept="image/png, image/jpeg"
          onChange={(e) => setPhotoState(e.target.files[0])}
        ></input>
        {photoState && (
          <img
            className={styles.image}
            src={photoState && previewPhoto()}
            alt="Profile"
          />
        )}
      </div>
    </div>
  );
}
