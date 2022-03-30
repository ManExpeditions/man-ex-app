import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineClose } from 'react-icons/ai';
import { useInView } from 'react-intersection-observer';
import { Link, useParams } from 'react-router-dom';
import { BsChevronCompactUp, BsChevronCompactDown } from 'react-icons/bs';
import styles from './ExperiencePage.module.css';
import {
  experienceGet,
  resetExperienceGet
} from '../../../slices/experience/experienceGetSlice';
import OutsideAlerter from '../../../components/OutsideAlerter';
import ImageSlider from '../../../components/ImageSlider/ImageSlider';
import Rating from '../../../components/Rating/Rating';
import Group from '../../../components/Group/Group';
import Modal from '../../../components/Modal/Modal';
import {
  experienceInterestedUser,
  resetExperienceInterestedUser
} from '../../../slices/experience/experienceInterestedUserSlice';
import Spinner from '../../../components/Spinner/Spinner';
import ProfilesBox from '../../../components/ProfilesBox/ProfilesBox';
import { userAddToFavorites } from '../../../slices/user/userAddToFavoritesSlice';
import { userRemoveFromFavorites } from '../../../slices/user/userRemoveFromFavoritesSlice';

export default function ExperiencePage() {
  const { id } = useParams();

  const [isSeeMoreImages, setIsSeeMoreImages] = useState(false);
  const [isCarouselVisible, setIsCarouselVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(false);

  const [areGroupsVisible, setAreGroupsVisible] = useState(false);
  const [isInterestedUser, setIsInterestedUser] = useState(false);
  const [showInterestedUserModal, setShowInterestedUserModal] = useState(false);

  const [isItineraryVisible, setIsItineraryVisible] = useState(false);
  const [isAccomodationsVisible, setIsAccomodationsVisible] = useState(false);
  const [isActivitiesVisible, setIsActivitiesVisible] = useState(false);
  const [isReviewsVisible, setIsReviewsVisible] = useState(false);
  const [isWhatsIncludedVisible, setIsWhatsIncludedVisible] = useState(false);
  const [isTermsVisible, setIsTermsVisible] = useState(false);

  const [isExperienceFavorited, setIsExperienceFavorited] = useState(false);

  const signinSlice = useSelector((state) => state.signinSlice);
  const { user } = signinSlice;

  const experienceGetSlice = useSelector((state) => state.experienceGetSlice);
  const { experience } = experienceGetSlice;

  const userAddToFavoritesSlice = useSelector(
    (state) => state.userAddToFavoritesSlice
  );
  const { user: addToFavoritesUser } = userAddToFavoritesSlice;

  const userRemoveFromFavoritesSlice = useSelector(
    (state) => state.userRemoveFromFavoritesSlice
  );
  const { user: removeFromFavoritesUser } = userRemoveFromFavoritesSlice;

  const experienceInterestedUserSlice = useSelector(
    (state) => state.experienceInterestedUserSlice
  );
  const {
    loading: loadingInterestedUser,
    experience: experienceNewInterestedUser,
    error: errorInterestedUser
  } = experienceInterestedUserSlice;

  const handleImageClick = (imageIdx) => {
    setActiveIndex(imageIdx);
    setIsCarouselVisible(true);
  };
  const dispatch = useDispatch();

  const onExperienceInterestedHandler = () => {
    dispatch(experienceInterestedUser(id));
  };

  const onFavoriteClicked = (value) => {
    if (value) {
      dispatch(userAddToFavorites({ type: 'experience', id }));
    } else {
      dispatch(userRemoveFromFavorites({ type: 'experience', id }));
    }
  };

  useEffect(() => {
    if (addToFavoritesUser) {
      setIsExperienceFavorited(true);
    } else if (removeFromFavoritesUser) {
      setIsExperienceFavorited(false);
    }
  }, [addToFavoritesUser, removeFromFavoritesUser]);

  useEffect(() => {
    if (!experience) {
      dispatch(experienceGet(id));
    } else {
      // Logic for checking if experience is already favorited
      const IsExperienceInUserFavorites = user.favorites.experiences.find(
        (experience) => experience === id
      );
      setIsExperienceFavorited(IsExperienceInUserFavorites ? true : false);

      const isUserInterested = experience.interestedUsers.find(
        (interestedUser) => interestedUser._id === user.id
      );
      setIsInterestedUser(isUserInterested ? true : false);
    }
  }, [dispatch, experience, id, user]);

  useEffect(() => {
    if (experienceNewInterestedUser) {
      setShowInterestedUserModal(false);
      setAreGroupsVisible(true);
      dispatch(experienceGet(id));
      dispatch(resetExperienceInterestedUser());
    }
  }, [
    areGroupsVisible,
    dispatch,
    experienceNewInterestedUser,
    id,
    showInterestedUserModal
  ]);

  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0,
    rootMargin: '-16px'
  });

  // Cleanup
  useEffect(() => {
    return () => {
      dispatch(resetExperienceGet());
      dispatch(resetExperienceInterestedUser());
    };
  }, [dispatch]);

  return (
    <div className={styles.page_wrapper}>
      <Link to="/experiences" className={styles.close_link}>
        <AiOutlineClose></AiOutlineClose>
      </Link>
      {experience && (
        <>
          <div ref={ref} className={styles.hero_image_wrapper}>
            <div className={styles.vignette}></div>
            <img
              className={styles.hero_image}
              src={experience.heroImage}
              alt="Experience"
            />
          </div>
          <div className={styles.container_wrapper}>
            <div
              className={`${styles.floating_box_wrapper_absolute} ${
                !inView && styles.floating_box_wrapper_fixed
              }`}
            >
              <a href="#photos" className={styles.media_button}>
                Media
              </a>
              <div className={`${styles.floating_box}`}>
                <div>
                  <p>Deposit</p>
                  <p>${experience.deposit}</p>
                </div>
                <a
                  className={`btn btn-primary ${styles.view_groups_link}`}
                  href="#groups"
                >
                  View groups
                </a>
              </div>
            </div>
            <div className={styles.container}>
              <div>
                <div className={styles.days_continent_wrapper}>
                  <div className="flex-box">
                    <p className={styles.days}>
                      {experience.numberOfDays}-day experience
                    </p>
                    <span className={styles.continent}>
                      {experience.continent}
                    </span>
                  </div>
                  <input
                    checked={isExperienceFavorited}
                    onChange={(e) => onFavoriteClicked(e.target.checked)}
                    type="checkbox"
                  />
                </div>
                <h1 className={styles.name}>{experience.name}</h1>
                <p className={styles.location}>
                  <i className="fas fa-map-marker-alt"></i>{' '}
                  {experience.location}
                </p>
              </div>
              {showInterestedUserModal && (
                <div className="modal-wrapper">
                  <Modal setIsOpen={setShowInterestedUserModal}>
                    <div className="modal">
                      <p className="modal-text">
                        To see all groups, you must first indicate that you are
                        interested in this experience.
                      </p>
                      <div className="flex-box gap-1">
                        <button
                          className="btn modal-button blue"
                          onClick={onExperienceInterestedHandler}
                        >
                          {loadingInterestedUser ? (
                            <Spinner></Spinner>
                          ) : (
                            "I'm Interested"
                          )}
                        </button>
                        <button
                          className="btn modal-button red"
                          onClick={() => {
                            dispatch(resetExperienceInterestedUser());
                            setShowInterestedUserModal(false);
                          }}
                        >
                          Cancel
                        </button>
                        {errorInterestedUser && (
                          <span className="error-message display-block">
                            {errorInterestedUser}
                          </span>
                        )}
                      </div>
                    </div>
                  </Modal>
                </div>
              )}
              <div id="groups" className={styles.groups_section}>
                {experience.groups.length > 0 && (
                  <div>
                    <h2>Join a group</h2>
                    <p className={styles.summary_users_text}>
                      {experience.interestedUsers.length} INTERESTED
                    </p>
                    <ProfilesBox
                      users={experience.interestedUsers.slice(0, 4)}
                    />
                    <button
                      className={styles.view_all_groups_button}
                      onClick={() => {
                        if (isInterestedUser) {
                          setAreGroupsVisible((prev) => !prev);
                        } else {
                          setShowInterestedUserModal(true);
                        }
                      }}
                    >
                      {areGroupsVisible ? 'Hide' : 'View'} all groups
                      {areGroupsVisible ? (
                        <BsChevronCompactUp></BsChevronCompactUp>
                      ) : (
                        <BsChevronCompactDown></BsChevronCompactDown>
                      )}
                    </button>

                    {areGroupsVisible &&
                      experience.groups.map((group) => (
                        <Group
                          key={group._id}
                          group={group}
                          user={user}
                          experienceId={id}
                        />
                      ))}
                    <div>
                      <p>
                        Not into group travel? Book privately{' '}
                        <a
                          href={`mailto:hello@manexpeditions.com?subject=Private booking request: ${experience.name}&body=Please let us know what dates you want to book and how many people are in your group`}
                          className="link link-blue"
                        >
                          HERE
                        </a>{' '}
                      </p>
                    </div>
                  </div>
                )}
              </div>
              <div id="photos" className={styles.images_section}>
                {isCarouselVisible ? (
                  <div className={styles.carousel_wrapper}>
                    <OutsideAlerter
                      setState={setIsCarouselVisible}
                      stateValue={false}
                    >
                      <div className={styles.carousel_container}>
                        <ImageSlider
                          disableDots
                          activeIndex={activeIndex}
                          items={experience.images.map((img, idx) => (
                            <img
                              className={styles.slider_image}
                              src={img}
                              alt={`${experience.name}-${idx}`}
                            />
                          ))}
                        />
                      </div>
                    </OutsideAlerter>
                  </div>
                ) : (
                  <div className={styles.images}>
                    {experience.images.slice(0, 6).map((img, imageIdx) => (
                      <div key={imageIdx} className={styles.image_container}>
                        <img
                          className={styles.image}
                          src={img}
                          onClick={() => handleImageClick(imageIdx)}
                          alt={`${experience.name}-${imageIdx}`}
                        />
                      </div>
                    ))}
                    {isSeeMoreImages &&
                      experience.images.slice(6).map((image, idx) => (
                        <div className={styles.image_container}>
                          <img
                            className={`${styles.image}`}
                            key={idx}
                            src={image}
                            onClick={() => handleImageClick(idx + 6)}
                            alt={`${experience.name}-${idx + 6}`}
                          />
                        </div>
                      ))}
                  </div>
                )}
                {experience.images.length > 6 && (
                  <button
                    className={`btn ${styles.see_more_button}`}
                    onClick={() =>
                      setIsSeeMoreImages((prevValue) => !prevValue)
                    }
                  >
                    {isSeeMoreImages ? 'See less' : 'See more'}
                  </button>
                )}
              </div>
              <div className={styles.description}>{experience.description}</div>
              {experience.itinerary.length > 0 && (
                <div className={styles.info}>
                  <div
                    className={styles.card}
                    onClick={() => setIsItineraryVisible((prev) => !prev)}
                  >
                    <h2>Itinerary</h2>
                    {isItineraryVisible ? (
                      <BsChevronCompactUp></BsChevronCompactUp>
                    ) : (
                      <BsChevronCompactDown></BsChevronCompactDown>
                    )}
                  </div>
                  <div className={styles.itinerary_container}>
                    {isItineraryVisible &&
                      experience.itinerary.map((day, idx) => (
                        <div
                          className={`${styles.dropdown_content_box} ${styles.itinerary_content_box}`}
                          key={idx}
                        >
                          <span className={styles.circle}></span>
                          <p className={styles.itinerary_day}>{day.day}</p>
                          <img
                            className={styles.dropdown_image}
                            src={day.image}
                            alt=""
                          />
                          <ul>
                            {day.activities.map((activity, idx) => (
                              <li
                                className={styles.itinerary_activity}
                                key={idx}
                              >
                                <p className={styles.itinerary_activity_time}>
                                  {activity.time}
                                </p>
                                <p
                                  className={
                                    styles.itinerary_activity_description
                                  }
                                >
                                  {activity.description}
                                </p>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                  </div>
                </div>
              )}
              {experience.accomodations.length > 0 && (
                <div className={styles.info}>
                  <div
                    className={styles.card}
                    onClick={() => setIsAccomodationsVisible((prev) => !prev)}
                  >
                    <h2>Accomodations</h2>
                    {isAccomodationsVisible ? (
                      <BsChevronCompactUp></BsChevronCompactUp>
                    ) : (
                      <BsChevronCompactDown></BsChevronCompactDown>
                    )}
                  </div>
                  <div>
                    {isAccomodationsVisible &&
                      experience.accomodations.map(
                        (accomodation, accomodationIdx) => (
                          <div
                            className={`${styles.dropdown_content_box} ${styles.grid_content_box}`}
                            key={accomodationIdx}
                          >
                            <div>
                              <img
                                className={`${styles.dropdown_image} ${styles.no_margin}`}
                                src={accomodation.image}
                                alt=""
                              />
                            </div>
                            <div>
                              <h3>{accomodation.name}</h3>
                              <p>{accomodation.description}</p>
                            </div>
                          </div>
                        )
                      )}
                  </div>
                </div>
              )}
              {experience.activities.length > 0 && (
                <div className={styles.info}>
                  <div
                    className={styles.card}
                    onClick={() => setIsActivitiesVisible((prev) => !prev)}
                  >
                    <h2>Activities</h2>
                    {isActivitiesVisible ? (
                      <BsChevronCompactUp></BsChevronCompactUp>
                    ) : (
                      <BsChevronCompactDown></BsChevronCompactDown>
                    )}
                  </div>
                  <div>
                    {isActivitiesVisible &&
                      experience.activities.map((activity, activityIdx) => (
                        <div
                          className={`${styles.dropdown_content_box} ${styles.grid_content_box}`}
                          key={activityIdx}
                        >
                          <div>
                            <img
                              className={`${styles.dropdown_image} ${styles.no_margin}`}
                              src={activity.image}
                              alt=""
                            />
                          </div>
                          <div>
                            <h3>{activity.name}</h3>
                            <p>{activity.info}</p>
                            <br />
                            <p>{activity.description}</p>
                            {activity.link && (
                              <>
                                <br />
                                <Link
                                  className="link link-primary link-blue"
                                  to={activity.link}
                                >
                                  Get Tickets
                                </Link>
                              </>
                            )}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}
              {experience.reviews.length > 0 && (
                <div className={styles.info}>
                  <div
                    className={styles.card}
                    onClick={() => setIsReviewsVisible((prev) => !prev)}
                  >
                    <h2>Reviews</h2>
                    {isReviewsVisible ? (
                      <BsChevronCompactUp></BsChevronCompactUp>
                    ) : (
                      <BsChevronCompactDown></BsChevronCompactDown>
                    )}
                  </div>
                  <div>
                    {isReviewsVisible &&
                      experience.reviews.map((review, reviewIdx) => (
                        <div
                          className={`${styles.dropdown_content_box} ${styles.grid_content_box} ${styles.review_content_box}`}
                          key={reviewIdx}
                        >
                          <div className={styles.reviewer_profile}>
                            <Link
                              to={`/profile/${review.user._id}?back=/experiences/${id}`}
                            >
                              <img
                                className={styles.review_profile}
                                src={review.user.profilepic}
                                alt="Review"
                              />
                            </Link>
                            <div>
                              <h3 className={styles.reviewer_name}>
                                {review.user.firstName} {review.user.lastName}{' '}
                              </h3>
                              <Rating rating={Number(review.stars)}></Rating>
                            </div>
                          </div>
                          <div>
                            <p className={styles.reviewer_description}>
                              <em>"{review.description}"</em>
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}
              {experience.whatsIncluded && (
                <div className={styles.info}>
                  <div
                    className={styles.card}
                    onClick={() => setIsWhatsIncludedVisible((prev) => !prev)}
                  >
                    <h2>What's Included</h2>
                    {isWhatsIncludedVisible ? (
                      <BsChevronCompactUp></BsChevronCompactUp>
                    ) : (
                      <BsChevronCompactDown></BsChevronCompactDown>
                    )}
                  </div>
                </div>
              )}
              {experience.terms && (
                <div className={styles.info}>
                  <div
                    className={styles.card}
                    onClick={() => setIsTermsVisible((prev) => !prev)}
                  >
                    <h2>Terms</h2>
                    {isTermsVisible ? (
                      <BsChevronCompactUp></BsChevronCompactUp>
                    ) : (
                      <BsChevronCompactDown></BsChevronCompactDown>
                    )}
                  </div>
                </div>
              )}
              <div className={styles.deposit_box}>
                <div>
                  <p>Deposit</p>
                  <p>${experience.deposit}</p>
                </div>
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    console.log('anchor tag clicked');
                    areGroupsVisible(true);
                  }}
                  className={`btn btn-primary ${styles.view_groups_link}`}
                  href="#groups"
                >
                  View groups & dates
                </a>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
