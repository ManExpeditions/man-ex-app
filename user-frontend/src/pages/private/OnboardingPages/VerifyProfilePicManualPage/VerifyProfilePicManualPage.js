import { useState } from "react";
import { Link } from "react-router-dom";
import UploadPhotoBox from "../../../../components/UploadPhotoBox/UploadPhotoBox";
import styles from "./VerifyProfilePicManualPage.module.css";

export default function VerifyProfilePicManualPage(props) {
  const [profilePic, setProfilePic] = useState("");

  const onCompleteHandler = () => {
    props.history.push("/home");
  };

  return (
    <>
      <div className="screen">
        <Link
          to="/onboarding/verify/profilepic/social"
          className="link link-back"
        >
          <i class="fas fa-chevron-left fa-fw fa-xs"></i> Back
        </Link>
        <h1 className={styles.page_title}>Verify Profile Picture</h1>
        <main>
          <p className={`align-center ${styles.info}`}>
            Not on social media? Dont worry you can still verify yourself.
            Upload a photo with your finger touching your left or right check.
          </p>
          <div className={styles.verification_wrapper}>
            <div className={styles.photobox_wrapper}>
              <UploadPhotoBox
                photoState={profilePic}
                setPhotoState={setProfilePic}
              ></UploadPhotoBox>
            </div>
          </div>
          <p className={`align-center ${styles.info}`}>
            This photo is only used for internal verification purposes and will
            not be published publicly on your profile.
          </p>
        </main>
      </div>
      <button
        disabled={profilePic ? false : true}
        className={`btn btn-primary ${styles.action_button}`}
        onClick={onCompleteHandler}
      >
        Done
      </button>
    </>
  );
}
