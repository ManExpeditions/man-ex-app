import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import OutsideAlerter from "../../../components/OutsideAlerter";
import {
  location,
  resetLocation,
} from "../../../slices/services/locationSlice";
import styles from "./LocationPage.module.css";

export default function LocationPage(props) {
  const [place, setPlace] = useState("");

  const [predictionsOpen, setPredictionsOpen] = useState(true);

  const onCompleteHandler = () => {
    props.history.push("/onboarding/upload/profilepic");
  };

  const locationSlice = useSelector((state) => state.locationSlice);
  const { places } = locationSlice;

  const dispatch = useDispatch();

  const onLocationTyped = (location) => {
    setPredictionsOpen(true);
    setPlace(location);
  };

  const onLocationClicked = (prediction) => {
    setPlace(prediction);
    dispatch(resetLocation());
  };

  useEffect(() => {
    dispatch(location(place));
  }, [dispatch, place]);

  useEffect(() => {
    if (!place) {
      dispatch(resetLocation());
    }
  });

  return (
    <>
      <div className="screen">
        <Link to="/onboarding/continents" className="link link-back">
          <i class="fas fa-chevron-left fa-fw fa-xs"></i> Back
        </Link>
        <h1 className={styles.page_title}>Where are you located?</h1>
        <main className={styles.main}>
          <p className={`align-center ${styles.info}`}>
            Enter your location to find events and experiences near you.
          </p>
          <div className={styles.location_wrapper}>
            <div className={styles.location_wrapper}>
              <i class={`fas fa-map-marker-alt ${styles.location_icon}`}></i>
              <input
                autoFocus
                className={`input ${styles.location_input}`}
                value={place}
                onChange={(e) => onLocationTyped(e.target.value)}
              ></input>
            </div>
            {places && predictionsOpen && (
              <OutsideAlerter setState={setPredictionsOpen} stateValue={false}>
                <ul className={styles.predictions_list}>
                  {places.map((predLoc) => (
                    <li>
                      <button
                        className={`btn ${styles.prediction_button}`}
                        onClick={() => onLocationClicked(predLoc)}
                      >
                        {predLoc}
                      </button>
                    </li>
                  ))}
                </ul>
              </OutsideAlerter>
            )}
          </div>
        </main>
        <h1 className={styles.subheading_title}>Popular Locations</h1>
        <div className={styles.locations_container}>
          <ul>
            <li className={styles.location_item}>
              <button
                onClick={() => onLocationClicked("San Francisco, CA, USA")}
                className={`btn ${styles.location_item_button}`}
              >
                <p className={styles.location_city}>San Francisco</p>
                <p className={styles.location_country}>
                  California, United States
                </p>
              </button>
            </li>
            <li className={styles.location_item}>
              <button
                onClick={() => onLocationClicked("New York, NY, USA")}
                className={`btn ${styles.location_item_button}`}
              >
                <p className={styles.location_city}>New York City</p>
                <p className={styles.location_country}>
                  New York, United States
                </p>
              </button>
            </li>
            <li className={styles.location_item}>
              <button
                onClick={() => onLocationClicked("Los Angeles, CA, USA")}
                className={`btn ${styles.location_item_button}`}
              >
                <p className={styles.location_city}>Los Angeles</p>
                <p className={styles.location_country}>
                  California, United States
                </p>
              </button>
            </li>
            <li className={styles.location_item}>
              <button
                onClick={() => onLocationClicked("Toronto, ON, Canada")}
                className={`btn ${styles.location_item_button}`}
              >
                <p className={styles.location_city}>Toronto</p>
                <p className={styles.location_country}>Ontario, Canada</p>
              </button>
            </li>
            <li className={styles.location_item}>
              <button
                onClick={() => onLocationClicked("Montreal, QC, Canada")}
                className={`btn ${styles.location_item_button}`}
              >
                <p className={styles.location_city}>Montreal</p>
                <p className={styles.location_country}>Quebec, Canada</p>
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
