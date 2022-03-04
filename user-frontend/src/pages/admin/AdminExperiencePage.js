import React, { useEffect, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { useDispatch, useSelector } from 'react-redux';
import {
  experienceGet,
  resetExperienceGet
} from '../../slices/experience/experienceGetSlice';
import Group from './components/Group';
import {
  adminGroupCreate,
  resetAdminGroupCreate
} from '../../slices/admin/adminGroupCreateSlice';
import Spinner from '../../components/Spinner/Spinner';

export default function AdminExperiencePage({ experienceId }) {
  // Experience states
  const [id, setId] = useState(true);
  const [isActive, setIsActive] = useState(true);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [numberOfDays, setNumberOfDays] = useState(0);
  const [location, setLocation] = useState('');
  const [continent, setContinent] = useState('');
  const [season, setSeason] = useState('');
  const [pricing, setPricing] = useState(0);
  const [deposit, setDeposit] = useState(0);
  const [videoThumbnailImage, setVideoThumbnailImage] = useState('');
  const [video, setVideo] = useState('');
  const [heroImage, setHeroImage] = useState('');
  const [groups, setGroups] = useState([]);

  const experienceGetSlice = useSelector((state) => state.experienceGetSlice);
  const { experience } = experienceGetSlice;

  const adminGroupCreateSlice = useSelector(
    (state) => state.adminGroupCreateSlice
  );
  const { loading, adminGroup, error } = adminGroupCreateSlice;

  const dispatch = useDispatch();
  useEffect(() => {
    if (!experience) {
      dispatch(experienceGet(experienceId));
    } else {
      setId(experience._id);
      setIsActive(experience.isActive);
      setName(experience.name);
      setDescription(experience.description);
      setNumberOfDays(experience.numberOfDays);
      setLocation(experience.location);
      setContinent(experience.continent);
      setSeason(experience.season);
      setPricing(experience.pricing);
      setDeposit(experience.deposit);
      setVideoThumbnailImage(experience.videoThumbnailImage);
      setVideo(experience.video);
      setHeroImage(experience.heroImage);
      setGroups(experience.groups);
    }
  }, [dispatch, experienceId, experience, adminGroup]);

  // When admin group is created, fetch experience again
  useEffect(() => {
    if (adminGroup) {
      dispatch(resetAdminGroupCreate());
      dispatch(experienceGet(experienceId));
    }
  }, [experienceId, dispatch, adminGroup]);

  // Cleanup when component is lifted
  useEffect(() => {
    return () => {
      dispatch(resetExperienceGet());
      dispatch(resetAdminGroupCreate());
    };
  }, [dispatch]);

  return (
    <div>
      <div className="admin-input-box-wrapper">
        <h1>Experience Id: {id}</h1>
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
          <label>Description</label>
          <TextareaAutosize
            className="input"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="admin-input-box">
          <label>Number of days</label>
          <input
            className="input"
            type="number"
            value={numberOfDays}
            onChange={(e) => setNumberOfDays(e.target.value)}
          />
        </div>
        <div className="admin-input-box">
          <label>Location</label>
          <input
            className="input"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div className="admin-input-box">
          <label>Continent</label>
          <input
            className="input"
            value={continent}
            onChange={(e) => setContinent(e.target.value)}
          />
        </div>
        <div className="admin-input-box">
          <label>Season</label>
          <input
            className="input"
            value={season}
            onChange={(e) => setSeason(e.target.value)}
          />
        </div>
        <div className="admin-input-box">
          <label>Pricing</label>
          <input
            className="input"
            value={pricing}
            onChange={(e) => setPricing(e.target.value)}
          />
        </div>

        <div className="admin-input-box">
          <label>Deposit</label>
          <input
            className="input"
            value={deposit}
            onChange={(e) => setDeposit(e.target.value)}
          />
        </div>
        <div className="admin-input-box">
          <label>Video Thumbnail Image</label>
          <input
            className="input"
            value={videoThumbnailImage}
            onChange={(e) => setVideoThumbnailImage(e.target.value)}
          />
        </div>
        <div className="admin-input-box">
          <label>Video Url</label>
          <input
            className="input"
            value={video}
            onChange={(e) => setVideo(e.target.value)}
          />
        </div>
        <div className="admin-input-box">
          <label>Hero Image</label>
          <input
            className="input"
            value={heroImage}
            onChange={(e) => setHeroImage(e.target.value)}
          />
        </div>
      </div>
      <div className="flex-box space-between align-center">
        <h1>Groups</h1>
        <span className="error-message">{error}</span>
        <div>
          <button
            onClick={() => dispatch(adminGroupCreate(experienceId))}
            className="admin-action-button"
          >
            {loading ? <Spinner /> : 'Create Group'}
          </button>
        </div>
      </div>
      {groups.length > 0 && (
        <div>
          {groups.map((group, groupIdx) => (
            <Group key={groupIdx} group={group} />
          ))}
        </div>
      )}
    </div>
  );
}
