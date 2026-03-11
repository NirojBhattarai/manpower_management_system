import {
  InvoiceSchemaType,
  invoiceValidationSchema,
} from "@/pages/invoice/schema/invoice-schema";
import { useNavigate, useParams } from "react-router-dom";
import useInvoiceDetails from "./use-invoice-details";
import { useFormik } from "formik";
import { useUpdateDataMutation } from "@/api/api";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import { ApiResponse } from "@/api/api.error";
import { handleResponse } from "@/utils/handleResponse";
import { PATH } from "@/constant/path";
import { Services } from "@/pages/invoice/interface/invoice-interfaces";

const useUpdateInvoice = () => {
  const { id } = useParams<{ id: string }>();
  const [updateInvoice, { isLoading }] = useUpdateDataMutation();
  const navigate = useNavigate();
  const { invoiceDetails, isLoading: isInitialLoading } = useInvoiceDetails({
    id: id ?? "",
  });
  const initialValues: InvoiceSchemaType = {
    jobseeker: invoiceDetails?.data?.jobseeker?.id || "",
    invoiceDate: invoiceDetails?.data?.invoiceDate || "",
    refNo: invoiceDetails?.data?.refNo || "",
    dueDate: invoiceDetails?.data?.dueDate || "",
    services:
      invoiceDetails?.data?.services?.map((item: Services) => ({
        service: item.service,
        quantity: item.quantity,
        rate: item.rate,
        discount: item.discount,
        vat: item.vat,
      })) || [],
    tempProduct: {
      service: "",
      discount: "",
      quantity: "",
      rate: "",
      vat: false,
    },
    editing_index: null,
  };

  const formik = useFormik({
    initialValues,
    validationSchema: invoiceValidationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { setErrors, resetForm }) => {
      const response = (await updateInvoice({
        url: endpoints.invoice.update.replace(":id", id ?? ""),
        invalidateTag: [apiTags.invoice.list, apiTags.invoice.details],
        data: values,
      })) as ApiResponse;

      handleResponse({
        response,
        setErrorCallBack: setErrors,
        handleOnSuccess: () => {
          navigate(PATH.invoice.index);
          resetForm();
        },
      });
    },
  });

  return { formik, isLoading, isInitialLoading };
};

export default useUpdateInvoice;
