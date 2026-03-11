import * as Yup from "yup";

export const formSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is Required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is Required"),
});

export type LoginFormValues = Yup.InferType<typeof formSchema>;
