export interface RecipeBody {
  [key: string]: number;
}

export interface BodyCreateOrder {
  scheduled: Date;
  recipesListAdd: RecipeBody;
}

export interface BodyUpdateOrder {
  scheduled?: Date;
  isExecuted?: boolean;
  recipesListAdd?: RecipeBody;
  recipesListRemove?: string[];
}
