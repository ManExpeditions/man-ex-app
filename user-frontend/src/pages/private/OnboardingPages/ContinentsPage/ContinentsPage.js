import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ChipCheckBox from "../../../../components/ChipCheckBox/ChipCheckBox";
import MessageBox from "../../../../components/MessageBox/MessageBox";
import Spinner from "../../../../components/Spinner/Spinner";
import {
  resetUserUpdate,
  userUpdate,
} from "../../../../slices/user/userUpdateSlice";
import InputValidator from "../../../../utils/InputValidator";
import styles from "./ContinentsPage.module.css";

export default function ContinentsPage(props) {
  const [northAmerica, setNorthAmerica] = useState(false);
  const [africa, setAfrica] = useState(false);
  const [europe, setEurope] = useState(false);
  const [asia, setAsia] = useState(false);
  const [southCentralAmerica, setSouthCentralAmerica] = useState(false);

  const [buttonDisabled, setButtonDisabled] = useState(true);

  const validator = InputValidator;

  useEffect(() => {
    if (
      validator.atleastXTruthy(
        [northAmerica, africa, europe, asia, southCentralAmerica],
        2
      )
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [validator, northAmerica, africa, europe, asia, southCentralAmerica]);

  const userUpdateSlice = useSelector((state) => state.userUpdateSlice);
  const { loading, user: updatedUser, error } = userUpdateSlice;

  const dispatch = useDispatch();

  const onCompleteHandler = () => {
    const continents = [
      northAmerica && "North America",
      africa && "Africa",
      europe && "Europe",
      asia && "Asia",
      southCentralAmerica && "South/Central America",
    ].filter((value) => value !== false);

    dispatch(
      userUpdate({
        continents,
      })
    );
  };

  useEffect(() => {
    if (updatedUser) {
      dispatch(resetUserUpdate());
      props.history.push("/onboarding/location");
    }
  }, [dispatch, updatedUser, props.history]);

  return (
    <div className="screen">
      <Link to="/onboarding/interests" className="link link-back">
        <i class="fas fa-chevron-left fa-fw fa-xs"></i> Back
      </Link>
      <h1 className={styles.page_title}>
        What continents do you want to travel within? (select atleast 2)
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
      {error && <MessageBox variant="error">{error}</MessageBox>}
      <button
        disabled={buttonDisabled}
        className={`btn btn-primary ${styles.action_button}`}
        onClick={onCompleteHandler}
      >
        {loading ? <Spinner></Spinner> : "Continue"}
      </button>
    </div>
  );
}