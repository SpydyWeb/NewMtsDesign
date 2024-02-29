import React, { useContext, useState } from "react";
import { Accordion } from "react-bootstrap";
import {
  ErrorMessage,
  InputContainer,
  Switch,
  UtilityButton,
  CancelButton,
  SaveButton,
} from "../../order/OrderStyledComponents";
import { TextField } from "../../utils/InputGroup";
import { useDispatch, useSelector } from "react-redux";
import ProductPricePopup from "./ProductPricePopup";
import { setDialogueview } from "../../../store/action/actions";
import { ApplicationContext, ApplicationContextType } from "../../../App";

const Product = (props: any) => {
  const { setActiveTab, setVendordata } = props;
  const [expanded, setexpanded] = useState();
  const { messages, updateMessages, updateLoading, updateLoadingMessage } =
    useContext(ApplicationContext) as ApplicationContextType;
  let urlD:any =
    location.pathname.split("/")[location.pathname.split("/").length - 1];

  const { customization }: any = useSelector((state: any) => state);
  const dispatch = useDispatch();
  const [viewData, setViewData] = useState({
    nation: [],
    state: [],
    county: [],
  });
  const [Productseletected, setProductseletected] = useState("");
  const [productid, setProductid] = useState();
  const [formType, setFormType] = useState(
    location.pathname === "/admin/viewvendor" ? "vendor" : "customer"
  );
  const handleNext = () => {
    let status = false;
    let count = 0;
    props.productD.map((ele:any) => {
      console.log();
      if (ele.selected === true) {
        count = 1;
      }
    });
    if (status || count === 0)
      updateMessages([
        {
          title: "Error !!",
          message: "Please fill all the mandatory fields",
        },
        ...messages,
      ]);
    else {
      setVendordata({ ...props.Vendordata, product: props.productD });
      setActiveTab((prev: number) => prev + 1);
    }
  };
  const handlechange = (
    e: any,
    indx: number,
    mainIndx: number,
    productid: number
  ) => {
    const { name, value } = e.target;
    const data = [...props.productD];
    for (let index = 0; index < data.length; index++) {
      if (data[index].id === productid) {
        if (name === "selected") data[index].selected = !data[index].selected;
        else if (name === "price1") data[index].price1 = +value;
        else if (name === "price2") data[index].price2 = +value;
        else if (name === "price3") data[index].price3 = +value;
        break;
      }
    }
    console.log(data);
    
    props.setProductD(data);
    const productdata = [...props.productdata];
    if (name === "selected")
      productdata[mainIndx].subCategory[indx].selected =
        !productdata[mainIndx].subCategory[indx].selected;
    else if (name === "price1")
      productdata[mainIndx].subCategory[indx].price1 = isNaN(value)
        ? ""
        : +value;
    else if (name === "price2")
      productdata[mainIndx].subCategory[indx].price2 = isNaN(value)
        ? ""
        : +value;
    else if (name === "price3")
      productdata[mainIndx].subCategory[indx].price3 = isNaN(value)
        ? ""
        : +value;
      console.log(productdata);
      
    props.setProductdata(productdata);
  };
  return (
    <>
      {customization.dialogueview !== "" ? (
        <ProductPricePopup
          selecetedVedorId={props.selecetedVedorId}
          setProductD={props.setProductD}
          productid={productid}
          productD={props.productD}
          formType={formType}
          Productseletected={Productseletected}
          setProductseletected={setProductseletected}
        />
      ) : (
        ""
      )}
      {/* {formType === 'customer' ? (
        <div
            className={`${
                props.edit ? (props.editType && props.editType === 'Profile' ? 'flex' : 'hidden') : 'flex'
            } flex-col md:flex-row gap-6 border-2 p-3  mb-10 rounded-xl bg-white relative border-sky-500`}
        >
            <div>
                <input type="file" onChange={(e) => handleUploadClick(e)} />
            </div>
            <div></div>
        </div>
    ) : (
        <></>
    )} */}

      <div>
        {props.productdata?.length>0?props.productdata.map((ele: any, indx: number) => {
          if (ele.subCategory && ele.subCategory.length > 0) {
            return (
              <>
                <Accordion defaultActiveKey={expanded}>
                  <Accordion.Item eventKey={indx.toString()}>
                    <Accordion.Header>{ele.name}</Accordion.Header>
                    <Accordion.Body>
                      <div>
                        {ele.subCategory.map((val: any, i: number) => {
                          let selected;
                          if (val.productPriceList === null) {
                            selected = null;
                          } else
                            selected = val.productPriceList[0]?.cityStateType;

                          return (
                            // <AccordionDetails>
                            //     <Typography>
                            <div className="row">
                              <InputContainer
                                width={"40%"}
                                className={`px-1 d-flex align-items-center`}
                              >
                                <Switch
                                  type="switch"
                                  id="custom-switch"
                                  name="selected"
                                  label={val.name}
                                  checked={val.selected}
                                  onChange={(e: any) =>
                                    handlechange(e, i, indx, val.id)
                                  }
                                />
                              </InputContainer>
                             {location.pathname.split("/").includes("vendor")||isNaN(urlD)===false?
                              <InputContainer width={"20%"} className={`px-1`}>
                                <UtilityButton
                                  onClick={() => {
                                    if (val.selected) {
                                      setProductid(val.id);
                                      setProductseletected(ele);
                                      dispatch(
                                        setDialogueview("addproductprice")
                                      );
                                    } else
                                      updateMessages([
                                        {
                                          title: "Error !!",
                                          message: "Please select the product",
                                        },
                                        ...messages,
                                      ]);
                                  }}
                                >
                                  {selected === null
                                    ? "Add Product Price"
                                    : `Update ${
                                        selected === 0
                                          ? "Nation-wise"
                                          : selected === 1
                                          ? "State-wise"
                                          : "County-wise"
                                      }`}
                                </UtilityButton>
                              </InputContainer>:<></>}
                            </div>
                            //     </Typography>
                            // </AccordionDetails>
                          );
                        })}
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </>
            );
          } else return <></>;
        }):<></>}
      </div>
      {isNaN(parseInt(urlD)) === false ? (
        <div className="d-flex justify-content-end">
          <UtilityButton
            style={{ width: "200px", marginTop: "3rem" }}
            onClick={() => {
              // handleEditSubmit();
            }}
          >
            Save & Update
          </UtilityButton>
        </div>
      ) : (
        <div className="d-flex justify-content-between mt-5">
          <CancelButton
            onClick={() => {
              setActiveTab((prev: number) => prev - 1);
            }}
          >
            Back
          </CancelButton>
          <SaveButton onClick={handleNext} className="float-end">
            Next
          </SaveButton>
        </div>
      )}
      {/* <Box
        sx={{
            display: props.edit ? 'none' : 'flex',
            flexDirection: 'row',
            pt: 2,
            justifyContent: 'end'
        }}
    >
        <Button
            disabled={props.activeStep === 0}
            onClick={() => props.setActiveStep((prev) => prev - 1)}
            variant="contained"
            sx={{ m: 1 }}
        >
            Back
        </Button>

        <Button onClick={handleNext} variant="contained" sx={{ m: 1 }}>
            Next
        </Button>
    </Box>
    <Box
        sx={{
            display: props.edit ? 'flex' : 'none',
            flexDirection: 'row',
            pt: 2,
            justifyContent: 'end'
        }}
    >
        {props.edit ? (
            <Button onClick={() => props.setOpenTableView(!props.openTableView)} variant="outlined" color="info" sx={{ m: 1 }}>
                Back
            </Button>
        ) : (
            ''
        )}

        <Button onClick={() => handleEditSubmit()} variant="contained" sx={{ m: 1, display: props.editData ? 'none' : 'block' }}>
            Submit
        </Button>
    </Box> */}
      {/* <Dialog open={open} fullWidth={true} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title" sx={{ display: 'flex', justifyContent: 'end' }}>
            {' '}
            <button
                type="button"
                className="btn-close focus:shadow-none"
                data-bs-dismiss="modal"
                id="closePopup"
                onClick={() => {
                    handleClose();
                }}
            >
                <i class="fas fa-times-circle"></i>
            </button>
        </DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-dialog-description">
                <MainCard>
                    {viewData?.nation.length > 0 || viewData?.state.length > 0 || viewData?.county.length > 0 ? (
                        <Grid container>
                            {viewData?.nation.length > 0 ? (
                                <Grid md={12} sx={{ pb: 1 }}>
                                    <h2 style={{ fontSize: '25px', fontWeight: 700 }}>Nation-wise</h2>
                                    <Divider />
                                </Grid>
                            ) : (
                                <></>
                            )}
                            {viewData?.nation.map((val, i) => {
                                return (
                                    <Grid item key={i}>
                                        {val.name} ({val.price})
                                    </Grid>
                                );
                            })}
                            {viewData?.state.length > 0 ? (
                                <Grid md={12} sx={{ my: 2 }}>
                                    <h2 style={{ fontSize: '25px', fontWeight: 700 }}>State-wise</h2>
                                    <Divider />
                                </Grid>
                            ) : (
                                <></>
                            )}
                            {viewData?.state.map((val, i) => {
                                return (
                                    <Grid item key={i}>
                                        {val.name} ({val.price})
                                    </Grid>
                                );
                            })}
                            {viewData?.county.length > 0 ? (
                                <Grid md={12} sx={{ my: 2 }}>
                                    <h2 style={{ fontSize: '25px', fontWeight: 700 }}>County-wise</h2>
                                    <Divider />
                                </Grid>
                            ) : (
                                <></>
                            )}
                            <Grid md={12} sx={{ my: 2 }}>
                                {viewData?.county.map((val, i) => {
                                    return val.countylist.length > 0 ? (
                                        <SubCard title={val.name}>
                                            {val.countylist.map((ele, i) => {
                                                return (
                                                    <span>
                                                        {val.name} ({val.price})
                                                    </span>
                                                );
                                            })}
                                        </SubCard>
                                    ) : (
                                        <></>
                                    );
                                })}
                            </Grid>
                        </Grid>
                    ) : (
                        'No Date Found'
                    )}
                </MainCard>
            </DialogContentText>
        </DialogContent>
    </Dialog> */}
    </>
  );
};

export default Product;
