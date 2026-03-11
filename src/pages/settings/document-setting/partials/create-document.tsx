import ExtendedForm from "@/components/extended-components/ExtendedForm";
import useCreateDocument from "../hooks/use-create-document";
import DocumentForm from "./document-form";

const CreateDocument = () => {
  const { formik, isLoading, countries } = useCreateDocument();

  return (
    <ExtendedForm formik={formik} isSubmitting={isLoading}>
      <DocumentForm countries={countries} />
    </ExtendedForm>
  );
};
export default CreateDocument;
