import * as Yup from "yup";

export type OrientationStatusType = "attended" | "not-attended" | "scheduled";
export const OrientationStatus: OrientationStatusType[] = [
  "scheduled",
  "attended",
  "not-attended",
];

const OrientationSchema = Yup.object().shape({
  instituteName: Yup.string().required("This field is required"),
  orientationDate: Yup.string().required("This field is required"),
});

const UpdateOrientationSchema = Yup.object().shape({
  instituteName: Yup.string().required("This field is required"),
  orientationDate: Yup.string().required("This field is required"),
  orientationExpireDate: Yup.string().required("This field is required"),
  orientationStatus: Yup.string().required("This field is required"),
});

export type OrientationSchemaType = Yup.InferType<typeof OrientationSchema>;
export const OrientationValidationSchema = OrientationSchema;

export type UpdateOrientationSchemaType = Yup.InferType<
  typeof UpdateOrientationSchema
>;
export const UpdateOrientationValidationSchema = UpdateOrientationSchema;
