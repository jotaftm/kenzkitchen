import * as yup from "yup";
import bcrypt from "bcrypt";

export const companySchema = yup.object().shape({
    name: yup
        .string()
        .required("name is required"),
    cnpj: yup
        .string()
        .matches(/^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/, "invalid cnpj format")
        .required("cnpj  is required"),
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
});