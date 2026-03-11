import * as Yup from "yup";

const MedicalSchema = Yup.object().shape({
  hospital: Yup.string().required("This field is required"),
  examDate: Yup.string().required("This field is required"),
});

const UpdateMedicalSchema = Yup.object().shape({
  hospital: Yup.string().required("This field is required"),
  examDate: Yup.string().required("This field is required"),
  reportFile: Yup.mixed<string | File>().required("This field is required"),
  remarks: Yup.string().required("This field is required"),
  medicalStatus: Yup.string().required("This field is required"),
});

export type MedicalSchemaType = Yup.InferType<typeof MedicalSchema>;
export const MedicalValidationSchema = MedicalSchema;

export type UpdateMedicalSchemaType = Yup.InferType<typeof UpdateMedicalSchema>;
export const UpdateMedicalValidationSchema = UpdateMedicalSchema;
