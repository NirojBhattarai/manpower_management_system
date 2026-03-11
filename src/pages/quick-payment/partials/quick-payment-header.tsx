import PageHeader from "@/common/PageHeader";
import SearchFilter from "@/components/search-filter";
import { PATH } from "@/constant/path";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

const QuickPaymentHeader = () => {
  const navigate = useNavigate();
  const handleAddClick = useCallback(() => {
    navigate(PATH.quickPayment.create);
  }, []);
  return (
    <div>
      <PageHeader title="Quick Payment" />
      <SearchFilter dateFilter={false} handleAddClick={handleAddClick} />
    </div>
  );
};
export default QuickPaymentHeader;
