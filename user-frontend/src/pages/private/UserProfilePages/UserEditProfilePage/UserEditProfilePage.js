import { useSelector } from "react-redux";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { IoChevronBackSharp } from "react-icons/io5";
import styles from "./UserEditProfilePage.module.css";
import { useState } from "react";
import { useEffect } from "react";
import validator from "validator";

export default function UserEditProfilePage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bio, setBio] = useState("");
  const [instagram, setInstagram] = useState("");
  const [facebook, setFacebook] = useState("");
  const [linkedin, setLinkedin] = useState("");

  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [bioError, setBioError] = useState("");
  const [instagramError, setInstagramError] = useState("");
  const [facebookError, setFacebookError] = useState("");
  const [linkedinError, setLinkedinError] = useState("");

  const signinSlice = useSelector((state) => state.signinSlice);
  const { user } = signinSlice;

  const setAndValidate = (
    fieldValue,
    setFieldValue,
    errorValue,
    setErrorValue,
    validatorEvaluation
  ) => {
    setFieldValue(fieldValue);
    if (validatorEvaluation) {
      setErrorValue("");
    } else {
      setErrorValue(errorValue);
    }
  };

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
    }
  }, [user]);

  useEffect(() => {
    if (!instagram) {
      setInstagramError("");
    } else if (!facebook) {
      setFacebookError("");
    } else if (!linkedin) {
      setLinkedin("");
    }
  }, [instagram, facebook, linkedin]);

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
                <input
                  className={styles.list_input}
                  placeholder="Enter first name"
                  value={firstName}
                  onChange={(e) =>
                    setAndValidate(
                      e.target.value,
                      setFirstName,
                      "Must be alteast 3 letters.",
                      setFirstNameError,
                      validator.isLength(e.target.value, { min: 3 }) &&
                        validator.isAlpha(e.target.value, "en-US", {
                          ignore: " ",
                        })
                    )
                  }
                ></input>
                <span className={`error-message ${styles.list_input_error}`}>
                  {firstNameError}
                </span>
              </div>
            </li>
            <li className={styles.list_item}>
              <p>Last Name</p>
              <div className={styles.list_input_container}>
                <input
                  className={styles.list_input}
                  placeholder="Enter last name"
                  value={lastName}
                  onChange={(e) =>
                    setAndValidate(
                      e.target.value,
                      setLastName,
                      "Must be alteast 3 letters.",
                      setLastNameError,
                      validator.isLength(e.target.value, { min: 3 }) &&
                        validator.isAlpha(e.target.value, "en-US", {
                          ignore: " ",
                        })
                    )
                  }
                ></input>
                <span className={`error-message ${styles.list_input_error}`}>
                  {lastNameError}
                </span>
              </div>
            </li>
            <li className={styles.list_item}>
              <p>Country</p>
              <p>{user.country}</p>
            </li>
            <li className={styles.list_item}>
              <p>City</p>
              <p>{user.city}</p>
            </li>
            <li className={styles.list_item}>
              <p>Bio</p>
              <div className={styles.list_input_container}>
                <textarea
                  className={styles.list_input}
                  placeholder="Add bio to introduce yourself"
                  value={bio}
                  onChange={(e) =>
                    setAndValidate(
                      e.target.value,
                      setBio,
                      "Must be between 50 - 200 characters.",
                      setBioError,
                      validator.isLength(e.target.value, {
                        min: 50,
                        max: 200,
                      }) &&
                        validator.isAlphanumeric(e.target.value, "en-US", {
                          ignore: " ",
                        })
                    )
                  }
                ></textarea>
                <span className={`error-message ${styles.list_input_error}`}>
                  {bioError}
                </span>
              </div>
            </li>
            <li className={styles.list_item}>
              <p>Instagram</p>
              <div className={styles.list_input_container}>
                <input
                  className={styles.list_input}
                  placeholder="Enter username"
                  value={instagram}
                  onChange={(e) =>
                    setAndValidate(
                      e.target.value,
                      setInstagram,
                      "Must be between 3 - 20 characters.",
                      setInstagramError,
                      validator.isLength(e.target.value, { min: 3, max: 20 }) &&
                        validator.isAlphanumeric(e.target.value)
                    )
                  }
                ></input>
                <span className={`error-message ${styles.list_input_error}`}>
                  {instagramError}
                </span>
              </div>
            </li>
            <li className={styles.list_item}>
              <p>Facebook</p>
              <div className={styles.list_input_container}>
                <input
                  className={styles.list_input}
                  placeholder="Enter username"
                  value={facebook}
                  onChange={(e) =>
                    setAndValidate(
                      e.target.value,
                      setFacebook,
                      "Must be between 3 - 20 characters.",
                      setFacebookError,
                      validator.isLength(e.target.value, { min: 3, max: 20 }) &&
                        validator.isAlphanumeric(e.target.value)
                    )
                  }
                ></input>
                <span className={`error-message ${styles.list_input_error}`}>
                  {facebookError}
                </span>
              </div>
            </li>
            <li className={styles.list_item}>
              <p>Linkedin</p>
              <div className={styles.list_input_container}>
                <input
                  className={styles.list_input}
                  placeholder="Enter username"
                  value={linkedin}
                  onChange={(e) =>
                    setAndValidate(
                      e.target.value,
                      setLinkedin,
                      "Must be between 3 - 20 characters.",
                      setLinkedinError,
                      validator.isLength(e.target.value, { min: 3, max: 20 }) &&
                        validator.isAlphanumeric(e.target.value)
                    )
                  }
                ></input>
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
