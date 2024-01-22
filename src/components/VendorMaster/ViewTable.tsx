import React, { useEffect, useState } from "react";
import {
  CenterContainer,
  Table,
  TableRow,
  TableTitle,
  TableTitleBar,
  TableTitleRow,
} from "../order/OrderStyledComponents";
import Pagination from "../utils/PaginationComponent";
import { useDispatch, useSelector } from "react-redux";
import {
  getCommunicationdata,
  getLicencedata,
  getStatedata,
} from "../../store/action/vendorAction";
import { getaccessroledata, getroledata } from "../../store/action/userAction";
import { HeadingName } from "./columnField";
const ViewTable = () => {
  const dispatch = useDispatch();
  const { VendorData, customization, UserRoleData }: any = useSelector(
    (state) => state
  );
  const [heading, SetHeading] = useState();
  useEffect(() => {
    if (customization.isOpen.includes("licencetype"))
      dispatch(getLicencedata());
    else if (customization.isOpen.includes("communicationtype"))
      dispatch(getCommunicationdata());
    else if (customization.isOpen.includes("state")) dispatch(getStatedata());
    else if (customization.isOpen.includes("role")) dispatch(getroledata());
    else if (customization.isOpen.includes("accessrole"))
      dispatch(getaccessroledata());
    SetHeading(
      ...HeadingName.filter((id) => id.id === location.pathname.split("/")[2])
    );
  }, [customization.isOpen[0]]);
  return (
    <CenterContainer>
      <Table className="table mb-5">
        <div className="d-grid">
          <TableTitleRow>
            <TableTitleBar>
              <TableTitle>Orders</TableTitle>
              {/* <AddButton
              onClick={() => {
                history("/orders/add");
              }}>
              +
            </AddButton> */}
            </TableTitleBar>
          </TableTitleRow>
        </div>
        <div className="d-flex">
          <div className="container-fluid card">
            <TableRow className="row">
              <div
                className="col-1"
                // onClick={() => handleSort("orderid", "orderIdSortIcon")}
              >
                <b>
                  Order Id&nbsp;
                  {/* <i id="sortIcon" className={icons["orderIdSortIcon"]}></i> */}
                </b>
              </div>
              <div
                className="col-3"
                // onClick={() => handleSort("clientid", "clientIdSortIcon")}
              >
                <b>
                  Client Id/ Name&nbsp;
                  {/* <i id="sortIcon" className={icons["clientIdSortIcon"]}></i> */}
                </b>
              </div>
              <div
                className="col-3"
                // onClick={() =>
                //   handleSort(
                //     "clientreferencenumber",
                //     "clientReferenceNumberSortIcon"
                //   )
                // }
              >
                <b>
                  Client Reference Number&nbsp;
                  <i
                    id="sortIcon"
                    // className={icons["clientReferenceNumberSortIcon"]}
                  ></i>
                </b>
              </div>
              <div
                className="col-1"
                // onClick={() => handleSort("loanid", "loanIdSortIcon")}
              >
                <b>
                  Loan id&nbsp;
                  {/* <i id="sortIcon" className={icons["loanIdSortIcon"]}></i> */}
                </b>
              </div>
              <div
                className="col-3"
                // onClick={() =>
                //   handleSort("propertyAddress", "propertyAddressSortIcon")
                // }
              >
                <b>
                  Property Address&nbsp;
                  {/* <i
                    id="sortIcon"
                    className={icons["propertyAddressSortIcon"]}
                  ></i> */}
                </b>
              </div>
              <div className="col-1">
                <b>Action</b>
              </div>
            </TableRow>
            {/* {orderPage.length == 0 && (
              <TableRow className="d-flex justify-content-center">
                No items...
              </TableRow>
            )} */}
            {/* {orderPage.map((item, idx) => (
              <TableRow key={"order" + idx} className="row">
                <div className="col-1">{item.orderid}</div>
                <div className="col-3">{item.clientid}</div>
                <div className="col-3">{item.clientreferencenumber}</div>
                <div className="col-1">{item.loanid}</div>
                <div className="col-3">{getAddress(item)}</div>
                <div className="col-1">
                  <i
                    className="bi mx-1 bi-pencil-square pointer"
                    onClick={() => {
                      history("/orders/edit/" + item.orderid);
                    }}
                  ></i>
                  <i
                    className="bi mx-1 bi-clipboard-plus pointer"
                    onClick={() => {
                      history("/orders/property/" + item.orderid);
                    }}
                  ></i>
                </div>
              </TableRow>
            ))}
            <Pagination
              totalPage={totalPage}
              data={orderPage}
              pageSize={pageSize}
              setPageSize={setPageSize}
              currPage={currPage}
              setCurrPage={setCurrPage}
            /> */}
          </div>
        </div>
      </Table>
    </CenterContainer>
  );
};

export default ViewTable;
