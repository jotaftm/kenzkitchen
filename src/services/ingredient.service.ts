import Ingredient from "../entities/ingredient.entity";
import { getRepository } from "typeorm";
import { ErrorHandler } from "../errors/errorHandler.error";

export const createIngredient = async (body: any) => {
  const ingredientRepository = getRepository(Ingredient);

  const ingredient = ingredientRepository.create({ ...body });

  return await ingredientRepository.save(ingredient);
};

export const listIngredients = async () => {};

export const findIngredient = async (ingredientId: string) => {};

export const updateIngredient = async (body: any, ingredientId: string) => {};

export const deleteIngredient = async (ingredientId: string) => {};
