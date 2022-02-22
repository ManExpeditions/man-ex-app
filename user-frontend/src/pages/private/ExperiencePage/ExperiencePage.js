import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineClose } from "react-icons/ai";
import { Link, useParams } from "react-router-dom";
import { BsChevronCompactUp, BsChevronCompactDown } from "react-icons/bs";
import styles from "./ExperiencePage.module.css";
import {
  experienceGet,
  resetExperienceGet,
} from "../../../slices/experience/experienceGetSlice";
import OutsideAlerter from "../../../components/OutsideAlerter";
import ImageSlider from "../../../components/ImageSlider/ImageSlider";

export default function ExperiencePage() {
  const { id } = useParams();

  const [isSeeMoreImages, setIsSeeMoreImages] = useState(false);
  const [isCarouselVisible, setIsCarouselVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(false);

  const [isItineraryVisible, setIsItineraryVisible] = useState(false);

  const experienceGetSlice = useSelector((state) => state.experienceGetSlice);
  const { loading, experience, error } = experienceGetSlice;

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
                  {isSeeMoreImages ? "See less" : "See more"}
                </button>
              )}
            </div>
            <div className={styles.description}>{experience.description}</div>
            <div className={styles.itinerary}>
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
          </div>
        </>
      )}
    </div>
  );
}
