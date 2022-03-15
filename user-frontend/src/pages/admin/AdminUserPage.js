import React, { useEffect, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import {
  adminUserGet,
  resetAdminUserGet
} from '../../slices/admin/adminUserGetSlice';

export default function AdminUserPage({ userId, setSubPage }) {
  // Experience states
  const [id, setId] = useState(true);
  const [isActive, setIsActive] = useState(true);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [emailVerified, setEmailVerified] = useState(0);
  const [phoneVerified, setPhoneVerified] = useState(0);
  const [gender, setGender] = useState('');
  const [language, setLanguage] = useState('');
  const [interests, setInterests] = useState([]);
  const [continents, setContinents] = useState([]);
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [profilepic, setProfilepic] = useState('');
  const [profilepicVerified, setProfilepicVerified] = useState('');
  const [authType, setAuthType] = useState('');
  const [completedOnboarding, setCompletedOnboarding] = useState('');
  const [adminUser, setAdminUser] = useState('');

  const [bio, setBio] = useState('');

  const adminUserGetSlice = useSelector((state) => state.adminUserGetSlice);
  const { user } = adminUserGetSlice;

  const dispatch = useDispatch();
  useEffect(() => {
    if (!user) {
      dispatch(adminUserGet(userId));
    } else {
      setId(user._id);
      setIsActive(user.isActive);
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setBio(user.bio);
      setEmail(user.email);
      setPhone(user.phone);
      setEmailVerified(user.emailVerified);
      setPhoneVerified(user.phoneVerified);
      setGender(user.gender);
      setLanguage(user.language);
      setInterests(user.interests);
      setContinents(user.continents);
      setCity(user.city);
      setState(user.state);
      setProfilepic(user.profilepic);
      setProfilepicVerified(user.profilepicVerified);
      setAuthType(user.authType);
      setCompletedOnboarding(user.completedOnboarding);
      setAdminUser(user.adminUser);
    }
  }, [dispatch, user, userId]);

  // Cleanup when component is lifted
  useEffect(() => {
    return () => {
      dispatch(resetAdminUserGet());
    };
  }, [dispatch]);

  return (
    <div>
      <button
        className="admin-back-button"
        onClick={() => setSubPage({ path: 'users' })}
      >
        Back
      </button>
      <>
        <div className="admin-input-box-wrapper">
          <div className="flex-box space-between">
            <div>
              <h1>User Id: {id}</h1>
            </div>
          </div>
          <div className="admin-input-box">
            <label>isActive</label>
            <select
              disabled
              value={isActive}
              onChange={(e) => setIsActive(e.target.value)}
              className="selectbox admin-selectbox"
            >
              <option value={true}>True</option>
              <option value={false}>False</option>
            </select>
          </div>
          <div className="admin-input-box">
            <label>First Name</label>
            <input
              disabled
              className="input"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="admin-input-box">
            <label>Last Name</label>
            <input
              disabled
              className="input"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="admin-input-box">
            <label>Email</label>
            <input
              disabled
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="admin-input-box">
            <label>Phone</label>
            <input
              disabled
              className="input"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="admin-input-box">
            <label>Email Verified</label>
            <select
              disabled
              value={emailVerified}
              onChange={(e) => setEmailVerified(e.target.value)}
              className="selectbox admin-selectbox"
            >
              <option value={true}>True</option>
              <option value={false}>False</option>
            </select>
          </div>
          <div className="admin-input-box">
            <label>Phone Verified</label>
            <select
              disabled
              value={phoneVerified}
              onChange={(e) => setPhoneVerified(e.target.value)}
              className="selectbox admin-selectbox"
            >
              <option value={true}>True</option>
              <option value={false}>False</option>
            </select>
          </div>
          <div className="admin-input-box">
            <label>Gender</label>
            <select
              disabled
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="selectbox admin-selectbox"
            >
              <option value={'Male'}>Male</option>
              <option value={'Female'}>Female</option>
              <option value={'Non-binary'}>Non-binary</option>
              <option value={'Other'}>Other</option>
            </select>
          </div>
          <div className="admin-input-box">
            <label>Language</label>
            <select
              disabled
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="selectbox admin-selectbox"
            >
              <option value={'English'}>English</option>
              <option value={'Spanish'}>Spanish</option>
              <option value={'Portuguese'}>Portuguese</option>
            </select>
          </div>
          <div className="admin-input-box">
            <label>Interests</label>
            <Select
              isDisabled={true}
              isMulti
              value={interests.map((interest) => ({
                value: interest,
                label: interest
              }))}
            />
          </div>
          <div className="admin-input-box">
            <label>Continents</label>
            <Select
              isDisabled={true}
              isMulti
              value={continents.map((continent) => ({
                value: continent,
                label: continent
              }))}
            />
          </div>
          <div className="admin-input-box">
            <label>City</label>
            <input
              disabled
              className="input"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div className="admin-input-box">
            <label>State</label>
            <input
              disabled
              className="input"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
          </div>
          <div className="admin-input-box">
            <label>Profile Picture</label>
            <input
              disabled
              className="input"
              value={profilepic}
              onChange={(e) => setProfilepic(e.target.value)}
            />
          </div>
          <div className="admin-input-box">
            <label>Profile Picture Verified</label>
            <select
              disabled
              value={profilepicVerified}
              onChange={(e) => setProfilepicVerified(e.target.value)}
              className="selectbox admin-selectbox"
            >
              <option value={true}>True</option>
              <option value={false}>False</option>
            </select>
          </div>
          <div className="admin-input-box">
            <label>Auth Type</label>
            <select
              disabled
              value={authType}
              onChange={(e) => setAuthType(e.target.value)}
              className="selectbox admin-selectbox"
            >
              <option value={'email'}>Email</option>
              <option value={'facebook'}>Facebook</option>
            </select>
          </div>
          <div className="admin-input-box">
            <label>Profile Picture</label>
            <input
              disabled
              className="input"
              value={profilepic}
              onChange={(e) => setProfilepic(e.target.value)}
            />
          </div>
          <div className="admin-input-box">
            <label>Completed Onboarding</label>
            <select
              disabled
              value={completedOnboarding}
              onChange={(e) => setCompletedOnboarding(e.target.value)}
              className="selectbox admin-selectbox"
            >
              <option value={true}>True</option>
              <option value={false}>False</option>
            </select>
          </div>
          <div className="admin-input-box">
            <label>Admin User</label>
            <select
              disabled
              value={adminUser}
              onChange={(e) => setAdminUser(e.target.value)}
              className="selectbox admin-selectbox"
            >
              <option value={true}>True</option>
              <option value={false}>False</option>
            </select>
          </div>
          <div className="admin-input-box">
            <label>Bio</label>
            <TextareaAutosize
              disabled
              className="input"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>
        </div>
      </>
    </div>
  );
}
