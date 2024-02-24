import React, { useContext, useEffect, useState } from "react";
import {
  CenterContainer,
  Table,
  TableRow,
  TableTitle,
  TableTitleBar,
  TableTitleRow,
} from "../order/OrderStyledComponents";
import { useNavigate } from "react-router-dom";
import {
  CreateMapping,
  GetRole,
  GetsubRole,
} from "../../servicesapi/Userroleapi";
import { ApplicationContext, ApplicationContextType } from "../../App";
import { CancelButton, SaveButton } from "../order/orderProperty/OrderPropertyStyledComponents";
import { useDispatch } from "react-redux";
import { setloading } from "../../store/action/actions";

const AddRoleDefination = () => {
  const { messages, updateMessages, updateLoading, updateLoadingMessage } =
    useContext(ApplicationContext) as ApplicationContextType;
const dispatch=useDispatch()
  const [accessRoleData, setAccessroleData] = useState({
    role: [],
    subroles: [],
  });
  const Navigate = useNavigate();
  const [roleid, setRoleid] = useState(false);
  const [allRole, setAllRole] = useState([]);
  const [subrole, setsubrole] = useState([]);
  useEffect(() => {
    dispatch(setloading());
    GetRole().then((res) => {
        dispatch(setloading());
      setAllRole(res);
    });
    dispatch(setloading());
    GetsubRole().then((res) => {
        dispatch(setloading());
      setsubrole(res);
    });
  }, []);
  const onChangehandler = (evt: any, type: any) => {
    if (type === "role") {
      if (evt.target.checked) {
        let data = accessRoleData.role;
        data.push(evt.target.name);
        setAccessroleData({
          ...accessRoleData,
          role: data,
        });
      } else {
        let data = accessRoleData.role;
        data = data.filter((ele) => {
          return ele !== evt.target.name;
        });
        setAccessroleData({
          ...accessRoleData,
          role: data,
        });
      }
    } else {
      if (evt.target.checked) {
        let data = accessRoleData.subroles;
        data.push(evt.target.name);
        setAccessroleData({
          ...accessRoleData,
          subroles: data,
        });
      } else {
        let data = accessRoleData.subroles;
        data = data.filter((ele) => {
          return ele !== evt.target.name;
        });
        setAccessroleData({
          ...accessRoleData,
          subroles: data,
        });
      }
    }
  };
  const onClickhandler = () => {
    if (accessRoleData.role.length === 0 || accessRoleData.role.length === 0) {
      updateMessages([
        {
          title: "Error !!",
          message: "Please Select role or access role",
        },
        ...messages,
      ]);
    } else {
      CreateMapping(accessRoleData).then((res: any) => {
        if (res.status === 200) {
          updateMessages([
            {
              title: "Success !!",
              message: "Mapping created successfully",
            },
            ...messages,
          ]);
          setAccessroleData({ role: [], subroles: [] });
          setRoleid(false);

          Navigate("/viewaccessrole");
        } else {
          updateMessages([
            {
              title: "Error !!",
              message: "Something wrong",
            },
            ...messages,
          ]);
        }
      });
    }
  };
  return (<>
    <CenterContainer>
      <Table className="table mt-3">
        <div
          className="d-grid"
          // onClick={() => handleCollapse()}
        >
          <TableTitleRow>
            <TableTitleBar>
              <TableTitle>Access Role</TableTitle>
            </TableTitleBar>
          </TableTitleRow>
        </div>
        <div id="clientFormSection" className="displaySection">
          <div className="container-fluid card border-0">
            <div className="d-flex align-items-center" style={{gap:'10px'}}>
              {allRole.length > 0
                ? allRole.map((ele:any, indx:number) => {
                    return (
                      <div className="d-flex align-items-center" key={indx}>
                        <input
                          type={"checkbox"}
                          Checked={roleid}
                          name={ele.name}
                          onClick={(evt) => onChangehandler(evt, "role")}
                        />{" "}
                        <span>{ele.name}</span>
                      </div>
                    );
                  })
                : ""}
            </div>
          </div>
        </div>
      </Table>
     
    </CenterContainer>
    <CenterContainer>
    <Table className="table mt-3">
        <div
          className="d-grid"
          // onClick={() => handleCollapse()}
        >
          <TableTitleRow>
            <TableTitleBar>
              <TableTitle>Access Role Defination</TableTitle>
            </TableTitleBar>
          </TableTitleRow>
        </div>
        <div id="clientFormSection" className="displaySection">
          <div className="container-fluid card border-0">
            <div className="d-flex align-items-center" style={{gap:'10px'}}>
              {subrole.length > 0
                ? subrole.map((ele:any, indx:number) => {
                    return (
                      <div className="d-flex align-items-center" key={indx}>
                        <input
                          type={"checkbox"}
                          Checked={roleid}
                          name={ele.subrole}
                          onClick={(evt) => onChangehandler(evt, "subrole")}
                        />{" "}
                        <span>{ele.subrole}</span>
                      </div>
                    );
                  })
                : ""}
            </div>
          </div>
        </div>
      </Table>
    </CenterContainer>
    <TableRow className="border-0 mt-4">
                  <CancelButton
                    onClick={() => {
                    //   resetForm();
                    Navigate(`/viewaccessrole`);
                    }}
                  >
                    Cancel
                  </CancelButton>
                  <SaveButton onClick={onClickhandler} className="float-end">
                    Save
                  </SaveButton>
                </TableRow>
    </>

  );
};

export default AddRoleDefination;
