import * as yup from "yup";

const PersonalDetailsSchema = yup.object().shape({
  fullName: yup.string().required("This field is required"),
  passportNumber: yup.string().required("This field is required"),
  dateOfBirth: yup.string().required("This field is required"),
  birthPlace: yup.string().required("This field is required"),
  fatherName: yup.string().required("This field is required"),
  motherName: yup.string().required("This field is required"),
  phone: yup
    .string()
    .matches(/^\+?[0-9]{7,15}$/, "Phone number is not valid")
    .required("This field is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("This field is required"),
  province: yup.string().required("This field is required"),
  district: yup.string().required("This field is required"),
  municipality: yup.string().required("This field is required"),
  wardNumber: yup.string().required("This field is required"),
});

export const PersonalDetailsValidationSchema = PersonalDetailsSchema;
export type PersonalDetailsSchemaType = yup.InferType<
  typeof PersonalDetailsSchema
>;
