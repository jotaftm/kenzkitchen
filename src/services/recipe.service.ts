import { getRepository } from "typeorm";
import { ErrorHandler } from "../errors/errorHandler.error";
import {
  Company,
  Ingredient,
  Recipe,
  RecipeIngredient,
  User,
} from "../entities";

interface IngredientBody {
  [key: string]: number;
}

interface BodyCreateRecipe {
  name: string;
  description: string;
  yield: number;
  unity: string;
  ingredientsList: IngredientBody;
}

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

  const recipe = recipeRepository.create({
    ...body,
    owner: owner,
    company: owner?.company,
    cost: 0,
  });

  const newRecipe = await recipeRepository.save(recipe);

  for (const ingredient in body.ingredientsList) {
    const ingredientExists = await ingredientRepository.findOne({
      where: { id: ingredient },
    });

    const newRecipeIngredient = recipeIngredientRepository.create({
      quantity: body.ingredientsList[ingredient],
      ingredient: ingredientExists,
      recipe: newRecipe,
    });

    await recipeIngredientRepository.save(newRecipeIngredient);
  }

  const pqp = await recipeRepository.findOne({
    where: { id: newRecipe.id },
    relations: ["recipesIngredients", "recipesIngredients.ingredient"],
  });

  if (pqp) {
    const costActual =
      pqp.recipesIngredients.reduce((acc, cVal) => {
        return acc + cVal.quantity * cVal.ingredient.price;
      }, 0) / pqp.yield;

    await recipeRepository.update(newRecipe.id, {
      cost: costActual,
    });
  }

  const recipeFinal = await recipeRepository.findOne(newRecipe.id);

  return recipeFinal;
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
  recipeId: string
) => {
  // const companyRepository = getRepository(Company);

  // const companyToUpdate = await companyRepository.findOne({
  //   where: {
  //     id: companyId,
  //   },
  // });

  // if (!companyToUpdate) {
  //   throw new ErrorHandler("company not found", 404);
  // } else if (
  //   idLogged !== companyToUpdate.id &&
  //   !process.env.API_KEYS?.split(",").includes(idLogged)
  // ) {
  //   throw new ErrorHandler("missing admin permissions", 401);
  // }

  // await companyRepository.update(companyId, {
  //   ...body,
  // });

  // const updatedCompany = await companyRepository.findOne({
  //   where: {
  //     id: companyId,
  //   },
  // });
  const recipeRepository = getRepository(Recipe);
  // const updatedRecipe = await recipeRepository.update(recipeId, { ...body });

  const userToUpdate = await recipeRepository.findOne(recipeId);

  const updateData = Object.assign(userToUpdate, { ...body });

  await recipeRepository.update(recipeId, updateData);

  return await recipeRepository.findOne(recipeId);

  // return updatedRecipe;
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
