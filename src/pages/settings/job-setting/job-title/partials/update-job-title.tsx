import ExtendedForm from "@/components/extended-components/ExtendedForm";
import useUpdateJobTitle from "../hooks/use-update-job-title";
import LoadingScreen from "@/components/reusable-component/LoadingScreen";
import JobTitleForm from "./job-title-form";

const UpdateJobTitle = () => {
  const {
    formik,
    isLoading,
    isInitialLoading,
    categories,
    subcategories,
    industries,
  } = useUpdateJobTitle();
  return (
    <ExtendedForm formik={formik} isSubmitting={isLoading}>
      {isInitialLoading ? (
        <LoadingScreen />
      ) : (
        <JobTitleForm
          categories={categories}
          subCategories={subcategories}
          industries={industries}
        />
      )}
    </ExtendedForm>
  );
};

export default UpdateJobTitle;
