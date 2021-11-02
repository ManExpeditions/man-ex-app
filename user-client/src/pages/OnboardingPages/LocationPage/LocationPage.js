import { useState } from "react";
import { Link } from "react-router-dom";
import InputBox from "../../../components/InputBox/InputBox";
import styles from "./LocationPage.module.css";

export default function LocationPage(props) {
  const [location, setLocation] = useState("");

  const onCompleteHandler = () => {
    props.history.push("/onboarding/6");
  };

  return (
    <>
      <div className="screen">
        <Link to="/onboarding/4" className="link link-back">
          <i class="fas fa-chevron-left fa-fw fa-xs"></i> Back
        </Link>
        <h1 className={styles.page_title}>Where are you located?</h1>
        <main>
          <p className={`align-center ${styles.info}`}>
            Enter your location to find events and experiences near you.
          </p>
          <div className={styles.location_wrapper}>
            <i class={`fas fa-map-marker-alt ${styles.location_icon}`}></i>
            <InputBox
              isLocation
              inputState={location}
              setInputState={setLocation}
            ></InputBox>
          </div>

          <button className={`btn ${styles.location_button}`}>
            Use My Current Location
          </button>
        </main>
        <div className={styles.locations_container}>
          <h1 className={`screen ${styles.subheading_title}`}>
            Popular Locations
          </h1>
          <ul>
            <li className={styles.location_item}>
              <button className={`btn ${styles.location_item_button}`}>
                <span className={styles.location_city}>San Francisco</span>
                <br />
                <span className={styles.location_country}>
                  California, United States
                </span>
              </button>
            </li>
            <li className={styles.location_item}>
              <button className={`btn ${styles.location_item_button}`}>
                <span className={styles.location_city}>San Francisco</span>
                <br />
                <span className={styles.location_country}>
                  California, United States
                </span>
              </button>
            </li>
            <li className={styles.location_item}>
              <button className={`btn ${styles.location_item_button}`}>
                <span className={styles.location_city}>San Francisco</span>
                <br />
                <span className={styles.location_country}>
                  California, United States
                </span>
              </button>
            </li>
            <li className={styles.location_item}>
              <button className={`btn ${styles.location_item_button}`}>
                <span className={styles.location_city}>San Francisco</span>
                <br />
                <span className={styles.location_country}>
                  California, United States
                </span>
              </button>
            </li>
          </ul>
        </div>
      </div>
      <button
        className={`btn btn-primary ${styles.action_button}`}
        onClick={onCompleteHandler}
      >
        Confirm Location
      </button>
    </>
  );
}
