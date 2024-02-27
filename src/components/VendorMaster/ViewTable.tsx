import React, { useContext, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCommunicationdata,
  deleteLicencedata,
  deletestatedata,
  getCommunicationdata,
  getLicencedata,
  getStatedata,
} from "../../store/action/vendorAction";
import {
  deleteaccessroledata,
  deleteroledata,
  getaccessroledata,
  getalluserdata,
  getroledata,
} from "../../store/action/userAction";
import { HeadingName } from "./columnField";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Pagination from "../Navigation/Pagination/Pagination";
import ConfimDialoague from "../Common/ConfimDialoague";
import { ApplicationContext, ApplicationContextType } from "../../App";
import {
  CenterContainer,
  FloatingButton,
  Table,
  TableRow,
  TableTitle,
  TableTitleBar,
  TableTitleRow,
} from "../order/OrderStyledComponents";
let PageSize = 10;
const ViewTable = () => {
  const dispatch = useDispatch();
  const { VendorData, customization, UserRoleData }: any = useSelector(
    (state) => state
  );
  const history = useNavigate();
  const { messages, updateMessages, updateLoading, updateLoadingMessage } =
    useContext(ApplicationContext) as ApplicationContextType;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalData, settotalData] = useState(0);
  const [open, setopen] = useState("");
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
    let data = location.pathname.split("/").includes("licencetype")
      ? VendorData.licenceTypeData
      : location.pathname.split("/").includes("state")
      ? VendorData.stateData
      : location.pathname.split("/").includes("role")
      ? UserRoleData.RoleData
      : location.pathname.split("/").includes("accessrole")
      ? UserRoleData.AccessRoleData
      : location.pathname.split("/").includes("user")
      ? UserRoleData.UserData
      : VendorData.communicationTypeData;
    settotalData(data.length);
    return data.slice(firstPageIndex, lastPageIndex);
  };
  const currentTableData = useMemo(() => {
    return renderTableData();
  }, [location.pathname, currentPage, customization.isLoading]);
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
    else if (location.pathname.split("/").includes("user"))
      dispatch(getalluserdata());
    SetHeading(
      ...HeadingName.filter(
        (id: any) => id.id === location.pathname.split("/")[1]
      )
    );
  }, [location.pathname]);
  const handleEditData = (id: any) => {
    if (location.pathname.split("/").includes("licencetype")) id = id?.id;
    else if (location.pathname.split("/").includes("state")) id = id?.state_id;
    else if (location.pathname.split("/").includes("role")) id = id?.id;
    else if (location.pathname.split("/").includes("accessrole")) id = id?.id;
    else id = id?.com_id;

    if (id !== "") {
      let data = "";
      if (location.pathname.split("/").includes("licencetype")) {
        for (let i = 0; i < VendorData.licenceTypeData.length; i++) {
          if (VendorData.licenceTypeData[i].Licence_id === id) {
            data = VendorData.licenceTypeData[i];
            break;
          }
        }
      } else if (location.pathname.split("/").includes("state")) {
        for (let i = 0; i < VendorData.stateData.length; i++) {
          if (VendorData.stateData[i].state_id === id) {
            data = VendorData.stateData[i];
            break;
          }
        }
      } else if (location.pathname.split("/").includes("role")) {
        for (let i = 0; i < UserRoleData.RoleData.length; i++) {
          if (UserRoleData.RoleData[i].id === id) {
            data = UserRoleData.RoleData[i];
            break;
          }
        }
      } else if (location.pathname.split("/").includes("accessrole")) {
        for (let i = 0; i < UserRoleData.AccessRoleData.length; i++) {
          if (UserRoleData.AccessRoleData[i].id === id) {
            data = UserRoleData.AccessRoleData[i];
            break;
          }
        }
      } else {
        for (let i = 0; i < VendorData.communicationTypeData.length; i++) {
          if (VendorData.communicationTypeData[i].com_id === id) {
            data = VendorData.communicationTypeData[i];
            break;
          }
        }
      }
      heading?.formfield?.map((ele: any) => {
        heading.initialValue[ele.name] = data[ele.name];
      });

      history(`/${heading.id}/add/${id}`, { state: { formData: data } });
    } else {
      heading?.formfield?.map((ele: any) => {
        heading.initialValue[ele.name] = "";
      });
    }
    let formtype = location.pathname.split("/")[2];
    // dispatch(setDialogueview(formtype));
  };
  useEffect(() => {
 if (
      customization.Message !== "" &&
      customization.Message !== undefined&&
      customization.Message !== "Save"
    ) {
      updateMessages([
        {
          title: "Error !!",
          message: customization.Message,
        },
        ...messages,
      ]);
    }
  }, [customization.isLoading]);

  const renderRow = (data: any) => {
    if (data.length > 0)
      return data.map((val: any, i: number) => {
        return (
          <TableRow key={i} className="row">
            {heading?.TableColumn?.length > 0 ? (
              Object.keys(heading?.TableColumn).map((Pkey) =>
                Object.keys(val).map((key, index) =>
                  heading?.TableColumn[Pkey].id === key ? (
                    <div className={`col${index === 0 ? "-1" : ""}`}>
                      {val[key]}
                    </div>
                  ) : Object.keys(heading.TableColumn).length - 1 === index &&
                    heading.TableColumn[Pkey].id === "Action" ? (
                    <div className="col">
                      <FaRegEdit
                        role="button"
                        size={20}
                        onClick={() => handleEditData(val)}
                      />
                      <MdDeleteOutline
                        role="button"
                        size={20}
                        onClick={() => handleConfirmBox(val)}
                      />
                    </div>
                  ) : (
                    <></>
                  )
                )
              )
            ) : (
              <></>
            )}
          </TableRow>
        );
      });
  };
  const handleConfirmBox = (id: any) => {
    if (location.pathname.split("/").includes("licencetype")) id = id?.id;
    else if (location.pathname.split("/").includes("state")) id = id?.state_id;
    else if (location.pathname.split("/").includes("role")) id = id?.name;
    else if (location.pathname.split("/").includes("accessrole"))
      id = id?.subrole;
    else id = id?.com_id;
    setopen(id);
  };
  const handleConfirmDialogue = (type: boolean) => {
    if (type) {
      if (heading.id === "licencetype") dispatch(deleteLicencedata(open));
      else if (heading.id === "communicationtype")
        dispatch(deleteCommunicationdata(open));
      else if (heading.id === "role") dispatch(deleteroledata(open));
      else if (heading.id === "accessrole")
        dispatch(deleteaccessroledata(open));
      else dispatch(deletestatedata(open));
    }
    setopen("");
    renderTableData();
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
                    <div key={i} className={`col${i === 0 ? "-1" : ""}`}>
                      <b>{val.label}</b>
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

      {heading.id === "state" ? (
        ""
      ) : (
        <FloatingButton
          title={`Add ${heading?.label}`}
          onClick={() => {
            history(`/${heading.id}/add`);
          }}
        >
          +
        </FloatingButton>
      )}
    </CenterContainer>
  );
};

export default ViewTable;
