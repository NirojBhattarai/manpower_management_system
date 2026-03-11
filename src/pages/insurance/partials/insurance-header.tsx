import PageHeader from "@/common/PageHeader";
import useInsuranceToShramModal from "../hooks/use-insurance-to-shram-modal";
import SearchFilter from "@/components/search-filter";

const InsuranceHeader = () => {
  const { handleOpenInsuranceToShram } = useInsuranceToShramModal();
  return (
    <div>
      <PageHeader title="Insurance" />
      <SearchFilter
        dateFilter={false}
        moveToModule={{
          moduleName: "Labour Permit",
          handleClick: handleOpenInsuranceToShram,
        }}
      />
    </div>
  );
};

export default InsuranceHeader;
