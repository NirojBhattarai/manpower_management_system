import PageHeader from "@/common/PageHeader";
import SearchFilter from "@/components/search-filter";
import useShramToTicketModal from "../hooks/use-shram-to-ticket-modal";

const ShramHeader = () => {
  const { handleOpenShramToTicket } = useShramToTicketModal();
  return (
    <div>
      <PageHeader title="Labour Permit" />
      <SearchFilter
        dateFilter={false}
        moveToModule={{
          moduleName: "Ticket",
          handleClick: handleOpenShramToTicket,
        }}
      />
    </div>
  );
};

export default ShramHeader;
