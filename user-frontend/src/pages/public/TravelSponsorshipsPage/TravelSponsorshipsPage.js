import { useSelector } from "react-redux";
import Navbar from "../../../components/Navbar/Navbar";
import styles from "./TravelSponsorshipsPage.module.css";

export default function TravelSponsorshipsPage() {
  const signinSlice = useSelector((state) => state.signinSlice);
  const { user } = signinSlice;

  return (
    <div className={`bg-white ${styles.wrapper}`}>
      <Navbar user={user}></Navbar>
      <main className={styles.container}>
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
