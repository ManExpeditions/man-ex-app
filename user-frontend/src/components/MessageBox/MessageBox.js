export default function MessageBox(props) {
  return (
    <div className={`msg-box msg-box-${props.variant || "info"}`}>
      {props.children}
    </div>
  );
}
