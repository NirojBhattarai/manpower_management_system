import ExtendedForm from "@/components/extended-components/ExtendedForm";
import useCreateJobTitle from "../hooks/use-create-job-title";
import JobTitleForm from "./job-title-form";

const CreateJobTitle = () => {
  const { formik, isLoading, categories, industries, subcategories } =
    useCreateJobTitle();
  return (
    <ExtendedForm formik={formik} isSubmitting={isLoading}>
      <JobTitleForm
        categories={categories}
        subCategories={subcategories}
        industries={industries}
      />
    </ExtendedForm>
  );
};

export default CreateJobTitle;
