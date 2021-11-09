import styles from "./DigitVerificationBox.module.css";

export default function DigitVerificationBox({ boxes }) {
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
      {boxes.map(([boxState, setBoxState], i) => (
        <input
          autoFocus={i === 0 ? true : false}
          id={`box-${i + 1}`}
          value={boxState}
          className={`input ${styles.input} ${boxState && styles.input_filled}`}
          onChange={(e) => handleOnChange(i + 1, e.target.value, setBoxState)}
          onKeyDown={(e) => handleKeyDown(i + 1, e.key, boxState)}
          maxLength={1}
        ></input>
      ))}
    </div>
  );
}