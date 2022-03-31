import React, { useEffect, useState } from 'react';
import OutsideAlerter from '../OutsideAlerter';
import { BsChevronCompactDown, BsChevronCompactUp } from 'react-icons/bs';
import { IoCheckmarkCircleSharp } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import styles from './Group.module.css';
import Modal from '../Modal/Modal';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../Spinner/Spinner';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import {
  groupInterestedUser,
  resetGroupInterestedUser
} from '../../slices/group/groupInterestedUserSlice';
import { resetAddToFavorite } from '../../slices/user/userAddToFavoritesSlice';
import { resetRemoveFromFavorites } from '../../slices/user/userRemoveFromFavoritesSlice';
import userAPI from '../../api/userAPI';
import useDidMountEffect from '../../customHooks/useDidMountEffect';
import { saveUser } from '../../slices/auth/signinSlice';
// import { saveUser } from '../../slices/auth/signinSlice';

export default function Group({ user, group, experienceId }) {
  const [thriveCartScriptReady, setThriveCartScriptReady] = useState(false);
  const [isCheckoutFormVisible, setIsCheckoutFormVisible] = useState(false);
  const [showInterestedUserModal, setShowInterestedUserModal] = useState(false);
  const [isInterestedUser, setIsInterestedUser] = useState(false);
  const [areProfilesVisible, setAreProfilesVisible] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  const [favoriteBoxState, setFavoriteBoxState] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [erorr, setError] = useState('');

  const groupInterestedUserSlice = useSelector(
    (state) => state.groupInterestedUserSlice
  );
  const {
    loading: loadingInterestedUser,
    group: groupNewInterestedUser,
    error: errorInterestedUser
  } = groupInterestedUserSlice;

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

  const dispatch = useDispatch();
  const onGroupInterestedHandler = () => {
    dispatch(groupInterestedUser(group._id));
  };

  useEffect(() => {
    // Logic for checking if group is already favorited
    const IsGroupInUserFavorites = user.favorites.groups.find(
      (userGroup) => userGroup._id === group._id
    );
    setIsFavorited(IsGroupInUserFavorites ? true : false);
    setFavoriteBoxState(IsGroupInUserFavorites ? true : false);
  }, [group._id, user.favorites.groups]);

  useEffect(() => {
    const isUserInterested = group.interestedUsers.find(
      (interestedUser) => interestedUser._id === user.id
    );
    setIsInterestedUser(isUserInterested ? true : false);
  }, [group.interestedUsers, user.id]);

  useEffect(() => {
    if (groupNewInterestedUser) {
      setIsInterestedUser(true);
      setShowInterestedUserModal(false);
      setAreProfilesVisible(true);
      dispatch(resetGroupInterestedUser());
    }
  }, [dispatch, groupNewInterestedUser]);

  useDidMountEffect(() => {
    const onFavoriteClicked = async (value) => {
      if (value) {
        try {
          setIsLoading(true);
          const data = await userAPI.userAddToFavorites(
            user.id,
            user.token,
            'group',
            group._id
          );
          setIsLoading(false);
          setIsFavorited(true);
          dispatch(saveUser({ ...data, token: user.token }));
        } catch (err) {
          setError(err);
        }
      } else {
        try {
          setIsLoading(true);
          const data = await userAPI.userRemoveFromFavorites(
            user.id,
            user.token,
            'group',
            group._id
          );
          setIsLoading(false);
          setIsFavorited(false);
          dispatch(saveUser({ ...data, token: user.token }));
        } catch (err) {
          setError(err);
        }
      }
    };
    onFavoriteClicked(favoriteBoxState);
  }, [favoriteBoxState]);

  // Cleanup
  useEffect(() => {
    return () => {
      dispatch(resetAddToFavorite());
      dispatch(resetRemoveFromFavorites());
    };
  }, [dispatch]);

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
            {showInterestedUserModal && (
              <div className="modal-wrapper">
                <Modal setIsOpen={setShowInterestedUserModal}>
                  <div className="modal">
                    <p className="modal-text">
                      To see the full list of attendees, you must first indicate
                      that you are interested in joining this group.
                    </p>
                    <div className="flex-box gap-1">
                      <button
                        className="btn modal-button blue"
                        onClick={onGroupInterestedHandler}
                      >
                        {loadingInterestedUser ? (
                          <Spinner></Spinner>
                        ) : (
                          "I'm Interested"
                        )}
                      </button>
                      <button
                        className="btn modal-button red"
                        onClick={() => {
                          dispatch(resetGroupInterestedUser());
                          setShowInterestedUserModal(false);
                        }}
                      >
                        Cancel
                      </button>
                      {errorInterestedUser && (
                        <span className="error-message display-block">
                          {errorInterestedUser}
                        </span>
                      )}
                    </div>
                  </div>
                </Modal>
              </div>
            )}
            <div className={styles.going_interested_container}>
              {group.goingUsers
                .slice(0, areProfilesVisible ? 100 : 3)
                .map((goingUser, goingUserIdx) => (
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
              <button
                className={styles.see_more_long_button}
                onClick={() => {
                  if (isInterestedUser) {
                    setAreProfilesVisible((prev) => !prev);
                  } else {
                    setShowInterestedUserModal(true);
                  }
                }}
              >
                {areProfilesVisible ? (
                  <>
                    Hide profiles <BsChevronCompactUp />
                  </>
                ) : (
                  <>
                    See {group.goingUsers.length - 3} more{' '}
                    {group.goingUsers.length - 3 > 1 ? 'profiles' : 'profile'}
                    <BsChevronCompactDown />
                  </>
                )}
              </button>
            )}
            <div className={styles.favorites_container}>
              <span className={styles.favorites_label}>
                {isFavorited ? (
                  <>
                    <AiFillHeart style={{ color: 'red' }} />
                    Remove from favorites
                  </>
                ) : (
                  <>
                    <AiOutlineHeart />
                    Add to favorites
                  </>
                )}
              </span>
              <button
                className={styles.favorite_button}
                onClick={() => {
                  setFavoriteBoxState(!isFavorited);
                }}
              >
                Add to favorites
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
