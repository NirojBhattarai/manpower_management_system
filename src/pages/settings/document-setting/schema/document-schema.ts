import * as yup from "yup";

const DocumentSchema = yup.object().shape({
  country: yup.string().required("This field is required"),
  document: yup.string().required("This field is required"),
});

export const DocumentValidationSchema = DocumentSchema;
export type DocumentSchemaType = yup.InferType<typeof DocumentSchema>;
