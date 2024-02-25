import styled from "styled-components";
import { pallete } from "../../utils/style-utils";
import { Toast } from "react-bootstrap";
/* Input group components */
export const Switch = styled.input `
  height: 22px;
  width: 40px !important;
`;
/* Downoad Button components */
export const DownloadButton = styled.span `
  display: block;
  text-align: center;
`;
export const SequenceSelectButton = styled.button `
  background-color: ${pallete.sequenceSelectorButtonBackgroundColor};
  color: white;
  border: 0;
  font-size: 0.875rem;
  padding: 0.375rem 0.75rem;
  border-radius: 0.375rem;
  &:hover {
    background-color: ${pallete.sequenceSelectorButtonHoverBackgroundColor};
  }
`;
/* Pagination components */
export const PaginationContainer = styled.div `
  display: ${({ length }) => (length == 0 ? "none" : "")};

  input, select{
    width: initial !important;
  }
`;
export const PageSizeContainer = styled.div `
  text-align: left;
`;
export const PageNumberContainer = styled.div `
  text-align: right;
`;
/* Toast container components */
export const Header = styled(Toast.Header) `
  color: ${({ message }) => (message == "Success !!" ? "#35a835" : "#e34c4c")};
  background-color: white;

  .dot {
    width: 1.25rem;
    height: 1.25rem;
    border-radius: 50%;
    margin-right: 5px;
    background-color: ${({ message }) => message == "Success !!" ? "green" : "red"};
  }
`;
