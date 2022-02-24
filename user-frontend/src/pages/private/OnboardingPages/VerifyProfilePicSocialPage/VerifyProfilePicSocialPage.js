import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Validator from '../../../../utils/InputValidator';
import styles from './VerifyProfilePicSocialPage.module.css';
import {
  resetUserUpdate,
  userUpdate
} from '../../../../slices/user/userUpdateSlice';
import Spinner from '../../../../components/Spinner/Spinner';

export default function VerifyProfilePicSocialPage(props) {
  const [instagramProfile, setInstagramProfile] = useState('');
  const [facebookProfile, setFacebookProfile] = useState('');
  const [linkedinProfile, setLinkedinProfile] = useState('');

  const [buttonDisabled, setButtonDisabled] = useState(true);

  const inputValidator = Validator;

  useEffect(() => {
    if (
      inputValidator.atleastXTruthy(
        [instagramProfile, facebookProfile, linkedinProfile],
        1
      )
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [facebookProfile, inputValidator, instagramProfile, linkedinProfile]);

  const userUpdateSlice = useSelector((state) => state.userUpdateSlice);
  const { loading, user: updatedUser, error } = userUpdateSlice;

  const dispatch = useDispatch();

  const onCompleteHandler = () => {
    dispatch(
      userUpdate({
        socials: {
          instagram: instagramProfile ? instagramProfile : '',
          facebook: facebookProfile ? facebookProfile : '',
          linkedin: linkedinProfile ? linkedinProfile : ''
        },
        completedOnboarding: true
      })
    );
  };

  useEffect(() => {
    if (updatedUser) {
      props.history.push('/home');
    }
  }, [dispatch, updatedUser, props.history]);

  // Cleanup
  useEffect(() => {
    return () => {
      dispatch(resetUserUpdate());
    };
  }, [dispatch]);

  return (
    <>
      <div className="screen">
        <Link to="/onboarding/upload/profilepic" className="link link-back">
          <i class="fas fa-chevron-left fa-fw fa-xs"></i> Back
        </Link>
        <h1 className={styles.page_title}>Verify Profile Picture</h1>
        <main>
          <p className={`align-center ${styles.info}`}>
            Link at least one of your social media profiles below so we can
            verify your submitted profile photo matches your social media
            profile. If we cannot verify your identity you will not be allowed
            into the community.
          </p>
          <div className={styles.verification_wrapper}>
            <div className={styles.social_media}>
              <i class="fab fa-instagram fa-2x fa-fw"></i>instagram.com/
              <input
                placeholder="your username"
                className="input"
                value={instagramProfile}
                onChange={(e) => setInstagramProfile(e.target.value)}
              ></input>
            </div>
            <div className={styles.social_media}>
              <i class="fab fa-facebook fa-2x fa-fw"></i>facebook.com/
              <input
                placeholder="your username"
                className="input"
                value={facebookProfile}
                onChange={(e) => setFacebookProfile(e.target.value)}
              ></input>
            </div>
            <div className={styles.social_media}>
              <i class="fab fa-linkedin fa-2x fa-fw"></i>linkedin.com/
              <input
                placeholder="your username"
                className="input"
                value={linkedinProfile}
                onChange={(e) => setLinkedinProfile(e.target.value)}
              ></input>
            </div>
          </div>
          <p className={`align-center ${styles.info}`}>
            If you are not on social media tap{' '}
            <Link
              to="/onboarding/verify/profilepic/manual"
              className="link link-blue uppercase"
            >
              here
            </Link>
          </p>
        </main>
      </div>
      <button
        disabled={buttonDisabled}
        className={`btn btn-primary ${styles.action_button}`}
        onClick={onCompleteHandler}
      >
        {loading ? <Spinner></Spinner> : 'Done'}
      </button>
      <span className="error-message margin-auto">{error}</span>
    </>
  );
}
