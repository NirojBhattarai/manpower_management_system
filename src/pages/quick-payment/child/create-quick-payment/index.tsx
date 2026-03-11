import PageHeader from "@/common/PageHeader";
import ExtendedForm from "@/components/extended-components/ExtendedForm";
import QuickPaymentForm from "../../partials/quick-payment-form";
import useCreateQuickPayment from "./hooks/use-create-quick-payment";

const CreateQuickPayment = () => {
  const quickPayment = useCreateQuickPayment();
  return (
    <div className="u-flex-child">
      <PageHeader title="Create Quick Payment" />
      <ExtendedForm
        formik={quickPayment.formik}
        isSubmitting={quickPayment.isLoading}
        className="mt-4"
      >
        <QuickPaymentForm />
      </ExtendedForm>
    </div>
  );
};

export default CreateQuickPayment;
