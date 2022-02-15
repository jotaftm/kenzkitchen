import * as yup from "yup";
import bcrypt from "bcrypt";

export const companySchema = yup.object().shape({
    name: yup
        .string()
        .required("name field is required."),
    cnpj: yup
        .string()
        .matches(/^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/, "Invalid cnpj format.")
        .required("cnpj field is required."),
    email: yup
        .string()
        .email("Invalid email format.")
        .required("email field is required."),
    password: yup
        .string()
        .required("password field is required.")
        .transform((_, originalValue) => {
            return bcrypt.hashSync(originalValue, 10);
        }),
});