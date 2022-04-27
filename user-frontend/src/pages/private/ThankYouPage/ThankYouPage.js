import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Navbar from '../../../components/Navbar/Navbar';
import styles from './ThankYouPage.module.css';

export default function ThankYouPage() {
  const signinSlice = useSelector((state) => state.signinSlice);
  const { user } = signinSlice;

  return (
    <div className={`page ${styles.page_wrapper}`}>
      <Navbar user={user} />
      <div className={styles.container}>
        <h3>Thank you for your purchase.</h3>
        <p>
          Explore more{' '}
          <Link to="/experiences" className="link link-blue">
            experiences
          </Link>
        </p>
      </div>
    </div>
  );
}
