import { PageNumberContainer, PageSizeContainer, PaginationContainer } from "./UtilStyledComponents";
import "./utils.css";

interface MyProps {
  totalPage: any;
  data: any[];
  pageSize: any;
  setPageSize: any;
  currPage: any;
  setCurrPage: any;
}

const Pagination = (props: MyProps): JSX.Element => {
  return (
    <PaginationContainer className="row" length={props.data.length}>
      <PageSizeContainer className={"col-sm-6"}>
        Records per page:
        <select
          id="pageSize"
          defaultValue={props.pageSize}
          onChange={() => {
            let val = (document.getElementById("pageSize") as HTMLInputElement).value as unknown as number;
            props.setCurrPage(1);
            (document.getElementById("paginationNo") as HTMLInputElement).value = "1";
            props.setPageSize(parseInt(String(val)));
          }}>
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </PageSizeContainer>
      <PageNumberContainer className={"col-sm-6"}>
        Page
        <input
          id="paginationNo"
          type="number"
          min={1}
          max={props.totalPage}
          width={1}
          defaultValue={props.currPage}
          onChange={() => {
            let val = (document.getElementById("paginationNo") as HTMLInputElement).value as unknown as number;
            if (val >= 1 && val <= props.totalPage) {
              props.setCurrPage(parseInt(String(val)));
            }
          }}
        />
        of {props.totalPage}&nbsp;
      </PageNumberContainer>
    </PaginationContainer>
  );
};

export default Pagination;
