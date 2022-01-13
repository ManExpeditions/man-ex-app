import { ImSpinner2 } from "react-icons/im";

export default function Spinner({ style }) {
  return (
    <div className="spinner">
      <ImSpinner2 className="spinner" style={style}></ImSpinner2>
    </div>
  );
}
