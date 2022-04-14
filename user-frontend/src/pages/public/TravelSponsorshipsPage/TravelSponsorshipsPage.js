import { AiOutlineClose } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Navbar from '../../../components/Navbar/Navbar';
import styles from './TravelSponsorshipsPage.module.css';

export default function TravelSponsorshipsPage(props) {
  const back = props.location.search
    ? props.location.search.split('=')[1]
    : null;

  const signinSlice = useSelector((state) => state.signinSlice);
  const { user } = signinSlice;

  return (
    <div className={`bg-white ${styles.wrapper}`}>
      {back ? (
        <Link to={back} className="close-link">
          <AiOutlineClose></AiOutlineClose>
        </Link>
      ) : (
        <Navbar user={user}></Navbar>
      )}
      <main style={{ marginTop: back ? '0' : '' }} className={styles.container}>
        <h1 className={styles.page_heading}>Travel sponsorhip application</h1>
        <p className={styles.text}>
          If you are a Social Media Influencer, Personal Trainer, Fitness
          Instructor or Yoga Instructor with a large social media following (10k
          or more followers) you may be able to qualify for sponsored travel
          with Man Expeditions. The Travel Sponsorships being offered entail
          qualified applicants to subsidized or free trips with Man Ex in
          exchange for their services.
        </p>
        <a
          className={`btn btn-primary ${styles.button}`}
          href="https://manexpeditions.greenrope.com/Social-influencer-application"
        >
          Social Influencers
        </a>
        <a
          className={`btn btn-primary ${styles.button}`}
          href="https://manexpeditions.greenrope.com/Fitness-Trainer-application"
        >
          Fitness Trainers
        </a>
      </main>
    </div>
  );
}
