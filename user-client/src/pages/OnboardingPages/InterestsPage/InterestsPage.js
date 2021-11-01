import { Link } from "react-router-dom";
import ChipCheckBox from "../../../components/ChipCheckBox/ChipCheckBox";
import styles from "./InterestsPage.module.css";

export default function InterestsPage(props) {
  const onCompleteHandler = () => {
    props.history.push("/onboarding/3");
  };

  return (
    <div className="screen">
      <Link to="/onboarding/2" className="link link-back">
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
            label="Nature & Outdoors"
            imageSrc="/assets/icons/rocks.png"
          ></ChipCheckBox>
          <ChipCheckBox
            label="Resort Vacations"
            imageSrc="/assets/icons/coconut-tree.png"
          ></ChipCheckBox>
          <ChipCheckBox
            label="Wildlife"
            imageSrc="/assets/icons/lion.png"
          ></ChipCheckBox>
          <ChipCheckBox
            label="Luxury Get-aways"
            imageSrc="/assets/icons/diamond.png"
          ></ChipCheckBox>
          <ChipCheckBox
            label="Active Get-aways"
            imageSrc="/assets/icons/skiing.png"
          ></ChipCheckBox>
          <ChipCheckBox
            label="Camping"
            imageSrc="/assets/icons/camping-tent.png"
          ></ChipCheckBox>
          <ChipCheckBox
            label="Burning Man"
            imageSrc="/assets/icons/fire.png"
          ></ChipCheckBox>
          <ChipCheckBox
            label="Music Festivals"
            imageSrc="/assets/icons/music-notes.png"
          ></ChipCheckBox>
          <ChipCheckBox
            label="Arts & Culture "
            imageSrc="/assets/icons/culture.png"
          ></ChipCheckBox>
          <ChipCheckBox
            label="Pride events"
            imageSrc="/assets/icons/rainbow.png"
          ></ChipCheckBox>
          <ChipCheckBox
            label="Wellness Retreats"
            imageSrc="/assets/icons/apple.png"
          ></ChipCheckBox>
          <ChipCheckBox
            label="Volunteering Trips"
            imageSrc="/assets/icons/volunteer.png"
          ></ChipCheckBox>
          <ChipCheckBox
            label="Cruises"
            imageSrc="/assets/icons/cruise.png"
          ></ChipCheckBox>
          <ChipCheckBox
            label="Nudist Adventures"
            imageSrc="/assets/icons/nudist.png"
          ></ChipCheckBox>
        </div>
      </main>
      <button
        className={`btn btn-primary ${styles.action_button}`}
        onClick={onCompleteHandler}
      >
        Continue
      </button>
    </div>
  );
}
