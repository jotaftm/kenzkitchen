import { getRepository } from "typeorm";
import { User } from "../entities";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { ErrorHandler } from "../errors/errorHandler.error";

export const createUser = async (body: any) => {
  const userRepository = getRepository(User);

  const emailExists = await userRepository.findOne({
    where: {
      email: body.email,
    },
  });

  if (emailExists) {
    throw new ErrorHandler("e-mail already registered", 400);
  }

  const user = userRepository.create({
    ...body,
  });

  return await userRepository.save(user);
};

export const loginUser = async (body: any) => {
  const userRepository = getRepository(User);

  const user = await userRepository.findOne({
    where: {
      email: body.email,
    },
    select: ["password", "id"],
  });

  if (!user) {
    throw new ErrorHandler("wrong email", 401);
  } else if (!bcrypt.compareSync(body.password, user.password)) {
    throw new ErrorHandler("wrong password", 401);
  }

  const token = jwt.sign(
    {
      id: user.id,
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "24h",
    }
  );

  return token;
};

export const listUsers = async () => {
  const userRepository = getRepository(User);

  const users = await userRepository.find();

  return users;
};

export const findUser = async (userId: string) => {
  const userRepository = getRepository(User);

  const user = await userRepository.findOne({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new ErrorHandler("user not found", 404);
  }

  return user;
};

export const updateUser = async (body: any, userId: string) => {
  const userRepository = getRepository(User);

  const userToUpdate = await userRepository.findOne({
    where: {
      id: userId,
    },
  });

  if (!userToUpdate) {
    throw new ErrorHandler("user not found", 404);
  }

  await userRepository.update(userId, {
    ...body,
  });

  const updatedUser = await userRepository.findOne({
    where: {
      id: userId,
    },
  });

  return updatedUser;
};

export const deleteUser = async (userId: string) => {
  const userRepository = getRepository(User);

  const userToDelete = await userRepository.findOne({
    where: {
      id: userId,
    },
  });

  if (!userToDelete) {
    throw new ErrorHandler("user not found", 404);
  }

  await userRepository.delete(userToDelete);
};
