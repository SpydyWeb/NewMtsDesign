import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import "./utils.css";
import { Header } from "./UtilStyledComponents";

type toastProps = {
  messages: any[];
  setMessages: any;
};

const Toasts = (props: toastProps) => {
  return (
    <ToastContainer className="p-3" position="top-end" key={props.messages.toString()}>
      {props.messages.map((item, idx) => (
        <Toast
          key={item.message + idx}
          autohide
          delay={10000}
          onClose={() => {
            let temp = props.messages;
            temp = temp.filter((item, i) => {
              return i != idx;
            });
            props.setMessages(temp);
          }}>
          <Header message={item.title}>
            <div className="dot"></div>
            <strong className="me-auto">{item.title}</strong>
          </Header>
          <Toast.Body>{item.message}</Toast.Body>
        </Toast>
      ))}
    </ToastContainer>
  );
};

export default Toasts;
