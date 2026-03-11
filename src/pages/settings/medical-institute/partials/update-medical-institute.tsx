import ExtendedForm from "@/components/extended-components/ExtendedForm";
import MedicalInstituteForm from "./medical-institute-form";
import LoadingScreen from "@/components/reusable-component/LoadingScreen";
import useUpdateMedicalInstitute from "../hooks/use-update-medical-insttitute";

export default function UpdateMedicalInstitute() {
  const { formik, isLoading, isInitialLoading } = useUpdateMedicalInstitute();
  return (
    <ExtendedForm formik={formik} isSubmitting={isLoading}>
      {isInitialLoading ? <LoadingScreen /> : <MedicalInstituteForm />}
    </ExtendedForm>
  );
}
