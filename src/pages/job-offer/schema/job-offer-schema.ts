import * as yup from "yup";

const jobOfferSchema = yup.object().shape({
  offerDate: yup.string().required("This field is required"),
  joiningDate: yup.string().required("This field is required"),
});

const updateJobOfferSchema = yup.object().shape({
  offerDate: yup.string().required("This field is required"),
  joiningDate: yup.string().required("This field is required"),
  offerLetterNo: yup.string().required("This field is required"),
  offeredDocument: yup
    .mixed<string | File>()
    .required("This field is required"),
  status: yup.string().required("This field is required"),
});

export type JobOfferSchemaType = yup.InferType<typeof jobOfferSchema>;
export const JobOfferValidationSchema = jobOfferSchema;

export type updateJobOfferSchemaType = yup.InferType<
  typeof updateJobOfferSchema
>;
export const UpdateJobOfferValidationSchema = updateJobOfferSchema;
