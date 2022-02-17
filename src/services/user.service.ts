import { getRepository } from "typeorm";
import { Company, User } from "../entities";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { ErrorHandler } from "../errors/errorHandler.error";

export const createUser = async (idLogged: string, body: any) => {
  const companyRepository = getRepository(Company);
  const userRepository = getRepository(User);

  const companyExists = await companyRepository.findOne(idLogged);

  if (!companyExists) {
    throw new ErrorHandler("company not found", 404);
  }

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
    company: companyExists,
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
      idLogged: user.id,
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "24h",
    }
  );

  return token;
};

export const listUsers = async (idLogged: string, companyId: string) => {
  const companyRepository = getRepository(Company);

  const companyExists = await companyRepository.findOne({
    where: {
      id: companyId,
    },
    relations: ["users"],
  });

  if (!companyExists) {
    throw new ErrorHandler("company not found", 404);
  } else if (
    idLogged !== companyExists.id &&
    !process.env.API_KEYS?.split(",").includes(idLogged)
  ) {
    throw new ErrorHandler("missing admin permissions", 401);
  }

  const users = companyExists.users;

  return users;
};

export const findUser = async (
  idLogged: string,
  companyId: string,
  userId: string
) => {
  const companyRepository = getRepository(Company);

  const companyExists = await companyRepository.findOne({
    where: {
      id: companyId,
    },
    relations: ["users"],
  });

  if (!companyExists) {
    throw new ErrorHandler("company not found", 404);
  }

  const users = companyExists.users;

  const user = users.find((user) => user.id === userId);

  if (!user) {
    throw new ErrorHandler("user not found", 404);
  } else if (
    idLogged !== user.id &&
    idLogged !== companyExists.id &&
    !process.env.API_KEYS?.split(",").includes(idLogged)
  ) {
    throw new ErrorHandler("missing admin permissions", 401);
  }

  return user;
};

export const updateUser = async (
  idLogged: string,
  companyId: string,
  body: any,
  userId: string
) => {
  const userRepository = getRepository(User);
  const companyRepository = getRepository(Company);

  const companyExists = await companyRepository.findOne({
    where: {
      id: companyId,
    },
    relations: ["users"],
  });

  if (!companyExists) {
    throw new ErrorHandler("company not found", 404);
  }

  const users = companyExists.users;

  const userToUpdate = users.find((user) => user.id === userId);

  if (!userToUpdate) {
    throw new ErrorHandler("user not found", 404);
  } else if (
    idLogged !== userToUpdate.id &&
    idLogged !== companyExists.id &&
    !process.env.API_KEYS?.split(",").includes(idLogged)
  ) {
    throw new ErrorHandler("missing admin permissions", 401);
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

export const deleteUser = async (
  idLogged: string,
  companyId: string,
  userId: string
) => {
  const userRepository = getRepository(User);
  const companyRepository = getRepository(Company);

  const companyExists = await companyRepository.findOne({
    where: {
      id: companyId,
    },
    relations: ["users"],
  });

  if (!companyExists) {
    throw new ErrorHandler("company not found", 404);
  }

  const users = companyExists.users;

  const userToDelete = users.find((user) => user.id === userId);

  if (!userToDelete) {
    throw new ErrorHandler("user not found", 404);
  } else if (
    idLogged !== userToDelete.id &&
    idLogged !== companyExists.id &&
    !process.env.API_KEYS?.split(",").includes(idLogged)
  ) {
    throw new ErrorHandler("missing admin permissions", 401);
  }

  await userRepository.delete(userToDelete.id);
};
