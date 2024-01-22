import { Link } from "react-router-dom";
import { NavigationIndicatorSpan, OrderContainer } from "../../order/OrderStyledComponents";
import { pallete } from "../../../utils/style-utils";

type NavigationItem = {
  icon: any;
  name: string;
  url: string;
};

type NavigationIndicatorProps = {
  path: NavigationItem[];
  curr: NavigationItem;
};

const NavigationIndicator = (props: NavigationIndicatorProps) => {
  return (
    <ul className="nav px-2">
      {props.path.map((item, idx) => (
        <>
          <li className="nav-item">
            <Link className="nav-link p-0" to={item.url}>
              <NavigationIndicatorSpan>{item.icon}<i>{item.name}</i></NavigationIndicatorSpan>
            </Link>
          </li>
          <li className="nav-item px-1">
            <NavigationIndicatorSpan className="nav-link p-0 fw-bold"><i>&nbsp;&gt;&nbsp;</i></NavigationIndicatorSpan>
          </li>
        </>
      ))}
      <li className="nav-item">
        <Link className="nav-link p-0 active" to={props.curr.url}>
          <NavigationIndicatorSpan>{props.curr.icon}<i>{props.curr.name}</i></NavigationIndicatorSpan>
        </Link>
      </li>
    </ul>
  );
};

export default NavigationIndicator;
