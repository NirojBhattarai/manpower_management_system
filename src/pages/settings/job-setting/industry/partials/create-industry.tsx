import ExtendedForm from "@/components/extended-components/ExtendedForm";
import IndustryForm from "@/pages/settings/job-setting/industry/partials/industry-form";
import useCreateIndustry from "../hooks/use-create-industry";

const CreateIndustry = () => {
  const { formik, isLoading } = useCreateIndustry();
  return (
    <ExtendedForm formik={formik} isSubmitting={isLoading}>
      <IndustryForm />
    </ExtendedForm>
  );
};

export default CreateIndustry;
