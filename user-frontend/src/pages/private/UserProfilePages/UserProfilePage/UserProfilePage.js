import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import styles from './UserProfilePage.module.css';
import Navbar from '../../../../components/Navbar/Navbar';
import { MdOutlineModeEdit } from 'react-icons/md';
import { IoIosSettings } from 'react-icons/io';
import BottomNav from '../../../../components/BottomNav/BottomNav';

export default function UserProfilePage() {
  const signinSlice = useSelector((state) => state.signinSlice);
  const { user } = signinSlice;

  return (
    <div>
      <Navbar user={user}></Navbar>
      <section>
        <div className={styles.hero_section}>
          <Link to="/profile/settings" className={styles.settings_link}>
            <IoIosSettings size={30}></IoIosSettings>
          </Link>
          <div className={styles.profile_container}>
            <img
              className={styles.profile_image}
              src={user.profilepic}
              alt="profile"
            />
            <Link to="/profile/edit" className={styles.edit_link}>
              <MdOutlineModeEdit
                className={styles.edit_icon}
              ></MdOutlineModeEdit>
              <p className={styles.name}>{user.firstName}</p>
              <p>View/Edit</p>
            </Link>
          </div>
        </div>
      </section>
      <section className={styles.reservation_section_wrapper}>
        <div className={styles.reservation_section}>
          <h1 className={styles.reservation_section_heading}>
            Your reservations
          </h1>
        </div>
      </section>
      <BottomNav profile user={user}></BottomNav>
    </div>
  );
}
