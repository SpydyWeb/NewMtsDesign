import React, { useContext, useEffect, useState } from "react";
import {
  CenterContainer,
  FloatingButton,
  Table,
  TableTitle,
  TableTitleBar,
  TableTitleRow,
} from "../order/OrderStyledComponents";
import { useNavigate } from "react-router-dom";
import { Accordion } from "react-bootstrap";
import {
  Deletemapping,
  GetMappingsubRole,
} from "../../servicesapi/Userroleapi";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { ApplicationContext, ApplicationContextType } from "../../App";

const Viewaccessrole = () => {
    const { messages, updateMessages, updateLoading, updateLoadingMessage } =
    useContext(ApplicationContext) as ApplicationContextType;
 
  const history = useNavigate();
  const [expanded, setexpanded] = useState();
  const [accessData, setAccessData] = useState([]);
  const [accessrole, setaccessrole] = useState({
    role: [],
    subroles: [],
  });
  const fetchData = () => {
    GetMappingsubRole().then((res: any) => {
      setAccessData(res);
    });
  };
  const onDeletehandler = (rolname: any, subrole: any) => {
    if (window.confirm("Do you want to delete the access control?")) {
      Deletemapping({
        role: rolname,
        subrole: subrole,
      }).then((res) => {
        if (res.status === 200) {
            updateMessages([
                {
                  title: "Success !!",
                  message: "role deleted successfully",
                },
                ...messages,
              ]);
          
          fetchData();
          // setInterval(() => {
          //     window.location.reload();
          // }, 1000);
        }
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <CenterContainer>
      <Table className="table mt-3">
        <div
          className="d-grid"
          // onClick={() => handleCollapse()}
        >
          <TableTitleRow>
            <TableTitleBar>
              <TableTitle>View Role Defination</TableTitle>
            </TableTitleBar>
          </TableTitleRow>
        </div>
        <div id="clientFormSection" className="displaySection">
          <div className="container-fluid card border-0">
            {accessData.length > 0
              ? accessData.map((val: any, indx: number) => {
                  return (
                    <Accordion defaultActiveKey={expanded}>
                      <Accordion.Item eventKey={indx.toString()}>
                        <Accordion.Header>{val.name}</Accordion.Header>
                        <Accordion.Body>
                          <div className="accordion-body p-0">
                            {val.subroles.length > 0
                              ? val.subroles.map((subVal: any) => {
                                  return (
                                    <span style={{border:'1px solid #818181',borderRadius:'10px',padding:'4px',marginRight:'5px'}}>
                                      <span style={{marginRight:'5px'}}>{subVal.name}</span>
                                      <IoMdCloseCircleOutline
                                        role="button"
                                        onClick={() =>
                                          onDeletehandler(val.name, subVal.name)
                                        }
                                      />
                                    
                                    </span>
                                  );
                                })
                              : "No Data Found"}
                          </div>
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  );
                })
              : ""}
          </div>
        </div>
      </Table>
      <FloatingButton
        title={`Add`}
        onClick={() => {
          history(`/accessroledefinition`);
        }}
      >
        +
      </FloatingButton>
    </CenterContainer>
  );
};

export default Viewaccessrole;
