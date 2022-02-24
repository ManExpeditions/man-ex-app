import React from 'react';
import OutsideAlerter from '../OutsideAlerter';
import styles from './Modal.module.css';

export default function Modal({ children, setIsOpen, ...props }) {
  return (
    <div className={styles.modal} {...props}>
      <OutsideAlerter setState={setIsOpen} stateValue={false}>
        <div className={styles.children}>{children}</div>
      </OutsideAlerter>
    </div>
  );
}
