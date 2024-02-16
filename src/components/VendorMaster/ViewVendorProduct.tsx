import React, { useContext, useEffect, useMemo, useState } from "react";
import { GetVendorProduct } from "../../servicesapi/Vendorapi";
import { useNavigate } from "react-router-dom";
import { ApplicationContext, ApplicationContextType } from "../../App";
import { useDispatch, useSelector } from "react-redux";
import {
  CenterContainer,
  FloatingButton,
  Table,
  TableRow,
  TableTitle,
  TableTitleBar,
  TableTitleRow,
} from "../order/OrderStyledComponents";
import Pagination from "../Navigation/Pagination/Pagination";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import ConfimDialoague from "../Common/ConfimDialoague";
import { setloading } from "../../store/action/actions";
let PageSize = 10;
const ViewVendorProduct = () => {
  const [rowdata, setRowData] = useState([]);
  const [open, setopen] = useState("");
  const history = useNavigate();
  const dispatch = useDispatch();
  const { VendorData, customization, UserRoleData }: any = useSelector(
    (state) => state
  );
  const { messages, updateMessages, updateLoading, updateLoadingMessage } =
    useContext(ApplicationContext) as ApplicationContextType;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalData, settotalData] = useState(0);
  const columnname = [
    { field: "id", headerName: "S. No.", flex: 1 },
    { field: "Categoryname", headerName: "Category Name", flex: 1 },
    { field: "Productname", headerName: "Product Name", flex: 1 },
  ];
  const renderTableData = () => {
    if (customization.isLoading) {
      updateLoadingMessage("Fetching Data...");
      updateLoading(true);
    } else {
      updateLoadingMessage("Fetching Data...");
      updateLoading(false);
    }
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    let data = rowdata;
    settotalData(data.length);
    return data.slice(firstPageIndex, lastPageIndex);
  };
  const currentTableData = useMemo(() => {
    return renderTableData();
  }, [currentPage, customization.isLoading, rowdata]);
  const [heading, SetHeading]: any = useState([]);
  useEffect(() => {
    dispatch(setloading(true));
    GetVendorProduct().then((res: any) => {
      let count: number = 0;
      let data: any = [];
      res.map((ele: any) => {
        if (ele.subCategory.length > 0) {
          ele.subCategory.map((val: any) => {
            count++;
            data.push({
              Categoryname: ele.name,
              Productname: val.name,
              id: count,
            });
          });
        } else {
          count++;
          data.push({
            Categoryname: ele.name,
            Productname: "",
            id: count,
          });
        }
      });
      console.log(data);
      dispatch(setloading(false));
      setRowData(data);
    });
  }, []);
  const renderRow = (data: any) => {
    if (data.length > 0)
      return data.map((val: any, i: number) => {
        return (
          <TableRow key={i} className="row">
            <div className={`col-1`}>{i + 1}</div>
            <div className={`col`}>{val.Categoryname}</div>
            <div className={`col`}>{val.Productname}</div>
            {/* {heading?.TableColumn?.length > 0 ? (
                  Object.keys(heading?.TableColumn).map((Pkey) =>
                    Object.keys(val).map((key, index) =>
                      heading?.TableColumn[Pkey].id === key ? (
                        <div className={`col${index === 0 ? "-1" : ""}`}>
                          {val[key]}
                        </div>
                      ) : Object.keys(heading.TableColumn).length - 1 === index &&
                        heading.TableColumn[Pkey].id === "Action" ? (
                        <div className="col">
                          <FaRegEdit role="button" size={20} onClick={()=>handleEditData(val)}/>
                          <MdDeleteOutline role="button" size={20} onClick={() => handleConfirmBox(val)}/>
                        </div>
                      ) : (
                        <></>
                      )
                    )
                  )
                ) : (
                  <></>
                )} */}
          </TableRow>
        );
      });
  };
  const handleConfirmDialogue = (type: boolean) => {
    // if (type) {
    //   if (heading.id === "licencetype") dispatch(deleteLicencedata(open));
    //   else if (heading.id === "communicationtype")
    //     dispatch(deleteCommunicationdata(open));
    //   else if (heading.id === "role") dispatch(deleteroledata(open));
    //   else if (heading.id === "accessrole")
    //     dispatch(deleteaccessroledata(open));
    //   else dispatch(deletestatedata(open));
    // }
    // setopen("");
    // renderTableData()
  };
  return (
    <CenterContainer>
      <Table className="table mb-5 mt-4">
        <div className="d-grid">
          <TableTitleRow>
            <TableTitleBar>
              <TableTitle>Vendor Product</TableTitle>
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
              {columnname?.length > 0 ? (
                columnname?.map((val: any, i: number) => {
                  return (
                    <div key={i} className={`col${i === 0 ? "-1" : ""}`}>
                      <b>{val.headerName}</b>
                    </div>
                  );
                })
              ) : (
                <></>
              )}
            </TableRow>
            {currentTableData?.length == 0 && (
              <TableRow className="d-flex justify-content-center">
                No items...
              </TableRow>
            )}

            {renderRow(currentTableData)}

            <Pagination
              className="pagination-bar"
              currentPage={currentPage}
              totalCount={totalData}
              pageSize={PageSize}
              onPageChange={(page: number) => setCurrentPage(page)}
            />
          </div>
        </div>
      </Table>
      {open !== "" ? (
        <ConfimDialoague
          handleClick={(type: any) => handleConfirmDialogue(type)}
          msg="Do you really want to delete ?"
        />
      ) : (
        <></>
      )}

      <FloatingButton
        title={`Add Vendor Product`}
        onClick={() => {
          history(`/viewvendorproduct/add`);
        }}
      >
        +
      </FloatingButton>
    </CenterContainer>
  );
};

export default ViewVendorProduct;
