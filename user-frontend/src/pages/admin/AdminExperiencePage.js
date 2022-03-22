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
import {
  adminExperienceUpdate,
  resetAdminExperienceUpdate
} from '../../slices/admin/adminExperienceUpdateSlice';
import {
  adminExperienceDelete,
  resetAdminExperienceDelete
} from '../../slices/admin/adminExperienceDeleteSlice';
import MessageBox from '../../components/MessageBox/MessageBox';
import { SelectBoxContinents } from '../../components/SelectBox/SelectBox';

export default function AdminExperiencePage({ experienceId, setSubPage }) {
  // Experience states
  const [id, setId] = useState(true);
  const [isActive, setIsActive] = useState(true);
  const [isFeatured, setIsFeautured] = useState(true);
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
  const [images, setImages] = useState(['']);
  const [itinerary, setItinerary] = useState([
    { day: 0, image: '', activities: [{ time: '', description: '' }] }
  ]);
  const [accomodations, setAccomodations] = useState([
    { name: '', description: '', image: '' }
  ]);
  const [activities, setActivities] = useState([
    { name: '', info: '', description: '', image: '', link: '' }
  ]);
  const [reviews, setReviews] = useState([
    { user: { _id: '' }, stars: 0, description: '' }
  ]);

  const [groups, setGroups] = useState([]);

  const experienceGetSlice = useSelector((state) => state.experienceGetSlice);
  const { experience } = experienceGetSlice;

  const adminExperienceUpdateSlice = useSelector(
    (state) => state.adminExperienceUpdateSlice
  );
  const {
    loading: updatedLoading,
    experience: updatedExperience,
    error: updatedError
  } = adminExperienceUpdateSlice;

  const adminExperienceDeleteSlice = useSelector(
    (state) => state.adminExperienceDeleteSlice
  );

  const {
    loading: deletedLoading,
    experience: deletedExperience,
    error: deletedError
  } = adminExperienceDeleteSlice;

  const adminGroupDeleteSlice = useSelector(
    (state) => state.adminGroupDeleteSlice
  );
  const { group: deletedGroup } = adminGroupDeleteSlice;

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
      setIsFeautured(experience.isFeatured);
      setName(experience.name);
      setDescription(experience.description);
      setNumberOfDays(experience.numberOfDays);
      setLocation(experience.location);
      setContinent({
        value: experience.continent,
        label: experience.continent
      });
      setSeason(experience.season);
      setPricing(experience.pricing);
      setDeposit(experience.deposit);
      setVideoThumbnailImage(experience.videoThumbnailImage);
      setVideo(experience.video);
      setHeroImage(experience.heroImage);
      setImages(JSON.parse(JSON.stringify(experience.images)));
      setGroups(experience.groups);
      setItinerary(JSON.parse(JSON.stringify(experience.itinerary))); // Make a deep copy of the object
      setAccomodations(JSON.parse(JSON.stringify(experience.accomodations)));
      setActivities(JSON.parse(JSON.stringify(experience.activities)));
      setReviews(JSON.parse(JSON.stringify(experience.reviews)));
    }
  }, [dispatch, experienceId, experience, adminGroup]);

  // When admin group is created, fetch experience again
  useEffect(() => {
    if (adminGroup) {
      dispatch(resetAdminGroupCreate());
      dispatch(experienceGet(experienceId));
    }
  }, [experienceId, dispatch, adminGroup]);

  // If experience is deleted go back
  useEffect(() => {
    if (deletedExperience) {
      window.setTimeout(() => {
        setSubPage({ path: 'experiences' });
      }, 2000);
    }
  }, [deletedExperience, setSubPage]);

  // If group is deleted, re-rerender
  useEffect(() => {
    if (deletedGroup) {
      dispatch(experienceGet(experienceId));
    }
  }, [dispatch, deletedGroup, experienceId]);

  // Cleanup when component is lifted
  useEffect(() => {
    return () => {
      dispatch(resetExperienceGet());
      dispatch(resetAdminGroupCreate());
      dispatch(resetAdminExperienceUpdate());
      dispatch(resetAdminExperienceDelete());
    };
  }, [dispatch]);

  const handleSaveExperienceClick = () => {
    dispatch(
      adminExperienceUpdate({
        experienceId: id,
        experienceData: {
          isActive,
          isFeatured,
          name,
          description,
          numberOfDays,
          location,
          continent: encodeURIComponent(continent.value),
          season,
          pricing,
          deposit,
          videoThumbnailImage: encodeURIComponent(videoThumbnailImage),
          video: encodeURIComponent(video),
          images: encodeURIComponent(JSON.stringify(images)),
          heroImage: encodeURIComponent(heroImage),
          itinerary: encodeURIComponent(JSON.stringify(itinerary)),
          accomodations: encodeURIComponent(JSON.stringify(accomodations)),
          activities: encodeURIComponent(JSON.stringify(activities)),
          reviews: encodeURIComponent(JSON.stringify(reviews))
        }
      })
    );
  };

  const handleDeleteExperienceClick = () => {
    if (window.confirm('Are you sure you want to delete this experience')) {
      dispatch(adminExperienceDelete(id));
    }
  };

  return (
    <div>
      <button
        className="admin-back-button"
        onClick={() => setSubPage({ path: 'experiences' })}
      >
        Back
      </button>
      {deletedExperience ? (
        <MessageBox variant="success">
          Deleted Experience. Redirecting...
          <div className="admin-spinner-wrapper">
            <Spinner></Spinner>{' '}
          </div>{' '}
        </MessageBox>
      ) : (
        <>
          <div className="admin-input-box-wrapper">
            <div className="flex-box space-between">
              <div>
                <h1>Experience Id: {id}</h1>
                {updatedError && (
                  <span className="error-message">{updatedError}</span>
                )}
                {updatedExperience && (
                  <span className="success-message">Experience updated.</span>
                )}
                {deletedError && (
                  <span className="error-message">{deletedError}</span>
                )}
                {deletedExperience && (
                  <span className="success-message">Experience updated.</span>
                )}
              </div>

              <div>
                <button
                  className="admin-action-button"
                  onClick={handleSaveExperienceClick}
                >
                  {updatedLoading ? <Spinner /> : 'Save Experience'}
                </button>{' '}
                <button
                  className="admin-action-button danger"
                  onClick={handleDeleteExperienceClick}
                >
                  {deletedLoading ? <Spinner /> : 'Delete Experience'}
                </button>
              </div>
            </div>
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
              <label>is Feautured</label>
              <select
                value={isFeatured}
                onChange={(e) => setIsFeautured(e.target.value)}
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
              <SelectBoxContinents
                value={continent}
                onChange={(e) => setContinent(e)}
              ></SelectBoxContinents>
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
            <div className="admin-input-box">
              <div>
                <label>Images</label>
                <br />
                <button
                  className="admin-action-button"
                  onClick={() => setImages((prevImages) => [...prevImages, ''])}
                >
                  +
                </button>{' '}
                {images.length > 0 && (
                  <button
                    className="admin-action-button danger"
                    onClick={() => {
                      const _tempImages = [...images];
                      _tempImages.pop();
                      setImages(_tempImages);
                    }}
                  >
                    -
                  </button>
                )}
              </div>
              <div className="margin-1">
                {images.map((image, imageIdx) => (
                  <input
                    key={imageIdx}
                    className="input admin-input-box"
                    value={image}
                    onChange={(e) => {
                      const _tempImages = [...images];
                      _tempImages[imageIdx] = e.target.value;
                      setImages(_tempImages);
                    }}
                  />
                ))}
              </div>
            </div>
            <div className="admin-input-box">
              <div>
                <label>Itinerary</label>
                <br />
                <button
                  className="admin-action-button"
                  onClick={() =>
                    setItinerary((prevItinerary) => [
                      ...prevItinerary,
                      { activities: [] }
                    ])
                  }
                >
                  +
                </button>{' '}
                {itinerary.length > 0 && (
                  <button
                    className="admin-action-button danger"
                    onClick={() => {
                      const _tempItinerary = [...itinerary];
                      _tempItinerary.pop();
                      setItinerary([..._tempItinerary]);
                    }}
                  >
                    -
                  </button>
                )}
              </div>
              <div className="admin-field">
                {itinerary.map((day, dayIdx) => (
                  <div key={dayIdx} className="admin-subfield">
                    <div>
                      <div className="admin-input-box">
                        <label>Day</label>
                        <input
                          className="input admin-input-box"
                          value={day.day}
                          onChange={(e) => {
                            const _tempItinerary = [...itinerary];
                            _tempItinerary[dayIdx].day = e.target.value;
                            setItinerary(_tempItinerary);
                          }}
                        />
                      </div>
                      <div className="admin-input-box">
                        <label>Image</label>
                        <input
                          className="input admin-input-box"
                          value={day.image}
                          onChange={(e) => {
                            const _tempItinerary = [...itinerary];
                            _tempItinerary[dayIdx].image = e.target.value;
                            setItinerary(_tempItinerary);
                          }}
                        />
                      </div>
                      <div className="admin-input-box">
                        <div>
                          <button
                            className="admin-action-button"
                            onClick={() => {
                              const _tempItinerary = [...itinerary];
                              _tempItinerary[dayIdx].activities.push({});
                              setItinerary(_tempItinerary);
                            }}
                          >
                            +
                          </button>{' '}
                          {day.activities.length > 1 && (
                            <button
                              className="admin-action-button danger"
                              onClick={() => {
                                const _tempItinerary = [...itinerary];
                                _tempItinerary[dayIdx].activities.pop();
                                setItinerary(_tempItinerary);
                              }}
                            >
                              -
                            </button>
                          )}
                        </div>
                        <div>
                          {day.activities.map((activity, activityIdx) => (
                            <div key={activityIdx}>
                              <div className="admin-input-box">
                                <label>Time</label>
                                <input
                                  className="input admin-input-box"
                                  value={activity.time}
                                  onChange={(e) => {
                                    const _tempItinerary = [...itinerary];
                                    _tempItinerary[dayIdx].activities[
                                      activityIdx
                                    ].time = e.target.value;
                                    setItinerary(_tempItinerary);
                                  }}
                                />
                              </div>
                              <div className="admin-input-box">
                                <label>Description</label>
                                <TextareaAutosize
                                  className="input"
                                  value={activity.description}
                                  onChange={(e) => {
                                    const _tempItinerary = [...itinerary];
                                    _tempItinerary[dayIdx].activities[
                                      activityIdx
                                    ].description = e.target.value;
                                    setItinerary(_tempItinerary);
                                  }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="admin-input-box">
              <div>
                <label>Accomodations</label>
                <br />
                <button
                  className="admin-action-button"
                  onClick={() =>
                    setAccomodations((prevAccomodations) => [
                      ...prevAccomodations,
                      { name: '', description: '', image: '' }
                    ])
                  }
                >
                  +
                </button>{' '}
                {accomodations.length > 0 && (
                  <button
                    className="admin-action-button danger"
                    onClick={() => {
                      const _tempAccomodations = [...accomodations];
                      _tempAccomodations.pop();
                      setAccomodations([..._tempAccomodations]);
                    }}
                  >
                    -
                  </button>
                )}
              </div>
              <div className="admin-field">
                {accomodations.map((accomodation, accomodationIdx) => (
                  <div className="admin-subfield" key={accomodationIdx}>
                    <div className="admin-input-box">
                      <label>Name</label>
                      <input
                        className="input admin-input-box"
                        value={accomodation.name}
                        onChange={(e) => {
                          const _tempAccomodations = [...accomodations];
                          _tempAccomodations[accomodationIdx].name =
                            e.target.value;
                          setAccomodations(_tempAccomodations);
                        }}
                      />
                    </div>
                    <div className="admin-input-box">
                      <label>Description</label>
                      <TextareaAutosize
                        className="input admin-input-box"
                        value={accomodation.description}
                        onChange={(e) => {
                          const _tempAccomodations = [...accomodations];
                          _tempAccomodations[accomodationIdx].description =
                            e.target.value;
                          setAccomodations(_tempAccomodations);
                        }}
                      />
                    </div>
                    <div className="admin-input-box">
                      <label>Image</label>
                      <input
                        className="input admin-input-box"
                        value={accomodation.image}
                        onChange={(e) => {
                          const _tempAccomodations = [...accomodations];
                          _tempAccomodations[accomodationIdx].image =
                            e.target.value;
                          setAccomodations(_tempAccomodations);
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="admin-input-box">
              <div>
                <label>Activities</label>
                <br />
                <button
                  className="admin-action-button"
                  onClick={() =>
                    setActivities((prevActivities) => [
                      ...prevActivities,
                      {
                        name: '',
                        info: '',
                        description: '',
                        image: '',
                        link: ''
                      }
                    ])
                  }
                >
                  +
                </button>{' '}
                {activities.length > 0 && (
                  <button
                    className="admin-action-button danger"
                    onClick={() => {
                      const _tempActivities = [...activities];
                      _tempActivities.pop();
                      setActivities([..._tempActivities]);
                    }}
                  >
                    -
                  </button>
                )}
              </div>
              <div className="admin-field">
                {activities.map((activity, activityIdx) => (
                  <div className="admin-subfield" key={activityIdx}>
                    <div className="admin-input-box">
                      <label>Name</label>
                      <input
                        className="input admin-input-box"
                        value={activity.name}
                        onChange={(e) => {
                          const _tempActivities = [...activities];
                          _tempActivities[activityIdx].name = e.target.value;
                          setActivities(_tempActivities);
                        }}
                      />
                    </div>
                    <div className="admin-input-box">
                      <label>Info</label>
                      <TextareaAutosize
                        className="input admin-input-box"
                        value={activity.info}
                        onChange={(e) => {
                          const _tempActivities = [...activities];
                          _tempActivities[activityIdx].info = e.target.value;
                          setActivities(_tempActivities);
                        }}
                      />
                    </div>
                    <div className="admin-input-box">
                      <label>Description</label>
                      <TextareaAutosize
                        className="input admin-input-box"
                        value={activity.description}
                        onChange={(e) => {
                          const _tempActivities = [...activities];
                          _tempActivities[activityIdx].description =
                            e.target.value;
                          setActivities(_tempActivities);
                        }}
                      />
                    </div>
                    <div className="admin-input-box">
                      <label>Image</label>
                      <input
                        className="input admin-input-box"
                        value={activity.image}
                        onChange={(e) => {
                          const _tempActivities = [...activities];
                          _tempActivities[activityIdx].image = e.target.value;
                          setActivities(_tempActivities);
                        }}
                      />
                    </div>
                    <div className="admin-input-box">
                      <label>Link</label>
                      <input
                        className="input admin-input-box"
                        value={activity.link}
                        onChange={(e) => {
                          const _tempActivities = [...activities];
                          _tempActivities[activityIdx].link = e.target.value;
                          setActivities(_tempActivities);
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="admin-input-box">
              <div>
                <label>Reviews</label>
                <br />
                <button
                  className="admin-action-button"
                  onClick={() =>
                    setReviews((prevReviews) => [
                      ...prevReviews,
                      {
                        user: { _id: '' },
                        stars: 0,
                        description: ''
                      }
                    ])
                  }
                >
                  +
                </button>{' '}
                {reviews.length > 0 && (
                  <button
                    className="admin-action-button danger"
                    onClick={() => {
                      const _tempReviews = [...reviews];
                      _tempReviews.pop();
                      setReviews([..._tempReviews]);
                    }}
                  >
                    -
                  </button>
                )}
              </div>
              <div className="admin-field">
                {reviews.map((review, reviewIdx) => (
                  <div className="admin-subfield" key={reviewIdx}>
                    <div className="admin-input-box">
                      <label>UserId</label>
                      <input
                        className="input admin-input-box"
                        value={review.user._id}
                        onChange={(e) => {
                          const _tempReviews = [...reviews];
                          _tempReviews[reviewIdx].user._id = e.target.value;
                          setReviews(_tempReviews);
                        }}
                      />
                    </div>
                    <div className="admin-input-box">
                      <label>Stars</label>
                      <select
                        className="input admin-input-box"
                        value={review.stars}
                        onChange={(e) => {
                          const _tempReviews = [...reviews];
                          _tempReviews[reviewIdx].stars = e.target.value;
                          setReviews(_tempReviews);
                        }}
                      >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>
                    </div>
                    <div className="admin-input-box">
                      <label>Description</label>
                      <TextareaAutosize
                        className="input admin-input-box"
                        value={review.description}
                        onChange={(e) => {
                          const _tempReviews = [...reviews];
                          _tempReviews[reviewIdx].description = e.target.value;
                          setReviews(_tempReviews);
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
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
                <Group
                  key={groupIdx}
                  experienceId={experienceId}
                  group={group}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
