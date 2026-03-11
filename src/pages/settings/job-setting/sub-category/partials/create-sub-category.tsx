import ExtendedForm from "@/components/extended-components/ExtendedForm";
import SubCategoryForm from "./sub-category-form";
import useCreateSubCategory from "../hooks/use-create-sub-category";

const CreateSubCategory = () => {
  const { formik, isLoading, industries, categories } = useCreateSubCategory();
  return (
    <ExtendedForm formik={formik} isSubmitting={isLoading}>
      <SubCategoryForm categories={categories} industries={industries} />
    </ExtendedForm>
  );
};

export default CreateSubCategory;
