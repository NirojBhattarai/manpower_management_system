import { useUpdateDataMutation } from "@/api/api";
import { useFormik } from "formik";
import { apiTags } from "@/constant/tag";
import { endpoints } from "@/api/endpoints";
import { useUpdateModal } from "@/hooks/use-update-modal";
import { ApiResponse } from "@/api/api.error";
import { handleResponse } from "@/utils/handleResponse";
import useTicketDetails from "./use-ticket-details";
import {
  TicketValidationSchema,
  UpdateTicketSchemaType,
} from "../schema/ticket-schema";

const useUpdateTicket = () => {
  const [updateTicket, { isLoading }] = useUpdateDataMutation();
  const { handleCloseModal, updateId } = useUpdateModal();
  const { ticketDetails, isLoading: isInitialLoading } = useTicketDetails({
    id: updateId,
  });

  const initialValues: UpdateTicketSchemaType = {
    airlineName: ticketDetails?.data?.airlineName || "",
    flightNumber: ticketDetails?.data?.flightNumber || "",
    departureDate: ticketDetails?.data?.departureDate || "",
    flightStatus: ticketDetails?.data?.flightStatus || "",
    ticketFile: ticketDetails?.data?.ticketFile || "",
  };

  const formik = useFormik<UpdateTicketSchemaType>({
    initialValues,
    validationSchema: TicketValidationSchema,
    enableReinitialize: true,
    validateOnMount: true,
    onSubmit: async (values, { setErrors, resetForm }) => {
      const formData = new FormData();
      formData.append("airlineName", values.airlineName);
      formData.append("flightNumber", values.flightNumber);
      formData.append("departureDate", values.departureDate);
      formData.append("flightStatus", values.flightStatus);
      formData.append("ticketFile", values.ticketFile);
      const response = (await updateTicket({
        data: formData,
        url: endpoints.ticket.update.replace(":id", updateId ?? ""),
        invalidateTag: [apiTags.ticket.details, apiTags.ticket.list],
      })) as ApiResponse;
      handleResponse({
        response,
        setErrorCallBack: setErrors,
        handleOnSuccess: () => {
          resetForm();
          handleCloseModal();
        },
      });
    },
  });

  return {
    formik,
    isLoading,
    isInitialLoading,
  };
};

export default useUpdateTicket;
