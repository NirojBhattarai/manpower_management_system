import { useFormikContext } from "formik";
import { InvoiceSchemaType } from "../schema/invoice-schema";
import { useCallback } from "react";

const useInvoiceForm = () => {
  const { values, setValues, validateForm, setTouched, touched } =
    useFormikContext<InvoiceSchemaType>();
  const isProductAvailable = values?.services?.length > 0;

  //   =================== Handle Add Product =======================
  const handleAddProduct = useCallback(async () => {
    // Force validation the form before adding it to the products array
    const error = await validateForm();
    const tempProductError = error?.tempProduct;
    if (tempProductError && Object.keys(tempProductError).length > 0) {
      setTouched({
        tempProduct: {
          service: true,
          quantity: true,
          rate: true,
          discount: true,
          vat: true,
        },
      });
      return;
    }
    // Add the product to products array
    setValues({
      ...values,
      services: [
        ...values.services,
        {
          service: values?.tempProduct?.service || "",
          quantity: values?.tempProduct?.quantity || "",
          rate: values?.tempProduct?.rate || "",
          discount: values?.tempProduct?.discount || "",
          vat: values?.tempProduct?.vat || false,
        },
      ],
      tempProduct: {
        service: "",
        quantity: "",
        discount: "",
        rate: "",
        vat: false,
      },
    });
    setTouched({
      tempProduct: {
        service: false,
        rate: false,
        discount: false,
        quantity: false,
        vat: false,
      },
    });
  }, [values, setValues]);

  //   =================== Handle Delete Product =======================
  const handleDeleteProduct = useCallback(
    async (index: number) => {
      setValues({
        ...values,
        services: values?.services?.filter((_, idx) => index !== idx),
      });
    },
    [values, setValues],
  );

  //   =================== Handle Edit Product =======================
  const handleEditProduct = useCallback(
    async (index: number) => {
      const updateProduct = values?.services[index];
      setValues({
        ...values,
        tempProduct: {
          service: updateProduct?.service,
          rate: updateProduct?.rate,
          quantity: updateProduct?.quantity,
          discount: updateProduct?.discount,
          vat: updateProduct?.vat,
        },
        editing_index: index,
      });
      setTouched({
        ...touched,
        tempProduct: {
          service: false,
          quantity: false,
          discount: false,
          rate: false,
          vat: false,
        },
      });
    },
    [values, setValues, setTouched],
  );

  //   =================== Handle Update Product =======================
  const handleUpdateProduct = useCallback(async () => {
    if (values?.editing_index === null || values?.editing_index === undefined)
      return;
    const errors = await validateForm();
    const tempProductError = errors.tempProduct;
    if (tempProductError && Object.keys(tempProductError).length > 0) {
      setTouched({
        ...touched,
        tempProduct: {
          service: false,
          discount: false,
          quantity: false,
          rate: false,
          vat: false,
        },
      });
      return;
    }
    const updateProduct = [...values?.services];
    updateProduct[values?.editing_index] = {
      service: values?.tempProduct?.service || "",
      discount: values?.tempProduct?.discount || "",
      quantity: values?.tempProduct?.quantity || "",
      rate: values?.tempProduct?.rate || "",
      vat: values?.tempProduct?.vat || false,
    };
    setValues({
      ...values,
      services: [...updateProduct],
      tempProduct: {
        service: "",
        quantity: "",
        rate: "",
        discount: "",
        vat: false,
      },
      editing_index: null,
    });
    setTouched({
      ...touched,
      tempProduct: {
        service: false,
        quantity: false,
        rate: false,
        discount: false,
        vat: false,
      },
    });
  }, [values, setValues]);

  //   =================== Handle Update Product =======================
  const handleCancelUpdateProduct = useCallback(() => {
    setValues({
      ...values,
      tempProduct: {
        service: "",
        discount: "",
        quantity: "",
        rate: "",
        vat: false,
      },
      editing_index: null,
    });
    setTouched({
      ...touched,
      tempProduct: {
        service: false,
        discount: false,
        quantity: false,
        rate: false,
        vat: false,
      },
    });
  }, [values, setValues]);

  // ===================== Calculate Tax Amount ======================
  const getTaxAmount = useCallback(() => {
    const quantity = Number(values?.tempProduct?.quantity ?? 0);
    const rate = Number(values?.tempProduct?.rate ?? 0);

    if (!values?.tempProduct?.vat) return "0.00";

    return (quantity * rate * 0.13).toFixed(2);
  }, [
    values?.tempProduct?.vat,
    values?.tempProduct?.quantity,
    values?.tempProduct?.rate,
  ]);

  //   ========================= Calculate Discount Amount ======================
  const getDiscountAmount = useCallback(() => {
    const quantity = Number(values?.tempProduct?.quantity ?? 0);
    const rate = Number(values?.tempProduct?.rate ?? 0);
    const discountPercent = Number(values?.tempProduct?.discount ?? 0);

    if (!discountPercent) return "0.00";

    const subtotal = quantity * rate;
    const discountAmount = subtotal * (discountPercent / 100);

    return discountAmount.toFixed(2);
  }, [
    values?.tempProduct?.quantity,
    values?.tempProduct?.rate,
    values?.tempProduct?.discount,
  ]);

  //   =========================== Is Editing ===============================
  const isEditing =
    typeof values.editing_index === "number" &&
    Number.isInteger(values.editing_index);

  return {
    handleAddProduct,
    handleDeleteProduct,
    handleEditProduct,
    handleUpdateProduct,
    handleCancelUpdateProduct,
    isProductAvailable,
    values,
    getTaxAmount,
    getDiscountAmount,
    isEditing,
  };
};
export default useInvoiceForm;
