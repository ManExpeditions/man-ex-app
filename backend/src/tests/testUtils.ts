/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import supertest from 'supertest';
import generateToken from '../lib/jwt';
import experienceDao from '../dao/experiences/experienceDao';
import groupDao from '../dao/groups/groupDao';
import { randomInt } from 'crypto';
// Create interface to be able to index superTest dynamically

export interface SupertestIndex extends supertest.SuperTest<supertest.Test> {
  [key: string]: any;
}

export const getUser = (
  admin = false
): {
  user_id: mongoose.Types.ObjectId;
  user_email: string;
  user_pass: string;
  user_pass_encrypted: string;
  user_phone: string;
  user_admin: boolean;
  user_token: string;
} => {
  const userId = mongoose.Types.ObjectId();
  return {
    user_id: userId,
    user_email: `john${randomInt(10)}@example.com`,
    user_pass: 'CyKHe3kR',
    user_pass_encrypted: bcrypt.hashSync('CyKHe3kR', 8),
    user_phone: '+16289462243',
    user_admin: admin,
    user_token: generateToken({ id: userId, adminUser: admin })
  };
};

export const createGroup = async (
  experienceId: mongoose.Types.ObjectId,
  groupId: mongoose.Types.ObjectId
) => {
  const experience = await experienceDao.createNewExperience(experienceId);
  const group = await groupDao.createNewGroup(String(experience?._id), groupId);
  return group;
};
