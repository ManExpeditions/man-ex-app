import { Link } from "react-router-dom";
import styles from "./MoreQuestionsPage.module.css";

export default function MoreQuestionsPage(props) {
  const onCompleteHandler = () => {
    props.history.push("/onboarding/3");
  };

  return (
    <div className="screen">
      <Link to="/onboarding/1" className="link link-back">
        <i class="fas fa-chevron-left fa-fw fa-xs"></i> Back
      </Link>
      <h1 className={styles.page_title}>Hi User!</h1>
      <main>
        <p className={`align-center ${styles.info}`}>
          Just a few more questions so we can suggest experiences you will love
          and match you with like-minded guys who have similar interests as you.
        </p>
      </main>
      <button
        className={`btn btn-primary ${styles.action_button}`}
        onClick={onCompleteHandler}
      >
        Continue
      </button>
    </div>
  );
}
