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
import { ControlledTextField, TextField } from "../../utils/InputGroup";
import { ApplicationContext, ApplicationContextType } from "../../../App";
import {
  AddCommunicationById,
  DeleteCommuncationbyVendorid,
  UpdateVendorcommunications,
} from "../../../servicesapi/Vendorapi";
import {
  UpdateCustomercommunications,
  addCustomercommunications,
} from "../../../servicesapi/Customerapi";

const Communication = (props: any) => {
  const {
    formFields,
    Vendordata,
    communicationType,
    communicatioonMethod,
    productD,
    setVendordata,
  } = props;
  const { messages, updateMessages, updateLoading, updateLoadingMessage } =
    useContext(ApplicationContext) as ApplicationContextType;
  let urlD =
    location.pathname.split("/")[location.pathname.split("/").length - 1];

  const onhandleChange = (e: any, type: string, i: number) => {
    const { name, value } = e.target;
    const data = [...Vendordata.communication];

    data[i][name] = value;
    let status = false;
    let count = 0;
    if (name === "product_id")
      props.communication.map((ele: any) => {
        if (ele.product_id === value) count++;
      });
    if (count > 1) status = true;
    if (status)
      updateMessages([
        {
          title: "Error !!",
          message: "Product name cannot be same",
        },
        ...messages,
      ]);
    else props.setVendordata({ ...Vendordata, [type]: data });
  };
  const handleAddClick = () => {
    let status = false;

    Vendordata.communication.map((ele: any, i: number) => {
      if (
        (ele.type === "" || ele.detail === "") &&
        (ele.productId !== 0 || i === 0)
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
      if (props.edit) {
        let data = [...Vendordata.communication];
        data.push({
          type: "",
          detail: "",
          product_id: 0,
        });
        props.setCommunicaion(data);
      } else
        props.setVendordata({
          ...Vendordata,
          ["communication"]: [
            ...Vendordata.communication,
            {
              type: "",
              detail: "",
              product_id: 0,
              method: "",
            },
          ],
        });
    }
  };
  const handleEditSubmit = () => {
    let status = false;
    Vendordata.communication.map((ele: any, i: number) => {
      if (
        (ele.type === "" || ele.detail === "") &&
        (ele.productId !== 0 || i === 0)
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
      if (location.pathname.split("/").includes("vendor")) {
        let CreateComData: any = [];
        let UpdateComData: any = [];
        Vendordata.communication.map((ele: any) => {
          if (ele.id === undefined) CreateComData.push(ele);
          else UpdateComData.push(ele);
        });
        CreateComData.map((ele: any) => {
          AddCommunicationById(ele, urlD);
        });

        UpdateVendorcommunications(UpdateComData, urlD).then(
          (res) => {
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
                ["communication"]: props.communication,
              });
              props.seteditModalOpen((prev: any) => !prev);
              props.setEditData(!props.editData);
            } else {
              res.json().then((res) =>
                updateMessages([
                  {
                    title: "Errpr !!",
                    message: res,
                  },
                  ...messages,
                ])
              );
            }
          }
        );
      } else {
        let CreateComData: any = [];
        let UpdateComData: any = [];
        props.communication.map((ele: any) => {
          if (ele.id === undefined) CreateComData.push(ele);
          else UpdateComData.push(ele);
        });
        CreateComData.map((ele: any) => {
          addCustomercommunications(ele, props.selecetedVedorId);
        });
        UpdateCustomercommunications(
          UpdateComData,
          props.selecetedVedorId
        ).then((res: any) => {
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
              ["communication"]: props.communication,
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
    }
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
          {Vendordata?.communication?.length > 0 ? (
            Vendordata?.communication.map((val: any, idx: number) => {
              console.log("val", val);

              return (
                <div
                  className="container-fluid card border-0 mt-2"
                  key={"contact"}
                >
                  {idx !== 0 ? (
                    <DeleteRowButton
                      onClick={() => {
                        DeleteCommuncationbyVendorid(val.id).then((res)=>{})
                        let temp = Vendordata.communication;
                        temp.splice(idx, 1);
                        setVendordata({ ...Vendordata, communication: temp });
                      }}
                    >
                      X
                    </DeleteRowButton>
                  ) : (
                    <></>
                  )}
                  <TableRow className="row pt-0">
                    {formFields.formFields.map((item: any) => {
                      console.log("item", item);

                      return (
                        <>
                          {idx === 0 && item.name === "product_id" ? (
                            <></>
                          ) : item.type === "select" ? (
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
                                    onhandleChange(e, "communication", idx);
                                  }}
                                >
                                  <option
                                    defaultChecked
                                    disabled
                                    value={item.name === "product_id" ? 0 : ""}
                                  >
                                    -select-
                                  </option>
                                  {item.name === "method"
                                    ? communicatioonMethod.map(
                                        (items: any, i: number) => (
                                          <option key={i} value={items.name}>
                                            {items.name}
                                          </option>
                                        )
                                      )
                                    : item.name === "product_id"
                                    ? productD.map((items: any, i: number) => (
                                        <option key={i} value={items.id}>
                                          {items.name}
                                        </option>
                                      ))
                                    : communicationType.map(
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
                                type="text"
                                value={val[item.name]}
                                required
                                onChange={(e: any) => {
                                  onhandleChange(e, "communication", idx);
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
                          {idx == props.Vendordata.communication.length - 1 && (
                            <AddRowButton
                              className="addBtn"
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
        <></>
      )}
    </>
  );
};

export default Communication;
