import * as yup from "yup";

export const createOrderSchema = yup.object().shape({
  scheduled: yup.string().required("scheduled is required"),
  recipesListAdd: yup.object().required("recipesListAdd is required"),
});
