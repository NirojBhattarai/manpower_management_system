import ExtendedForm from "@/components/extended-components/ExtendedForm";
import useUpdateDocument from "../hooks/use-update-document";
import LoadingScreen from "@/components/reusable-component/LoadingScreen";
import DocumentForm from "./document-form";

const UpdateDocument = () => {
  const { formik, isLoading, isInitialLoading, countries } =
    useUpdateDocument();
  return (
    <ExtendedForm formik={formik} isSubmitting={isLoading}>
      {isInitialLoading ? (
        <LoadingScreen />
      ) : (
        <DocumentForm countries={countries} />
      )}
    </ExtendedForm>
  );
};

export default UpdateDocument;
