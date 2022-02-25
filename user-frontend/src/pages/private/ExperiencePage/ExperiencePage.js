import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineClose } from 'react-icons/ai';
import { Link, useParams } from 'react-router-dom';
import { BsChevronCompactUp, BsChevronCompactDown } from 'react-icons/bs';
import styles from './ExperiencePage.module.css';
import {
  experienceGet,
  resetExperienceGet
} from '../../../slices/experience/experienceGetSlice';
import OutsideAlerter from '../../../components/OutsideAlerter';
import ImageSlider from '../../../components/ImageSlider/ImageSlider';

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
  const [isPricingVisible, setIsPricingVisible] = useState(false);
  const [isTermsVisible, setIsTermsVisible] = useState(false);

  const [thriveCartReady, setThriveCartReady] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);

  const signinSlice = useSelector((state) => state.signinSlice);
  const { user } = signinSlice;

  const experienceGetSlice = useSelector((state) => state.experienceGetSlice);
  const { experience } = experienceGetSlice;

  const handleImageClick = (imageIdx) => {
    console.log(imageIdx);
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
    const addThrivecartScript = () => {
      const script = document.createElement('script');
      script.async = true;
      script.src = '//tinder.thrivecart.com/embed/v1/thrivecart.js';
      script.id = 'tc-guestlist-upmostexperiences-97-G6BK9Z';
      script.onload = () => {
        setThriveCartReady(true);
      };
      document.body.appendChild(script);
    };
    addThrivecartScript();
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
          <div className={styles.hero_image_wrapper}>
            <div className={styles.vignette}></div>
            <img
              className={styles.hero_image}
              src={experience.heroImage}
              alt="Experience"
            />
          </div>
          <div className={styles.container}>
            <div>
              <div className={styles.days_continent_wrapper}>
                <p className={styles.days}>
                  {experience.numberOfDays}-day experience
                </p>
                <span className={styles.continent}>{experience.continent}</span>
              </div>
              <h1 className={styles.name}>{experience.name}</h1>
              <p className={styles.location}>
                <i class="fas fa-map-marker-alt"></i> {experience.location}
              </p>
            </div>
            {showCheckout && (
              <div className={styles.checkout_form}>
                <div className={styles.checkout_form_container}>
                  <OutsideAlerter setState={setShowCheckout} stateValue={false}>
                    {thriveCartReady && (
                      <>
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
                          class="thrivecart-embeddable"
                          data-thrivecart-embeddable="tc-guestlist-upmostexperiences-97-3ONRWZ"
                        ></div>
                      </>
                    )}
                  </OutsideAlerter>
                </div>
              </div>
            )}

            <div className={styles.groups_section}>
              {experience.groups.map((group) => (
                <div className={styles.group}>
                  <div className={styles.group_lead}>
                    <img
                      className={styles.group_profile}
                      src={group.leadProfilepic}
                      alt="Group Lead"
                    />
                    <span>{group.leadName}</span>
                  </div>
                  <div>
                    <h4>{group.name}</h4>
                    <h4>{group.date}</h4>
                    <p className={styles.group_description}>
                      "{group.description}"
                    </p>
                    <button
                      onClick={() => {
                        console.log('clicks');
                        setShowCheckout(true);
                      }}
                      className={`btn btn-primary ${styles.book_button}`}
                    >
                      Book with this group
                    </button>
                    <h4>Who's Going/Interested</h4>
                    {group.goingUsers.map((goingUser) => (
                      <p>{goingUser._id}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.images_section}>
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
                            src={img.url}
                            alt={`${experience.name}-${idx}`}
                          />
                        ))}
                      />
                    </div>
                  </OutsideAlerter>
                </div>
              ) : (
                <div className={styles.images}>
                  {experience.images.slice(0, 6).map((image, idx) => (
                    <div className={styles.image_container}>
                      <img
                        className={styles.image}
                        key={idx}
                        src={image.url}
                        onClick={() => handleImageClick(idx)}
                        alt={`${experience.name}-${idx}`}
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
                  onClick={() => setIsSeeMoreImages((prevValue) => !prevValue)}
                >
                  {isSeeMoreImages ? 'See less' : 'See more'}
                </button>
              )}
            </div>
            <div className={styles.description}>{experience.description}</div>
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
                    <div className={styles.itinerary_content} key={idx}>
                      <span className={styles.circle}></span>
                      <p className={styles.itinerary_day}>{day.title}</p>
                      <img
                        className={styles.itinerary_image}
                        src={day.image}
                        alt=""
                      />
                      <ul>
                        {day.activities.map((activity, idx) => (
                          <li className={styles.itinerary_activity} key={idx}>
                            <p className={styles.itinerary_activity_time}>
                              {activity.time}
                            </p>
                            <p
                              className={styles.itinerary_activity_description}
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
            </div>
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
            </div>
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
            </div>
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
            <div className={styles.info}>
              <div
                className={styles.card}
                onClick={() => setIsPricingVisible((prev) => !prev)}
              >
                <h2>Pricing</h2>
                {isPricingVisible ? (
                  <BsChevronCompactUp></BsChevronCompactUp>
                ) : (
                  <BsChevronCompactDown></BsChevronCompactDown>
                )}
              </div>
            </div>
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
          </div>
        </>
      )}
    </div>
  );
}
