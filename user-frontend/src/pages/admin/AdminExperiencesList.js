import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../../components/Spinner/Spinner';
import {
  adminExperienceCreate,
  resetAdminExperienceCreate
} from '../../slices/admin/adminExperienceCreateSlice';
import { experiencesGet } from '../../slices/experience/experiencesGetSlice';

export default function AdminExperiencesList({ setSubPage }) {
  const experiencesGetSlice = useSelector((state) => state.experiencesGetSlice);
  const { experiences } = experiencesGetSlice;

  const adminExperienceCreateSlice = useSelector(
    (state) => state.adminExperienceCreateSlice
  );
  const { loading, adminExperience, error } = adminExperienceCreateSlice;

  const dispatch = useDispatch();
  useEffect(() => {
    if (adminExperience) {
      dispatch(resetAdminExperienceCreate());
    }
    dispatch(experiencesGet({}));
  }, [dispatch, adminExperience]);

  // Cleanup
  useEffect(() => {
    return () => {
      dispatch(resetAdminExperienceCreate());
    };
  }, [dispatch]);

  return (
    <div>
      {experiences && (
        <>
          <div className="flex-box space-between">
            <button
              onClick={() => dispatch(adminExperienceCreate({}))}
              className="admin-action-button"
            >
              {loading ? <Spinner /> : 'Create Experience'}
            </button>
            <span className="error-message">{error}</span>
          </div>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Experience Id</th>
                <th>Name</th>
                <th>Continent</th>
                <th>Location</th>
                <th>Duration</th>
                <th>Deposit</th>
              </tr>
            </thead>
            <tbody>
              {experiences.map((experience, experienceIdx) => (
                <tr
                  key={experienceIdx}
                  onClick={() =>
                    setSubPage({
                      path: 'experience',
                      props: {
                        experienceId: experience._id
                      }
                    })
                  }
                >
                  <td> {experience._id}</td>
                  <td>{experience.name}</td>
                  <td>{experience.continent}</td>
                  <td>{experience.description}</td>
                  <td>{experience.numberOfDays} days</td>
                  <td>${experience.deposit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
