import * as Yup from "yup";

const InsuranceSchema = Yup.object().shape({
  insuranceCompany: Yup.string().required("This field is required"),
});

const UpdateInsuranceSchema = Yup.object().shape({
  insuranceCompany: Yup.string().required("This field is required"),
  policyNumber: Yup.string().required("This field is required"),
  validFrom: Yup.string().required("This field is required"),
  validTo: Yup.string().required("This field is required"),
  insuranceDocument: Yup.mixed<string | File>().required(
    "This field is required",
  ),
  insuranceStatus: Yup.string().required("This field is required"),
});

export type InsuranceSchemaType = Yup.InferType<typeof InsuranceSchema>;
export const InsuranceValidationSchema = InsuranceSchema;

export type UpdateInsuranceSchemaType = Yup.InferType<
  typeof UpdateInsuranceSchema
>;
export const UpdateInsuranceValidationSchema = UpdateInsuranceSchema;
