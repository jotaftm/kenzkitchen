import * as yup from "yup";

export const updateOrderSchema = yup.object().shape({
  scheduled: yup.string(),
  isExecuted: yup.boolean(),
  recipesListAdd: yup.object(),
  recipesListRemove: yup.array(),
});
