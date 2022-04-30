import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import styles from './UserProfilePage.module.css';
import Navbar from '../../../../components/Navbar/Navbar';
import { MdOutlineModeEdit } from 'react-icons/md';
import { IoIosSettings } from 'react-icons/io';
import BottomNav from '../../../../components/BottomNav/BottomNav';
import ExperienceBox from '../../../../components/ExperienceBox/ExperienceBox';
import { useEffect } from 'react';
import { userGetOrders } from '../../../../slices/user/userGetOrdersSlice';
import { useState } from 'react';

export default function UserProfilePage() {
  const [index, setIndex] = useState(0);

  const signinSlice = useSelector((state) => state.signinSlice);
  const { user } = signinSlice;

  const userGetOrdersSlice = useSelector((state) => state.userGetOrdersSlice);
  const { userOrders } = userGetOrdersSlice;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userGetOrders());
  }, [dispatch]);

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
          <ul className={styles.tabs}>
            <li>
              <button
                className={`${styles.tab_button} ${
                  index === 0 ? styles.active : ''
                }`}
                onClick={() => setIndex(0)}
              >
                Upcoming
              </button>
            </li>
            <li>
              <button
                className={`${styles.tab_button} ${
                  index === 1 ? styles.active : ''
                }`}
                onClick={() => setIndex(1)}
              >
                Past
              </button>
            </li>
          </ul>
          {index === 0 && (
            <div>
              {userOrders &&
                userOrders.map((order) => (
                  <div className={styles.order_wrapper} key={order._id}>
                    <ExperienceBox
                      user={user}
                      experience={order.group && order.group.experience}
                      showGroup={false}
                      showLearnMore={false}
                    ></ExperienceBox>
                    <div className={styles.order_container}>
                      <div className={styles.order_info_container}>
                        <p className={styles.order_info}>Reserved</p>
                        <p className={styles.order_info}>
                          {order.group && order.group.dateText}
                        </p>
                        <p className={styles.order_info}>
                          {order.group &&
                            order.group.groupLead &&
                            order.group.groupLead.firstName}
                          's group
                        </p>
                      </div>
                      <Link
                        to={`/experiences/${
                          order.group && order.group.experience._id
                        }?back=/profile`}
                        className={`link btn-primary ${styles.see_more_button}`}
                      >
                        See more
                      </Link>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </section>
      <BottomNav profile user={user}></BottomNav>
    </div>
  );
}
