import * as yup from "yup";

export const updateRecipeSchema = yup.object().shape({
  name: yup.string(),
  description: yup.string(),
  yield: yup.number(),
  unity: yup
    .string()
    .matches(/[GR]|[gr]|[UN]|[un]/, "invalid unity format")
    .transform((_, originalValue) => {
      return originalValue.toUpperCase();
    }),
  ingredientsListAdd: yup.object(),
  ingredientsListRemove: yup.array(),
});
