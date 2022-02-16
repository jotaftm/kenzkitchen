import * as yup from "yup";

export const createIngredientSchema = yup.object().shape({
  name: yup.string().required("name is required"),
  barCode: yup
    .string()
    .matches(/^\d{13}$/, "invalid bar code format")
    .required("bar code is required"),
  description: yup.string().required("description is required"),
  quantity: yup.number().required("quantity is required"),
  unity: yup
    .string()
    .matches(/^(GR|UN|gr|un)$/, "invalid unity format")
    .transform((_, originalValue) => {
      return originalValue.toUpperCase();
    })
    .required("unity is required"),
  price: yup.number().required("price is required"),
});
