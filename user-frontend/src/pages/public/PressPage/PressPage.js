import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Navbar from '../../../components/Navbar/Navbar';
import styles from './PressPage.module.css';

export default function PressPage() {
  const signinSlice = useSelector((state) => state.signinSlice);
  const { user } = signinSlice;
  return (
    <div>
      <Navbar user={user}></Navbar>
      <section className={styles.hero_section}>
        <p className={styles.hero_heading}>Press media</p>
        <img
          className={styles.hero_image}
          src="https://app.greenrope.com/users/myteam46998/Media384.jpg?202107301508"
          alt="Group of boys smiling."
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
            <a
              className="link"
              href="https://www.woofd.com/travel/man-expeditions.html"
            >
              <img
                className={styles.woofd_logo}
                src="https://app.greenrope.com/users/myteam46998/Media385.png?202107301514"
                alt="woofd logo."
              />
            </a>
            <p className="text-center">Published on 12/2017</p>
          </div>
          <div className={styles.container}>
            <img
              className={styles.quote_image}
              src="https://app.greenrope.com/users/myteam46998/Media386.png?202107301514"
              alt="Opening quotes."
            />
            <p className={styles.quote}>
              MAN EXPEDITIONS FUND THE INFRASTRUCTURE REQUIRED TO SUPPORT
              WILDLIFE AND ENVIRONMENTAL CONSERVATION EFFORTS. SUSTAINABLE
              ECO-TOURISM IS THEIR MANDATE. BY BOOKING A TRIP WITH MAN
              EXPEDITIONS YOU ARE HELPING LOCAL COMMUNITIES.
            </p>
            <p className={styles.quote_author}>- Woofd.com</p>
          </div>
        </main>
      </section>
    </div>
  );
}
