import * as yup from "yup";
import bcrypt from "bcrypt";

export const updateUserSchema = yup.object().shape({
  name: yup.string(),
  email: yup.string().email("invalid email format"),
  password: yup.string().transform((_, originalValue) => {
    return bcrypt.hashSync(originalValue, 10);
  }),
});
