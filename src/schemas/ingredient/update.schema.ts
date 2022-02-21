import * as yup from "yup";

export const updateIngredientSchema = yup.object().shape({
  name: yup.string(),
  barCode: yup.string().matches(/^\d{13}$/, "invalid bar code format"),
  description: yup.string(),
  quantity: yup.number(),
  unity: yup
    .string()
    .matches(/^(GR|UN|gr|un)$/, "invalid unity format")
    .transform((_, originalValue) => {
      return originalValue.toUpperCase();
    }),
  price: yup.number(),
});
