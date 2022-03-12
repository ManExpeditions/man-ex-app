import { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import UserDao from '../../dao/users/userDao';
import { isAdmin } from '../../middleware/adminMiddleware';
import { isAuthenticated } from '../../middleware/authMiddleware';

/**
 * @api {get} admin/v1/user Get users
 * @apiDescription Get all users
 * @apiPermission Authentication Admin
 * @apiVersion 1.0.0
 * @apiName GetUsers
 * @apiGroup Admin
 */
export const usersGetController = [
  isAuthenticated,
  isAdmin,
  expressAsyncHandler(async function (req: Request, res: Response) {
    // Find all users
    const users = await UserDao.getUsers();

    res.status(200).json(users);
    return;
  })
];
