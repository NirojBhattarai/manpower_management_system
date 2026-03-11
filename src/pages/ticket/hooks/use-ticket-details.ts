import { useGetDataQuery } from "@/api/api";
import { endpoints } from "@/api/endpoints";
import { apiTags } from "@/constant/tag";
import { TicketDetailsResponse } from "../interface/ticket-interface";

const useTicketDetails = ({ id }: { id: string | null | undefined }) => {
  const { data, isLoading } = useGetDataQuery<{
    data: TicketDetailsResponse;
    isLoading: boolean;
  }>(
    {
      url: endpoints.ticket.update.replace(":id", id ?? ""),
      tag: apiTags.ticket.details,
    },
    {
      skip: !id,
    },
  );

  return { ticketDetails: data, isLoading };
};
export default useTicketDetails;
