import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import BottomNav from "../../../components/BottomNav/BottomNav";
import ChipCheckBox from "../../../components/ChipCheckBox/ChipCheckBox";
import Navbar from "../../../components/Navbar/Navbar";
import VideoPlayer from "../../../components/VideoPlayer/VideoPlayer";
import styles from "./ExperiencesPage.module.css";

export default function ExperiencesPage() {
  const [online, setOnline] = useState();
  const [africa, setAfrica] = useState();
  const [northAmerica, setNorthAmerica] = useState();
  const [americas, setAmericas] = useState();
  const [europe, setEurope] = useState();
  const [asia, setAsia] = useState();

  const signinSlice = useSelector((state) => state.signinSlice);
  const { user } = signinSlice;

  return (
    <div>
      <Navbar></Navbar>
      <div className={styles.container}>
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
        <section className={styles.exp_section}>
          <div>
            <VideoPlayer src="https://res.cloudinary.com/man-expeditions/video/upload/v1640362481/Man_Ex_Cold_Shower_Challenge_-_720WebShareName_nsry8e.mov"></VideoPlayer>
            <Link
              to="/register"
              className={`link btn-primary ${styles.btn_video_info}`}
            >
              Learn more
            </Link>
          </div>
          <div>
            <VideoPlayer src="https://res.cloudinary.com/man-expeditions/video/upload/v1640362481/Man_Ex_Cold_Shower_Challenge_-_720WebShareName_nsry8e.mov"></VideoPlayer>
            <Link
              to="/register"
              className={`link btn-primary ${styles.btn_video_info}`}
            >
              Learn more
            </Link>
          </div>
          <div>
            <VideoPlayer src="https://res.cloudinary.com/man-expeditions/video/upload/v1640362481/Man_Ex_Cold_Shower_Challenge_-_720WebShareName_nsry8e.mov"></VideoPlayer>
            <Link
              to="/register"
              className={`link btn-primary ${styles.btn_video_info}`}
            >
              Learn more
            </Link>
          </div>
          <div>
            <VideoPlayer src="https://res.cloudinary.com/man-expeditions/video/upload/v1640362481/Man_Ex_Cold_Shower_Challenge_-_720WebShareName_nsry8e.mov"></VideoPlayer>
            <Link
              to="/register"
              className={`link btn-primary ${styles.btn_video_info}`}
            >
              Learn more
            </Link>
          </div>
          <div>
            <VideoPlayer src="https://res.cloudinary.com/man-expeditions/video/upload/v1640362481/Man_Ex_Cold_Shower_Challenge_-_720WebShareName_nsry8e.mov"></VideoPlayer>
            <Link
              to="/register"
              className={`link btn-primary ${styles.btn_video_info}`}
            >
              Learn more
            </Link>
          </div>
          <div>
            <VideoPlayer src="https://res.cloudinary.com/man-expeditions/video/upload/v1640362481/Man_Ex_Cold_Shower_Challenge_-_720WebShareName_nsry8e.mov"></VideoPlayer>
            <Link
              to="/register"
              className={`link btn-primary ${styles.btn_video_info}`}
            >
              Learn more
            </Link>
          </div>
        </section>
      </div>
      <BottomNav experiences user={user}></BottomNav>
    </div>
  );
}
