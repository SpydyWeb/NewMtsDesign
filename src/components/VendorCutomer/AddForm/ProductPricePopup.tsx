import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  TextField,
  Button,
  CircularProgress,
  Grid,
  Checkbox,
  Stepper,
  Step,
  StepLabel,
  IconButton,
  Tabs,
  Tab,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setDialogueview } from "../../../store/action/actions";
import {
  GetStateList,
  GetCountyList,
  AddVendorProductPrice,
  GetNationList,
  GetStateListBynation,
  AddVendorNationProduct,
  AddVendorStateProduct,
  AddVendorCountyProduct,
  UpdateVendorStateProduct,
  UpdateVendorCountyProduct,
  GetVendorProductsPriceList,
  UpdateVendorNationProduct,
} from "../../../servicesapi/Vendorapi";
import { styled } from "@mui/material/styles";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import { toast } from "react-hot-toast";
import {
  AddcustomerNationProduct,
  UpdatecustomerCountyProduct,
  UpdatecustomerStateProduct,
  UpdateCustomerNationProduct,
  GetcustomerProductsPriceList,
} from "../../../servicesapi/Customerapi";
import { Form, Modal, Nav } from "react-bootstrap";
import {
  InputContainer,
  TableTitle,
  TableTitleBar,
  TableTitleRow,
  UtilityButton,
} from "../../order/OrderStyledComponents";
import { ApplicationContext, ApplicationContextType } from "../../../App";

const steps = ["Nation-wise", "State-wise", "County-wise"];

const ProductPricePopup = (props: any) => {
  const dispatch = useDispatch();
  const { messages, updateMessages, updateLoading, updateLoadingMessage } =
    useContext(ApplicationContext) as ApplicationContextType;
  let urlD: any =
    location.pathname.split("/")[location.pathname.split("/").length - 1];

  const [stateList, setStateList] = useState([]);
  const [countyList, setCountyList] = useState([]);
  const [countyerrmsg, setCountyerrmsg] = useState("");
  const [nationList, setnationList] = useState([]);
  const [checkboxData, setCheckboxData] = useState({
    state: [],
    county: [],
    nation: [],
  });
  const [selectedStates, setSelectedStates]: any = useState([]);
  const [viewstatecounty, setViewstatecounty] = useState(0);
  const [viewState, setViewState] = useState(0);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    let data = [...props.Productseletected?.subCategory];
    let selected = 0;
    for (let i = 0; i < data.length; i++) {
      if (data[i].id === props.productid) {
        if (data[i].productPriceList === null) {
          selected = 0;
          break;
        }
        selected = data[i].productPriceList[0]?.cityStateType;
        break;
      }
    }
    if (selected === 0 || selected === undefined) {
      GetNationListData();
      setViewState(0);
    } else if (selected === 1) {
      GetStateListData(1);
      setViewState(1);
    } else {
      GetStateListData(2);
      setViewState(2);
      setViewstatecounty(1);
    }
  }, []);
  const GetNationListData = () => {
    GetNationList().then((res: any) => {
      console.log(res);
      
      let data: any;
      for (let i = 0; i < props.productD.length; i++) {
        if (props.productD[i].id === props.productid) {
          data = props.productD[i];
          break;
        }
      }
      if (isNaN(urlD)===false) {
        GetVendorProductsPriceList(urlD, props.productid, 0).then((res1) => {
          res1.map((ele: any) => {
            if (ele.selected || ele.price > 0) {
              ele["price"] = ele.price;
              ele["isChecked"] = true;
            } else {
              ele["price"] = "";
              ele["isChecked"] = false;
            }
          });
          setnationList(res1);
        });
      } else {
        res.map((ele: any) => {
          if (data?.productPriceList === undefined || data === undefined) {
            ele["price"] = "";
            ele["isChecked"] = false;
          } else {
            for (let i = 0; i < data.productPriceList.length; i++) {
              if (
                data.productPriceList[i].cityStateType === 0 &&
                data.productPriceList[i].cityStateId === ele.id
              ) {
                ele["price"] = data.productPriceList[i].price;
                ele["isChecked"] = true;
                break;
              } else {
                ele["price"] = "";
                ele["isChecked"] = false;
              }
            }
          }
        });
        setnationList(res);
      }
    });
  };
  const handleNext = (newValue: any) => {
    let data = [...props.Productseletected?.subCategory];
    let selected = "";
    for (let i = 0; i < data.length; i++) {
      if (
        data[i].id === props.productid &&
        data[i].productPriceList !== null &&
        data[i].productPriceList[0]?.price !== 0 &&
        data[i].productPriceList.length > 0
      ) {
        selected = data[i].productPriceList[0].cityStateType;
        break;
      }
    }
    if (selected === "") {
      setViewstatecounty(0);
      setViewState(newValue);
      if (newValue === 0) GetNationListData();
      else {
        GetStateListData();
      }
    } else {
      toast.error("You can only have one price ");
    }
  };
  const getContyListdata = () => {
    let data: any;
    for (let i = 0; i < props.productD.length; i++) {
      if (props.productD[i].id === props.productid) {
        data = props.productD[i];
        break;
      }
    }
    let formvalue = [...new Set(checkboxData.state)];
    setLoading(true);
    setCheckboxData({ ...checkboxData, state: formvalue });
    setCountyList([]);
    GetCountyList(formvalue).then((res) => {
      console.log(res);
      
      let msg = "";
      let tempdata: any = selectedStates;
      res.map((ele: any) => {
        if (data?.productPriceList === undefined || data === undefined) {
          ele["price"] = "";
          ele["isChecked"] = false;
        } else {
          for (let i = 0; i < data.productPriceList.length; i++) {
            if (
              data.productPriceList[i].cityStateType === 0 &&
              data.productPriceList[i].cityStateId === ele.id
            ) {
              ele["price"] = data.productPriceList[i].price;
              ele["isChecked"] = true;
              break;
            } else {
              ele["price"] = "";
              ele["isChecked"] = false;
            }
          }
        }
        for (let i = 0; i < selectedStates.length; i++) {
          if (selectedStates[i].id === ele.stateId) {
            let status = false;
            for (let j = 0; j < tempdata.length; j++) {
              if (tempdata[i].countylist === undefined) break;
              else {
                for (let k = 0; k < tempdata[i].countylist.length; k++) {
                  if (tempdata[i].countylist[k].id === ele.id) {
                    status = true;
                    break;
                  }
                }
              }
            }
            if (status === false) {
              if (tempdata[i].countylist === undefined)
                tempdata[i]["countylist"] = [ele];
              else tempdata[i]["countylist"].push(ele);
            }
          }
        }
      });
      console.log(tempdata, selectedStates);

      setCountyList(tempdata);

      if (res.length === 0)
        msg = "Selected state has no county. Please select other states";
      else msg = "";
      setCountyerrmsg(msg);
      setLoading(false);
    });
  };
  const GetStateListData = (type = 1) => {
    let data: any;
    setLoading(true);
    for (let i = 0; i < props.productD.length; i++) {
      if (props.productD[i].id === props.productid) {
        data = props.productD[i];
        break;
      }
    }
    GetStateListBynation([1]).then((res) => {
      if (isNaN(urlD)===false) {
        if (location.pathname.split("/").includes("vendor")) {
          GetVendorProductsPriceList(urlD, props.productid, type).then(
            (res1) => {
              let data: any = [];
              res1.map((ele: any) => {
                if (type === 1) {
                  if (ele.selected && ele.price > 0) {
                    ele["price"] = ele.price;
                    ele["isChecked"] = true;
                  } else {
                    ele["price"] = "";
                    ele["isChecked"] = false;
                  }
                } else {
                  if (ele.selected) {
                    data.push(ele.id);
                    ele["isChecked"] = true;
                  } else {
                    ele["isChecked"] = false;
                  }
                }
              });
              if (type === 2) {
                let tempdata: any = [];
                setCheckboxData({ ...checkboxData, state: data });
                let countyData: any = [];
                console.log(countyData, res1, tempdata);
                for (let i = 0; i < res1.length; i++) {
                  if (res1[i].isChecked) {
                    countyData = [...countyData, res1[i]];
                  }
                }
                console.log(countyData);
                for (let i = 0; i < countyData.length; i++) {
                  for (let j = 0; j < countyData[i].countylist.length; j++) {
                    if (countyData[i].countylist[j].price > 0) {
                      countyData[i].countylist[j].isChecked = true;
                    } else {
                      countyData[i].countylist[j].price = "";
                      countyData[i].countylist[j].isChecked = false;
                    }
                  }
                }

                setCountyList(countyData);
              }
              setStateList(res1);
            }
          );
        } else {
          GetcustomerProductsPriceList(urlD, props.productid, type).then(
            (res1) => {
              let data: any = [];
              res1.map((ele: any) => {
                if (type === 1) {
                  if (ele.selected && ele.price > 0) {
                    ele["price"] = ele.price;
                    ele["isChecked"] = true;
                  } else {
                    ele["price"] = "";
                    ele["isChecked"] = false;
                  }
                } else {
                  if (ele.selected) {
                    data.push(ele.id);
                    ele["isChecked"] = true;
                  } else {
                    ele["isChecked"] = false;
                  }
                }
              });
              if (type === 2) {
                let tempdata: any = [];
                setCheckboxData({ ...checkboxData, state: data });
                let countyData: any = [];
                for (let i = 0; i < res1.length; i++) {
                  if (res1[i].isChecked) {
                    countyData = [...countyData, res1[i]];
                  }
                }
                console.log(countyData);
                for (let i = 0; i < countyData.length; i++) {
                  for (let j = 0; j < countyData[i].countylist.length; j++) {
                    if (countyData[i].countylist[j].price > 0) {
                      countyData[i].countylist[j].isChecked = true;
                    } else {
                      countyData[i].countylist[j].price = "";
                      countyData[i].countylist[j].isChecked = false;
                    }
                  }
                }

                setCountyList(countyData);
              }
              setStateList(res1);
            }
          );
        }
      } else {
        res.map((ele: any) => {
          if (data?.productPriceList === undefined || data === undefined) {
            ele["price"] = "";
            ele["isChecked"] = false;
          } else {
            for (let i = 0; i < data.productPriceList.length; i++) {
              if (
                data.productPriceList[i].cityStateType === 1 &&
                data.productPriceList[i].cityStateId === ele.id
              ) {
                ele["price"] = data.productPriceList[i].price;
                ele["isChecked"] = true;
                break;
              } else {
                ele["price"] = "";
                ele["isChecked"] = false;
              }
            }
          }
        });
        setStateList(res);
      }
      setLoading(false);
    });
  };
  const handlePrevious = () => {
    setViewstatecounty(viewstatecounty - 1);
  };
  const handleChange = (id: any, type = "", value = "", indx = "") => {
    if (viewState === 0) {
      let selectedstate:any = checkboxData.nation;
      let data: any = [...nationList];
      for (let i = 0; i < data.length; i++) {
        if (data[i].id === id) {
          if (type === "price") data[i].price = value;
          else data[i].isChecked = !data[i].isChecked;
          if (data[i].isChecked) {
            selectedstate.push(id);
          } else {
            selectedstate.splice(selectedstate.indexOf(id), 1);
          }
          setCheckboxData({ ...checkboxData, nation: selectedstate });
          setnationList(data);
          break;
        }
      }
    } else if (viewState === 1 || (viewState === 2 && viewstatecounty === 0)) {
      console.log("else if");
      let selectedstate:any = checkboxData.state;
      let data: any = [...stateList];
      let states = selectedStates;
      for (let i = 0; i < data.length; i++) {
        if (data[i].id === id) {
          if (type === "price") data[i].price = value;
          else data[i].isChecked = !data[i].isChecked;
          if (data[i].isChecked) {
            selectedstate.push(id);
            states.push({ id: id, ["name"]: data[i].name });
          } else {
            selectedstate.splice(selectedstate.indexOf(id), 1);
            states.splice(states.indexOf(id), 1);
          }
          setCheckboxData({ ...checkboxData, state: selectedstate });
          setStateList(data);
          console.log(states);
          setSelectedStates(states);
          break;
        }
      }
    } else {
      let selectedstate:any = checkboxData.county;
      let data: any = [...countyList];
      for (let i = 0; i < data[indx]?.countylist.length; i++) {
        if (data[indx]?.countylist[i].id === id) {
          if (type === "price") data[indx].countylist[i].price = value;
          else
            data[indx].countylist[i].isChecked =
              !data[indx]?.countylist[i].isChecked;
          if (data[indx]?.countylist[i].isChecked) {
            selectedstate.push(id);
          } else {
            selectedstate.splice(selectedstate.indexOf(id), 1);
          }
          setCheckboxData({ ...checkboxData, county: selectedstate });
          setCountyList(data);
          break;
        }
      }
    }
  };
  const handleSubmit = (type = "") => {
    let data: any = [];

    if (viewState === 0) {
      if (type === "")
        nationList.map((ele: any) => {
          if (ele.isChecked)
            data.push({
              price: +ele.price,
              cityStateType: 0,
              cityStateId: ele.id,
            });
        });
      if (isNaN(urlD)===false) {
        if (location.pathname.split("/").includes("vendor")) {
          UpdateVendorNationProduct(data, urlD, props.productid).then((res) => {
            if (res.status === 200) {
              updateMessages([
                {
                  title: "Success !!",
                  message: "Nation wise price saved successfully",
                },
                ...messages,
              ]);

              let selectedData = props.Productseletected.subCategory;
              for (let i = 0; i < selectedData.length; i++) {
                if (props.productid === selectedData[i].id) {
                  selectedData[i].productPriceList = data;
                  if (type === "remove") {
                    selectedData[i].selected = false;
                    selectedData[i].productPriceList = null;
                  }
                }
              }

              props.setProductseletected(selectedData);
            }
          });
        } else {
          UpdateCustomerNationProduct(data, urlD, props.productid).then(
            (res) => {
              if (res.status === 200) {
                updateMessages([
                  {
                    title: "Success !!",
                    message: "Nation wise price saved successfully",
                  },
                  ...messages,
                ]);

                let selectedData = props.Productseletected.subCategory;
                for (let i = 0; i < selectedData.length; i++) {
                  if (props.productid === selectedData[i].id) {
                    selectedData[i].productPriceList = data;
                    if (type === "remove") {
                      selectedData[i].selected = false;
                      selectedData[i].productPriceList = null;
                    }
                  }
                }
                props.setProductseletected(selectedData);
              }
            }
          );
        }
      } else {
        let index = 0;
        let product = [...props.productD];
        for (let i = 0; i < product.length; i++) {
          if (product[i].id === props.productid) {
            index = i;
            break;
          }
        }
        if (product[index].productPriceList !== undefined) {
          let tempdata = product[index].productPriceList;
          if (tempdata !== undefined) {
            for (let i = 0; i < product[index].productPriceList.length; i++) {
              if (product[index].productPriceList[i].cityStateType === 0) {
                tempdata.splice(i, 1);
              } else {
                data.push(product[index].productPriceList[i]);
              }
            }
          }
        }
        product[index]["productPriceList"] = data;
        // let selectedData = props.Productseletected;
        // selectedData.subCategory = data;

        props.setProductD(product);
        // props.setProductseletected(selectedData);
        updateMessages([
          {
            title: "Success !!",
            message: "Nation wise price saved successfully",
          },
          ...messages,
        ]);
      }
    } else if (viewState === 1) {
      if (type === "")
        stateList.map((ele: any) => {
          if (ele.isChecked)
            data.push({
              price: +ele.price,
              cityStateType: 1,
              cityStateId: ele.id,
            });
        });
      if (isNaN(urlD)===false) {
        if (location.pathname.split("/").includes("vendor")) {
          UpdateVendorStateProduct(data, urlD, props.productid).then((res) => {
            if (res.status === 200) {
              updateMessages([
                {
                  title: "Success !!",
                  message: "State wise price saved successfully",
                },
                ...messages,
              ]);

              let selectedData = props.Productseletected.subCategory;
              for (let i = 0; i < selectedData.length; i++) {
                if (props.productid === selectedData[i].id) {
                  selectedData[i].productPriceList = data;
                  if (type === "remove") {
                    selectedData[i].selected = false;
                    selectedData[i].productPriceList = null;
                  }
                }
              }
              props.setProductseletected(selectedData);
            }
          });
        } else {
          UpdatecustomerStateProduct(data, urlD, props.productid).then(
            (res) => {
              if (res.status === 200) {
                updateMessages([
                  {
                    title: "Success !!",
                    message: "State wise price saved successfully",
                  },
                  ...messages,
                ]);
                let selectedData = props.Productseletected.subCategory;
                for (let i = 0; i < selectedData.length; i++) {
                  if (props.productid === selectedData[i].id) {
                    selectedData[i].productPriceList = data;
                    if (type === "remove") {
                      selectedData[i].selected = false;
                      selectedData[i].productPriceList = null;
                    }
                  }
                }
                props.setProductseletected(selectedData);
              }
            }
          );
        }
      } else {
        let index = 0;
        let product = [...props.productD];
        for (let i = 0; i < product.length; i++) {
          if (product[i].id === props.productid) {
            index = i;
            break;
          }
        }
        if (product[index].productPriceList !== undefined) {
          let tempdata = product[index].productPriceList;
          if (tempdata !== undefined) {
            for (let i = 0; i < product[index].productPriceList.length; i++) {
              if (product[index].productPriceList[i].cityStateType === 1) {
                tempdata.splice(i, 1);
              } else {
                data.push(product[index].productPriceList[i]);
              }
            }
          }
        }
        product[index]["productPriceList"] = data;
console.log(product);

        props.setProductD(product);

        updateMessages([
          {
            title: "Success !!",
            message: "State wise price saved successfully",
          },
          ...messages,
        ]);
      }
    } else {
      if (type === "")
        countyList.map((val: any) => {
          val.countylist.map((ele: any) => {
            if (ele.isChecked)
              data.push({
                price: +ele.price,
                cityStateType: 2,
                cityStateId: ele.id,
              });
          });
        });
      if (isNaN(urlD)===false) {
        if (location.pathname.split("/").includes("vendor")) {
          UpdateVendorCountyProduct(data, urlD, props.productid).then((res) => {
            if (res.status === 200) {
              updateMessages([
                {
                  title: "Success !!",
                  message: "County wise price saved successfully",
                },
                ...messages,
              ]);
              let selectedData = props.Productseletected.subCategory;
              for (let i = 0; i < selectedData.length; i++) {
                if (props.productid === selectedData[i].id) {
                  selectedData[i].productPriceList = data;
                  if (type === "remove") {
                    selectedData[i].selected = false;
                    selectedData[i].productPriceList = null;
                  }
                }
              }
              props.setProductseletected(selectedData);
            }
          });
        } else {
          UpdatecustomerCountyProduct(data, urlD, props.productid).then(
            (res) => {
              if (res.status === 200) {
                updateMessages([
                  {
                    title: "Success !!",
                    message: "County wise price saved successfully",
                  },
                  ...messages,
                ]);
                let selectedData = props.Productseletected.subCategory;
                for (let i = 0; i < selectedData.length; i++) {
                  if (props.productid === selectedData[i].id) {
                    selectedData[i].productPriceList = data;
                    if (type === "remove") {
                      selectedData[i].selected = false;
                      selectedData[i].productPriceList = null;
                    }
                  }
                }
                props.setProductseletected(selectedData);
              }
            }
          );
        }
      } else {
        let index = 0;
        let product = [...props.productD];
        for (let i = 0; i < product.length; i++) {
          if (product[i].id === props.productid) {
            index = i;
            break;
          }
        }
        if (product[index].productPriceList !== undefined) {
          let tempdata = product[index].productPriceList;
          if (tempdata !== undefined) {
            for (let i = 0; i < product[index].productPriceList.length; i++) {
              if (product[index].productPriceList[i].cityStateType === 2) {
                tempdata.splice(i, 1);
              } else {
                data.push(product[index].productPriceList[i]);
              }
            }
          }
        }
        product[index]["productPriceList"] = data;

        props.setProductD(product);
        // props.setProductseletected(selectedData);
        updateMessages([
          {
            title: "Success !!",
            message: "County wise price saved successfully",
          },
          ...messages,
        ]);
      }
    }
    setViewState(0);
    dispatch(setDialogueview(""));
  };
  const handlecountynext = () => {
    setViewstatecounty(viewstatecounty + 1);
    getContyListdata();
  };
  return (
    <>
      <Modal
        show={true}
        onHide={() => dispatch(setDialogueview(""))}
        size="lg"
        backdrop="static"
        centered
      >
        <Modal.Header closeButton closeVariant="white">
          <Modal.Title>
            <Nav variant="pills" defaultActiveKey={steps[viewState]}>
              {steps.map((val, i) => (
                <Nav.Item onClick={() => handleNext(i)}>
                  <Nav.Link
                    style={{ color: "#fff", fontSize: "13px" }}
                    eventKey={val}
                  >
                    {val}
                  </Nav.Link>
                </Nav.Item>
              ))}
            </Nav>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {viewState === 2 && viewstatecounty === 0
            ? "Please select state"
            : ""}
          <div>
            {loading ? (
              <div className="text-lg text-center">Loading...</div>
            ) : viewState === 0 ? (
              <div className="row">
                {nationList.map((ele: any, idx: number) => {
                  return (
                    <div key={idx} className="col-6 row">
                      <div
                        className="col-6"
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                        }}
                      >
                        <Form.Check // prettier-ignore
                          type={"checkbox"}
                          label={ele.name}
                          checked={ele.isChecked}
                          onClick={(e) => handleChange(ele.id)}
                        />
                      </div>
                      <InputContainer width="50%" className={`col-6 `}>
                        <TextField
                          id={ele.name}
                          name={ele.name}
                          type="text"
                          value={ele.price}
                          label="Price"
                          disabled={!ele.isChecked}
                          onChange={(e) =>
                            handleChange(ele.id, "price", e.target.value)
                          }
                        />
                        {/* <ErrorMessage id="loanIdError"></ErrorMessage> */}
                      </InputContainer>
                    </div>
                  );
                })}
              </div>
            ) : viewState === 1 ? (
              <div className="row">
                {stateList.map((ele: any, idx: number) => {
                  return (
                    <div key={idx} className="col-6 row mb-1">
                      <div
                        className="col-6"
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                        }}
                      >
                        <Form.Check // prettier-ignore
                          type={"checkbox"}
                          label={ele.name}
                          onClick={(e) => handleChange(ele.id)}
                          checked={ele.isChecked}
                        />
                      </div>
                      <InputContainer width="50%" className={`col-6 `}>
                        <TextField
                          id={ele.name}
                          name={ele.name}
                          type="text"
                          value={ele.price}
                          label="Price"
                          disabled={!ele.isChecked}
                          onChange={(e) =>
                            handleChange(ele.id, "price", e.target.value)
                          }
                        />
                        {/* <ErrorMessage id="loanIdError"></ErrorMessage> */}
                      </InputContainer>
                    </div>
                  );
                })}
              </div>
            ) : viewstatecounty === 0 ? (
              <div className="row">
                {stateList.map((ele: any, idx: number) => {
                  return (
                    <div key={idx} className="col-6 row mb-1">
                      <div
                        className="col-6"
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                        }}
                      >
                        <Form.Check // prettier-ignore
                          type={"checkbox"}
                          label={ele.name}
                          checked={ele.isChecked}
                          onClick={(e) => handleChange(ele.id, "check")}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : countyList.length > 0 ? (
              countyList?.map((val: any, i: any) => {
                return (
                  <div style={{ width: "100%" }}>
                    <TableTitleRow>
                      <TableTitleBar>
                        <TableTitle>{val.name}</TableTitle>
                      </TableTitleBar>
                    </TableTitleRow>

                    <div className="row">
                      {val.countylist?.map((ele: any, ind: number) => {
                        return (
                          <div key={ind} className="col-6 row mb-1">
                            <div
                              className="col-6"
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                              }}
                            >
                              <Form.Check // prettier-ignore
                                type={"checkbox"}
                                label={ele.city}
                                checked={ele.isChecked}
                                onClick={(e: any) =>
                                  handleChange(ele.id, "check", "", i)
                                }
                              />
                            </div>
                            <InputContainer width="50%" className={`col-6 `}>
                              <TextField
                                id={ele.name}
                                name={ele.name}
                                type="text"
                                value={ele.price}
                                label="Price"
                                disabled={!ele.isChecked}
                                onChange={(e: any) =>
                                  handleChange(
                                    ele.id,
                                    "price",
                                    e.target.value,
                                    i
                                  )
                                }
                              />
                              {/* <ErrorMessage id="loanIdError"></ErrorMessage> */}
                            </InputContainer>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })
            ) : (
              <p style={{ fontSize: "1rem" }}>{countyerrmsg}</p>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <UtilityButton
            style={{ width: "200px" }}
            onClick={() => handleSubmit("remove")}
          >
            {" "}
            Delete Price
          </UtilityButton>
          {viewState === 2 && viewstatecounty !== 0 ? (
            <UtilityButton
              style={{ width: "200px" }}
              onClick={() => handlePrevious()}
            >
              {" "}
              Previous
            </UtilityButton>
          ) : (
            <></>
          )}
          <UtilityButton
            style={{ width: "200px" }}
            onClick={() =>
              viewState === 2 && viewstatecounty === 0
                ? handlecountynext()
                : handleSubmit()
            }
          >
            {" "}
            {viewState === 2 && viewstatecounty === 0 ? "Next" : "Submit"}
          </UtilityButton>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProductPricePopup;
