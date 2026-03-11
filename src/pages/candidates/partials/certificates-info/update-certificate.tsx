import ExtendedForm from "@/components/extended-components/ExtendedForm";
import LoadingScreen from "@/components/reusable-component/LoadingScreen";
import useUpdateCertificate from "./hooks/use-update-certificate";
import CertificateInfoForm from "./form/certificate-info-form";

const UpdateCertificate = () => {
  const { formik, isLoading, isInitialLoading } = useUpdateCertificate();
  return (
    <ExtendedForm formik={formik} isSubmitting={isLoading}>
      {isInitialLoading ? <LoadingScreen /> : <CertificateInfoForm />}
    </ExtendedForm>
  );
};

export default UpdateCertificate;
