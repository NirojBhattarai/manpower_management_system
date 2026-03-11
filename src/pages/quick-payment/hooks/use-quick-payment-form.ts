import { QuickPaymentSchema } from "@/pages/quick-payment/schema/quick-payment-schema";
import { useFormikContext } from "formik";
import { useCallback } from "react";

const useQuickPaymentForm = () => {
  const { values, setValues, setTouched, validateForm } =
    useFormikContext<QuickPaymentSchema>();

  //   =============================== Add Temporary Payment to Payment Array ==========================
  const handleAddPayment = useCallback(async () => {
    const errors = await validateForm();
    const tempPaymentError = errors?.temp_payment;
    if (tempPaymentError && Object.keys(tempPaymentError).length > 0) {
      setTouched({
        temp_payment: {
          account: true,
          amount: true,
          description: true,
        },
      });
      return;
    }
    setValues({
      ...values,
      payments: [
        ...values?.payments,
        {
          account: values?.temp_payment?.account || "",
          amount: values?.temp_payment?.amount || "",
          description: values?.temp_payment?.description || "",
        },
      ],
      temp_payment: {
        account: "",
        amount: "",
        description: "",
      },
    });
    setTouched({
      temp_payment: {
        account: false,
        amount: false,
        description: false,
      },
    });
  }, [values, setValues, setTouched, validateForm]);

  // ============================== Edit Payment Item ===============================
  const handleEditPayment = useCallback(
    (index: number) => {
      if (index === null || index === undefined) return;

      setValues({
        ...values,
        temp_payment: {
          account: values?.payments[index]?.account,
          amount: values?.payments[index]?.amount,
          description: values?.payments[index]?.description,
        },
        edit_index: index,
      });
    },
    [values, setValues, setTouched],
  );

  // ============================== Update Payment Item ===============================
  const handleUpdatePayment = useCallback(async () => {
    if (values?.edit_index === null || values?.edit_index === undefined) return;
    const errors = await validateForm();
    const tempPaymentError = errors?.temp_payment;
    if (tempPaymentError && Object.keys(tempPaymentError).length > 0) {
      setTouched({
        temp_payment: {
          account: true,
          amount: true,
          description: true,
        },
      });
      return;
    }

    const updatePayment = [...values.payments];
    updatePayment[values?.edit_index] = {
      account: values?.temp_payment?.account || "",
      amount: values?.temp_payment?.amount || "",
      description: values?.temp_payment?.description || "",
    };

    setValues({
      ...values,
      payments: [...updatePayment],
      temp_payment: {
        account: "",
        amount: "",
        description: "",
      },
      edit_index: null,
    });
    setTouched({
      temp_payment: {
        account: false,
        amount: false,
        description: false,
      },
    });
  }, [values, setValues, setTouched]);

  // ============================== Cancel Update Payment Item ===============================
  const handleCancelUpdatePayment = useCallback(() => {
    setValues({
      ...values,
      temp_payment: {
        account: "",
        amount: "",
        description: "",
      },
      edit_index: null,
    });
  }, [values, setValues]);

  // ============================== Handle Delete Payment Item ===============================
  const handleDeletePayment = useCallback(
    (index: number) => {
      setValues((prev) => ({
        ...prev,
        payments: prev.payments?.filter((_, idx) => idx !== index),
      }));
    },
    [setValues],
  );

  // ======================== Is Editing Mode ====================
  const isEditMode =
    values?.edit_index !== null && values?.edit_index !== undefined;

  return {
    handleAddPayment,
    handleEditPayment,
    handleUpdatePayment,
    handleCancelUpdatePayment,
    handleDeletePayment,
    isEditMode,
  };
};

export default useQuickPaymentForm;
