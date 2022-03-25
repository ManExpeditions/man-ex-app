import React, { useEffect, useState } from 'react';
import OutsideAlerter from '../OutsideAlerter';
import { BsChevronCompactDown } from 'react-icons/bs';
import { IoCheckmarkCircleSharp } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import styles from './Group.module.css';

export default function Group({ user, group, experienceId }) {
  const [thriveCartScriptReady, setThriveCartScriptReady] = useState(false);
  const [isCheckoutFormVisible, setIsCheckoutFormVisible] = useState(false);

  useEffect(() => {
    const addThrivecartScript = (scriptId) => {
      const script = document.createElement('script');
      script.async = true;
      script.src = '//tinder.thrivecart.com/embed/v1/thrivecart.js';
      script.id = scriptId;
      script.onload = () => {
        setThriveCartScriptReady(true);
      };
      document.body.appendChild(script);
    };
    return addThrivecartScript(group.thriveCartScriptId);
  });

  return (
    <div>
      {isCheckoutFormVisible && (
        <div className={styles.checkout_form}>
          <div className={styles.checkout_form_container}>
            <OutsideAlerter
              setState={setIsCheckoutFormVisible}
              stateValue={false}
            >
              {thriveCartScriptReady && user && (
                <div
                  data-thrivecart-account="guestlist-upmostexperiences"
                  data-thrivecart-tpl="v2"
                  data-thrivecart-product="97"
                  data-thrivecart-querystring={`passthrough[customer_firstname]=${user.firstName}&
                                                      passthrough[customer_lastname]=${user.lastName}&
                                                      passthrough[customer_email]=${user.email}&
                                                      passthrough[customer_contactno]=${user.phone}&
                                                      passthrough[customer_address_state]=${user.state}&
                                                      passthrough[customer_address_city]=${user.city}&`}
                  className="thrivecart-embeddable"
                  data-thrivecart-embeddable={group.thriveCartScriptId}
                ></div>
              )}
            </OutsideAlerter>
          </div>
        </div>
      )}
      <div className={styles.group}>
        <div className={styles.group_lead}>
          <Link
            to={`/profile/${
              group.groupLead && group.groupLead._id
            }?back=/experiences/${experienceId}`}
          >
            <img
              className={styles.group_profile}
              src={group.groupLead && group.groupLead.profilepic}
              alt="Group Lead"
            />
          </Link>
          <p className={styles.group_lead_name}>
            {group.groupLead && group.groupLead.firstName}
          </p>
        </div>
        <div>
          <h4 className={styles.group_name}>
            {group.groupLead && group.groupLead.firstName}'s Group
          </h4>
          <h2 className={styles.group_date}>{group.dateText}</h2>
          <p className={styles.group_description}>"{group.description}"</p>
          {!group.goingUsers.find((goingUser) => goingUser._id === user.id) ? (
            <button
              onClick={() => {
                setIsCheckoutFormVisible(true);
              }}
              className={`btn btn-primary ${styles.book_button}`}
            >
              Book with this group
            </button>
          ) : (
            <p className={styles.already_booked}>You are going</p>
          )}
          <div>
            {(group.goingUsers.length > 0 ||
              group.interestedUsers.length > 0) && (
              <>
                <h4>Who's Going/Interested</h4>
              </>
            )}
            <div className={styles.going_interested_container}>
              {group.goingUsers.slice(0, 3).map((goingUser, goingUserIdx) => (
                <div
                  key={goingUserIdx}
                  className={styles.going_interested_user}
                >
                  <Link
                    to={`/profile/${goingUser._id}?back=/experiences/${experienceId}`}
                  >
                    <img
                      className={styles.going_interested_profilepic}
                      src={goingUser.profilepic}
                      alt="Group Lead"
                    />
                  </Link>
                  <IoCheckmarkCircleSharp
                    style={{ color: '20a020' }}
                    className={styles.checkmark}
                  />
                  <p className={styles.going_interested_name}>
                    {goingUser.firstName}
                  </p>
                </div>
              ))}
            </div>
            {group.goingUsers.length > 3 && (
              <button className={styles.see_more_long_button}>
                See {group.goingUsers.length - 3} more{' '}
                {group.goingUsers.length - 3 > 1 ? 'profiles' : 'profile'}
                <BsChevronCompactDown />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
