import ExtendedForm from "@/components/extended-components/ExtendedForm";
import useCreateMedicalInstitute from "../hooks/use-create-medical-institute";
import MedicalInstituteForm from "./medical-institute-form";

export default function CreateMedicalInstitute() {
  const { formik, isLoading } = useCreateMedicalInstitute();
  return (
    <ExtendedForm formik={formik} isSubmitting={isLoading}>
      <MedicalInstituteForm />
    </ExtendedForm>
  );
}
