import styles from "./ChipCheckBox.module.css";

export default function ChipCheckBox({ label, imageSrc }) {
  return (
    <div className={styles.chip}>
      <input type="checkbox" id={label} />
      <label for={label}>
        <img className={styles.image} src={imageSrc} alt={label} />
        {label}
      </label>
    </div>
  );
}
