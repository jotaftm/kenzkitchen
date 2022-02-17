import { getRepository } from "typeorm";
import { ErrorHandler } from "../errors/errorHandler.error";
import { Company, User, Ingredient } from "../entities";

export const createIngredient = async (idLogged: string, body: any) => {
  try {
    const userRepository = getRepository(User);
    const ingredientRepository = getRepository(Ingredient);

    const user = await userRepository.findOne(idLogged, {
      relations: ["company"],
    });

    if (!user?.isManager) {
      throw new ErrorHandler("missing manager permissions", 401);
    }

    const ingredient = ingredientRepository.create({
      ...(body as Ingredient),
      company: user?.company,
      owner: user,
    });

    return await ingredientRepository.save(ingredient);
  } catch (err) {
    throw new ErrorHandler((err as any).detail, 400);
  }
};

export const listIngredients = async (idLogged: string) => {
  const userRepository = getRepository(User);
  const ingredientRepository = getRepository(Ingredient);

  const user = await userRepository.findOne(idLogged, {
    relations: ["company"],
  });

  const ingredients = await ingredientRepository.find({
    where: { company: user?.company },
  });

  return ingredients;
};

export const findIngredient = async (
  idLogged: string,
  ingredientId: string
) => {
  const userRepository = getRepository(User);
  const ingredientRepository = getRepository(Ingredient);

  const user = await userRepository.findOne(idLogged, {
    relations: ["company"],
  });

  const ingredient = await ingredientRepository.findOne(ingredientId, {
    where: { company: user?.company },
  });

  if (!ingredient) {
    throw new ErrorHandler("ingredient not found", 404);
  }

  return ingredient;
};

export const updateIngredient = async (
  idLogged: string,
  ingredientId: string,
  body: any
) => {
  const userRepository = getRepository(User);
  const ingredientRepository = getRepository(Ingredient);

  const user = await userRepository.findOne(idLogged, {
    relations: ["company"],
  });

  if (!user?.isManager) {
    throw new ErrorHandler("missing manager permissions", 401);
  }

  const ingredientToUpdate = await ingredientRepository.findOne(ingredientId, {
    where: { company: user?.company },
  });

  if (!ingredientToUpdate) {
    throw new ErrorHandler("ingredient not found", 404);
  }

  await ingredientRepository.update(ingredientId, { ...body });

  const updatedIngredient = await ingredientRepository.findOne({
    where: { id: ingredientId },
  });

  return updatedIngredient;
};

export const deleteIngredient = async (
  idLogged: string,
  ingredientId: string
) => {
  const userRepository = getRepository(User);
  const ingredientRepository = getRepository(Ingredient);

  const user = await userRepository.findOne(idLogged, {
    relations: ["company"],
  });

  if (!user?.isManager) {
    throw new ErrorHandler("missing manager permissions", 401);
  }

  const ingredientToDelete = await ingredientRepository.findOne(ingredientId, {
    where: { company: user?.company },
  });

  if (!ingredientToDelete) {
    throw new ErrorHandler("ingredient not found", 404);
  }

  await ingredientRepository.delete(ingredientToDelete);
};
