export default function SelectBox({
  label,
  options,
  optionState,
  setOptionState,
  labelHidden,
}) {
  return (
    <div>
      <label className="label" htmlFor={label}>
        {label}
      </label>
      <select
        value={optionState}
        className="selectbox"
        id={label}
        onChange={(e) => setOptionState(e.target.value)}
      >
        {options.map((option) => (
          <option value={option}>{option}</option>
        ))}
      </select>
    </div>
  );
}
