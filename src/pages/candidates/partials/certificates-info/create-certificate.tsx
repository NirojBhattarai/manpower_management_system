import ExtendedForm from "@/components/extended-components/ExtendedForm";
import useCreateCertificate from "./hooks/use-create-certificate";
import CertificateInfoForm from "./form/certificate-info-form";

const CreateCertificate = () => {
  const { formik, isCertificateLoading: isLoading } = useCreateCertificate();

  return (
    <ExtendedForm formik={formik} isSubmitting={isLoading}>
      <CertificateInfoForm />
    </ExtendedForm>
  );
};
export default CreateCertificate;
