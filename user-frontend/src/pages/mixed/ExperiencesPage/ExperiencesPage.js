import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BottomNav from '../../../components/BottomNav/BottomNav';
import ChipCheckBox from '../../../components/ChipCheckBox/ChipCheckBox';
import ExperienceBox from '../../../components/ExperienceBox/ExperienceBox';
import Navbar from '../../../components/Navbar/Navbar';
import {
  experiencesGet,
  resetExperiencesGet
} from '../../../slices/experience/experiencesGetSlice';
import { continentFilter } from '../../../utils/common';
import styles from './ExperiencesPage.module.css';

export default function ExperiencesPage() {
  const [online, setOnline] = useState(false);
  const [africa, setAfrica] = useState(false);
  const [northAmerica, setNorthAmerica] = useState(false);
  const [americas, setAmericas] = useState(false);
  const [europe, setEurope] = useState(false);
  const [asia, setAsia] = useState(false);

  const [selectedContinents, setSelectedContinents] = useState([]);

  const signinSlice = useSelector((state) => state.signinSlice);
  const { user } = signinSlice;

  const experiencesGetSlice = useSelector((state) => state.experiencesGetSlice);
  const { experiences } = experiencesGetSlice;

  const dispatch = useDispatch();

  useEffect(() => {
    const continents = continentFilter({
      online,
      africa,
      northAmerica,
      americas,
      europe,
      asia
    });
    setSelectedContinents(continents);
  }, [online, africa, northAmerica, americas, europe, asia]);

  useEffect(() => {
    dispatch(
      experiencesGet({
        isActive: true,
        ...(selectedContinents.length > 0
          ? { continent: selectedContinents }
          : {})
      })
    );
  }, [dispatch, selectedContinents]);

  useEffect(() => {
    return () => {
      dispatch(resetExperiencesGet());
    };
  }, [dispatch]);

  return (
    <div className={`page ${styles.page_wrapper}`}>
      <Navbar experiences user={user}></Navbar>
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
          {experiences &&
            experiences.map((experience) => (
              <ExperienceBox
                key={experience._id}
                experience={experience}
                user={user}
              />
            ))}
        </section>
      </div>
      <BottomNav experiences user={user}></BottomNav>
    </div>
  );
}
