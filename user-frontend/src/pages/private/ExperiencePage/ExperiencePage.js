import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineClose } from 'react-icons/ai';
import { useInView } from 'react-intersection-observer';
import { Link, useParams } from 'react-router-dom';
import { BsChevronCompactUp, BsChevronCompactDown } from 'react-icons/bs';
import { IoCheckmarkCircleSharp } from 'react-icons/io5';
import styles from './ExperiencePage.module.css';
import {
  experienceGet,
  resetExperienceGet
} from '../../../slices/experience/experienceGetSlice';
import OutsideAlerter from '../../../components/OutsideAlerter';
import ImageSlider from '../../../components/ImageSlider/ImageSlider';
import Rating from '../../../components/Rating/Rating';

export default function ExperiencePage() {
  const { id } = useParams();

  const [isSeeMoreImages, setIsSeeMoreImages] = useState(false);
  const [isCarouselVisible, setIsCarouselVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(false);

  const [isItineraryVisible, setIsItineraryVisible] = useState(false);
  const [isAccomodationsVisible, setIsAccomodationsVisible] = useState(false);
  const [isActivitiesVisible, setIsActivitiesVisible] = useState(false);
  const [isReviewsVisible, setIsReviewsVisible] = useState(false);
  const [isWhatsIncludedVisible, setIsWhatsIncludedVisible] = useState(false);
  const [isTermsVisible, setIsTermsVisible] = useState(false);

  const [thriveCartReady, setThriveCartReady] = useState(false);
  const [checkoutIndex, setCheckoutIndex] = useState(-1);

  const signinSlice = useSelector((state) => state.signinSlice);
  const { user } = signinSlice;

  const experienceGetSlice = useSelector((state) => state.experienceGetSlice);
  const { experience } = experienceGetSlice;

  const handleImageClick = (imageIdx) => {
    setActiveIndex(imageIdx);
    setIsCarouselVisible(true);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    if (!experience) {
      dispatch(experienceGet(id));
    }
  }, [dispatch, experience, id]);

  useEffect(() => {
    const addThrivecartScript = (scriptId) => {
      const script = document.createElement('script');
      script.async = true;
      script.src = '//tinder.thrivecart.com/embed/v1/thrivecart.js';
      script.id = scriptId;
      script.onload = () => {
        setThriveCartReady(true);
      };
      document.body.appendChild(script);
    };
    if (experience && experience.groups.length > 0) {
      experience.groups.map((group) => {
        return addThrivecartScript(
          group.thriveCartScriptId ? group.thriveCartScriptId : ''
        );
      });
    }
  });

  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0,
    rootMargin: '-16px'
  });

  // Cleanup
  useEffect(() => {
    return () => {
      dispatch(resetExperienceGet());
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
                  <p className={styles.days}>
                    {experience.numberOfDays}-day experience
                  </p>
                  <span className={styles.continent}>
                    {experience.continent}
                  </span>
                </div>
                <h1 className={styles.name}>{experience.name}</h1>
                <p className={styles.location}>
                  <i className="fas fa-map-marker-alt"></i>{' '}
                  {experience.location}
                </p>
              </div>
              {checkoutIndex >= 0 && (
                <div className={styles.checkout_form}>
                  <div className={styles.checkout_form_container}>
                    <OutsideAlerter setState={setCheckoutIndex} stateValue={-1}>
                      {thriveCartReady && (
                        <div
                          data-thrivecart-account="guestlist-upmostexperiences"
                          data-thrivecart-tpl="v2"
                          data-thrivecart-product="97"
                          data-thrivecart-querystring={`passthrough[customer_firstname]=${user.firstName}&
                                                      passthrough[customer_lastname]=${user.lastName}&
                                                      passthrough[customer_email]=${user.email}&
                                                      passthrough[customer_contactno]=${user.phone}&
                                                      passthrough[customer_address_state]=${user.state}&
                                                      passthrough[customer_address_city]=${user.city}&`}
                          className="thrivecart-embeddable"
                          data-thrivecart-embeddable={
                            experience.groups[checkoutIndex].thriveCartScriptId
                          }
                        ></div>
                      )}
                    </OutsideAlerter>
                  </div>
                </div>
              )}
              <div id="groups" className={styles.groups_section}>
                {experience.groups.length > 0 && <h2>Join a group</h2>}
                {experience.groups.map((group, groupIdx) => (
                  <>
                    <div key={groupIdx} className={styles.group}>
                      <div className={styles.group_lead}>
                        <Link
                          to={`/profile/${
                            group.groupLead && group.groupLead._id
                          }?back=/experiences/${id}`}
                        >
                          <img
                            className={styles.group_profile}
                            src={group.groupLead && group.groupLead.profilepic}
                            alt="Group Lead"
                          />
                        </Link>
                        <p className={styles.group_lead_name}>
                          {group.groupLead && group.groupLead.firstName}
                        </p>
                      </div>
                      <div>
                        <h4 className={styles.group_name}>
                          {group.groupLead && group.groupLead.firstName}'s Group
                        </h4>
                        <h2 className={styles.group_date}>{group.dateText}</h2>
                        <p className={styles.group_description}>
                          "{group.description}"
                        </p>
                        {!group.goingUsers.find(
                          (goingUser) => goingUser._id === user.id
                        ) ? (
                          <button
                            onClick={() => {
                              setCheckoutIndex(groupIdx);
                            }}
                            className={`btn btn-primary ${styles.book_button}`}
                          >
                            Book with this group
                          </button>
                        ) : (
                          <p className={styles.already_booked}>You are going</p>
                        )}
                        <div>
                          {(group.goingUsers.length > 0 ||
                            group.interestedUsers.length > 0) && (
                            <>
                              <h4>Who's Going/Interested</h4>
                            </>
                          )}
                          <div className={styles.going_interested_container}>
                            {group.goingUsers
                              .slice(0, 3)
                              .map((goingUser, goingUserIdx) => (
                                <div
                                  key={goingUserIdx}
                                  className={styles.going_interested_user}
                                >
                                  <Link
                                    to={`/profile/${goingUser._id}?back=/experiences/${id}`}
                                  >
                                    <img
                                      className={
                                        styles.going_interested_profilepic
                                      }
                                      src={goingUser.profilepic}
                                      alt="Group Lead"
                                    />
                                  </Link>
                                  <IoCheckmarkCircleSharp
                                    style={{ color: '20a020' }}
                                    className={styles.checkmark}
                                  />
                                  <p className={styles.going_interested_name}>
                                    {goingUser.firstName}
                                  </p>
                                </div>
                              ))}
                          </div>
                          {group.goingUsers.length > 3 && (
                            <button className={styles.see_more_long_button}>
                              See {group.goingUsers.length - 3} more{' '}
                              {group.goingUsers.length - 3 > 1
                                ? 'profiles'
                                : 'profile'}
                              <BsChevronCompactDown />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </>
                ))}
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
