import useQuerryParams from "@/hooks/use-query-params";

const SHRAM_TO_TICKET_PARAMS = "shram-to-ticket";

const useShramToTicketModal = () => {
  const { updateQueryParams, deleteQueryParams, getQueryParams } =
    useQuerryParams();

  const isShramToTicket = !!getQueryParams(SHRAM_TO_TICKET_PARAMS);

  const handleOpenShramToTicket = () => {
    updateQueryParams({ [SHRAM_TO_TICKET_PARAMS]: "active" });
  };

  const handleCloseShramToTicket = () => {
    deleteQueryParams([SHRAM_TO_TICKET_PARAMS]);
  };

  return {
    isShramToTicket,
    handleOpenShramToTicket,
    handleCloseShramToTicket,
  };
};

export default useShramToTicketModal;
