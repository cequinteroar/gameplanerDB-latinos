import { Request, Response } from "express";
import * as jwt from "../service/jwt";
import User, { IUser } from "../models/User";

/**
 * Get User
 * @param req
 * @param res
 */
export const getUser = (req: Request, res: Response) => {
  var userId = req.params.id;

  User.findById(userId, (err: any, userFound: IUser) => {
    if (err) {
      res.status(500).send({
        message: "Error in the request",
      });
    } else {
      if (!userFound) {
        res.status(404).send({
          message: "User not found",
        });
      } else {
        res.status(200).send({
          user: userFound,
        });
      }
    }
  });
};

/**
 * Get Users
 * @param req
 * @param res
 */
export const getUsers = async (req: Request, res: Response) => {
  const users: IUser[] = req.body;
  console.log(users);
  try {
    const gotUsers = await User.find({});
    res.status(201).json({
      message: "Users got successfully",
      users: gotUsers,
    });
  } catch (error: any) {
    res.status(500).json({
      message: "unable to get users",
      error: error.message,
    });
  }
};
