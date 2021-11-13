import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ChipCheckBox from "../../../components/ChipCheckBox/ChipCheckBox";
import InputValidator from "../../../utils/InputValidator";
import styles from "./InterestsPage.module.css";

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

  const [buttonDisabled, setButtonDisabled] = useState(true);

  const validator = InputValidator;

  const onCompleteHandler = () => {
    props.history.push("/onboarding/continents");
  };

  useEffect(() => {
    if (
      validator.atleastXTruthy(
        [
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
        2
      )
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [
    artAndCulture,
    burningMan,
    camping,
    cruises,
    luxuryGetAway,
    musicFestivals,
    natureAndOutdoors,
    nudistAdventures,
    prideEvents,
    resortVacations,
    volunteeringTrips,
    wellnessRetreats,
    wildlife,
    validator,
    activeGetAway,
  ]);

  return (
    <div className="screen">
      <Link to="/onboarding/morequestions" className="link link-back">
        <i class="fas fa-chevron-left fa-fw fa-xs"></i> Back
      </Link>
      <h1 className={styles.page_title}>What are your travel interests?</h1>
      <main>
        <p className={`align-center ${styles.info}`}>
          This will help us match you with other travelers and travel groups
          based on the interests you have in common.
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
      <button
        disabled={buttonDisabled}
        className={`btn btn-primary ${styles.action_button}`}
        onClick={onCompleteHandler}
      >
        Continue
      </button>
    </div>
  );
}
