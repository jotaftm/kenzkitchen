import Ingredient from "../entities/ingredient.entity";
import { getRepository } from "typeorm";
import { ErrorHandler } from "../errors/errorHandler.error";

export const createIngredient = async (body: any) => {
  const ingredientRepository = getRepository(Ingredient);

  const ingredient = ingredientRepository.create({ ...body });

  return await ingredientRepository.save(ingredient);
};

export const listIngredients = async () => {
  const ingredientRepository = getRepository(Ingredient);

  const ingredients = await ingredientRepository.find();

  return ingredients;
};

export const findIngredient = async (ingredientId: string) => {
  const ingredientRepository = getRepository(Ingredient);

  const ingredient = await ingredientRepository.findOne({
    where: { id: ingredientId },
  });

  if (!ingredient) {
    throw new ErrorHandler("ingredient not found", 404);
  }

  return ingredient;
};

export const updateIngredient = async (body: any, ingredientId: string) => {
  const ingredientRepository = getRepository(Ingredient);

  const ingredientToUpdate = await ingredientRepository.findOne(ingredientId);

  if (!ingredientToUpdate) {
    throw new ErrorHandler("ingredient not found", 404);
  }

  await ingredientRepository.update(ingredientId, { ...body });

  const updatedIngredient = await ingredientRepository.findOne({
    where: { id: ingredientId },
  });

  return updatedIngredient;
};

export const deleteIngredient = async (ingredientId: string) => {
  const ingredientRepository = getRepository(Ingredient);

  const ingredientToDelete = await ingredientRepository.findOne(ingredientId);

  if (!ingredientToDelete) {
    throw new ErrorHandler("ingredient not found", 404);
  }

  await ingredientRepository.delete(ingredientToDelete);
};
