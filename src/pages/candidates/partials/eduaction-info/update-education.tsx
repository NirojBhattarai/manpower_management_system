import ExtendedForm from "@/components/extended-components/ExtendedForm";
import LoadingScreen from "@/components/reusable-component/LoadingScreen";
import useUpdateEducation from "./hooks/use-update-education";
import EducationInfoForm from "./form/education-info-form";

const UpdateEducation = () => {
  const { formik, isLoading, isInitialLoading } = useUpdateEducation();
  return (
    <ExtendedForm formik={formik} isSubmitting={isLoading}>
      {isInitialLoading ? <LoadingScreen /> : <EducationInfoForm />}
    </ExtendedForm>
  );
};

export default UpdateEducation;
