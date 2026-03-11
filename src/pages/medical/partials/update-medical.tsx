import ExtendedForm from "@/components/extended-components/ExtendedForm";
import LoadingScreen from "@/components/reusable-component/LoadingScreen";
import useUpdateMedical from "../hooks/use-update-medical";
import MedicalForm from "./medical-form";

const UpdateMedical = () => {
  const { formik, isInitialLoading, isLoading } = useUpdateMedical();
  return (
    <ExtendedForm formik={formik} isSubmitting={isLoading}>
      {isInitialLoading ? <LoadingScreen /> : <MedicalForm />}
    </ExtendedForm>
  );
};

export default UpdateMedical;
