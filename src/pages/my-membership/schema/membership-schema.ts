import * as yup from "yup";

const MembershipSchema = yup.object().shape({
  companyName: yup.string().required("This field is required"),
  companyRegistrationNumber: yup.string().required("This field is required"),
  registrationDate: yup.string().required("This field is required"),
  panNumber: yup.string().required("This field is required"),
  managingDirector: yup.string().required("This field is required"),
  licenseNumber: yup.string().required("This field is required"),
});

export const MembershipValidationSchema = MembershipSchema;
export type MembershipSchemaType = yup.InferType<typeof MembershipSchema>;
