import styled from "styled-components";
import { pallete } from "../../utils/style-utils";

export const LoginContainer = styled.div`
  display: flex;
  margin-top: 5rem;
  align-items: center;
  height: 100vh;
  flex-direction: column;
`;

export const Title = styled.h2`
margin-bottom:2rem
`;
export const LoginButton = styled.button`
  background-color: ${pallete.loginbuttonColor};
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
    background-color: ${pallete.loginbuttonColor};
  }
`;
