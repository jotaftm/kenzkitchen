import * as yup from "yup";
import bcrypt from "bcrypt";

export const loginCompanySchema = yup.object().shape({
    email: yup
        .string()
        .email("invalid email format")
        .required("email is required"),
    password: yup
        .string()
        .required("password is required"),
});