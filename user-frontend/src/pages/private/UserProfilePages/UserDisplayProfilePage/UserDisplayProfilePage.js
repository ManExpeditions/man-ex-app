import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FaFacebook, FaLinkedinIn } from 'react-icons/fa';
import { BsInstagram } from 'react-icons/bs';
import { AiOutlineMail, AiOutlineClose } from 'react-icons/ai';
import { GoLocation } from 'react-icons/go';
import {
  resetUserGetProfile,
  userGetProfile
} from '../../../../slices/user/userGetProfileSlice';
import styles from './UserDisplayProfilePage.module.css';
import ChipCheckBox from '../../../../components/ChipCheckBox/ChipCheckBox';
import { InterestsToIconMapper } from '../../../../utils/common';

export default function UserDisplayProfilePage(props) {
  const { id } = useParams();
  const back = props.location.search
    ? props.location.search.split('=')[1]
    : '/home';

  const userGetProfileSlice = useSelector((state) => state.userGetProfileSlice);
  const { userProfile } = userGetProfileSlice;

  const dispatch = useDispatch();
  useEffect(() => {
    if (!userProfile) {
      dispatch(userGetProfile(id));
    }
  }, [dispatch, id, userProfile]);

  // Cleanup
  useEffect(() => {
    return () => {
      dispatch(resetUserGetProfile());
    };
  }, [dispatch]);

  return (
    <div className={styles.page_wrapper}>
      <section className={styles.container}>
        <Link to={back} className="close-link">
          <AiOutlineClose></AiOutlineClose>
        </Link>
        {userProfile && (
          <>
            <div>
              <img
                className={styles.profilepic_image}
                src={userProfile.profilepic}
                alt="User profile"
              />
            </div>
            <div className={styles.padding}>
              <div className={styles.socials_container}>
                {userProfile.socials.instagram && (
                  <Link to="" className="link primary-link">
                    <FaFacebook size={30} />
                  </Link>
                )}
                {userProfile.socials.facebook && (
                  <Link className="link primary-link">
                    <BsInstagram size={30} />
                  </Link>
                )}
                {userProfile.socials.linkedin && (
                  <Link className="link primary-link">
                    <FaLinkedinIn size={30} />
                  </Link>
                )}
                <Link className="link primary-link">
                  <AiOutlineMail size={30} />
                </Link>
              </div>
              <div className={styles.user_info}>
                <h1>Hey, I'm {userProfile.firstName}</h1>
                <p>
                  <GoLocation /> {userProfile.country}
                </p>
                <br />
                <h4>My interests</h4>
                <div className={styles.interests_container}>
                  {userProfile.interests.map((interest, interestIdx) => (
                    <ChipCheckBox
                      notInteractive={true}
                      key={interestIdx}
                      label={interest}
                      imageSrc={InterestsToIconMapper[interest]}
                    />
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </section>
    </div>
  );
}
