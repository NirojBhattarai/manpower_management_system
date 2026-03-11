import * as yup from "yup";

const InsuranceCompanySchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  address: yup.string().required("Address is required"),
  email: yup.string().required("Email is required"),
  phone: yup.string().required("Phone number is required"),
});

export const InsuranceCompanyValidationSchema = InsuranceCompanySchema;
export type InsuranceCompanySchemaType = yup.InferType<
  typeof InsuranceCompanySchema
>;
