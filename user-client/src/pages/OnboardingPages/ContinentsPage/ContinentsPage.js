import { useState } from "react";
import { Link } from "react-router-dom";
import ChipCheckBox from "../../../components/ChipCheckBox/ChipCheckBox";
import styles from "./ContinentsPage.module.css";

export default function ContinentsPage(props) {
  const [northAmerica, setNorthAmerica] = useState(false);
  const [africa, setAfrica] = useState(false);
  const [europe, setEurope] = useState(false);
  const [asia, setAsia] = useState(false);
  const [southCentralAmerica, setSouthCentralAmerica] = useState(false);

  const onCompleteHandler = () => {
    props.history.push("/onboarding/5");
  };

  return (
    <div className="screen">
      <Link to="/onboarding/3" className="link link-back">
        <i class="fas fa-chevron-left fa-fw fa-xs"></i> Back
      </Link>
      <h1 className={styles.page_title}>
        What continents do you want to travel within?
      </h1>
      <main>
        <div className={styles.interests_container}>
          <ChipCheckBox
            checkboxState={northAmerica}
            setCheckboxState={setNorthAmerica}
            label="North America"
            imageSrc="/assets/icons/north-america.png"
          ></ChipCheckBox>
          <ChipCheckBox
            checkboxState={africa}
            setCheckboxState={setAfrica}
            label="Africa"
            imageSrc="/assets/icons/africa.png"
          ></ChipCheckBox>
          <ChipCheckBox
            checkboxState={europe}
            setCheckboxState={setEurope}
            label="Europe"
            imageSrc="/assets/icons/europe.png"
          ></ChipCheckBox>
          <ChipCheckBox
            checkboxState={asia}
            setCheckboxState={setAsia}
            label="Asia"
            imageSrc="/assets/icons/asia.png"
          ></ChipCheckBox>
          <ChipCheckBox
            checkboxState={southCentralAmerica}
            setCheckboxState={setSouthCentralAmerica}
            label="South/Central America"
            imageSrc="/assets/icons/south-america.png"
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
