import React, { useContext } from "react";
import {
  AddRowButton,
  DeleteRowButton,
  ErrorMessage,
  InputContainer,
  Table,
  TableRow,
  TableTitle,
  TableTitleBar,
  TableTitleRow,
  UtilityButton,
} from "../../order/OrderStyledComponents";
import { TextField } from "../../utils/InputGroup";
import { ApplicationContext, ApplicationContextType } from "../../../App";
import {
  AddVendorLicences,
  DeleteVendorLicences,
  UpdateVendorLicences,
} from "../../../servicesapi/Vendorapi";
import { CancelButton, SaveButton } from "../../order/orderProperty/OrderPropertyStyledComponents";

const Licence = (props: any) => {
  const { messages, updateMessages, updateLoading, updateLoadingMessage } =
    useContext(ApplicationContext) as ApplicationContextType;
  let urlD =
    location.pathname.split("/")[location.pathname.split("/").length - 1];

  const { formFields, Vendordata, allstate, licenceType,setActiveTab } = props;
  const handleAddClick = () => {
    let status = false;
    if (props?.edit)
      props.licences.map((ele: any) => {
        if (
          ele.firstName === "" ||
          ele.lastName === "" ||
          ele.licenceNo === "" ||
          ele.licenceType === "" ||
          ele.address === "" ||
          ele.expiry_Date === "" ||
          ele.issueDate === ""
        ) {
          status = true;
        }
      });
    else
      Vendordata.licences.map((ele: any) => {
        if (
          ele.firstName === "" ||
          ele.lastName === "" ||
          ele.licenceNo === "" ||
          ele.licenceType === "" ||
          ele.address === "" ||
          ele.expiry_Date === "" ||
          ele.issueDate === ""
        ) {
          status = true;
        }
      });
    if (status)
      updateMessages([
        {
          title: "Error !!",
          message: "Please fill all the mandatory fields",
        },
        ...messages,
      ]);
    else if (props?.edit)
      props.setLicence([
        ...props.licences,
        {
          firstName: "",
          lastName: "",
          licenceNo: "",
          licenceType: "",
          status: "",
          address: "",
          expiry_Date: "",
          issueDate: "",
          disciplinaryAction: "",
          note: "",
        },
      ]);
    else
      props.setVendordata({
        ...Vendordata,
        ["licences"]: [
          ...Vendordata.licences,
          {
            firstName: "",
            lastName: "",
            licenceNo: "",
            licenceType: "",
            status: "",
            address: "",
            expiry_Date: "",
            issueDate: "",
            disciplinaryAction: "",
            note: "",
          },
        ],
      });
  };

  const handlechangeLicense = (e: any, i: number) => {
    const { name, value } = e.target;
    const data = [...Vendordata?.licences];

    var q = new Date();
    var date = new Date(q.getFullYear(), q.getMonth(), q.getDate());

    if (name === "issueDate") {
      if (new Date(value) < date) {
        data[i][name] = value;
      } else {
        updateMessages([
          {
            title: "Error !!",
            message: "Issue date should be less than from today",
          },
          ...messages,
        ]);
      }
    } else data[i][name] = value;

    props.setVendordata({ ...Vendordata, ["licences"]: data });
  };
  const handleEditSubmit = () => {
    let status = false;
    Vendordata.licences.map((ele: any) => {
      if (
        ele.firstName === "" ||
        ele.lastName === "" ||
        ele.licenceNo === "" ||
        ele.licenceType === "" ||
        ele.address === "" ||
        ele.expiry_Date === "" ||
        ele.issueDate === "" ||
        ele.state === ""
      ) {
        status = true;
      }
    });
    if (status)
      updateMessages([
        {
          title: "Error !!",
          message: "Please fill all the mandatory fields",
        },
        ...messages,
      ]);
    else {
      let apistatus = false;
      console.log(Vendordata);

      Vendordata.licences.map((ele: any) => {
        if (ele.id !== undefined) {
          UpdateVendorLicences([ele], urlD).then((res: any) => {
            if (res.status === 200) {
              updateMessages([
                {
                  title: "Success !!",
                  message: "Licence updated succsessfully",
                },
                ...messages,
              ]);
              apistatus = true;
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
          delete ele.updateDate;
          delete ele.isDeleted;
          delete ele.createdDate;
          AddVendorLicences(ele, urlD).then((res) => {
            if (res.status === 200) {
              updateMessages([
                {
                  title: "Error !!",
                  message: "Licence updated succsessfully",
                },
                ...messages,
              ]);
              apistatus = true;
            } else {
              res.json().then((res) =>
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
      });

      if (apistatus) {
        // toast.success("Licence updated succsessfully");
        props.setVendordata({
          ...props.Vendordata,
          ["licences"]: props.licences,
        });
        props.seteditModalOpen((prev) => !prev);
      }
    }
  };
  const handleRemoveClick = (index:number) => {
    const list = props.licences;
    list.splice(index - 1, 1);

    props.setVendordata({ ...props.Vendordata, ['licences']: list });
};
  return (
    <>
      <Table className={"table mt-3 px-0"} key={"contacts"}>
        <div
          className="d-grid pointer"
          // onClick={() => handleCollapse()}
        >
          <TableTitleRow>
            <TableTitleBar>
              <TableTitle>{formFields.tabName}</TableTitle>
            </TableTitleBar>
          </TableTitleRow>
        </div>

        <div id="contactsSection" className="displaySection">
          {Vendordata?.licences?.length > 0 ? (
            Vendordata.licences.map((val: any, idx: number) => {
              return (
                <div
                  className="container-fluid card border-0 mt-2 ml-2"
                  key={"contact"}
                >
                  {Vendordata.licences.length > 1 && (
                    <DeleteRowButton
                    onClick={() => {
                      if (val.id !== undefined) {
                          DeleteVendorLicences(val.id).then((res) => {
                              if (res.status === 200) 
                              updateMessages([
                                {
                                  title: "Error !!",
                                  message: 'Data has been deleted successfully',
                                },
                                ...messages,
                              ]);
                          });
                      }
                      handleRemoveClick(idx);
                  }}
                    >
                      X
                    </DeleteRowButton>
                  )}
                  <TableRow className="row pt-0">
                    {formFields.formFields.map((item: any) => {
                      return (
                        <>
                          {item.type === "select" ? (
                            <InputContainer
                              key={idx}
                              width={item.width}
                              className={`px-1 ${
                                item.require ? "required-field" : ""
                              }`}
                            >
                              <div className="form-floating mt-1">
                                <select
                                  className="form-select"
                                  id="clientId"
                                  name={item.name}
                                  title={item.label}
                                  value={val[item.name]}
                                  defaultValue={"-select-"}
                                  required
                                  onChange={(e: any) => {
                                    handlechangeLicense(e, idx);
                                    //   onhandleChange(
                                    //     e,
                                    //     val?.isParent ? val?.isParent : "",
                                    //     idx
                                    //   );
                                  }}
                                >
                                  <option defaultChecked disabled value="">
                                    -select-
                                  </option>
                                  {item.name === "state"
                                    ? allstate.map((items: any, i: number) => (
                                        <option key={i} value={items.name}>
                                          {items.name}
                                        </option>
                                      ))
                                    : item.name === "status"
                                    ? ["Active", "Inactive"].map(
                                        (items: any, i: number) => (
                                          <option key={i} value={items}>
                                            {items}
                                          </option>
                                        )
                                      )
                                    : licenceType.map(
                                        (items: any, i: number) => (
                                          <option key={i} value={items.name}>
                                            {items.name}
                                          </option>
                                        )
                                      )}
                                </select>
                                <label htmlFor="clientId">{item.label}</label>
                              </div>
                              <ErrorMessage id="clientIdError"></ErrorMessage>
                            </InputContainer>
                          ) : (
                            <InputContainer
                              key={idx}
                              width={item.width}
                              className={`px-1 ${
                                item.require ? "required-field" : ""
                              }`}
                            >
                              <TextField
                                id={item.name}
                                name={item.name}
                                label={item.label}
                                type={item.type}
                                value={val[item.name]}
                                required
                                onChange={(e: any) => {
                                  handlechangeLicense(e, idx);
                                  // onhandleChange(
                                  //   e,
                                  //   val?.isParent ? val?.isParent : "",
                                  //   idx
                                  // );
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
                          )}

                          {/* <TableRow className="row pt-0"> */}
                          {idx == props.Vendordata.licences.length - 1 && (
                            <AddRowButton
                              className="addBtn shadow-1"
                              onClick={() => {
                                handleAddClick();
                              }}
                            >
                              +
                            </AddRowButton>
                          )}
                          {/* </TableRow> */}
                        </>
                      );
                    })}
                  </TableRow>
                </div>
              );
            })
          ) : (
            <></>
          )}
        </div>
      </Table>
      {isNaN(parseInt(urlD)) === false ? (
        <div className="d-flex justify-content-end">
          <UtilityButton
            style={{ width: "200px", marginTop: "3rem" }}
            onClick={() => {
              handleEditSubmit();
            }}
          >
            Save & Update
          </UtilityButton>
        </div>
      ) : (
        <div className="d-flex justify-content-between mt-5">
        <CancelButton onClick={() => {setActiveTab((prev: number) => prev - 1);}}>Back</CancelButton>
        <SaveButton onClick={()=> setActiveTab((prev:number) => prev + 1)} className="float-end">
          Next
        </SaveButton>
      </div>
      )}
    </>
  );
};

export default Licence;
