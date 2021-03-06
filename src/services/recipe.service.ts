import { getRepository } from "typeorm";
import { ErrorHandler } from "../errors/errorHandler.error";
import { Ingredient, Recipe, RecipeIngredient, User } from "../entities";
import { BodyCreateRecipe, BodyUpdateRecipe } from "../@types";

export const createRecipe = async (
  idLogged: string,
  body: BodyCreateRecipe
) => {
  try {
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

      if (ingredientExists) {
        const newRecipeIngredient = recipeIngredientRepository.create({
          quantity: body.ingredientsList[ingredientId],
          ingredient: ingredientExists,
          recipe: recipe,
        });

        await recipeIngredientRepository.save(newRecipeIngredient);
      }
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
  } catch (err) {
    throw new ErrorHandler((err as any).detail, 400);
  }
};

export const listRecipes = async (idLogged: string) => {
  const userRepository = getRepository(User);
  const recipeRepository = getRepository(Recipe);

  const userLogged = await userRepository.findOne(idLogged, {
    relations: ["company"],
  });

  const recipes = await recipeRepository.find({
    where: { company: userLogged?.company },
  });

  return recipes;
};

export const findRecipe = async (idLogged: string, recipeId: string) => {
  const userRepository = getRepository(User);
  const recipeRepository = getRepository(Recipe);

  const userLogged = await userRepository.findOne(idLogged, {
    relations: ["company"],
  });

  const recipe = await recipeRepository.findOne(recipeId, {
    where: { company: userLogged?.company },
    relations: [
      "owner",
      "company",
      "recipesIngredients",
      "recipesIngredients.ingredient",
    ],
  });

  if (!recipe) {
    throw new ErrorHandler("recipe not found", 404);
  }

  return recipe;
};

// TODO: resolver problema de tipagem do body
// A interface j?? est?? criada, por??m precisa resolver como retirar
// as listas de adi??ao e remo????o de ingredientes sem criar um
// novo obj como est?? sendo feito na linha 217
export const updateRecipe = async (
  idLogged: string,
  body: any,
  recipeId: string
) => {
  const userRepository = getRepository(User);
  const ingredientRepository = getRepository(Ingredient);
  const recipeRepository = getRepository(Recipe);
  const recipeIngredientRepository = getRepository(RecipeIngredient);

  const user = await userRepository.findOne(idLogged, {
    relations: ["company"],
  });

  if (!user?.isManager) {
    throw new ErrorHandler("missing manager permissions", 401);
  }

  const recipeToUpdate = await recipeRepository.findOne(recipeId, {
    where: { company: user?.company },
    relations: [
      "recipesIngredients",
      "recipesIngredients.recipe",
      "recipesIngredients.ingredient",
    ],
  });

  if (!recipeToUpdate) {
    throw new ErrorHandler("recipe not found", 404);
  }

  const recipesIngredientsExists = await recipeIngredientRepository.find({
    relations: ["recipe", "ingredient"],
  });

  if ("ingredientsListAdd" in body) {
    for (const ingredientId in body.ingredientsListAdd) {
      const ingredientExists = await ingredientRepository.findOne({
        where: { id: ingredientId },
      });

      if (ingredientExists) {
        const recipeIngredientExist = recipesIngredientsExists.find(
          (recipeIngredient) => {
            return (
              recipeIngredient.ingredient.id === ingredientId &&
              recipeIngredient.recipe.id === recipeToUpdate.id
            );
          }
        );

        if (recipeIngredientExist) {
          await recipeIngredientRepository.update(recipeIngredientExist.id, {
            quantity: body.ingredientsListAdd[ingredientId],
          });
        } else {
          const newRecipeIngredient = recipeIngredientRepository.create({
            quantity: body.ingredientsListAdd[ingredientId],
            ingredient: ingredientExists,
            recipe: recipeToUpdate,
          });

          await recipeIngredientRepository.save(newRecipeIngredient);
        }
      }
    }
  }

  if ("ingredientsListRemove" in body) {
    body.ingredientsListRemove.map(async (ingredientId: string) => {
      const recipeIngredientForDelete = recipesIngredientsExists.find(
        (recipeIngredient) => {
          return (
            recipeIngredient.ingredient.id === ingredientId &&
            recipeIngredient.recipe.id === recipeToUpdate.id
          );
        }
      );

      if (recipeIngredientForDelete) {
        await recipeIngredientRepository.delete(recipeIngredientForDelete.id);
      }
    });
  }

  let data: any = {};

  for (const key in body) {
    if (key !== "ingredientsListAdd" && key !== "ingredientsListRemove") {
      data[key] = body[key];
    }
  }

  await recipeRepository.update(recipeId, { ...data });

  const recipeExists = await recipeRepository.findOne({
    where: { id: recipeToUpdate.id },
    relations: ["recipesIngredients", "recipesIngredients.ingredient"],
  });

  if (recipeExists) {
    const costActual =
      recipeExists.recipesIngredients.reduce((acc, cVal) => {
        return acc + cVal.quantity * cVal.ingredient.price;
      }, 0) / recipeExists.yield;

    await recipeRepository.update(recipeExists.id, {
      cost: costActual,
    });
  }

  return await recipeRepository.findOne(recipeId);
};

export const deleteRecipe = async (idLogged: string, recipeId: string) => {
  const userRepository = getRepository(User);
  const recipeRepository = getRepository(Recipe);

  const user = await userRepository.findOne(idLogged, {
    relations: ["company"],
  });

  if (!user?.isManager) {
    throw new ErrorHandler("missing manager permissions", 401);
  }

  const recipeToDelete = await recipeRepository.findOne(recipeId, {
    where: { company: user?.company },
    relations: [
      "recipesIngredients",
      "recipesIngredients.recipe",
      "recipesIngredients.ingredient",
    ],
  });

  if (!recipeToDelete) {
    throw new ErrorHandler("recipe not found", 404);
  }

  return await recipeRepository.delete(recipeToDelete.id);
};
