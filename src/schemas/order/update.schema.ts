import * as yup from "yup";

export const updateOrderSchema = yup.object().shape({
  isScheduled: yup.string(),
});
