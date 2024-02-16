import React, { useContext, useEffect } from "react";
import {
  ErrorMessage,
  InputContainer,
  Switch,
  Table,
  TableTitle,
  TableTitleBar,
  TableTitleRow,
  UtilityButton,
} from "../../order/OrderStyledComponents";
import { Form } from "react-bootstrap";
import { TextField } from "../../utils/InputGroup";
import { ApplicationContext, ApplicationContextType } from "../../../App";
import { Getvendorbyid, UpdateVendor } from "../../../servicesapi/Vendorapi";
import { Updatecustomer } from "../../../servicesapi/Customerapi";
import { useDispatch } from "react-redux";
import { setloading } from "../../../store/action/actions";

const Additional = (props: any) => {
  const { formFields, Vendordata, setVendordata } = props;
  const { messages, updateMessages, updateLoading, updateLoadingMessage } =
    useContext(ApplicationContext) as ApplicationContextType;
    const dispatch=useDispatch()
  let urlD =
    location.pathname.split("/")[location.pathname.split("/").length - 1];
  useEffect(() => {
    if (isNaN(parseInt(urlD)) === false) {
      dispatch(setloading())
      Getvendorbyid(urlD).then((res: any) => {
        setVendordata(res);
        dispatch(setloading())
      });
    }
  }, []);
  const onhandleChange = (e: any, type = "") => {
    const value = type === "switch" ? e.target.checked : e.target.value;
    const { name } = e.target;
    console.log(e);

    props.setVendordata({ ...Vendordata, [name]: value });
  };
  const handleEditSubmit = () => {
    if (location.pathname.split("/").includes("vendor")) {
      UpdateVendor(props.Vendordata).then((res: any) => {
        if (res.status === 200) {
          updateMessages([
            {
              title: "Success !!",
              message: "Data updated succsessfully",
            },
            ...messages,
          ]);

          props.setVendordata({
            ...props.Vendordata,
            ["assignmentNote"]: props.Vendordata.assignmentNote,
            new_Assignment: props.Vendordata.new_Assignment,
            qcRejection: props.Vendordata.qcRejection,
            dailyReminder: props.Vendordata.dailyReminder,
            profileReminder: props.Vendordata.profileReminder,
          });
          props.seteditModalOpen((prev) => !prev);
          props.setEditData(!props.editData);
        } else {
          res.json().then((res: any) =>
            updateMessages([
              {
                title: "Error !!",
                message: res,
              },
              ...messages,
            ])
          );
        }
      });
    } else {
      Updatecustomer(props.Vendordata).then((res: any) => {
        if (res.status === 200) {
          updateMessages([
            {
              title: "Success !!",
              message: "Data updated succsessfully",
            },
            ...messages,
          ]);
          props.setVendorDetail({
            ...props.vendorDetail,
            assignment: props.Vendordata.assignment,
            in_QC_Review: props.Vendordata.in_QC_Review,
            inspection: props.Vendordata.inspection,
            order_Confirmation: props.Vendordata.order_Confirmation,
          });
          props.seteditModalOpen((prev) => !prev);
          props.setEditData(!props.editData);
        } else {
          res.json().then((res: any) =>
            updateMessages([
              {
                title: "Error !!",
                message: res,
              },
              ...messages,
            ])
          );
        }
      });
    }
  };
  return (
    <>
      <Table className="table mt-3">
        <div
          className="d-grid"
          // onClick={() => handleCollapse()}
        >
          <TableTitleRow>
            <TableTitleBar>
              <TableTitle>{formFields.tabName}</TableTitle>
            </TableTitleBar>
          </TableTitleRow>
        </div>
        <div id="clientFormSection" className="displaySection">
          <div className="container-fluid card border-0">
            <div className="row">
              {formFields.formFields.map((item: any, index: number) => {
                return (
                  <div key={index} className="d-flex">
                    <InputContainer
                      key={index}
                      width={"20%"}
                      className={`px-1 d-flex align-items-center`}
                    >
                      <Switch
                        type="switch"
                        id="custom-switch"
                        name={item.Checkname}
                        label={item.Checkedlabel}
                        checked={Vendordata[item.Checkname]}
                        onChange={(e: any) => {
                          onhandleChange(e, "switch");
                        }}
                      />
                    </InputContainer>
                    <InputContainer
                      key={index}
                      width={"20%"}
                      className={`px-1`}
                    >
                      <TextField
                        id={item.Textname}
                        name={item.Textname}
                        label={item.Textlabel}
                        type="text"
                        value={Vendordata[item.Textname]}
                        onChange={(e: any) => {
                          onhandleChange(e);
                        }}
                        //   onBlur={(e) => {
                        //     if (tooltip.valid && e.target.value.length > 3)
                        //       setTooltip({
                        //         isshow: false,
                        //         valid: true,
                        //       });
                        //   }}
                      />
                      <ErrorMessage id="loanIdError"></ErrorMessage>
                    </InputContainer>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Table>
      {isNaN(parseInt(urlD)) === false ? (
        <div className="d-flex justify-content-end">
          <UtilityButton
            style={{ width: "200px", marginTop: "3rem" }}
            onClick={() => handleEditSubmit()}
          >
            Save & Update
          </UtilityButton>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Additional;
