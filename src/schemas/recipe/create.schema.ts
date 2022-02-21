import * as yup from "yup";

export const createRecipeSchema = yup.object().shape({
  name: yup.string().required("name is required"),
  description: yup.string().required("description  is required"),
  yield: yup.number().required("yield is required"),
  unity: yup
    .string()
    .matches(/[GR]|[gr]|[UN]|[un]/, "invalid unity format")
    .required("unity is required")
    .transform((_, originalValue) => {
      return originalValue.toUpperCase();
    }),
  ingredientsList: yup.object().required("ingredients is required"),
});
