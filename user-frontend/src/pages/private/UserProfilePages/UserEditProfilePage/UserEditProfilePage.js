import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { IoChevronBackSharp } from "react-icons/io5";
import TextareaAutosize from "react-textarea-autosize";
import styles from "./UserEditProfilePage.module.css";
import { useState } from "react";
import { useEffect } from "react";
import validator from "validator";
import Input from "../../../../components/Input/Input";
import useInputValidate from "../../../../customHooks/useInputValidate";
import { setLocationState } from "../../../../utils/common";
import OutsideAlerter from "../../../../components/OutsideAlerter";
import useDidMountEffect from "../../../../customHooks/useDidMountEffect";
import {
  location,
  resetLocation,
} from "../../../../slices/services/locationSlice";

const initialState = {
  firstName: "",
  firstNameError: "",
  lastName: "",
  lastNameError: "",
  bio: "",
  bioError: "",
  instagram: "",
  instagramError: "",
  facebook: "",
  facebookError: "",
  linkedin: "",
  linkedinError: "",
};

export default function UserEditProfilePage() {
  const [place, setPlace] = useState("");
  const [predictionsOpen, setPredictionsOpen] = useState(true);
  const [validationError, setValidationError] = useState("");

  const [buttonDisabled, setButtonDisabled] = useState(true);

  const [state, discharge] = useInputValidate(initialState);
  let {
    firstName,
    firstNameError,
    lastName,
    lastNameError,
    bio,
    bioError,
    facebook,
    facebookError,
    instagram,
    instagramError,
    linkedin,
    linkedinError,
  } = state;

  const signinSlice = useSelector((state) => state.signinSlice);
  const { user } = signinSlice;

  const locationSlice = useSelector((state) => state.locationSlice);
  const { places } = locationSlice;

  const dispatch = useDispatch();

  // Control the prediction suggestions
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

  // Set initial field values if they exist
  useEffect(() => {
    if (user.firstName) {
      discharge({
        type: "SET_AND_VALIDATE_FIRSTNAME",
        payload: { value: user.firstName },
      });
    }
    if (user.lastName) {
      discharge({
        type: "SET_AND_VAlIDATE_LASTNAME",
        payload: { value: user.lastName },
      });
    }
    if (user.socials.instagram) {
      discharge({
        type: "SET_AND_VALIDATE_INSTAGRAM",
        payload: { value: user.socials.instagram },
      });
    }
    if (user.socials.facebook) {
      discharge({
        type: "SET_AND_VALIDATE_FACEBOOK",
        payload: { value: user.socials.facebook },
      });
    }
    if (user.socials.linkedin) {
      discharge({
        type: "SET_AND_VALIDATE_LINKEDIN",
        payload: { value: user.socials.linkedin },
      });
    }
    // Parse and set location of user
    setLocationState(user.city, user.state, user.country, {
      setLocation: setPlace,
    });
    // Parse and set social usernames
    // setSocialStates(user.socials, { setInstagram, setFacebook, setLinkedin });
  }, [
    discharge,
    user.firstName,
    user.lastName,
    user.city,
    user.state,
    user.country,
    user.socials,
  ]);

  // If place is empty, reset suggestions
  useDidMountEffect(() => {
    if (
      validator.isLength(place, { min: 7 }) &&
      validator.isAlpha(place, "en-US", { ignore: ",s" }) &&
      !places
    ) {
      setValidationError("");
      setButtonDisabled(false);
    } else if (!validator.isAlpha(place, "en-US", { ignore: ",s" })) {
      setValidationError("Can only contain alphabets.");
      setPredictionsOpen(false);
    } else {
      setButtonDisabled(true);
    }
    if (!place) {
      setValidationError("");
      dispatch(resetLocation());
    }
  }, [dispatch, place]);

  return (
    <div>
      <section className={styles.container}>
        <div className={styles.top_links}>
          <Link className={`link ${styles.back_link}`} to="/profile">
            <IoChevronBackSharp size={25}></IoChevronBackSharp>
            Back
          </Link>
        </div>
        <h1 className={styles.page_heading}>Edit Profile</h1>
        <div>
          <ul className={styles.list}>
            <li className={styles.list_item}>
              <p>Profile Photo</p>
              <img
                className={styles.list_photo}
                src={user.profilepic}
                alt="profile"
              />
            </li>
            <li className={styles.list_item}>
              <p>First Name</p>
              <div className={styles.list_input_container}>
                <Input
                  className={styles.list_input}
                  placeholder="Enter first name"
                  dispatch={discharge}
                  value={firstName}
                  actionType="SET_AND_VALIDATE_FIRSTNAME"
                ></Input>
                <span className={`error-message ${styles.list_input_error}`}>
                  {firstNameError}
                </span>
              </div>
            </li>
            <li className={styles.list_item}>
              <p>Last Name</p>
              <div className={styles.list_input_container}>
                <Input
                  className={styles.list_input}
                  placeholder="Enter last name"
                  dispatch={discharge}
                  value={lastName}
                  actionType="SET_AND_VAlIDATE_LASTNAME"
                ></Input>
                <span className={`error-message ${styles.list_input_error}`}>
                  {lastNameError}
                </span>
              </div>
            </li>
            <li className={styles.list_item}>
              <p>Location</p>
              <div className={styles.location_input_wrapper}>
                <input
                  className={styles.list_input}
                  value={place}
                  onChange={(e) => onLocationTyped(e.target.value)}
                ></input>
                {validationError && (
                  <span className="error-message">{validationError}</span>
                )}
                {places && predictionsOpen && (
                  <div className={styles.predictions_wrapper}>
                    <OutsideAlerter
                      setState={setPredictionsOpen}
                      stateValue={false}
                    >
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
                  </div>
                )}
              </div>
            </li>
            <li className={`${styles.list_item} ${styles.list_item_bio}`}>
              <p>Bio</p>
              <div className={styles.list_input_container}>
                <TextareaAutosize
                  className={styles.list_textarea}
                  placeholder="Add bio to introduce yourself"
                  value={bio}
                  onChange={(e) => {
                    discharge({
                      type: "SET_AND_VALIDATE_BIO",
                      payload: { value: e.target.value, min: 100, max: 300 },
                    });
                  }}
                ></TextareaAutosize>
                <div className={styles.list_input_error_container}>
                  <span
                    className={`error-message ${styles.list_input_error} ${styles.list_input_error_bio}`}
                  >
                    {bioError}
                  </span>
                </div>
              </div>
            </li>
            <li className={styles.list_item}>
              <p>Instagram</p>
              <div className={styles.list_input_container}>
                <Input
                  className={styles.list_input}
                  placeholder="Enter instagram handle"
                  dispatch={discharge}
                  value={instagram}
                  actionType="SET_AND_VALIDATE_INSTAGRAM"
                ></Input>
                <span className={`error-message ${styles.list_input_error}`}>
                  {instagramError}
                </span>
              </div>
            </li>
            <li className={styles.list_item}>
              <p>Facebook</p>
              <div className={styles.list_input_container}>
                <Input
                  className={styles.list_input}
                  placeholder="Enter facebook handle"
                  dispatch={discharge}
                  value={facebook}
                  actionType="SET_AND_VALIDATE_FACEBOOK"
                  payload={{ min: 2, max: 100 }}
                ></Input>
                <span className={`error-message ${styles.list_input_error}`}>
                  {facebookError}
                </span>
              </div>
            </li>
            <li className={styles.list_item}>
              <p>Linkedin</p>
              <div className={styles.list_input_container}>
                <Input
                  className={styles.list_input}
                  placeholder="Enter linkedin handle"
                  dispatch={discharge}
                  value={linkedin}
                  actionType="SET_AND_VALIDATE_LINKEDIN"
                  payload={{ min: 2, max: 100 }}
                ></Input>
                <span className={`error-message ${styles.list_input_error}`}>
                  {linkedinError}
                </span>
              </div>
            </li>
            <li className={styles.list_item}>
              <p>Interests</p>
              <p>{user.interests}</p>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
