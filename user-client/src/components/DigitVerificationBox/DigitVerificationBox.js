import React, { useState } from "react";
import styles from "./DigitVerificationBox.module.css";

export default function DigitVerificationBox() {
  const [boxOne, setBoxOne] = useState();
  const [boxTwo, setBoxTwo] = useState();
  const [boxThree, setBoxThree] = useState();
  const [boxFour, setBoxFour] = useState();
  const [boxFive, setBoxFive] = useState();

  const changeFocusToBox = (boxNumber) => {
    const nextBox = document.getElementById(`box-${boxNumber}`);
    if (nextBox !== null) {
      nextBox.focus();
    }
  };

  const handleKeyDown = (boxNumber, key, boxState) => {
    if (key === "Backspace" && !boxState) {
      changeFocusToBox(boxNumber - 1);
    }
  };

  const handleOnChange = (boxNumber, value, setBoxState) => {
    setBoxState(value);
    if (value) {
      changeFocusToBox(boxNumber + 1);
    }
  };

  return (
    <div className={styles.wrapper}>
      <input
        autoFocus
        id="box-1"
        value={boxOne}
        onChange={(e) => handleOnChange(1, e.target.value, setBoxOne)}
        className={`input ${styles.input} ${boxOne && styles.input_filled}`}
        maxLength={1}
      ></input>
      <input
        id="box-2"
        value={boxTwo}
        className={`input ${styles.input} ${boxTwo && styles.input_filled}`}
        onChange={(e) => handleOnChange(2, e.target.value, setBoxTwo)}
        onKeyDown={(e) => handleKeyDown(2, e.key, boxTwo)}
        maxLength={1}
      ></input>
      <input
        id="box-3"
        value={boxThree}
        className={`input ${styles.input} ${boxThree && styles.input_filled}`}
        onChange={(e) => handleOnChange(3, e.target.value, setBoxThree)}
        onKeyDown={(e) => handleKeyDown(3, e.key, boxThree)}
        maxLength={1}
      ></input>
      <input
        id="box-4"
        value={boxFour}
        className={`input ${styles.input} ${boxFour && styles.input_filled}`}
        onChange={(e) => handleOnChange(4, e.target.value, setBoxFour)}
        onKeyDown={(e) => handleKeyDown(4, e.key, boxFour)}
        maxLength={1}
      ></input>
      <input
        id="box-5"
        value={boxFive}
        onChange={(e) => handleOnChange(5, e.target.value, setBoxFive)}
        onKeyDown={(e) => handleKeyDown(5, e.key, boxFive)}
        className={`input ${styles.input} ${boxFive && styles.input_filled}`}
        maxLength={1}
      ></input>
    </div>
  );
}
