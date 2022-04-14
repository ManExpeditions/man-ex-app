import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './MoreQuestionsPage.module.css';

export default function MoreQuestionsPage(props) {
  const signinSlice = useSelector((state) => state.signinSlice);
  const { user } = signinSlice;

  const onCompleteHandler = () => {
    props.history.push('/onboarding/interests');
  };

  return (
    <div className="screen">
      <Link to="/onboarding/aboutyou" className="link link-back">
        <i class="fas fa-chevron-left fa-fw fa-xs"></i> Back
      </Link>
      <h1 className={styles.page_title}>Hi {user ? user.firstName : 'User'}</h1>
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
