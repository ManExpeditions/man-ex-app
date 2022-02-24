import styles from './ChipCheckBox.module.css';

export default function ChipCheckBox({
  checkboxState,
  setCheckboxState,
  label,
  imageSrc
}) {
  return (
    <div className={styles.chip}>
      <input
        checked={checkboxState}
        onChange={(e) => setCheckboxState(!checkboxState)}
        type="checkbox"
        id={label}
      />
      <label for={label}>
        <img className={styles.image} src={imageSrc} alt={label} />
        {label}
      </label>
    </div>
  );
}
