import PageHeader from "@/common/PageHeader";
import useCreateInvoice from "./hooks/use-create-invoice";
import ExtendedForm from "@/components/extended-components/ExtendedForm";
import InvoiceForm from "../../partials/invoice-form";

const CreateInvoice = () => {
  const { formik, isLoading } = useCreateInvoice();
  console.log(formik.errors, "Formik");
  return (
    <div className="u-flex-child">
      <PageHeader title="Create Invoice" />
      <ExtendedForm formik={formik} isSubmitting={isLoading} className="mt-4">
        <InvoiceForm />
      </ExtendedForm>
    </div>
  );
};
export default CreateInvoice;
