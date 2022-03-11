import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { userGetProfile } from '../../../../slices/user/userGetProfileSlice';

export default function UserDisplayProfilePage() {
  const { id } = useParams();

  const userGetProfileSlice = useSelector((state) => state.userGetProfileSlice);
  const { userProfile } = userGetProfileSlice;

  const dispatch = useDispatch();
  useEffect(() => {
    if (!userProfile) {
      dispatch(userGetProfile(id));
    }
  }, [dispatch, id, userProfile]);

  return (
    <div>
      {userProfile && (
        <div>
          <>
            <p>Hey, I'm {userProfile.firstName}</p>
          </>
        </div>
      )}
    </div>
  );
}
