import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BsChevronCompactDown, BsChevronCompactUp } from 'react-icons/bs';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import {
  adminGroupUpdate,
  resetAdminGroupUpdate
} from '../../../slices/admin/adminGroupUpdateSlice';
import Spinner from '../../../components/Spinner/Spinner';
import {
  adminGroupDelete,
  resetAdminGroupDelete
} from '../../../slices/admin/adminGroupDeleteSlice';
import {
  adminUsersGet,
  resetAdminUsersGet
} from '../../../slices/admin/adminUsersGetSlice';

export default function Group({ group, experienceId }) {
  const [groupId, setGroupId] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [registrationEndDate, setRegistrationEndDate] = useState(new Date());
  const [dateText, setDateText] = useState('');
  const [price, setPrice] = useState(0);
  const [thriveCartScriptId, setThriveCartScriptId] = useState('');
  const [capacity, setCapacity] = useState(0);
  const [description, setDescription] = useState('');
  const [groupLeadId, setGroupLeadId] = useState('');
  const [groupLeadName, setGroupLeadName] = useState('');
  const [goingUsers, setGoingUsers] = useState([]);
  const [interestedUsers, setInterestedUsers] = useState([]);

  const [isGroupVisible, setIsGroupVisible] = useState(false);

  const [usersOptions, setUsersOptions] = useState([]);

  const adminGroupUpdateSlice = useSelector(
    (state) => state.adminGroupUpdateSlice
  );
  const {
    loading: updatedLoading,
    group: updatedGroup,
    error: updatedError
  } = adminGroupUpdateSlice;

  const adminGroupDeleteSlice = useSelector(
    (state) => state.adminGroupDeleteSlice
  );
  const {
    loading: deletedLoading,
    group: deletedGroup,
    error: deletedError
  } = adminGroupDeleteSlice;

  const adminUsersGetSlice = useSelector((state) => state.adminUsersGetSlice);
  const { users } = adminUsersGetSlice;

  const dispatch = useDispatch();

  useEffect(() => {
    if (!users) {
      dispatch(adminUsersGet({}));
    } else {
      setUsersOptions(
        users.map((user) => ({
          value: user._id,
          label: user._id
        }))
      );
    }
  }, [dispatch, users]);

  useEffect(() => {
    if (group) {
      setGroupId(group._id);
      setIsActive(group.isActive);
      setStartDate(new Date(group.startDate));
      setEndDate(new Date(group.endDate));
      setRegistrationEndDate(new Date(group.registrationEndDate));
      setDateText(group.dateText);
      setPrice(group.price);
      setThriveCartScriptId(group.thriveCartScriptId);
      setCapacity(group.capacity);
      setDescription(group.description);
      setGroupLeadId(
        group.groupLead
          ? { label: group.groupLead._id, value: group.groupLead._id }
          : {}
      );
      setGroupLeadName(group.groupLead ? group.groupLead.firstName : '');
      setGoingUsers(
        group.goingUsers.map((goingUser) => ({
          value: goingUser._id,
          label: goingUser._id
        }))
      );
      setInterestedUsers(
        group.interestedUsers.map((interestedUser) => ({
          value: interestedUser._id,
          label: interestedUser._id
        }))
      );
    }
  }, [group]);

  // Cleanup
  useEffect(() => {
    return () => {
      dispatch(resetAdminUsersGet());
      dispatch(resetAdminGroupUpdate());
      dispatch(resetAdminGroupDelete());
    };
  }, [dispatch]);

  const handleSaveExperienceClick = () => {
    dispatch(
      adminGroupUpdate({
        groupId,
        groupData: {
          isActive,
          startDate,
          endDate,
          registrationEndDate,
          dateText,
          price,
          thriveCartScriptId,
          capacity,
          description,
          groupLead: groupLeadId.value,
          goingUsers:
            goingUsers.length > 0
              ? encodeURIComponent(goingUsers.map((user) => user.value))
              : 'empty',
          interestedUsers:
            interestedUsers.length > 0
              ? encodeURIComponent(interestedUsers.map((user) => user.value))
              : 'empty'
        }
      })
    );
  };

  const handleDeleteGroupClick = () => {
    if (window.confirm('Are you sure you want to delete this group')) {
      dispatch(adminGroupDelete({ experienceId, groupId }));
    }
  };

  return (
    <>
      <button
        className="admin-dropdown-button"
        onClick={() => setIsGroupVisible((prevValue) => !prevValue)}
      >
        {groupLeadName ? `${groupLeadName}'s group` : `Group Id: ${groupId}`}
        {isGroupVisible ? <BsChevronCompactUp /> : <BsChevronCompactDown />}
      </button>

      {isGroupVisible && (
        <div>
          <div>
            <button
              className="admin-action-button"
              onClick={handleSaveExperienceClick}
            >
              {updatedLoading ? <Spinner /> : 'Save Group'}
            </button>{' '}
            <button
              className="admin-action-button danger"
              onClick={handleDeleteGroupClick}
            >
              {deletedLoading ? <Spinner /> : 'Delete Group'}
            </button>
          </div>
          {updatedError && (
            <span className="error-message">{updatedError}</span>
          )}
          {updatedGroup && (
            <span className="success-message">Experience updated.</span>
          )}
          {deletedError && (
            <span className="error-message">{deletedError}</span>
          )}
          {deletedGroup && (
            <span className="success-message">Group deleted.</span>
          )}
          <div className="admin-input-box-wrapper-group">
            Id: {groupId}
            <div className="admin-input-box">
              <label>isActive</label>
              <select
                value={isActive}
                onChange={(e) => setIsActive(e.target.value)}
                className="selectbox admin-selectbox"
              >
                <option value={true}>True</option>
                <option value={false}>False</option>
              </select>
            </div>
            <div className="admin-input-box">
              <label>Start Date</label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
            </div>
            <div className="admin-input-box">
              <label>End Date</label>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
              />
            </div>
            <div className="admin-input-box">
              <label>Registration End Date</label>
              <DatePicker
                selected={registrationEndDate}
                onChange={(date) => setRegistrationEndDate(date)}
              />
            </div>
            <div className="admin-input-box">
              <label>Date Text</label>
              <input
                className="input"
                value={dateText}
                onChange={(e) => setDateText(e.target.value)}
              />
            </div>
            <div className="admin-input-box">
              <label>Price</label>
              <input
                className="input"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="admin-input-box">
              <label>Thrivecart Script Id</label>
              <input
                className="input"
                value={thriveCartScriptId}
                onChange={(e) => setThriveCartScriptId(e.target.value)}
              />
            </div>
            <div className="admin-input-box">
              <label>Capacity</label>
              <input
                className="input"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
              />
            </div>
            <div className="admin-input-box">
              <label>Description</label>
              <input
                className="input"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="admin-input-box">
              <label>Group Lead ID</label>
              <Select
                value={groupLeadId}
                onChange={(e) => setGroupLeadId(e)}
                options={usersOptions}
              />
            </div>
            <div className="admin-input-box">
              <label>Going Users</label>
              <Select
                isMulti
                defaultValue={goingUsers}
                onChange={(e) => setGoingUsers(e)}
                options={usersOptions}
              />
            </div>
            <div className="admin-input-box">
              <label>Interested Users</label>
              <Select
                isMulti
                defaultValue={interestedUsers}
                onChange={(e) => setInterestedUsers(e)}
                options={usersOptions}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
