import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import MessageBox from "../../../components/MessageBox/MessageBox";
import OutsideAlerter from "../../../components/OutsideAlerter";
import Spinner from "../../../components/Spinner/Spinner";
import useDidMountEffect from "../../../customHooks/useDidMountEffect";
import {
  location,
  resetLocation,
} from "../../../slices/services/locationSlice";
import {
  resetUserUpdate,
  userUpdate,
} from "../../../slices/user/userUpdateSlice";
import styles from "./LocationPage.module.css";

export default function LocationPage(props) {
  const [place, setPlace] = useState("");
  const [predictionsOpen, setPredictionsOpen] = useState(true);

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

  // Get autocomplete everytime place is changed
  useDidMountEffect(() => {
    dispatch(location(place));
  }, [dispatch, place]);

  // If place is empty, reset suggestions
  useDidMountEffect(() => {
    if (!place) {
      dispatch(resetLocation());
    }
  }, [dispatch, place]);

  const signinSlice = useSelector((state) => state.signinSlice);
  const { user } = signinSlice;

  const userUpdateSlice = useSelector((state) => state.userUpdateSlice);
  const { loading, user: updatedUser, error } = userUpdateSlice;

  const onCompleteHandler = () => {
    const location = place.split(",");

    let city, state, country;
    if (location.length === 2) {
      // For locations with the format: Nairobi, Kenya
      [city, country] = place.split(",").map((loc) => loc.trim());
    } else if (location.length === 3) {
      // For locations with the format: San Francisco, CA, USA
      [city, state, country] = place.split(",").map((loc) => loc.trim());
    }

    dispatch(
      userUpdate({
        city: city,
        state: state ? state : city,
        country: country,
      })
    );
  };

  useEffect(() => {
    if (user.city) {
      setPlace(`${user.city}, ${user.state}, ${user.country}`);
    }
  }, [user]);

  useEffect(() => {
    if (updatedUser) {
      dispatch(resetUserUpdate());
      props.history.push("/onboarding/upload/profilepic");
    }
  }, [dispatch, updatedUser, props.history]);

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
      {error && <MessageBox variant="error">{error}</MessageBox>}
      <button
        className={`btn btn-primary ${styles.action_button}`}
        onClick={onCompleteHandler}
      >
        {loading ? <Spinner></Spinner> : "Confirm location"}
      </button>
    </>
  );
}
