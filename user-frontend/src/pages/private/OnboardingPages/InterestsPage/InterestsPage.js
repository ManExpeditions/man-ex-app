import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ChipCheckBox from '../../../../components/ChipCheckBox/ChipCheckBox';
import MessageBox from '../../../../components/MessageBox/MessageBox';
import Spinner from '../../../../components/Spinner/Spinner';
import useInputValidate from '../../../../customHooks/useInputValidate';
import {
  resetUserUpdate,
  userUpdate
} from '../../../../slices/user/userUpdateSlice';
import {
  parseInterestState,
  setInterestStates
} from '../../../../utils/common';
import styles from './InterestsPage.module.css';

const initialState = {
  interestErrors: ''
};

export default function InterestsPage(props) {
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

  const [state, discharge] = useInputValidate(initialState);
  let { interestErrors } = state;

  useEffect(() => {
    discharge({
      type: 'VALIDATE_INTERESTS',
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
          nudistAdventures
        ]
      }
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
    wildlife
  ]);

  const signinSlice = useSelector((state) => state.signinSlice);
  const { user } = signinSlice;

  const userUpdateSlice = useSelector((state) => state.userUpdateSlice);
  const { loading, user: updatedUser, error } = userUpdateSlice;

  const dispatch = useDispatch();

  const onCompleteHandler = () => {
    dispatch(
      userUpdate({
        interests: parseInterestState({
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
          wildlife
        })
      })
    );
  };

  useEffect(() => {
    // Set already selected interests
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
      setActiveGetAway
    });
  }, [user.interests]);

  useEffect(() => {
    if (updatedUser) {
      dispatch(resetUserUpdate());
      props.history.push('/onboarding/continents');
    }
  }, [dispatch, updatedUser, props.history]);

  return (
    <div className="screen">
      <Link to="/onboarding/morequestions" className="link link-back">
        <i className="fas fa-chevron-left fa-fw fa-xs"></i> Back
      </Link>
      <h1 className={styles.page_title}>What are your travel interests?</h1>
      <main>
        <p className={`align-center ${styles.info}`}>
          This will help us match you with other travelers and travel groups
          <br />
          (select atleast 2).
        </p>
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
        </div>
      </main>
      {error && <MessageBox variant="error">{error}</MessageBox>}
      <button
        disabled={interestErrors === '' ? false : true}
        className={`btn btn-primary ${styles.action_button}`}
        onClick={onCompleteHandler}
      >
        {loading ? <Spinner></Spinner> : 'Continue'}
      </button>
    </div>
  );
}
