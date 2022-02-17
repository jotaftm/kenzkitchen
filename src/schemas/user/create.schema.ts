import * as yup from "yup";
import bcrypt from "bcrypt";

export const userSchema = yup.object().shape({
  name: yup.string().required("name is required"),
  email: yup
    .string()
    .email("Invalid email format.")
    .required("email is required"),
  password: yup
    .string()
    .required("password is required")
    .transform((_, originalValue) => {
      return bcrypt.hashSync(originalValue, 10);
    }),
  isAdm: yup.boolean(),
});
