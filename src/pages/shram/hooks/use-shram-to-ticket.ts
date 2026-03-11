import { usePostDataMutation } from "@/api/api";
import { useFormik } from "formik";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import { handleResponse } from "@/utils/handleResponse";
import { ApiResponse } from "@/api/api.error";
import { IShramListItem } from "../interface/shram-interface";
import useShramToTicketModal from "./use-shram-to-ticket-modal";
import {
  TicketSchemaType,
  TicketValidationSchema,
} from "@/pages/ticket/schema/ticket-schema";

interface IMoveToTicket {
  candidates?: IShramListItem[];
}
const useShramToTicket = ({ candidates }: IMoveToTicket) => {
  const [moveToTicket, { isLoading }] = usePostDataMutation();
  const { handleCloseShramToTicket } = useShramToTicketModal();

  const initialValues: TicketSchemaType = {
    airlineName: "",
    flightNumber: "",
    departureDate: "",
  };

  const formik = useFormik<TicketSchemaType>({
    initialValues,
    validationSchema: TicketValidationSchema,
    onSubmit: async (values, { setErrors, resetForm }) => {
      if (candidates?.length === 0) return;

      const payload = candidates?.map((item) => {
        return {
          ...values,
          jobseeker: item?.jobseeker?.id,
          jobVacancy: item?.jobVacancy?.id,
          jobTitle: item?.jobTitle?.id,
          company: item?.company?.id,
        };
      });
      const response = (await moveToTicket({
        data: payload,
        url: endpoints.ticket.create,
        invalidateTag: [
          apiTags.ticket.details,
          apiTags.ticket.list,
          apiTags.shram.list,
          apiTags.candidates.appliedJob.list,
        ],
      })) as ApiResponse;
      handleResponse({
        response,
        setErrorCallBack: setErrors,
        handleOnSuccess: () => {
          resetForm();
          handleCloseShramToTicket();
        },
      });
    },
  });

  return { formik, isLoading };
};

export default useShramToTicket;
