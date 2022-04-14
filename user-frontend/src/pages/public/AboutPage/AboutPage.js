import { AiOutlineClose } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Navbar from '../../../components/Navbar/Navbar';
import styles from './AboutPage.module.css';

export default function AboutPage(props) {
  const back = props.location.search
    ? props.location.search.split('=')[1]
    : null;

  const signinSlice = useSelector((state) => state.signinSlice);
  const { user } = signinSlice;
  return (
    <div>
      {back ? (
        <Link to={back} className="close-link">
          <AiOutlineClose></AiOutlineClose>
        </Link>
      ) : (
        <Navbar user={user}></Navbar>
      )}
      <section className={styles.hero_section}>
        <p className={styles.hero_heading}>About us</p>
        <img
          className={styles.hero_image}
          style={{ marginTop: back ? '0' : '' }}
          src="https://app.greenrope.com/users/myteam46998/Media383.jpg?202107301313"
          alt="Man looking at the hills."
        />
        {!user && (
          <Link to="/register" className="btn btn-primary btn-abs-tr">
            Register for Free
          </Link>
        )}
      </section>
      <section className="bg-white">
        <main className={styles.main}>
          <div className={styles.container}>
            <h1 className={styles.heading}>Our mission</h1>
            <p className={styles.paragraph}>
              To bring like-minded men together through their love of adventure
              and travel while making a positive impact in the world. Our goal
              is to design adventures for all men, of all fitness levels, who
              are looking to connect with other men who share similar interests,
              to make new friends and who are looking to try something
              different.
            </p>
          </div>
          <div className={styles.container}>
            <h1 className={styles.heading}>Our values</h1>
            <p className={styles.paragraph}>
              Our core values and existence stems from making a more inclusive
              and supportive community for men. Man Ex is a community driven
              initiative of aspiring men brought together by their love of
              adventure, exploration and the desire to network with other men
              who have similar social values in life. Whether you want to
              challenge yourself, find meaningful friendships or to make a
              difference in the world, this community is for you.
            </p>
          </div>
          <div className={styles.container}>
            <h1 className={styles.heading}>What we deliver</h1>
            <ul className={styles.list}>
              <li className={styles.list_item}>
                To deliver life enhancing adventures to unite and reconnect men
                in a healthy way both mentally and physically.
              </li>
              <li className={styles.list_item}>
                To provide a platform for our community to meet other
                like-minded guys with common interests from all over the world
                and to build more meaningful friendships.
              </li>
              <li className={styles.list_item}>
                To help raise awareness for our affiliated Animal Welfare
                Charity partners through our adventure travels which are
                supported by our media sponsors to elevate PR and social media
                awareness for their causes.
              </li>
            </ul>
          </div>
        </main>
      </section>
    </div>
  );
}
