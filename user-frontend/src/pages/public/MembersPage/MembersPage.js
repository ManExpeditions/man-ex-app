import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BottomNav from '../../../components/BottomNav/BottomNav';
import Navbar from '../../../components/Navbar/Navbar';
import ProfileBox from '../../../components/ProfileBox/ProfileBox';
import {
  resetUserGetFeaturedMembers,
  userGetFeaturedMembers
} from '../../../slices/user/userGetFeaturedMembersSlice';
import styles from './MembersPage.module.css';

export default function MembersPage() {
  const signinSlice = useSelector((state) => state.signinSlice);
  const { user } = signinSlice;

  const userGetFeaturedMembersSlice = useSelector(
    (state) => state.userGetFeaturedMembersSlice
  );
  const { users } = userGetFeaturedMembersSlice;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userGetFeaturedMembers());
  }, [dispatch]);

  // cleanup
  useEffect(() => {
    return () => {
      dispatch(resetUserGetFeaturedMembers());
    };
  }, [dispatch]);

  return (
    <div>
      <Navbar user={user}></Navbar>
      <div className={styles.wrapper}>
        <div className={styles.profiles_container}>
          {users &&
            users.map((user) => <ProfileBox key={user._id} user={user} />)}
        </div>
      </div>
      <BottomNav members user={user} />
    </div>
  );
}
