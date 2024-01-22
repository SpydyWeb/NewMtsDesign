import { TableRow } from "./OrderStyledComponents";

const OrderInfo = (
  <div className="">
    <TableRow className="row">
      <div className="col-6">
        <b>Order Id</b>
      </div>
      <div className="col-6">2600648488</div>
    </TableRow>
    <TableRow className="row">
      <div className="col-6">
        <b>Loan Id</b>
      </div>
      <div className="col-6">11207</div>
    </TableRow>
    <TableRow className="row">
      <div className="col-6">
        <b>Borrower</b>
      </div>
      <div className="col-6">Bhupendra Patel</div>
    </TableRow>
    <TableRow className="row">
      <div className="col-6">
        <b>Property Address</b>
      </div>
      <div className="col-6">1902 Glendell Road, Harrisburg, PA, 17112 Dauphin</div>
    </TableRow>
    <TableRow className="row">
      <div className="col-6">
        <b>Client</b>
      </div>
      <div className="col-6">8881110-MID PENN BANK</div>
    </TableRow>
    <div className="row">
      <div className="col-6">
        <b>Branch</b>
      </div>
      <div className="col-6">MID PENN BANK</div>
    </div>
  </div>
);

export default OrderInfo;
