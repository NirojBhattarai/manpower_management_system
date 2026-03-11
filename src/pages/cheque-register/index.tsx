import { Outlet } from "react-router-dom";
import ChequeRegisterHeaderTable from "./partials/cheque-register-header-table";

export default function ChequeRegister() {
  return (
    <div className="u-flex-parent">
      <Outlet />
      <ChequeRegisterHeaderTable />
    </div>
  );
}
