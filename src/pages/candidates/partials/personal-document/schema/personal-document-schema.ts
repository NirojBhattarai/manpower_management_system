import * as Yup from "yup";

export enum DocumentsTypes {
  Citizenship = "citizenship",
  Passport = "passport",
  PoliceReport = "policeReport",
}

export const CitizenshipYupSchema = Yup.object({
  documentType: Yup.string().oneOf(Object.values(DocumentsTypes)),

  citizenImage: Yup.array()
    .of(Yup.string())
    .min(1, "Citizenship image is required"),

  issueDate: Yup.date()
    .typeError("Invalid issue date")
    .required("Issue date is required"),

  citizenshipNo: Yup.string().trim().required("Citizenship number is required"),
});

export const PassportYupSchema = Yup.object({
  documentType: Yup.string().oneOf(Object.values(DocumentsTypes)),

  passportImage: Yup.array()
    .of(Yup.string())
    .min(1, "Passport image is required"),

  issueDate: Yup.date()
    .typeError("Invalid issue date")
    .required("Issue date is required"),

  expiryDate: Yup.date()
    .typeError("Invalid expiry date")
    .min(Yup.ref("issueDate"), "Expiry must be after issue date")
    .required("Expiry date is required"),

  passportNo: Yup.string().trim().required("Passport number is required"),
});

export const PoliceReportYupSchema = Yup.object({
  documentType: Yup.string().oneOf(Object.values(DocumentsTypes)),

  policeReportImage: Yup.string().required("Police report image is required"),

  issueDate: Yup.date()
    .typeError("Invalid issue date")
    .required("Issue date is required"),

  dispatchNo: Yup.string().trim().required("Dispatch number is required"),
});

const isEmptyObject = (obj?: Record<string, any>) =>
  !obj || Object.keys(obj).length === 0;

export const PersonalDocumentValidationSchema = Yup.object({
  citizenship: Yup.mixed().test(
    "citizenship-validation",
    "Invalid citizenship data",
    function (value) {
      if (isEmptyObject(value)) return true;
      try {
        CitizenshipYupSchema.validateSync(value);
        return true;
      } catch (err: any) {
        return this.createError({ message: err.message });
      }
    },
  ),

  passport: Yup.mixed().test(
    "passport-validation",
    "Invalid passport data",
    function (value) {
      if (isEmptyObject(value)) return true;
      try {
        PassportYupSchema.validateSync(value);
        return true;
      } catch (err: any) {
        return this.createError({ message: err.message });
      }
    },
  ),

  policeReport: Yup.mixed().test(
    "police-validation",
    "Invalid police report data",
    function (value) {
      if (isEmptyObject(value)) return true;
      try {
        PoliceReportYupSchema.validateSync(value);
        return true;
      } catch (err: any) {
        return this.createError({ message: err.message });
      }
    },
  ),
});

export type CitizenshipFormType = {
  documentType: string;
  citizenImage: (File | string)[];
  citizenshipNo: string;
  issueDate: string;
};

export type PassportFormType = {
  documentType: string;
  passportImage: (File | string)[];
  passportNo: string;
  issueDate: string;
  expiryDate: string;
};

export type PoliceReportFormType = {
  documentType: string;
  policeReportImage: File | string | "";
  issueDate: string;
  dispatchNo: string;
};

export type PersonalDocumentSchemaType = {
  documentType: string;
  citizenship: CitizenshipFormType;
  passport: PassportFormType;
  policeReport: PoliceReportFormType;
};
