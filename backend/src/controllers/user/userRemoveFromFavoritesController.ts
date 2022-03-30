import { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { body, param, query, validationResult } from 'express-validator';
import logger from '../../lib/logger';
import userDao from '../../dao/users/userDao';
import { isAuthenticated } from '../../middleware/authMiddleware';
import { isValidObjectId } from 'mongoose';
import experienceDao from '../../dao/experiences/experienceDao';
import groupDao from '../../dao/groups/groupDao';

/**
 * @api {patch} /user/v1/:id/favorites/remove Remove favorites from user
 * @apiDescription Remove experiences, groups and members as favorites from a user
 * @apiPermission Authentication
 * @apiVersion 1.0.0
 * @apiName removeFromFavorites
 * @apiGroup User
 *
 * @apiParam {String} id Users unique ID.
 *
 * @apiQuery {String} type Should be one of: experience, group, member
 *
 * @apiBody {String} id The id of the experience, group, or member to favorite
 *
 * @apiSuccess {Object} User.
 *
 * @apiError UserDoesNotExist Cannot signin user that does not exist.
 * @apiError InvalidVerificationCode Cannot verify incorrect code.
 */
export const userRemoveFromFavoritesController = [
  // Requires user to be authenticated
  isAuthenticated,

  // Validate params
  param('id', 'Id param must be a string').isString().escape(),

  // Validate query params
  query(
    'type',
    'Invalid value for query param type: type must be one of: experience, group, or member'
  )
    .isString()
    .isIn(['experience', 'group', 'member'])
    .escape(),

  // Sanitize and validate body params
  body('id', 'Enter valid id').isString(),

  expressAsyncHandler(async function (req: Request, res: Response) {
    // Find the validation errors from the request.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.error(errors);
      res.status(404).json(errors);
      return;
    }

    // Check if id is valid
    const id = req.body.id;
    if (!isValidObjectId(id)) {
      const err = new Error('Id is not valid');
      logger.error(err.message);
      res.status(404).json({ message: err.message });
      return;
    }

    // Check if user does not exist
    const userId = req.params.id;
    const user = await userDao.findUserById(userId);
    if (!user) {
      const err = new Error(
        `User not found: User with id ${req.params.id} not found.`
      );
      logger.error(err.message);
      res.status(404).json({ message: err.message });
      return;
    }

    const type = req.query.type;

    if (type === 'experience') {
      // Check if experience does not exist
      const experience = await experienceDao.findExperienceById(id);
      if (!experience) {
        const err = new Error('Experience does not exist.');
        logger.error(err.message);
        res.status(404).json({ message: err.message });
        return;
      }
      // Check the experience does not already exist in the favorites
      const experienceExists = userDao.experienceExistsInFavorites(id, user);
      if (!experienceExists) {
        const err = new Error('Experience does not exist in favorites.');
        logger.error(err.message);
        res.status(404).json({ message: err.message });
        return;
      }
      // Add the experience to favorites
      await userDao.removeExperienceFromFavorites(id, user);
    } else if (type === 'group') {
      // Check if group does not exist
      const group = await groupDao.findGroupById(id);
      if (!group) {
        const err = new Error('Group does not exist.');
        logger.error(err.message);
        res.status(404).json({ message: err.message });
        return;
      }
      // Check the group does not already exist in the favorites
      const groupExists = userDao.groupExistsInFavorites(id, user);
      if (!groupExists) {
        const err = new Error('Group does not exist in favorites.');
        logger.error(err.message);
        res.status(404).json({ message: err.message });
        return;
      }
      // Add the group to favorites
      await userDao.removeGroupFromFavorites(id, user);
    } else if (type === 'member') {
      // Check if member does not exist
      const member = await userDao.findUserById(id);
      if (!member) {
        const err = new Error('Member does not exist.');
        logger.error(err.message);
        res.status(404).json({ message: err.message });
        return;
      }
      // Check the member does not already exist in the favorites
      const memberExists = userDao.memberExistsInFavorites(id, user);
      if (!memberExists) {
        const err = new Error('Member does not exist in favorites.');
        logger.error(err.message);
        res.status(404).json({ message: err.message });
        return;
      }
      // Add the experience to favorites
      await userDao.removeMemberFromFavorites(id, user);
    }
    const updatedUser = await userDao.findUserByIdAndPopulate(userId);
    res.status(200).json({
      id: updatedUser?._id,
      isActive: updatedUser?.isActive,
      firstName: updatedUser?.firstName,
      lastName: updatedUser?.lastName,
      email: updatedUser?.email,
      phone: updatedUser?.phone,
      emailVerified: updatedUser?.emailVerified,
      phoneVerified: updatedUser?.phoneVerified,
      gender: updatedUser?.gender,
      language: updatedUser?.language,
      interests: updatedUser?.interests,
      continents: updatedUser?.continents,
      city: updatedUser?.city,
      state: updatedUser?.state,
      country: updatedUser?.country,
      profilepic: updatedUser?.profilepic,
      profilepicVerified: updatedUser?.profilepicVerified,
      verificationProfilepic: updatedUser?.verificationProfilepic,
      bio: updatedUser?.bio,
      socials: updatedUser?.socials,
      authType: updatedUser?.authType,
      completedOnboarding: updatedUser?.completedOnboarding,
      favorites: updatedUser?.favorites,
      adminUser: updatedUser?.adminUser
    });
    return;
  })
];
