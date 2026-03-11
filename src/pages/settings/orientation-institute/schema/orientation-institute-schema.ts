import * as yup from "yup";

const OrientationInstituteSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  address: yup.string().required("Address is required"),
  email: yup.string().required("Email is required"),
  phone: yup.string().required("Phone number is required"),
});

export const OrientationInstituteValidationSchema = OrientationInstituteSchema;
export type OrientationInstituteSchemaType = yup.InferType<
  typeof OrientationInstituteSchema
>;
