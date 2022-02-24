export interface IngredientBody {
  [key: string]: number;
}

export interface BodyCreateRecipe {
  name: string;
  description: string;
  yield: number;
  unity: string;
  ingredientsList: IngredientBody;
}

export interface BodyUpdateRecipe {
  name?: string;
  description?: string;
  yield?: number;
  unity?: string;
  ingredientsListAdd?: IngredientBody;
  ingredientsListRemove?: string[];
}
