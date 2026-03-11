import useQuerryParams from "@/hooks/use-query-params";

const VISA_TO_ORIENTATION_PARAMS = "visa-to-orientation";
const useVisaToOrientationModal = () => {
  const { updateQueryParams, deleteQueryParams, getQueryParams } =
    useQuerryParams();
  const isVisaToOrientation = !!getQueryParams(VISA_TO_ORIENTATION_PARAMS);
  const handleOpenVisaToOrientation = () => {
    updateQueryParams({ [VISA_TO_ORIENTATION_PARAMS]: "active" });
  };
  const handleCloseVisaToOrientation = () => {
    deleteQueryParams([VISA_TO_ORIENTATION_PARAMS]);
  };
  return {
    isVisaToOrientation,
    handleOpenVisaToOrientation,
    handleCloseVisaToOrientation,
  };
};
export default useVisaToOrientationModal;
