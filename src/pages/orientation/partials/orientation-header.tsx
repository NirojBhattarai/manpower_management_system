import PageHeader from "@/common/PageHeader";
import SearchFilter from "@/components/search-filter";
import useOrientationToInsuranceModal from "../hooks/use-orientation-to-insurance-modal";

const OrientationHeader = () => {
  const { handleOpenOrientationToInsurance } = useOrientationToInsuranceModal();
  return (
    <div>
      <PageHeader title="Orientation" />
      <SearchFilter
        dateFilter={false}
        moveToModule={{
          moduleName: "Insurance",
          handleClick: handleOpenOrientationToInsurance,
        }}
      />
    </div>
  );
};

export default OrientationHeader;
