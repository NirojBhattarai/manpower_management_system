import * as Yup from "yup";

const roleSchema = Yup.object().shape({
  label: Yup.string()
    .required("Label is required")
    .min(3, "Country name must be at least 3 characters")
    .max(10, "Country name cannot exceed 10 characters"),
});

export type RoleSchemaType = Yup.InferType<typeof roleSchema>;
export const RoleValidationSchema = roleSchema;
