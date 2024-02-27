import styled from "styled-components";
import { pallete } from "../../utils/style-utils";
import { Card, Form } from "react-bootstrap";
import { TiTick } from "react-icons/ti";
export const CenterContainer = styled.div`
  display: flex;
  width: 96%;
  margin-left: 2%;
`;

export const OrderContainer = styled.div`
  min-width: 800px !important;
  overflow-y: hidden;
  overflow-x: auto;
`;

export const SearchBar = styled(Card.Header)`
  display: flex !important;
  justify-content: space-between !important;
  background-color: ${pallete.tableBackgroundColor};
`;
export const Switch = styled(Form.Check)`
  & input {
    width: 2.8rem !important;
    height: 1.5rem;
  }
`;

export const SearchButton = styled.button`
  color: ${pallete.tableBackgroundColor};
  background-color: white;
  border: 0;
  width: 3rem;

  &:hover {
    color: ${pallete.tableButtonHoverColor};
  }
`;

export const UtilityButton = styled.button`
  border: 0;
  font-size: 1.25rem;
  background-color: ${pallete.tableBackgroundColor};
  color: white;
  width: 100%;
  height: fit-content;
  border-radius: 0.375rem;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,
    rgba(0, 0, 0, 0.22) 0px 10px 10px;
  &:hover {
    background-color: ${pallete.tableButtonHoverColor};
  }
`;

export const AdvancedFilterToggle = styled.button`
  background-color: white;
  color: ${pallete.tableBackgroundColor};
  border: 0;
`;

export const ErrorMessage = styled.div`
  color: red;
  font-size: 0.75rem;
  margin-left: 10px;
`;

export const Table = styled.div`
  width: 100%;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,
    rgba(0, 0, 0, 0.22) 0px 10px 10px;
`;

export const TableRow = styled.div`
  border-bottom: 1px ridge rgba(0, 0, 0, 0.11);
`;

export const TableTitleBar = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const TableTitleRow = styled.div`
  background-color: ${pallete.tableBackgroundColor};
  color: white;
`;

export const TableTitle = styled.b`
  font-size: 1.25rem;
`;

export const AddRowButton = styled.button`
  height: 50px;
  width: 50px;
  position: absolute;
  bottom: -35px;
  right: 25px;
  border-radius: 50%;
  font-size: 1rem;
  background-color: ${pallete.tableBackgroundColor};
  color: white;
  border: 0;
  cursor: pointer;
  box-shadow: rgba(0,0,0,0.25) 0px 31px 21rem, rgba(0,0,0,0.22) 0px 6px 1rem;

  &:hover {
    background-color: ${pallete.tableButtonHoverColor};
  }
`;

export const DeleteRowButton = styled.span`
  position: absolute;
  top: 8px;
  right: -3px;
  cursor: pointer;
  text-align: center;
  font-size: 0.875rem;
  z-index: 100;
  color: black;
  font-weight: 700;
  &:hover {
    color: ${pallete.tableButtonHoverColor};
  }
`;

export const SerialNumber = styled.span`
  position: absolute;
  top: 0;
  left: -2px;
`;

export const InputContainer = styled.div<{ width: string }>`
  width: ${({ width }) => width};
`;

export const SuccessIcon = styled(TiTick)`
  background-color: ${pallete.tableBackgroundColor};
  color: white;
  font-size: 5rem;
  border-radius: 50%;
`;

export const NavigationIndicatorSpan = styled.span`
  color: ${pallete.tableBackgroundColor};
`;

export const FloatingButton = styled.button`
  font-size: 1.5rem;
  border-radius: 50%;
  position: absolute;
  height: 50px;
  width: 50px;
  bottom: 40px;
  right: 40px;
  background-color: ${pallete.tableBackgroundColor};
  color: white;
  border: 0;
`;

export const AdditionalTableTitleRow = styled.div`
  background-color: ${pallete.additionalTableBackgroundColor};
  color: white;
`;

export const AdditionalTableTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  padding-top: 2px;
`;

export const AddButton = styled.button`
  border: 0;
  font-weight: bold;
  height: fit-content;
  color: ${pallete.tableBackgroundColor};
  width: 3rem;
  background: white;
  cursor: pointer;
`;

export const ModalButton = styled.button`
  background-color: ${pallete.modalColor};
  color: white;
  border: 0;
  font-size: 1rem;
  padding: 0.375rem 0.75rem;
  border-radius: 0.375rem;
  &:hover {
    background-color: ${pallete.modalHoverColor};
  }
`;

export const CancelButton = styled.button`
  background-color: ${pallete.tableBackgroundColor};
  width: 10rem;
  color: white;
  border: 0;
  font-size: 1rem;
  font-weight: 500;
  padding: 0.375rem 0.75rem;
  border-radius: 0.375rem;
  box-shadow: rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px,
    rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px,
    rgba(0, 0, 0, 0.09) 0px 32px 16px;
  &:hover {
    background-color: #9e1717;
  }
`;

export const SaveButton = styled.button`
  background-color: ${pallete.tableBackgroundColor};
  width: 10rem;
  color: white;
  border: 0;
  font-size: 1rem;
  font-weight: 500;
  padding: 0.375rem 0.75rem;
  border-radius: 0.375rem;
  box-shadow: rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px,
    rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px,
    rgba(0, 0, 0, 0.09) 0px 32px 16px;
  &:hover {
    background-color: ${pallete.tableButtonHoverColor};
  }
`;

export const StatusIconContainer = styled.i`
  font-size: 1.5rem;
`;

export const OrderDetailPopover = styled.i`
  font-size: 0.875rem;
  font-weight: normal;
`;

export const SearchContainer = styled.div`
  position: relative;

  input {
    padding-right: 50px !important;
  }

  &:hover {
    .search-icon {
      background-color: ${pallete.tableBackgroundColor};
      color: white;
    }
  }
`;

export const SearchIcon = styled.i`
  position: absolute;
  padding: 5px 5px 5px 5px;
  font-size: 1rem;
  font-weight: 600;
  width: 28px;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  color: ${pallete.tableBackgroundColor};
  border-radius: 50%;
  cursor: pointer;
`;
