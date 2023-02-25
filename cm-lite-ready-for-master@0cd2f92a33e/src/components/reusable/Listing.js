import { View, Box, Heading } from "native-base";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import paginationFactory, {
  PaginationProvider,
  PaginationListStandalone,
  PaginationTotalStandalone,
} from "react-bootstrap-table2-paginator";
import "../../util/TableStyle.css";
import SearchGroupField from "../reusable/SearchGroupField";

export default function Listing(props) {
  const listingType = props.listingType;
  const columns = props.columns;
  const data = props.data;
  const screen_id = props.screen_id;
  const totalList = props.totalList;
  const handleTableChange = props.handleTableChange;

  const customTotal = (from, to, size) => (
    <span className="react-bootstrap-table-pagination-total">
      Showing {from} to {to} of {size} enteries
    </span>
  );
  const pageButtonRenderer = ({ page, active, onPageChange }) => {
    const handleClick = (e) => {
      if (page == "First") {
        page = 1;
      }
      if (page == "Previous") {
        page = props.currentPage - 1;
      }
      if (page == "Next") {
        page = props.currentPage + 1;
      }

      if (page == "Last") {
        page = props.totalPage;
      }
      e.preventDefault();
      onPageChange(page);
      props.setcurrentPage(page);
    };
    const activeStyle = {};
    if (active) {
      activeStyle.color = "#007b85";
      activeStyle.padding = "10px";
    } else {
      activeStyle.color = "black";
      activeStyle.padding = "10px";
      activeStyle.textDecoration = "none";
    }
    if (typeof page === "string") {
      activeStyle.color = "black";
      activeStyle.padding = "10px";
    }
    return (
      <li className="page-item" key={page}>
        <a href="#" onClick={handleClick} style={activeStyle}>
          {page}
        </a>
      </li>
    );
  };
  const options = {
    custom: true,
    hidePageListOnlyOnePage: true,
    paginationTotalRenderer: customTotal,
    firstPageText: "First",
    prePageText: "Previous",
    nextPageText: "Next",
    lastPageText: "Last",
    showTotal: true,
    pageButtonRenderer,
    totalSize: totalList,
    page: props.currentPage,
  };

  return (
    <View p={4}>
      {listingType ? (
        <Heading size="md" mb={2}>
          {listingType}
        </Heading>
      ) : null}

      <Box borderRadius="md" bg={"white"} p={4}>
        <SearchGroupField
          screen_id={screen_id}
          startdate={props.startdate}
          setStartDate={props.setStartDate}
          enddate={props.enddate}
          setEndDate={props.setEndDate}
          searchInput={props.searchInput}
          setsearchInput={props.setsearchInput}
          setcurrentPage={props.setcurrentPage}
        />

        <PaginationProvider pagination={paginationFactory(options)}>
          {({ paginationProps, paginationTableProps }) => (
            <>
              <BootstrapTable
                remote
                keyField="id"
                data={data}
                columns={columns}
                bordered={false}
                headerClasses="headerClass"
                onTableChange={handleTableChange}
                hover
                condensed
                {...paginationTableProps}
              />

              <div>
                <PaginationTotalStandalone {...paginationProps} />
                <PaginationListStandalone {...paginationProps} />
              </div>
            </>
          )}
        </PaginationProvider>
      </Box>
    </View>
  );
}
