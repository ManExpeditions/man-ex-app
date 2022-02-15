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
import {
  parseLocationState,
  setInterestStates,
  setLocationState,
} from "../../../../utils/common";
import OutsideAlerter from "../../../../components/OutsideAlerter";
import useDidMountEffect from "../../../../customHooks/useDidMountEffect";
import {
  location,
  resetLocation,
} from "../../../../slices/services/locationSlice";
import ChipCheckBox from "../../../../components/ChipCheckBox/ChipCheckBox";
import UploadPhotoBox from "../../../../components/UploadPhotoBox/UploadPhotoBox";
import {
  resetUserUpdate,
  userUpdate,
} from "../../../../slices/user/userUpdateSlice";
import Spinner from "../../../../components/Spinner/Spinner";
import MessageBox from "../../../../components/MessageBox/MessageBox";

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
  interestErrors: "",
  buttonDisabled: true,
};

export default function UserEditProfilePage() {
  // States for all interests
  const [natureAndOutdoors, setNatureAndOutdoors] = useState(false);
  const [resortVacations, setResortVacations] = useState(false);
  const [wildlife, setWildlife] = useState(false);
  const [luxuryGetAway, setLuxuryGetAway] = useState(false);
  const [activeGetAway, setActiveGetAway] = useState(false);
  const [camping, setCamping] = useState(false);
  const [burningMan, setBurningMan] = useState(false);
  const [musicFestivals, setMusicFestivals] = useState(false);
  const [artAndCulture, setArtAndCulture] = useState(false);
  const [prideEvents, setPrideEvents] = useState(false);
  const [wellnessRetreats, setWellnessRetreats] = useState(false);
  const [volunteeringTrips, setVolunteeringTrips] = useState(false);
  const [cruises, setCruises] = useState(false);
  const [nudistAdventures, setNudistAdventures] = useState(false);

  const [photo, setPhoto] = useState("");
  const [place, setPlace] = useState("");
  const [predictionsOpen, setPredictionsOpen] = useState(true);
  const [placeError, setPlaceError] = useState("");

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
    interestErrors,
    buttonDisabled,
  } = state;

  const signinSlice = useSelector((state) => state.signinSlice);
  const { user } = signinSlice;

  const locationSlice = useSelector((state) => state.locationSlice);
  const { places } = locationSlice;

  const userUpdateSlice = useSelector((state) => state.userUpdateSlice);
  const { loading, user: updatedUser, error } = userUpdateSlice;

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
    if (user.profilepic) {
      setPhoto(user.profilepic);
    }
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
    if (user.bio) {
      discharge({
        type: "SET_AND_VALIDATE_BIO",
        payload: { value: user.bio, min: 200, max: 300 },
      });
    }
    // Parse and set location of user
    setLocationState(user.city, user.state, user.country, {
      setLocation: setPlace,
    });
    setInterestStates(user.interests, {
      setArtAndCulture,
      setBurningMan,
      setCamping,
      setCruises,
      setLuxuryGetAway,
      setMusicFestivals,
      setNatureAndOutdoors,
      setNudistAdventures,
      setPrideEvents,
      setResortVacations,
      setVolunteeringTrips,
      setWellnessRetreats,
      setWildlife,
      setActiveGetAway,
    });
  }, [
    discharge,
    user.profilepic,
    user.firstName,
    user.lastName,
    user.city,
    user.state,
    user.country,
    user.socials,
    user.interests,
    user.bio,
  ]);

  // If place is empty, reset suggestions
  useDidMountEffect(() => {
    if (
      validator.isLength(place, { min: 7 }) &&
      validator.isAlpha(place, "en-US", { ignore: ",s" }) &&
      !places
    ) {
      setPlaceError("");
    } else if (!validator.isAlpha(place, "en-US", { ignore: ",s" })) {
      setPlaceError("Can only contain alphabets.");
      setPredictionsOpen(false);
    } else {
      setPlaceError("There is an error");
    }
    if (!place) {
      setPlaceError("");
      dispatch(resetLocation());
    }
  }, [dispatch, place]);

  // Validate interests
  useEffect(() => {
    discharge({
      type: "VALIDATE_INTERESTS",
      payload: {
        threshold: 2,
        value: [
          natureAndOutdoors,
          resortVacations,
          wildlife,
          luxuryGetAway,
          activeGetAway,
          camping,
          burningMan,
          musicFestivals,
          artAndCulture,
          prideEvents,
          wellnessRetreats,
          volunteeringTrips,
          cruises,
          nudistAdventures,
        ],
      },
    });
  }, [
    activeGetAway,
    artAndCulture,
    burningMan,
    camping,
    cruises,
    discharge,
    luxuryGetAway,
    musicFestivals,
    natureAndOutdoors,
    nudistAdventures,
    prideEvents,
    resortVacations,
    volunteeringTrips,
    wellnessRetreats,
    wildlife,
  ]);

  // Ensure validation
  useEffect(() => {
    discharge({
      type: "CHECK_ALL_FIELDS_VALID",
      payload: {
        empty: [
          firstNameError,
          lastNameError,
          placeError,
          bioError,
          instagramError,
          facebookError,
          linkedinError,
          interestErrors,
        ],
        notEmpty: [firstName, lastName, location, bio],
      },
    });
  }, [
    bioError,
    bio,
    discharge,
    facebookError,
    firstName,
    firstNameError,
    instagramError,
    lastName,
    lastNameError,
    linkedinError,
    placeError,
    interestErrors,
  ]);

  // When save is clicked
  const onCompleteHandler = () => {
    dispatch(
      userUpdate({
        firstName,
        lastName,
        location,
        ...parseLocationState(place),
        bio,
        socials: {
          instagram,
          facebook,
          linkedin,
        },
      })
    );
  };

  // On cleanup
  useEffect(() => {
    return () => {
      dispatch(resetUserUpdate());
    };
  }, [dispatch]);

  return (
    <div>
      <section className={styles.container}>
        <div className={styles.top_links}>
          <Link className={`link ${styles.back_link}`} to="/profile">
            <IoChevronBackSharp size={25}></IoChevronBackSharp>
            Back
          </Link>
          <button
            disabled={buttonDisabled}
            onClick={onCompleteHandler}
            className={`btn ${styles.save_button}`}
            to="/profile"
          >
            {loading ? <Spinner></Spinner> : "Save"}
          </button>
        </div>
        {error && <MessageBox variant="error">{error}</MessageBox>}
        {updatedUser && (
          <div className={styles.success_container}>
            <span className="success-message">Updated succesfully</span>
          </div>
        )}
        <h1 className={styles.page_heading}>Edit Profile</h1>
        <div>
          <ul className={styles.list}>
            <li className={styles.list_item}>
              <p>Profile Photo</p>
              <UploadPhotoBox
                photoState={photo}
                setPhotoState={setPhoto}
              ></UploadPhotoBox>
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
                {placeError && (
                  <span className="error-message">{placeError}</span>
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
                      payload: { value: e.target.value, min: 200, max: 300 },
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
              <div className={styles.interests_container}>
                <ChipCheckBox
                  checkboxState={natureAndOutdoors}
                  setCheckboxState={setNatureAndOutdoors}
                  label="Nature & Outdoors"
                  imageSrc="/assets/icons/rocks.png"
                ></ChipCheckBox>
                <ChipCheckBox
                  checkboxState={resortVacations}
                  setCheckboxState={setResortVacations}
                  label="Resort Vacations"
                  imageSrc="/assets/icons/coconut-tree.png"
                ></ChipCheckBox>
                <ChipCheckBox
                  checkboxState={wildlife}
                  setCheckboxState={setWildlife}
                  label="Wildlife"
                  imageSrc="/assets/icons/lion.png"
                ></ChipCheckBox>
                <ChipCheckBox
                  checkboxState={luxuryGetAway}
                  setCheckboxState={setLuxuryGetAway}
                  label="Luxury Get-aways"
                  imageSrc="/assets/icons/diamond.png"
                ></ChipCheckBox>
                <ChipCheckBox
                  checkboxState={activeGetAway}
                  setCheckboxState={setActiveGetAway}
                  label="Active Get-aways"
                  imageSrc="/assets/icons/skiing.png"
                ></ChipCheckBox>
                <ChipCheckBox
                  checkboxState={camping}
                  setCheckboxState={setCamping}
                  label="Camping"
                  imageSrc="/assets/icons/camping-tent.png"
                ></ChipCheckBox>
                <ChipCheckBox
                  checkboxState={burningMan}
                  setCheckboxState={setBurningMan}
                  label="Burning Man"
                  imageSrc="/assets/icons/fire.png"
                ></ChipCheckBox>
                <ChipCheckBox
                  checkboxState={musicFestivals}
                  setCheckboxState={setMusicFestivals}
                  label="Music Festivals"
                  imageSrc="/assets/icons/music-notes.png"
                ></ChipCheckBox>
                <ChipCheckBox
                  checkboxState={artAndCulture}
                  setCheckboxState={setArtAndCulture}
                  label="Arts & Culture "
                  imageSrc="/assets/icons/culture.png"
                ></ChipCheckBox>
                <ChipCheckBox
                  checkboxState={prideEvents}
                  setCheckboxState={setPrideEvents}
                  label="Pride events"
                  imageSrc="/assets/icons/rainbow.png"
                ></ChipCheckBox>
                <ChipCheckBox
                  checkboxState={wellnessRetreats}
                  setCheckboxState={setWellnessRetreats}
                  label="Wellness Retreats"
                  imageSrc="/assets/icons/apple.png"
                ></ChipCheckBox>
                <ChipCheckBox
                  checkboxState={volunteeringTrips}
                  setCheckboxState={setVolunteeringTrips}
                  label="Volunteering Trips"
                  imageSrc="/assets/icons/volunteer.png"
                ></ChipCheckBox>
                <ChipCheckBox
                  checkboxState={cruises}
                  setCheckboxState={setCruises}
                  label="Cruises"
                  imageSrc="/assets/icons/cruise.png"
                ></ChipCheckBox>
                <ChipCheckBox
                  checkboxState={nudistAdventures}
                  setCheckboxState={setNudistAdventures}
                  label="Nudist Adventures"
                  imageSrc="/assets/icons/nudist.png"
                ></ChipCheckBox>
                <span
                  className={`error-message ${styles.list_input_error_interests}`}
                >
                  {interestErrors}
                </span>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
