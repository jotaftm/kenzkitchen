import { getRepository } from "typeorm";
import { ErrorHandler } from "../errors/errorHandler.error";
import { Company } from "../entities";

export const createRecipe = async (createdBy: string, body: any) => {
  const companyRepository = getRepository(Company);

  const company = companyRepository.create({
    ...body,
    createdBy: createdBy,
  });

  return await companyRepository.save(company);
};

export const listRecipe = async () => {
  const companyRepository = getRepository(Company);

  const companies = await companyRepository.find();

  return companies;
};

export const findRecipe = async (idLogged: string, companyId: string) => {
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

export const updateRecipe = async (
  idLogged: string,
  body: any,
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

export const deleteRecipe = async (idLogged: string, companyId: string) => {
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
