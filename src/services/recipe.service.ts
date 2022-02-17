import { getRepository } from "typeorm";
import { ErrorHandler } from "../errors/errorHandler.error";
import {
  Company,
  Ingredient,
  Recipe,
  RecipeIngredient,
  User,
} from "../entities";

export const createRecipe = async (
  idLogged: string,
  body: BodyCreateRecipe
) => {
  const userRepository = getRepository(User);
  const ingredientRepository = getRepository(Ingredient);
  const recipeRepository = getRepository(Recipe);
  const recipeIngredientRepository = getRepository(RecipeIngredient);

  const owner = await userRepository.findOne(idLogged, {
    relations: ["company"],
  });

  if (!owner?.isManager) {
    throw new ErrorHandler("missing manager permissions", 401);
  }
  const oi = recipeRepository.createQueryBuilder();

  const recipe = recipeRepository.create({
    ...body,
    owner: owner,
    company: owner?.company,
    cost: 0,
  });

  const newRecipe = await recipeRepository.save(recipe);

  console.log(newRecipe);

  const recipeExistes = await recipeRepository.findOne(newRecipe.id);

  //   for (const ingredient in body.ingredients) {
  //     const ingredientExists = await ingredientRepository.findOne();

  //     const newRecipeIngredient = recipeIngredientRepository.create({
  //       quantity: body.ingredients[ingredient],
  //       ingredient: ingredientExists,
  //       recipe: recipeExistes,
  //     });
  //   }

  return {};
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
