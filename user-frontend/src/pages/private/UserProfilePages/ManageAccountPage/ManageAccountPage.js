import React, { useEffect, useRef, useState } from 'react';
import { IoChevronBackSharp } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { InputPassword } from '../../../../components/Input/Input';
import MessageBox from '../../../../components/MessageBox/MessageBox';
import Spinner from '../../../../components/Spinner/Spinner';
import useInputValidate from '../../../../customHooks/useInputValidate';
import {
  resetUserValidate,
  validateUser
} from '../../../../slices/user/userValidateSlice';
import styles from './ManageAccountPage.module.css';
import {
  resetUserUpdate,
  userUpdate
} from '../../../../slices/user/userUpdateSlice';
import { resetVerify } from '../../../../slices/user/verifySlice';
import { resetSignin } from '../../../../slices/auth/signinSlice';
import Modal from '../../../../components/Modal/Modal';
import {
  deleteUser,
  resetUserDelete
} from '../../../../slices/user/userDeleteSlice';

const initialState = {
  password: '',
  passwordError: '',
  confirmPassword: '',
  confirmPasswordError: '',
  buttonDisabled: true
};

export default function ManageAccountPage(props) {
  const [isDeactivateOpen, setIsDeactivateOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [state, discharge] = useInputValidate(initialState);

  const passwordRef = useRef(null);

  let { password, passwordError, confirmPassword, confirmPasswordError } =
    state;

  const userValidateSlice = useSelector((state) => state.userValidateSlice);
  const {
    loading: loadingValidatedUser,
    success: validatedUser,
    error: errorValidatedUser
  } = userValidateSlice;

  const userUpdateSlice = useSelector((state) => state.userUpdateSlice);
  const {
    loading: loadingUpdatedUser,
    user: updatedUser,
    error: errorUpdatedUser
  } = userUpdateSlice;

  const userDeleteSlice = useSelector((state) => state.userDeleteSlice);
  const {
    loading: loadingDeletedUser,
    success: deletedSuccess,
    error: errorDeletedUser
  } = userDeleteSlice;

  const dispatch = useDispatch();

  // Focus ref on phone
  useEffect(() => {
    if (!validatedUser) {
      passwordRef.current.focus();
    }
  }, [validatedUser]);

  // Validate user password
  const onValidatePassword = () => {
    dispatch(validateUser(password));
  };

  // What to do on deactivate
  const onDeactivateHandler = () => {
    dispatch(userUpdate({ isActive: false }));
  };

  // What to do on deactivate
  const onDeleteHandler = () => {
    dispatch(deleteUser({}));
  };

  // On every render check if all fields are valid
  useEffect(() => {
    discharge({
      type: 'CHECK_ALL_FIELDS_VALID',
      payload: {
        empty: [passwordError, confirmPasswordError],
        notEmpty: [password, confirmPassword]
      }
    });
  }, [
    password,
    passwordError,
    confirmPassword,
    confirmPasswordError,
    discharge
  ]);

  // If everything was succesfull then
  useEffect(() => {
    if (updatedUser || deletedSuccess) {
      window.setTimeout(() => {
        dispatch(resetSignin());
      }, 2000);
    }
  }, [dispatch, props.history, updatedUser, deletedSuccess]);

  useEffect(() => {
    // Cleanup on exit of page
    return () => {
      dispatch(resetUserValidate());
      dispatch(resetUserDelete());
      dispatch(resetUserUpdate());
      dispatch(resetVerify());
    };
  }, [dispatch]);

  return (
    <div className={`bg-white ${styles.page_wrapper}`}>
      <div className={styles.top_links}>
        <Link className={`link ${styles.back_link}`} to="/profile/settings">
          <IoChevronBackSharp size={25}></IoChevronBackSharp>
          Back
        </Link>
      </div>
      <div className={styles.container}>
        <h1>Manage Account</h1>
        {updatedUser || deletedSuccess ? (
          <MessageBox>
            Account {updatedUser ? 'deactivated' : 'deleted'}. Redirecting{' '}
            <div className={styles.spinner_wrapper}>
              <Spinner></Spinner>{' '}
            </div>{' '}
          </MessageBox>
        ) : !validatedUser ? (
          <>
            <div className={styles.input_wrapper}>
              <br />
              <div className={styles.label_wrapper}>
                <label className="label">
                  To see <b>deactivate</b>, and <b>delete</b> delete options we
                  need to make sure that it is you who is requesting this
                  change.
                </label>
              </div>
              <InputPassword
                type="password"
                ref={passwordRef}
                className="input"
                placeholder="Current password"
                value={password}
                dispatch={discharge}
                actionType="SET_AND_VALIDATE_PASSWORD"
              />
              <span className="error-message">{errorValidatedUser}</span>
            </div>
            <button
              disabled={password === '' ? true : false}
              className={`btn ${styles.action_button}`}
              onClick={onValidatePassword}
            >
              {loadingValidatedUser ? <Spinner></Spinner> : 'Validate Password'}
            </button>
          </>
        ) : (
          <>
            {isDeactivateOpen && (
              <Modal setIsOpen={setIsDeactivateOpen}>
                <div className="modal">
                  <p className="modal-text">
                    Are you sure you want to deactivate your account?
                  </p>
                  <div className="flex-box">
                    <button
                      className="btn modal-button red"
                      onClick={onDeactivateHandler}
                    >
                      {loadingUpdatedUser ? (
                        <Spinner></Spinner>
                      ) : (
                        'Deactivate Account'
                      )}
                    </button>
                    {errorUpdatedUser && (
                      <span className="error-message display-block">
                        {errorUpdatedUser}
                      </span>
                    )}
                  </div>
                </div>
              </Modal>
            )}
            {isDeleteOpen && (
              <Modal setIsOpen={setIsDeleteOpen}>
                <div className="modal">
                  <p className="modal-text">
                    Are you sure you want to delete your account? This action is
                    irreversible.
                  </p>
                  <div className="flex-box">
                    <button
                      className="btn modal-button red"
                      onClick={onDeleteHandler}
                    >
                      {loadingDeletedUser ? (
                        <Spinner></Spinner>
                      ) : (
                        'Delete Account'
                      )}
                    </button>
                    {errorDeletedUser && (
                      <span className="error-message display-block">
                        {errorDeletedUser}
                      </span>
                    )}
                  </div>
                </div>
              </Modal>
            )}
            <ul className={styles.list}>
              <li className={styles.list_item}>
                <p className={styles.info_text}>
                  If you temporarily disable your account, your profile, and
                  photos will be hidden until you reactivate it by logging back
                  in. You will also be logged out as soon as you select this
                  option.
                </p>
                <button
                  className={`btn ${styles.sensitive_button}`}
                  onClick={() => setIsDeactivateOpen(true)}
                >
                  Deactivate Account
                </button>
              </li>
              <li className={styles.list_item}>
                <p className={styles.info_text}>
                  When you delete your account, your profile, photos, and
                  favorites will be permanently removed. If you'd just like to
                  take a break, you can temporarily deactivate your account
                  instead.
                </p>
                <button
                  className={`btn ${styles.sensitive_button}`}
                  onClick={() => setIsDeleteOpen(true)}
                >
                  Delete Account
                </button>
              </li>
            </ul>
          </>
        )}
        <button
          className={`btn ${styles.logout_button}`}
          onClick={() => dispatch(resetSignin())}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
