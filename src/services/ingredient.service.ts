import { getRepository } from "typeorm";
import { ErrorHandler } from "../errors/errorHandler.error";
import { Company, User, Ingredient } from "../entities";

export const createIngredient = async (idLogged: string, body: any) => {
  try {
    const companyRepository = getRepository(Company);
    const userRepository = getRepository(User);
    const ingredientRepository = getRepository(Ingredient);

    const user = await userRepository.findOne(idLogged);

    const company = await companyRepository.findOne(user.companyId);

    const ingredient = ingredientRepository.create({
      ...body,
      company: company,
      owner: user,
    });

    return await ingredientRepository.save(ingredient);
  } catch (err) {
    throw new ErrorHandler((err as any).detail, 400);
  }
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
