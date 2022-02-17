import * as yup from "yup";

export const loginUserSchema = yup.object().shape({
  email: yup
    .string()
    .email("invalid email format")
    .required("email is required"),
  password: yup.string().required("password is required"),
});
