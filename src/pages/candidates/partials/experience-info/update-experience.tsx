import ExtendedForm from "@/components/extended-components/ExtendedForm";
import LoadingScreen from "@/components/reusable-component/LoadingScreen";
import useUpdateExperience from "./hooks/use-update-experience";
import ExperienceInfoForm from "./form/experience-info-form";

const UpdateExperience = () => {
  const { formik, isLoading, isInitialLoading } = useUpdateExperience();
  return (
    <ExtendedForm formik={formik} isSubmitting={isLoading}>
      {isInitialLoading ? <LoadingScreen /> : <ExperienceInfoForm />}
    </ExtendedForm>
  );
};

export default UpdateExperience;
