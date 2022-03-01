/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import supertest from 'supertest';
import generateToken from '../lib/jwt';
// Create interface to be able to index superTest dynamically

export interface SupertestIndex extends supertest.SuperTest<supertest.Test> {
  [key: string]: any;
}

export const getUser = (): {
  user_id: mongoose.Types.ObjectId;
  user_email: string;
  user_pass: string;
  user_pass_encrypted: string;
  user_token: string;
} => {
  const userId = mongoose.Types.ObjectId();
  return {
    user_id: userId,
    user_email: 'john@example.com',
    user_pass: 'CyKHe3kR',
    user_pass_encrypted: bcrypt.hashSync('CyKHe3kR', 8),
    user_token: generateToken({ _id: userId })
  };
};
