import ExtendedForm from "@/components/extended-components/ExtendedForm";
import useCreateEducation from "./hooks/use-create-education";
import EducationInfoForm from "./form/education-info-form";

const CreateEducation = () => {
  const { formik, isEducationLoading: isLoading } = useCreateEducation();

  return (
    <ExtendedForm formik={formik} isSubmitting={isLoading}>
      <EducationInfoForm />
    </ExtendedForm>
  );
};
export default CreateEducation;
