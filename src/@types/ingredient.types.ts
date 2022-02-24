export interface BodyCreateIngredient {
  name: string;
  barCode: string;
  description: string;
  quantity: number;
  unity: string;
  price: number;
}

export interface BodyUpdateIngredient {
  name?: string;
  barCode?: string;
  description?: string;
  quantity?: number;
  unity?: string;
  price?: number;
}
