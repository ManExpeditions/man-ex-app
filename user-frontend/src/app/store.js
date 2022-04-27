import { configureStore } from '@reduxjs/toolkit';
import adminGroupCreateSlice from '../slices/admin/adminGroupCreateSlice';
import adminExperienceCreateSlice from '../slices/admin/adminExperienceCreateSlice';
import photoUploadSlice from '../slices/assets/photoUploadSlice';
import emailRegisterSlice from '../slices/auth/emailRegisterSlice';
import signinSlice from '../slices/auth/signinSlice';
import experienceGetSlice from '../slices/experience/experienceGetSlice';
import experiencesGetSlice from '../slices/experience/experiencesGetSlice';
import locationSlice from '../slices/services/locationSlice';
import userDeleteSlice from '../slices/user/userDeleteSlice';
import userUpdateSlice from '../slices/user/userUpdateSlice';
import userValidateSlice from '../slices/user/userValidateSlice';
import verificationCodeSlice from '../slices/user/verificationCodeSlice';
import verifySlice from '../slices/user/verifySlice';
import adminExperienceUpdateSlice from '../slices/admin/adminExperienceUpdateSlice';
import adminGroupUpdateSlice from '../slices/admin/adminGroupUpdateSlice';
import adminExperienceDeleteSlice from '../slices/admin/adminExperienceDeleteSlice';
import adminGroupDeleteSlice from '../slices/admin/adminGroupDeleteSlice';
import userGetProfileSlice from '../slices/user/userGetProfileSlice';
import adminUsersGetSlice from '../slices/admin/adminUsersGetSlice';
import adminUserGetSlice from '../slices/admin/adminUserGetSlice';
import groupInterestedUserSlice from '../slices/group/groupInterestedUserSlice';
import experienceInterestedUserSlice from '../slices/experience/experienceInterestedUserSlice';
import userAddToFavoritesSlice from '../slices/user/userAddToFavoritesSlice';
import userRemoveFromFavoritesSlice from '../slices/user/userRemoveFromFavoritesSlice';
import adminOrdersGetSlice from '../slices/admin/adminOrdersGetSlice';

export const store = configureStore({
  preloadedState: {
    signinSlice: {
      user: localStorage.getItem('user')
        ? JSON.parse(localStorage.getItem('user'))
        : null
    }
  },
  reducer: {
    emailRegisterSlice: emailRegisterSlice,
    signinSlice: signinSlice,
    verifySlice: verifySlice,
    verificationCodeSlice: verificationCodeSlice,
    userUpdateSlice: userUpdateSlice,
    userValidateSlice: userValidateSlice,
    userDeleteSlice: userDeleteSlice,
    userGetProfileSlice: userGetProfileSlice,
    locationSlice: locationSlice,
    photoUploadSlice: photoUploadSlice,
    experiencesGetSlice: experiencesGetSlice,
    experienceGetSlice: experienceGetSlice,
    adminExperienceCreateSlice: adminExperienceCreateSlice,
    adminGroupCreateSlice: adminGroupCreateSlice,
    adminExperienceUpdateSlice: adminExperienceUpdateSlice,
    adminExperienceDeleteSlice: adminExperienceDeleteSlice,
    adminGroupUpdateSlice: adminGroupUpdateSlice,
    adminGroupDeleteSlice: adminGroupDeleteSlice,
    adminUsersGetSlice: adminUsersGetSlice,
    adminUserGetSlice: adminUserGetSlice,
    adminOrdersGetSlice: adminOrdersGetSlice,
    groupInterestedUserSlice: groupInterestedUserSlice,
    experienceInterestedUserSlice: experienceInterestedUserSlice,
    userAddToFavoritesSlice: userAddToFavoritesSlice,
    userRemoveFromFavoritesSlice: userRemoveFromFavoritesSlice
  }
});
