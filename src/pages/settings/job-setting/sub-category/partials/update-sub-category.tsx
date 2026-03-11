import ExtendedForm from "@/components/extended-components/ExtendedForm";
import SubCategoryForm from "./sub-category-form";
import useUpdateSubCategory from "../hooks/use-update-sub-category";
import LoadingScreen from "@/components/reusable-component/LoadingScreen";

const UpdateSubCategory = () => {
  const { formik, isLoading, isInitialLoading, industries, categories } =
    useUpdateSubCategory();
  return (
    <ExtendedForm formik={formik} isSubmitting={isLoading}>
      {isInitialLoading ? (
        <LoadingScreen />
      ) : (
        <SubCategoryForm categories={categories} industries={industries} />
      )}
    </ExtendedForm>
  );
};

export default UpdateSubCategory;
