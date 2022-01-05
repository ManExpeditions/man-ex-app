import { useState } from "react";
import ChipCheckBox from "../../components/ChipCheckBox/ChipCheckBox";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./ExperiencesPage.module.css";

export default function ExperiencesPage() {
  const [online, setOnline] = useState();
  const [africa, setAfrica] = useState();
  const [northAmerica, setNorthAmerica] = useState();
  const [americas, setAmericas] = useState();
  const [europe, setEurope] = useState();
  const [asia, setAsia] = useState();

  return (
    <div>
      <Navbar></Navbar>
      <section className={styles.container}>
        <div className={styles.chips_wrapper}>
          <div className={styles.chips_container}>
            <ChipCheckBox
              checkboxState={online}
              setCheckboxState={setOnline}
              label="Online"
              imageSrc="/assets/icons/pc.png"
            ></ChipCheckBox>
            <ChipCheckBox
              checkboxState={africa}
              setCheckboxState={setAfrica}
              label="Africa"
              imageSrc="/assets/icons/africa.png"
            ></ChipCheckBox>
            <ChipCheckBox
              checkboxState={northAmerica}
              setCheckboxState={setNorthAmerica}
              label="North America"
              imageSrc="/assets/icons/north-america.png"
            ></ChipCheckBox>
            <ChipCheckBox
              checkboxState={americas}
              setCheckboxState={setAmericas}
              label="Americas"
              imageSrc="/assets/icons/south-america.png"
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
          </div>
        </div>
        <div></div>
      </section>
    </div>
  );
}
