import ExtendedForm from "@/components/extended-components/ExtendedForm";
import useCreateOrientationInstitute from "../hooks/use-create-orientation-institute";
import OrientationInstituteForm from "./orientation-institute-form";

export default function CreateOrientationInstitute() {
  const { formik, isLoading } = useCreateOrientationInstitute();
  return (
    <ExtendedForm formik={formik} isSubmitting={isLoading}>
      <OrientationInstituteForm />
    </ExtendedForm>
  );
}
