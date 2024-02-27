import React, { useContext, useEffect, useState } from "react";
import {
  CenterContainer,
  Table,
  TableRow,
  TableTitle,
  TableTitleBar,
  TableTitleRow,
  CancelButton,
  SaveButton,
} from "../order/OrderStyledComponents";
import { useNavigate } from "react-router-dom";
import {
  CreateMapping,
  GetRole,
  GetsubRole,
} from "../../servicesapi/Userroleapi";
import { ApplicationContext, ApplicationContextType } from "../../App";
import { useDispatch } from "react-redux";
import { setloading } from "../../store/action/actions";

const AddRoleDefination = () => {
  const { messages, updateMessages, updateLoading, updateLoadingMessage } =
    useContext(ApplicationContext) as ApplicationContextType;
  const dispatch = useDispatch();
  const [accessRoleData, setAccessroleData]: any = useState({
    role: [],
    subroles: [],
  });
  const Navigate = useNavigate();
  const [roleid, setRoleid]: any = useState(false);
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
    console.log("hitt", evt.target, type, accessRoleData.role);

    if (type === "role") {
      let data: any = accessRoleData.role;
      if (data.includes(evt) === false) {
        data.push(evt);
        setAccessroleData({
          ...accessRoleData,
          role: data,
        });
      } else {
        let data = accessRoleData.role;
        data = data.filter((ele: any) => {
          return ele !== evt;
        });
        setAccessroleData({
          ...accessRoleData,
          role: data,
        });
      }
    } else {
      let data: any = accessRoleData.subroles;
      if (data.includes(evt) === false) {
        data.push(evt);
        setAccessroleData({
          ...accessRoleData,
          subroles: data,
        });
      } else {
        let data = accessRoleData.subroles;
        data = data.filter((ele: any) => {
          return ele !== evt;
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
  return (
    <>
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
              <div
                className="d-flex align-items-center"
                style={{ gap: "10px" }}
              >
                {allRole.length > 0
                  ? allRole.map((ele: any, indx: number) => {
                      return (
                        <div className="d-flex align-items-center" key={indx}>
                          <input
                            checked={accessRoleData.role.includes(ele.name)}
                            name={ele.name}
                            onChange={(evt) =>
                              onChangehandler(ele.name, "role")
                            }
                            type="checkbox"
                          />
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
              <div
                className="d-flex align-items-center"
                style={{ gap: "10px" }}
              >
                {subrole.length > 0
                  ? subrole.map((ele: any, indx: number) => {
                      return (
                        <div className="d-flex align-items-center" key={indx}>
                          <input
                            type={"checkbox"}
                            checked={accessRoleData.subroles.includes(ele.subrole)}
                            name={ele.subrole}
                            onClick={(evt) =>
                              onChangehandler(ele.subrole, "subrole")
                            }
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
