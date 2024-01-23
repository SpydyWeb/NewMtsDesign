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
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
const ViewTable = () => {
  const dispatch = useDispatch();
  const { VendorData, customization, UserRoleData }: any = useSelector(
    (state) => state
  );
  const [heading, SetHeading]: any = useState([]);
  useEffect(() => {
    if (location.pathname.split("/").includes("licencetype"))
      dispatch(getLicencedata());
    else if (location.pathname.split("/").includes("communicationtype"))
      dispatch(getCommunicationdata());
    else if (location.pathname.split("/").includes("state"))
      dispatch(getStatedata());
    else if (location.pathname.split("/").includes("role"))
      dispatch(getroledata());
    else if (location.pathname.split("/").includes("accessrole"))
      dispatch(getaccessroledata());

    SetHeading(
      ...HeadingName.filter(
        (id: any) => id.id === location.pathname.split("/")[1]
      )
    );
  }, [location.pathname]);

  const renderRow = (data: any) => {
    let count = heading?.TableColumn?.length;
    console.log("====================================");
    console.log(data, location.pathname.split("/"));
    console.log("====================================");

    if (data.length > 0)
      return data.map((val: any, i: number) => {
        return (
          <TableRow key={i} className="row">
            {Object.keys(heading.TableColumn).map((Pkey) =>
              Object.keys(val).map((key, index) =>
                heading.TableColumn[Pkey].id === key ? (
                  <div className={`col${index===0?"-1":""}`}>{val[key]}</div>
                ) : Object.keys(heading.TableColumn).length - 1 === index &&
                  heading.TableColumn[Pkey].id === "Action" ? (
                    <div className="col">
                    <FaRegEdit role="button" size={20}/>
                    <MdDeleteOutline role="button" size={20}/>
                  </div>
                ) : (
                  <></>
                )
              )
            )}
          </TableRow>
        );
      });
  };
  return (
    <CenterContainer>
      <Table className="table mb-5 mt-4">
        <div className="d-grid">
          <TableTitleRow>
            <TableTitleBar>
              <TableTitle>{heading?.label}</TableTitle>
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
              {heading?.TableColumn?.length > 0 ? (
                heading?.TableColumn?.map((val: any, i: number) => {
                  return (
                    <div key={i} className={`col${i===0?"-1":""}`}>
                      <b>{val.label}</b>
                    </div>
                  );
                })
              ) : (
                <></>
              )}
            </TableRow>
            {/* {orderPage.length == 0 && (
              <TableRow className="d-flex justify-content-center">
                No items...
              </TableRow>
            )} */}

            {renderRow(
              location.pathname.split("/").includes("licencetype")
                ? VendorData.licenceTypeData
                : location.pathname.split("/").includes("state")
                ? VendorData.stateData
                : location.pathname.split("/").includes("role")
                ? UserRoleData.RoleData
                : location.pathname.split("/").includes("accessrole")
                ? UserRoleData.AccessRoleData
                : VendorData.communicationTypeData
            )}
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
