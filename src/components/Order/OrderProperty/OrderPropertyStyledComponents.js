import styled from "styled-components";
import { pallete } from "../../../utils/style-utils";
export const AdditionalTableTitleRow = styled.div `
  background-color: ${pallete.additionalTableBackgroundColor};
  color: white;
`;
export const AdditionalTableTitle = styled.h3 `
  font-size: 1.25rem;
  font-weight: 600;
  padding-top: 2px;
`;
export const AddButton = styled.button `
  border: 0;
  font-weight: bold;
  height: fit-content;
  color: ${pallete.tableBackgroundColor};
  width: 3rem;
  background: white;
  cursor: pointer;
`;
export const ModalButton = styled.button `
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
export const CancelButton = styled.button `
  background-color: ${pallete.tableBackgroundColor};
  width: 10rem;
  color: white;
  border: 0;
  font-size: 1rem;
  font-weight: 500;
  padding: 0.375rem 0.75rem;
  border-radius: 0.375rem;
  box-shadow: rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;
  &:hover {
    background-color: #9e1717;
  }
`;
export const SaveButton = styled.button `
  background-color: ${pallete.tableBackgroundColor};
  width: 10rem;
  color: white;
  border: 0;
  font-size: 1rem;
  font-weight: 500;
  padding: 0.375rem 0.75rem;
  border-radius: 0.375rem;
  box-shadow: rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;
  &:hover {
    background-color: ${pallete.tableButtonHoverColor};
  }
`;
export const StatusIconContainer = styled.i `
  font-size: 1.5rem;
`;
export const OrderDetailPopover = styled.i `
  font-size: 0.875rem;
  font-weight: normal;
`;
export const SearchContainer = styled.div `
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
export const SearchIcon = styled.i `
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
