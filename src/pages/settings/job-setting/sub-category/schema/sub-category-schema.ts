import * as yup from "yup";

const SubcategorySchema = yup.object().shape({
  industry: yup.string().required("This field is required"),
  category: yup.string().required("This field is required"),
  subcategory: yup.string().required("This field is required"),
  icon: yup
    .mixed<string | File>()
    .test("file-or-url", "Invalid icon", (value) => {
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
    }),
});

export const SubCategoryValidationSchema = SubcategorySchema;
export type SubCategorySchemaType = yup.InferType<typeof SubcategorySchema>;
