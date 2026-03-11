import * as Yup from "yup";

// ========================== Pre Approval Dofe Temporary Job Details ===================================
const tempJobDetails = Yup.object({
  jobTitle: Yup.string().required("This field is required"),
  male: Yup.string()
    .required("This field is required")
    .test(
      "is-valid-number",
      "Amount must be a valid number",
      (value) => value !== undefined && value !== "" && !isNaN(Number(value)),
    ),
  female: Yup.string()
    .required("This field is required")
    .test(
      "is-valid-number",
      "Amount must be a valid number",
      (value) => value !== undefined && value !== "" && !isNaN(Number(value)),
    ),
  basicSalaryAED: Yup.string()
    .required("This field is required")
    .test(
      "is-valid-number",
      "Amount must be a valid number",
      (value) => value !== undefined && value !== "" && !isNaN(Number(value)),
    ),
  basicSalaryNPR: Yup.string()
    .required("This field is required")
    .test(
      "is-valid-number",
      "Amount must be a valid number",
      (value) => value !== undefined && value !== "" && !isNaN(Number(value)),
    ),
  workingHours: Yup.string()
    .required("This field is required")
    .test(
      "is-valid-number",
      "Amount must be a valid number",
      (value) => value !== undefined && value !== "" && !isNaN(Number(value)),
    ),
  workingDays: Yup.string()
    .required("This field is required")
    .test(
      "is-valid-number",
      "Amount must be a valid number",
      (value) => value !== undefined && value !== "" && !isNaN(Number(value)),
    ),
  contractPeriod: Yup.string()
    .required("This field is required")
    .test(
      "is-valid-number",
      "Amount must be a valid number",
      (value) => value !== undefined && value !== "" && !isNaN(Number(value)),
    ),
  workingCity: Yup.string().required("This field is required"),
  // experience
  experience: Yup.boolean().required("This field is required"),
  years: Yup.string().when("experience", {
    is: true,
    then: (schema) => schema.required("Required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  academicQualification: Yup.string().required("This field is required"),
});

// =========================== Pre Approval Dofe Job Details Item =====================================
const jobDetails = Yup.object({
  jobTitle: Yup.string().required("This field is required"),
  male: Yup.string().required(),
  female: Yup.string().required(),
  basicSalaryAED: Yup.string().required(),
  basicSalaryNPR: Yup.string().required(),
  workingHours: Yup.string().required(),
  workingDays: Yup.string().required(),
  contractPeriod: Yup.string().required(),
  workingCity: Yup.string().required(),
  experience: Yup.boolean().required(),
  years: Yup.string().required(),
  academicQualification: Yup.string().required(),
});

// ========================== Pre Approval Dofe Step - 1 ===================================
const preApprovalSchemaStep1 = Yup.object().shape({
  country: Yup.string().required("This field is required"),
  company: Yup.string().required("This field is required"),
  preApprovalCertificateNumber: Yup.string().required("This field is required"),
  preApprovalCertificatePDF: Yup.mixed<string | File>().test(
    "file-or-url",
    "Invalid icon",
    (value) => {
      if (!value) return true;
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
    },
  ),
  preApprovalDate: Yup.string().required("This field is required"),
  preApprovalValidity: Yup.string().required("This field is required"),
  preltNumber: Yup.string().required("This field is required"),
  chalaniNumber: Yup.string().required("This field is required"),
  // temporary store the document data
  // documentType: Yup.string().required("This field is required").optional(),
  // document: Yup.mixed<string | File>()
  //   .required("Document is required")
  //   .test("file-or-url", "Invalid document", (value) => {
  //     if (!value) return false; // required check
  //     if (typeof value === "string") {
  //       try {
  //         new URL(value);
  //         return true;
  //       } catch {
  //         return false;
  //       }
  //     }
  //     if (value instanceof File) return true;
  //     return false;
  //   }),
  documentType: Yup.string().notRequired(),
  document: Yup.mixed<string | File>().notRequired(),
  // Step two form
  documents: Yup.array()
    .of(
      Yup.object({
        documentType: Yup.string().required("This field is required"),
        document: Yup.mixed<string | File>()
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
      }),
    )
    .min(1, "This field is required"),
});

// ========================== Pre Approval Dofe Step - 2 ===================================
const preApprovalSchemaStep2 = Yup.object().shape({
  jobvacancy: Yup.array().of(jobDetails).required().min(1, ""),
  temp_job_details: Yup.object().notRequired(),
  edit_index: Yup.number().nullable(),
});

// ========================== Pre Approval Dofe Step - 3 ===================================
const preApprovalSchemaStep3 = Yup.object().shape({
  food: Yup.boolean(),
  accomodation: Yup.boolean(),
  transportation: Yup.boolean(),
  freevisa: Yup.boolean(),
  freeticket: Yup.boolean(),
  overtime: Yup.boolean(),
});

export const PreApprovalValidation = preApprovalSchemaStep1
  .concat(preApprovalSchemaStep2)
  .concat(preApprovalSchemaStep3);

export type PreApprovalJobListItem = Yup.InferType<typeof jobDetails>;

export type PreApprovalDofeFormType = Yup.InferType<
  typeof PreApprovalValidation
>;

export const tempJobDetailsSchema = tempJobDetails;
export type TempJobDetailsType = Yup.InferType<typeof tempJobDetails>;
