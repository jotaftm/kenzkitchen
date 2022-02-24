import * as yup from "yup";
import bcrypt from "bcrypt";

export const updateCompanySchema = yup.object().shape({
  name: yup.string(),
  cnpj: yup
    .string()
    .matches(/^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/, "invalid cnpj format"),
  email: yup.string().email("invalid email format"),
  isActive: yup.boolean(),
  password: yup.string().transform((_, originalValue) => {
    return bcrypt.hashSync(originalValue, 10);
  }),
});
