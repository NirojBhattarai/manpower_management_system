import useQuerryParams from "@/hooks/use-query-params";

const MOVE_TO_JOB_OFFER_PARAMS = "move-to-job-offer";
const useMoveToJobOfferModal = () => {
  const { getQueryParams, updateQueryParams, deleteQueryParams } =
    useQuerryParams();

  const handleOpenMoveToJobOffer = () => {
    updateQueryParams({ [MOVE_TO_JOB_OFFER_PARAMS]: "active" });
  };

  const handleCloseMoveToJobOffer = () => {
    deleteQueryParams([MOVE_TO_JOB_OFFER_PARAMS]);
  };
  return {
    handleOpenMoveToJobOffer,
    handleCloseMoveToJobOffer,
    isMoveToJobOfferOpen: !!getQueryParams(MOVE_TO_JOB_OFFER_PARAMS),
  };
};
export default useMoveToJobOfferModal;
