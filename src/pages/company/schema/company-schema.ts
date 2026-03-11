import * as Yup from "yup";

export const companyValidationSchema = Yup.object().shape({
  companyName: Yup.string().required("This field is required"),
  country: Yup.string().required("This field is required"),
  sector: Yup.string().required("This field is required"),
  currency: Yup.string().required("This field is required"),
  licenseNumberName: Yup.string().required("This field is required"),
  liscenseNumber: Yup.string().required("This field is required"),
  liscenseIssuedBy: Yup.string().required("This field is required"),
  liscenseImage: Yup.mixed<string | File>()
    .required("Document is required")
    .test("file-or-url", "Invalid document", (value) => {
      if (!value) return false; // required check
      if (typeof value === "string") {
        try {
          new URL(value);
          return true;
        } catch {
          return false;
        }
      }
      if (value instanceof File) return true;
      return false;
    }),
  state: Yup.string().required("This field is required"),
  city: Yup.string().required("This field is required"),
  street: Yup.string().required("This field is required"),
  area: Yup.string().required("This field is required"),
  contactPersonName: Yup.string().required("This field is required"),
  contactNumber: Yup.string().required("This field is required"),
  email: Yup.string().required("This field is required"),
  officeAddress: Yup.string().required("This field is required"),
  websiteUrl: Yup.string().required("This field is required"),
});

export type CompanyValidationSchemaType = Yup.InferType<
  typeof companyValidationSchema
>;
