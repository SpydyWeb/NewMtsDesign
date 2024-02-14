import React from 'react'
import { ErrorMessage, InputContainer, Table, TableRow, TableTitle, TableTitleBar, TableTitleRow } from '../order/OrderStyledComponents'
import { CancelButton, SaveButton } from '../order/orderProperty/OrderPropertyStyledComponents'
import { TextField } from '../utils/InputGroup'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

const AddVendorProduct = () => {
    const history = useNavigate();
    const dispatch = useDispatch();
  return (
    <div className="container-fluid card border-0 align-items-center">
    <Table className="table mt-4" style={{ width: "500px" }}>
      <div className="d-grid pointer" onClick={() => {}}>
        <TableTitleRow>
          <TableTitleBar>
            <TableTitle>Add Vendor Product</TableTitle>
          </TableTitleBar>
        </TableTitleRow>
      </div>
      <div id="propertyAddressSection" className="displaySection">
        <div className="container-fluid card border-0">
          <div className="row">
            <form>
            <InputContainer width='100%' className="px-1">
          <TextField
            // id={ele.name}
            // name={ele.name}
            // label={ele.label}
            type="text"
            // value={formValues[ele.name]}
            // onChange={handleChange}
          />
          {/* <ErrorMessage id="suiteError">
            {ele.isErrorMsg ? `${ele.label} is required` : ""}
          </ErrorMessage> */}
        </InputContainer>
              <TableRow className="border-0 mt-4">
                <CancelButton onClick={() => history(`/viewvendorproduct`)}>
                  Cancel
                </CancelButton>
                <SaveButton  className="float-end">
                  Save
                </SaveButton>
              </TableRow>
            </form>
          </div>
        </div>
      </div>
    </Table>
  </div>
  )
}

export default AddVendorProduct