import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { experiencesGet } from '../../../slices/experience/experiencesGetSlice';
import AdminExperiencePage from '../AdminExperiencePage';

export default function AdminExperiencesList() {
  const [experienceId, setExperienceId] = useState(null); // 0 means no active experience

  const experiencesGetSlice = useSelector((state) => state.experiencesGetSlice);
  const { experiences } = experiencesGetSlice;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(experiencesGet({}));
  }, [dispatch]);

  return (
    <div>
      {experienceId && (
        <div>
          <button
            className="admin-back-button"
            onClick={() => setExperienceId(null)}
          >
            Back
          </button>
          <AdminExperiencePage
            experienceId={experienceId}
          ></AdminExperiencePage>
        </div>
      )}
      {!experienceId && experiences && (
        <table className="admin-table">
          <thead>
            <th>Experience Id</th>
            <th>Name</th>
            <th>Continent</th>
            <th>Location</th>
            <th>Duration</th>
            <th>Deposit</th>
          </thead>
          <tbody>
            {experiences.map((experience) => (
              <tr onClick={() => setExperienceId(experience._id)}>
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
      )}
    </div>
  );
}
