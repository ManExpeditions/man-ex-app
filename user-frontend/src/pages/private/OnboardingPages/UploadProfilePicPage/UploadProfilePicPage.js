import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import UploadPhotoBox from "../../../../components/UploadPhotoBox/UploadPhotoBox";
import styles from "./UploadProfilePicPage.module.css";
import {
  photoUpload,
  resetPhotoUpload,
} from "../../../../slices/assets/photoUploadSlice";
import Spinner from "../../../../components/Spinner/Spinner";
import useDidMountEffect from "../../../../customHooks/useDidMountEffect";
import {
  resetUserUpdate,
  userUpdate,
} from "../../../../slices/user/userUpdateSlice";
import { useEffect } from "react";
import MessageBox from "../../../../components/MessageBox/MessageBox";

export default function UploadProfilePicPage(props) {
  const [profilePic, setProfilePic] = useState("");

  const photoUploadSlice = useSelector((state) => state.photoUploadSlice);
  const { loading, photo } = photoUploadSlice;

  const signinSlice = useSelector((state) => state.signinSlice);
  const { user } = signinSlice;

  const userUpdateSlice = useSelector((state) => state.userUpdateSlice);
  const {
    loading: updateLoading,
    user: updatedUser,
    error: updateError,
  } = userUpdateSlice;

  const dispatch = useDispatch();

  // Upload photo to cloud service as user selects it
  useDidMountEffect(() => {
    dispatch(resetPhotoUpload());
    const photoFormData = new FormData();
    photoFormData.append("photo", profilePic);
    dispatch(photoUpload({ type: "profile", photoFormData }));
  }, [profilePic, dispatch]);

  const onCompleteHandler = () => {
    dispatch(
      userUpdate({
        profilepic: encodeURIComponent(
          photo
            ? photo.url
            : user.hasOwnProperty("profilepic")
            ? user.profilepic
            : ""
        ),
      })
    );
  };

  useEffect(() => {
    if (updatedUser) {
      dispatch(resetPhotoUpload());
      dispatch(resetUserUpdate());
      props.history.push("/onboarding/verify/profilepic/social");
    }
  }, [dispatch, updatedUser, props.history]);

  // If user already has profile, display it
  useEffect(() => {
    if (user.hasOwnProperty("profilepic")) {
      setProfilePic(user.profilepic);
    }
  }, [user]);

  return (
    <>
      <div className="screen">
        <Link to="/onboarding/location" className="link link-back">
          <i class="fas fa-chevron-left fa-fw fa-xs"></i> Back
        </Link>
        <h1 className={styles.page_title}>Add Profile Picture</h1>
        <main>
          <p className={`align-center ${styles.info}`}>
            Add a profile picture to make it easy for your friends to find you.
          </p>
          <div className={styles.verification_wrapper}>
            <div className={styles.photobox_wrapper}>
              {loading && (
                <div className={styles.loading_box}>
                  <Spinner style={{ color: "#56c1ff" }}></Spinner>
                </div>
              )}
              <UploadPhotoBox
                photoState={profilePic}
                setPhotoState={setProfilePic}
              ></UploadPhotoBox>
            </div>
          </div>
        </main>
      </div>
      {updateError && (
        <div className={styles.messagebox_wrapper}>
          <MessageBox variant="error">{updateError}</MessageBox>
        </div>
      )}
      <button
        disabled={photo || user.hasOwnProperty("profilepic") ? false : true}
        className={`btn btn-primary ${styles.action_button}`}
        onClick={onCompleteHandler}
      >
        {updateLoading ? <Spinner></Spinner> : "Confirm Profile Photo"}
      </button>
    </>
  );
}
