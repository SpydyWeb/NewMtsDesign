import React, { useContext } from "react";
import {
  ErrorMessage,
  InputContainer,
  Table,
  TableTitle,
  TableTitleBar,
  TableTitleRow,
  UtilityButton,
} from "../../order/OrderStyledComponents";
import { TextField } from "../../utils/InputGroup";
import { UpdateCustomerIntegrationDetail } from "../../../servicesapi/Customerapi";
import { ApplicationContext, ApplicationContextType } from "../../../App";

const IntegrationDetail = (props: any) => {
  const { formFields,Vendordata } = props;
  let urlD =
    location.pathname.split("/")[location.pathname.split("/").length - 1];
  const { messages, updateMessages, updateLoading, updateLoadingMessage } =
    useContext(ApplicationContext) as ApplicationContextType;

  const handleEditSubmit = () => {
    let data = props.Vendordata.customer_Integration_details;
    delete data.updateDate;
    delete data.id;
    delete data.createdDate;
    data.additional_Detail=[
       
      ]
    // data["additionalDetail"] = props.Vendordata.additionalDetail;
    UpdateCustomerIntegrationDetail(data, urlD).then((res) => {
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
          ["customer_Integration_details"]:
            props.Vendordata.customer_Integration_details,
        //   ["additionalDetail"]: props.Vendordata.additionalDetail,
        });
        // props.seteditModalOpen((prev) => !prev);
        // props.setEditData(!props.editData);
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
                return item.type === "text"||item.type === "password"  ? (
                  <InputContainer
                    key={index}
                    width={item.width}
                    className={`px-1 ${item.require ? "required-field" : ""}`}
                  >
                    <TextField
                      id={item.name}
                      name={item.name}
                      label={item.label}
                      type={item.type}
                        value={Vendordata['customer_Integration_details'][item.name]}
                        onChange={(e) => {
                            props.setVendordata({
                                ...props.Vendordata,
                                ['customer_Integration_details']: {
                                    ...props.Vendordata.customer_Integration_details,
                                    [e.target.name]: e.target.value
                                }
                            });
                        }}
                    />
                    <ErrorMessage id="loanIdError"></ErrorMessage>
                  </InputContainer>
                ) : (
                  <></>
                );
              })}
            </div>
          </div>
        </div>
      </Table>
      {isNaN(parseInt(urlD)) === false ? (
        <div className="d-flex justify-content-end">
          <UtilityButton
            style={{ width: "200px" }}
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

export default IntegrationDetail;
