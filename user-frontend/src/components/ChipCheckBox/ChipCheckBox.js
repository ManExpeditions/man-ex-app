import styles from './ChipCheckBox.module.css';

export default function ChipCheckBox({
  checkboxState,
  setCheckboxState,
  label,
  imageSrc,
  notInteractive
}) {
  return (
    <div
      className={`${styles.chip} ${notInteractive && styles.no_pointer_events}`}
    >
      <input
        checked={checkboxState}
        onChange={() => setCheckboxState(!checkboxState)}
        type="checkbox"
        id={label}
      />
      <label>
        <img className={styles.image} src={imageSrc} alt={label} />
        {label}
      </label>
    </div>
  );
}
