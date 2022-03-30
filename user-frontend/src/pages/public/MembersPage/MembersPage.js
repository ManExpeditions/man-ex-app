import React from 'react';
import { useSelector } from 'react-redux';
import BottomNav from '../../../components/BottomNav/BottomNav';
import Navbar from '../../../components/Navbar/Navbar';
import styles from './MembersPage.module.css';

export default function MembersPage() {
  const signinSlice = useSelector((state) => state.signinSlice);
  const { user } = signinSlice;
  return (
    <div>
      <Navbar user={user}></Navbar>
      <div className={styles.placeholder}>Coming Soon</div>
      <BottomNav members user={user} />
    </div>
  );
}
