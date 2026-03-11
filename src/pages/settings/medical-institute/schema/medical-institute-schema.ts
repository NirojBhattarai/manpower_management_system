import * as yup from "yup";

const MedicalInstituteSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  address: yup.string().required("Address is required"),
  email: yup.string().required("Email is required"),
  phone: yup.string().required("Phone number is required"),
});

export const MediacalInstituteValidationSchema = MedicalInstituteSchema;
export type MedicalInstituteSchemaType = yup.InferType<
  typeof MedicalInstituteSchema
>;
