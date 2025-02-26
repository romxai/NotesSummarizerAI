import { ObjectId } from "mongodb";

export interface User {
  _id: ObjectId;
  email: string;
  password: string; // This will be hashed
  createdAt: Date;
  updatedAt: Date;
}

export interface UserSession {
  _id: ObjectId;
  userId: ObjectId;
  token: string;
  createdAt: Date;
  expiresAt: Date;
}
