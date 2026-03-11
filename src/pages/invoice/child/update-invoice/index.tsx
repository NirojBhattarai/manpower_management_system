import PageHeader from "@/common/PageHeader";
import ExtendedForm from "@/components/extended-components/ExtendedForm";
import useUpdateInvoice from "./hooks/use-update-invoice";
import InvoiceForm from "../../partials/invoice-form";
import LoadingScreen from "@/components/reusable-component/LoadingScreen";

const UpdateInvoice = () => {
  const { formik, isInitialLoading, isLoading } = useUpdateInvoice();
  return (
    <div className="u-flex-child">
      <PageHeader title="Create Invoice" />
      <ExtendedForm formik={formik} isSubmitting={isLoading} className="mt-4">
        {isInitialLoading ? <LoadingScreen /> : <InvoiceForm />}
      </ExtendedForm>
    </div>
  );
};
export default UpdateInvoice;
