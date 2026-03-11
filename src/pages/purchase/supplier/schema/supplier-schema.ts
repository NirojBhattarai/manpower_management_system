import * as Yup from "yup";

const SupplierSchema = Yup.object().shape({
  name: Yup.string().required("This field is required"),
  address: Yup.string().required("This field is required"),
  code: Yup.string().required("This field is required"),
  panNumber: Yup.string().required("This field is required"),
  phone: Yup.string().required("This field is required"),
  group: Yup.string().required("This field is required"),
});

export type SupplierSchemaType = Yup.InferType<typeof SupplierSchema>;
export const SupplierValidationSchema = SupplierSchema;
