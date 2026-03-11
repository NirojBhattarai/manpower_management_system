import useQuerryParams from "@/hooks/use-query-params";

const INSURANCE_TO_SHRAM_PARAMS = "insurance-to-shram";

const useInsuranceToShramModal = () => {
  const { updateQueryParams, deleteQueryParams, getQueryParams } =
    useQuerryParams();

  const isInsuranceToShram = !!getQueryParams(INSURANCE_TO_SHRAM_PARAMS);

  const handleOpenInsuranceToShram = () => {
    updateQueryParams({ [INSURANCE_TO_SHRAM_PARAMS]: "active" });
  };

  const handleCloseInsuranceToShram = () => {
    deleteQueryParams([INSURANCE_TO_SHRAM_PARAMS]);
  };

  return {
    isInsuranceToShram,
    handleOpenInsuranceToShram,
    handleCloseInsuranceToShram,
  };
};

export default useInsuranceToShramModal;
