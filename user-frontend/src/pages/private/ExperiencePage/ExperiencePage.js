import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineClose } from "react-icons/ai";
import { Link, useParams } from "react-router-dom";
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

  const experienceGetSlice = useSelector((state) => state.experienceGetSlice);
  const { loading, experience, error } = experienceGetSlice;

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
              <div className="flex-box">
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
                  {experience.images.slice(0, 6).map((image, idx) => (
                    <div className={styles.image_container}>
                      <img
                        className={styles.image}
                        key={idx}
                        src={image}
                        onClick={() => setIsCarouselVisible(true)}
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
                          onClick={() => {
                            console.log("make me bigger");
                          }}
                          alt={`${experience.name}-${idx}`}
                        />
                      </div>
                    ))}
                </div>
              )}

              <button
                className={`btn ${styles.see_more_button}`}
                onClick={() => setIsSeeMoreImages((prevValue) => !prevValue)}
              >
                {isSeeMoreImages ? "See less" : "See more"}
              </button>
            </div>
            <div className={styles.description}>{experience.description}</div>
          </div>
        </>
      )}
    </div>
  );
}
