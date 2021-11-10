import { useState } from "react";
import { Link } from "react-router-dom";
import UploadPhotoBox from "../../../components/UploadPhotoBox/UploadPhotoBox";
import styles from "./UploadProfilePicPage.module.css";

export default function UploadProfilePicPage(props) {
  const [profilePic, setProfilePic] = useState("");

  const onCompleteHandler = () => {
    props.history.push("/onboarding/verify/profilepic");
  };

  return (
    <>
      <div className="screen">
        <Link to="/onboarding/verify/email" className="link link-back">
          <i class="fas fa-chevron-left fa-fw fa-xs"></i> Back
        </Link>
        <h1 className={styles.page_title}>Add Profile Picture</h1>
        <main>
          <p className={`align-center ${styles.info}`}>
            Add a profile picture to make it easy for your friends to find you.
          </p>
          <div className={styles.verification_wrapper}>
            <div className={styles.photobox_wrapper}>
              <UploadPhotoBox
                photoState={profilePic}
                setPhotoState={setProfilePic}
              ></UploadPhotoBox>
            </div>
          </div>
        </main>
      </div>
      <button
        disabled={profilePic ? false : true}
        className={`btn btn-primary ${styles.action_button}`}
        onClick={onCompleteHandler}
      >
        Confirm Profile Photo
      </button>
    </>
  );
}
