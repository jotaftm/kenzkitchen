import { getRepository } from "typeorm";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { ErrorHandler } from "../errors/errorHandler.error";
import { Company, User } from "../entities";
import { BodyCreateCompany, BodyLogin, BodyUpdateCompany } from "../@types";

export const createCompany = async (
  createdBy: string,
  body: BodyCreateCompany
) => {
  try {
    const companyRepository = getRepository(Company);
    const userRepository = getRepository(User);

    const company = companyRepository.create({
      ...body,
      createdBy: createdBy,
    });

    await companyRepository.save(company);

    const createdCompany = await companyRepository.findOne({
      where: {
        email: body.email,
      },
      select: ["id", "cnpj", "email", "password"],
    });

    if (createdCompany) {
      const user = userRepository.create({
        id: createdCompany.id,
        name: createdCompany.cnpj,
        email: createdCompany.email,
        password: createdCompany.password,
        isManager: true,
        company: createdCompany,
      });

      await userRepository.save(user);
    }

    return await companyRepository.findOne(createdCompany?.id);
  } catch (err) {
    throw new ErrorHandler((err as any).detail, 400);
  }
};

export const loginCompany = async (body: BodyLogin) => {
  const companyRepository = getRepository(Company);

  const company = await companyRepository.findOne({
    where: {
      email: body.email,
    },
    select: ["password", "id", "isActive"],
  });

  if (!company) {
    throw new ErrorHandler("wrong email", 401);
  } else if (!bcrypt.compareSync(body.password, company.password)) {
    throw new ErrorHandler("wrong password", 401);
  } else if (!company.isActive) {
    throw new ErrorHandler("inactive account", 401);
  }

  const token = jwt.sign(
    {
      idLogged: company.id,
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "24h",
    }
  );

  return token;
};

export const listCompanies = async () => {
  const companyRepository = getRepository(Company);

  const companies = await companyRepository.find();

  return companies;
};

export const findCompany = async (idLogged: string, companyId: string) => {
  const companyRepository = getRepository(Company);

  const company = await companyRepository.findOne({
    where: {
      id: companyId,
    },
  });

  if (!company) {
    throw new ErrorHandler("company not found", 404);
  } else if (
    idLogged !== company.id &&
    !process.env.API_KEYS?.split(",").includes(idLogged)
  ) {
    throw new ErrorHandler("missing admin permissions", 401);
  }

  return company;
};

export const updateCompany = async (
  idLogged: string,
  body: BodyUpdateCompany,
  companyId: string
) => {
  const companyRepository = getRepository(Company);

  const companyToUpdate = await companyRepository.findOne({
    where: {
      id: companyId,
    },
  });

  if (!companyToUpdate) {
    throw new ErrorHandler("company not found", 404);
  } else if (
    idLogged !== companyToUpdate.id &&
    !process.env.API_KEYS?.split(",").includes(idLogged)
  ) {
    throw new ErrorHandler("missing admin permissions", 401);
  } else if (
    "isActive" in body &&
    !process.env.API_KEYS?.split(",").includes(idLogged)
  ) {
    throw new ErrorHandler(
      "missing admin permissions to activate/deactivate account",
      401
    );
  }

  await companyRepository.update(companyId, {
    ...body,
  });

  const updatedCompany = await companyRepository.findOne({
    where: {
      id: companyId,
    },
  });

  return updatedCompany;
};

export const deleteCompany = async (idLogged: string, companyId: string) => {
  const companyRepository = getRepository(Company);

  const companyToDelete = await companyRepository.findOne({
    where: {
      id: companyId,
    },
  });

  if (!companyToDelete) {
    throw new ErrorHandler("company not found", 404);
  } else if (
    idLogged !== companyToDelete.id &&
    !process.env.API_KEYS?.split(",").includes(idLogged)
  ) {
    throw new ErrorHandler("missing admin permissions", 401);
  }

  return await companyRepository.delete(companyToDelete.id);
};
