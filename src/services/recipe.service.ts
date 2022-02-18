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

  const newRecipe = recipeRepository.create({
    ...body,
    owner: owner,
    company: owner?.company,
  });

  const recipe = await recipeRepository.save(newRecipe);

  for (const ingredientId in body.ingredientsList) {
    const ingredientExists = await ingredientRepository.findOne({
      where: { id: ingredientId },
    });

    const newRecipeIngredient = recipeIngredientRepository.create({
      quantity: body.ingredientsList[ingredientId],
      ingredient: ingredientExists,
      recipe: recipe,
    });

    await recipeIngredientRepository.save(newRecipeIngredient);
  }

  const recipeExists = await recipeRepository.findOne({
    where: { id: newRecipe.id },
    relations: ["recipesIngredients", "recipesIngredients.ingredient"],
  });

  if (recipeExists) {
    const costActual =
      recipeExists.recipesIngredients.reduce((acc, cVal) => {
        return acc + cVal.quantity * cVal.ingredient.price;
      }, 0) / recipeExists.yield;

    await recipeRepository.update(recipe.id, {
      cost: costActual,
    });
  }

  const recipeOutput = await recipeRepository.findOne(newRecipe.id);

  return recipeOutput;
};

export const listRecipes = async (idLogged: string) => {
  const userRepository = getRepository(User);
  const recipeRepository = getRepository(Recipe);

  const user = await userRepository.findOne(idLogged, {
    relations: ["company"],
  });

  const recipes = await recipeRepository.find({
    where: { company: user?.company },
  });

  return recipes;
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
