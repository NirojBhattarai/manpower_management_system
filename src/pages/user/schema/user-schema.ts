import * as Yup from "yup";

const userSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .min(3, "Country name must be at least 3 characters"),
  email: Yup.string().required("Email is required").email("Invalid email"),
  phone: Yup.string().required("Phone is required"),
  role: Yup.string().required("Role is required"),
});

export type UserSchemaType = Yup.InferType<typeof userSchema>;
export const UserValidationSchema = userSchema;
