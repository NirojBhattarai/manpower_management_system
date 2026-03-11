import ExtendedForm from "@/components/extended-components/ExtendedForm";
import CategoryForm from "./category-form";
import useCreateCategory from "../hooks/use-create-category";

const CreateCategory = () => {
  const { formik, isLoading, industries } = useCreateCategory();
  return (
    <ExtendedForm formik={formik} isSubmitting={isLoading}>
      <CategoryForm industries={industries} />
    </ExtendedForm>
  );
};
export default CreateCategory;
