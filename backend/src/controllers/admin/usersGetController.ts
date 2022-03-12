import { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import UserDao from '../../dao/users/userDao';

/**
 * @api {get} admin/v1/user Get users
 * @apiDescription Get all users
 * @apiPermission Authentication Admin
 * @apiVersion 1.0.0
 * @apiName GetUsers
 * @apiGroup Admin
 */
export const usersGetController = [
  expressAsyncHandler(async function (req: Request, res: Response) {
    // Find all users
    const users = await UserDao.getUsers();

    res.status(200).json(users);
    return;
  })
];
