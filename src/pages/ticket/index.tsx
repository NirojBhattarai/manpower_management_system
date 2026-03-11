import TicketHeader from "./partials/ticket-header";
import TicketTable from "./partials/ticket-list";
import TicketModal from "./partials/ticket-modal";

const Ticket = () => {
  return (
    <div className="u-flex-parent">
      <TicketHeader />
      <TicketTable />
      <TicketModal />
    </div>
  );
};
export default Ticket;
