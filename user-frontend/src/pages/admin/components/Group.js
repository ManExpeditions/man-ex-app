import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BsChevronCompactDown, BsChevronCompactUp } from 'react-icons/bs';
import DatePicker from 'react-datepicker';
import {
  adminGroupUpdate,
  resetAdminGroupUpdate
} from '../../../slices/admin/adminGroupUpdateSlice';
import Spinner from '../../../components/Spinner/Spinner';

export default function Group({ group }) {
  const [groupId, setGroupId] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [registrationEndDate, setRegistrationEndDate] = useState(new Date());
  const [dateText, setDateText] = useState('');
  const [price, setPrice] = useState(0);
  const [thriveCartScriptId, setThriveCartScriptId] = useState('');
  const [capacity, setCapacity] = useState(0);
  const [description, setDescription] = useState('');
  const [groupLeadId, setGroupLeadId] = useState('');
  const [goingUsers, setGoingUsers] = useState([]);
  const [interestedUsers, setInterestedUsers] = useState([]);

  const [isGroupVisible, setIsGroupVisible] = useState(false);

  const adminGroupUpdateSlice = useSelector(
    (state) => state.adminGroupUpdateSlice
  );
  const {
    loading: updatedLoading,
    group: updatedGroup,
    error: updatedError
  } = adminGroupUpdateSlice;

  const dispatch = useDispatch();

  useEffect(() => {
    if (group) {
      setGroupId(group._id);
      setIsActive(group.isActive);
      setName(group.name);
      setStartDate(new Date(group.startDate));
      setEndDate(new Date(group.endDate));
      setRegistrationEndDate(new Date(group.registrationEndDate));
      setDateText(group.dateText);
      setPrice(group.price);
      setThriveCartScriptId(group.thriveCartScriptId);
      setCapacity(group.capacity);
      setDescription(group.description);
      setGroupLeadId(group.groupLead ? group.groupLead._id : '');
      setGoingUsers(group.goingUsers);
      setInterestedUsers(group.interestedUsers);
    }
  }, [group]);

  // Cleanup
  useEffect(() => {
    return () => {
      dispatch(resetAdminGroupUpdate());
    };
  }, [dispatch]);

  const handleSaveExperienceClick = () => {
    dispatch(
      adminGroupUpdate({
        groupId,
        groupData: {
          isActive,
          name,
          startDate,
          endDate,
          registrationEndDate,
          dateText,
          price,
          thriveCartScriptId,
          capacity,
          description,
          groupLeadId
        }
      })
    );
  };

  return (
    <>
      <button
        className="admin-dropdown-button"
        onClick={() => setIsGroupVisible((prevValue) => !prevValue)}
      >
        Group Id: {groupId}
        {isGroupVisible ? <BsChevronCompactUp /> : <BsChevronCompactDown />}
      </button>

      {isGroupVisible && (
        <div>
          <button
            className="admin-action-button"
            onClick={handleSaveExperienceClick}
          >
            {updatedLoading ? <Spinner /> : 'Save Group'}
          </button>{' '}
          {updatedError && (
            <span className="error-message">{updatedError}</span>
          )}
          {updatedGroup && (
            <span className="success-message">Experience updated.</span>
          )}
          <div className="admin-input-box-wrapper-group">
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
              <label>Name</label>
              <input
                className="input"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
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
              <input
                className="input"
                value={groupLeadId}
                onChange={(e) => setGroupLeadId(e.target.value)}
              />
            </div>
            <div className="admin-input-box">
              <label>Going Users</label>
              <input
                className="input"
                value={goingUsers}
                onChange={(e) => setGoingUsers(e.target.value)}
              />
            </div>
            <div className="admin-input-box">
              <label>Interested Users</label>
              <input
                className="input"
                value={interestedUsers}
                onChange={(e) => setInterestedUsers(e.target.value)}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
