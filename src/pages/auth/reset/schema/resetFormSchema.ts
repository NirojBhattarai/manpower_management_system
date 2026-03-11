import * as Yup from "yup";
export const resetFormSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
});
export type ResetFormValues = Yup.InferType<typeof resetFormSchema>;
