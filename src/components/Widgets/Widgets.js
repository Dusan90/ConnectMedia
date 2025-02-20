import React, { Component } from "react";
import TableRowContainer from "../../containers/TableRowContainer/TableRowContainer";
import ShortTableRowContainer from "../../containers/TableRowContainer/ShortTableRowContainer";
import SearchContainer from "../../containers/SearchContainer/SearchContainer";
// import AddContainer from '../../containers/AddContainer/AddContainer'
// import Select from 'react-select'
import { connect } from "react-redux";
import "../Home/Home.scss";
import EditableInline from "../../containers/EditableInline/EditableInline";
import {
  GetWidgetsListActionRequest,
  DeleteWidgetActionRequest,
} from "../../store/actions/WidgetActions";
import { GetSitesListActionRequest } from "../../store/actions/SitesListAction";
import { GetCategoryListActionRequest } from "../../store/actions/CategoryAction";
import { GetUsersListActionRequest } from "../../store/actions/UsersActions";

import { NotificationManager } from "react-notifications";
import { filtering } from "./Filtering";

// const customSelectStyles = {
//     control: (base, state) => ({
//         ...base,
//         flex: "1",
//         fontWeight: "500",
//         // background: "white",
//         background: '#d6dbdc',
//         // !props.organization && props.color && "rgb(245, 192, 192)",
//     }),
//     placeholder: () => ({
//         color: 'black'
//     })
// };

export class Widgets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      data: [],
      info: "",
      filteredDate: "",
      tipeSearch: "",
      inputValue: "",
      checkboxList: [],
      hashesArrowDown: false,
      hashesArrowWitchIsOn: "",
      countPerPage: 20,
      selectedSiteSearch: null,
      selectedCategorieSearch: null,
      selectedStatusSearch: null,
      confirmMessage: false,
      idForDelete: "",

      dataToRender: [],
      mamxPages: "",
      loading: true,
      sortName: "",
      sortDir: "",
    };
  }

  //   paginate = (page) => {
  //     const { countPerPage, data } = this.state;
  //     const dataToRender = data;
  //     let limit = countPerPage;
  //     let pages = Math.ceil(dataToRender.length / countPerPage);
  //     const offset = (page - 1) * limit;
  //     const newArray = dataToRender.slice(offset, offset + limit);

  //     this.setState({
  //       dataToRender: newArray,
  //       loading: false,
  //       maxPages: pages,
  //     });
  //   };

  componentDidMount() {
    this.props.dispatch(
      GetSitesListActionRequest({
        search: "",
        limit: "",
        page: "",
        sortName: "",
        sortDir: "",
        status: "",
        user: "",
        category: "",
        site: "",
        state: "",
      })
    );
    const dataa = JSON.parse(sessionStorage.getItem("filterWidgets"));
    if (dataa) {
      this.setState({
        inputValue: dataa.search ? dataa.search : "",
        countPerPage: parseInt(dataa.limit),
        page: parseInt(dataa.page) + 1,
        sortName: dataa.sort_key,
        sortDir: dataa.sort_dir,
        selectedStatusSearch: dataa.filters?.status
          ? { id: parseInt(dataa.filters?.status) }
          : null,
        selectedSiteSearch: dataa.filters?.site
          ? { id: parseInt(dataa.filters?.site) }
          : null,
      });
      this.props.dispatch(
        GetWidgetsListActionRequest({
          search: dataa.search ? dataa.search : "",
          limit: dataa.limit,
          page: parseInt(dataa.page) + 1,
          sortName: dataa.sort_key,
          sortDir: dataa.sort_dir,
          status: dataa.filters?.status ? dataa.filters?.status : "",
          user: "",
          category: this.state.selectedCategorieSearch
            ? this.state.selectedCategorieSearch?.id
            : "",
          site: dataa.filters?.site ? dataa.filters?.site : "",
          state: "",
        })
      );
    } else {
      this.props.dispatch(
        GetWidgetsListActionRequest({
          search: "",
          limit: this.state.countPerPage,
          page: this.state.page,
          sortName: this.state.sortName,
          sortDir: this.state.sortDir,
          status: this.state.selectedStatusSearch
            ? this.state.selectedStatusSearch?.id
            : "",
          user: "",
          category: this.state.selectedCategorieSearch
            ? this.state.selectedCategorieSearch?.id
            : "",
          site: this.state.selectedSiteSearch
            ? this.state.selectedSiteSearch?.id
            : "",
          state: "",
        })
      );
    }
  }

  componentDidUpdate(prevProps) {
    const {
      selectedSiteSearch,
      selectedCategorieSearch,
      selectedStatusSearch,
      inputValue,
    } = this.state;
    const {
      getWidgetsList,
      deleteWidget,
      updateWidgetDetails,
      getSitesList,
      getCategoryList,
      getUsersList,
    } = this.props;
    const {
      loading: getWidgetsListLoading,
      error: getWidgetsListError,
      data: getWidgetsListData,
    } = getWidgetsList;
    const {
      loading: deleteWidgetLoading,
      error: deleteWidgetError,
      data: deleteWidgetData,
    } = deleteWidget;
    const {
      data: updateWidgetDetailsData,
      loading: updateWidgetDetailsLoading,
      error: updateWidgetDetailsError,
      errorData: updateWidgetDetailsErrorData,
    } = updateWidgetDetails;

    const {
      loading: getSitesListLoading,
      error: getSitesListError,
      data: getSitesListData,
    } = getSitesList;
    const {
      loading: getCategoryListLoading,
      error: getCategoryListError,
      data: getCategoryListData,
    } = getCategoryList;
    const {
      loading: getUsersListLoading,
      error: getUsersListError,
      data: getUsersListData,
    } = getUsersList;

    if (
      prevProps.deleteWidget !== deleteWidget &&
      !deleteWidgetError &&
      !deleteWidgetLoading &&
      deleteWidgetData
    ) {
      NotificationManager.success(
        "Widget successfully deleted",
        "Success",
        2000
      );
      this.setState({ confirmMessage: false });
      this.props.dispatch(
        GetWidgetsListActionRequest({
          search: this.state.inputValue,
          limit: this.state.countPerPage,
          page: this.state.page,
          sortName: this.state.sortName,
          sortDir: this.state.sortDir,
          status: this.state.selectedStatusSearch
            ? this.state.selectedStatusSearch?.id
            : "",
          user: "",
          category: this.state.selectedCategorieSearch
            ? this.state.selectedCategorieSearch?.id
            : "",
          site: this.state.selectedSiteSearch
            ? this.state.selectedSiteSearch?.id
            : "",
          state: "",
        })
      );
    }

    if (
      prevProps.getWidgetsList !== getWidgetsList &&
      !getWidgetsListLoading &&
      !getWidgetsListError &&
      getWidgetsListData
    ) {
      if (
        selectedStatusSearch === null &&
        selectedCategorieSearch === null &&
        inputValue === null &&
        selectedSiteSearch === null
      ) {
        setTimeout(() => {
          if (this.props.location?.data?.searchBy && getWidgetsListData.data) {
            this.handleSearchOnMainPage(this.props.location?.data?.searchBy);
          } else if (
            this.props.location?.data?.searchByuser &&
            getWidgetsListData.data
          ) {
            this.handleSearchOnMainPage(
              this.props.location?.data?.searchByuser
            );
          } else if (
            this.props.location?.data?.searchBycategory &&
            getWidgetsListData.data
          ) {
            this.handleSearchOnMainPage(
              this.props.location?.data?.searchBycategory
            );
          }
        });
      }
      if (
        selectedStatusSearch ||
        selectedCategorieSearch ||
        selectedSiteSearch ||
        inputValue
      ) {
        this.setState({
          data: getWidgetsListData.data,
          info: getWidgetsListData.info,
          loading: false,
        });
        sessionStorage.setItem(
          "filterWidgets",
          JSON.stringify(getWidgetsListData?.info)
        );
      } else {
        this.setState({
          data: getWidgetsListData.data,
          info: getWidgetsListData.info,
          loading: false,
        });
        sessionStorage.setItem(
          "filterWidgets",
          JSON.stringify(getWidgetsListData?.info)
        );
      }

      //   setTimeout(() => {
      //     this.setState({ page: 1 });

      //     this.paginate(1);
      //   });
    }

    if (!getUsersListLoading && !getUsersListError && !getUsersListData) {
      this.props.dispatch(
        GetUsersListActionRequest({
          search: "",
          limit: "",
          page: "",
          sortName: "",
          sortDir: "",
        })
      );
    }

    if (
      !getCategoryListLoading &&
      !getCategoryListError &&
      !getCategoryListData
    ) {
      this.props.dispatch(
        GetCategoryListActionRequest({
          search: "",
          limit: "",
          page: "",
          sortName: "",
          sortDir: "",
          status: "",
          user: "",
          category: "",
          site: "",
          state: "",
        })
      );
    }

    if (!getSitesListLoading && !getSitesListError && !getSitesListData) {
      this.props.dispatch(
        GetSitesListActionRequest({
          search: "",
          limit: "",
          page: "",
          sortName: "",
          sortDir: "",
          status: "",
          user: "",
          category: "",
          site: "",
          state: "",
        })
      );
    }

    if (
      prevProps.updateWidgetDetails !== updateWidgetDetails &&
      !updateWidgetDetailsError &&
      !updateWidgetDetailsLoading &&
      updateWidgetDetailsData
    ) {
      NotificationManager.success(
        "Widget successfully updated",
        "Success",
        2000
      );
      this.props.history.push("/widgets");
      this.props.dispatch(
        GetWidgetsListActionRequest({
          search: this.state.inputValue,
          limit: this.state.countPerPage,
          page: this.state.page,
          sortName: this.state.sortName,
          sortDir: this.state.sortDir,
          status: this.state.selectedStatusSearch
            ? this.state.selectedStatusSearch?.id
            : "",
          user: "",
          category: this.state.selectedCategorieSearch
            ? this.state.selectedCategorieSearch?.id
            : "",
          site: this.state.selectedSiteSearch
            ? this.state.selectedSiteSearch?.id
            : "",
          state: "",
        })
      );
    } else if (
      prevProps.updateWidgetDetails !== updateWidgetDetails &&
      updateWidgetDetailsError &&
      updateWidgetDetailsErrorData
    ) {
      NotificationManager.error(
        `${updateWidgetDetailsErrorData.data.message}`,
        "Failed",
        2000
      );
    }
  }

  handleSortByStatus = (value) => {
    if (this.state.selectedStatusSearch?.id === value || value === "NOTRASH") {
      this.setState({ selectedStatusSearch: "" });
    } else {
      this.setState({ selectedStatusSearch: { id: value } });
    }

    setTimeout(() => {
      this.props.dispatch(
        GetWidgetsListActionRequest({
          search: this.state.inputValue,
          limit: this.state.countPerPage,
          page: this.state.page,
          sortName: this.state.sortName,
          sortDir: this.state.sortDir,
          status: this.state.selectedStatusSearch
            ? this.state.selectedStatusSearch?.id
            : "",
          user: "",
          category: this.state.selectedCategorieSearch
            ? this.state.selectedCategorieSearch?.id
            : "",
          site: this.state.selectedSiteSearch
            ? this.state.selectedSiteSearch?.id
            : "",
          state: "",
        })
      );
    });
  };

  handleSubtmit = (e) => {
    e.preventDefault();

    // setTimeout(() => {
    //   this.props.dispatch(
    //     GetWidgetsListActionRequest({
    //       search: "",
    //       limit: this.state.countPerPage,
    //       page: this.state.page,
    //     })
    //   );
    // });
  };

  handleSearchBar = (e) => {
    const value = e.target.value.toLowerCase();
    this.setState({ inputValue: value });
    setTimeout(() => {
      this.props.dispatch(
        GetWidgetsListActionRequest({
          search: value,
          limit: this.state.countPerPage,
          page: this.state.page,
          sortName: this.state.sortName,
          sortDir: this.state.sortDir,
          status: this.state.selectedStatusSearch
            ? this.state.selectedStatusSearch?.id
            : "",
          user: "",
          category: this.state.selectedCategorieSearch
            ? this.state.selectedCategorieSearch?.id
            : "",
          site: this.state.selectedSiteSearch
            ? this.state.selectedSiteSearch?.id
            : "",
          state: "",
        })
      );
    });
  };

  handleCheckbox = (e, item) => {
    if (e.target.checked) {
      this.setState({ checkboxList: [...this.state.checkboxList, item] });
    } else {
      const deleted = this.state.checkboxList.filter((el) => el.id !== item.id);
      this.setState({ checkboxList: deleted });
    }
  };

  handleEditableInlineStatus = (value) => {
    console.log(value);
  };

  handleEditableInlineDropDown = (value) => {
    console.log(value);
  };

  handlePageChange = (value) => {
    this.setState({ page: value });
    // this.paginate(value);
    setTimeout(() => {
      this.props.dispatch(
        GetWidgetsListActionRequest({
          search: this.state.inputValue,
          limit: this.state.countPerPage,
          page: this.state.page,
          sortName: this.state.sortName,
          sortDir: this.state.sortDir,
          status: this.state.selectedStatusSearch
            ? this.state.selectedStatusSearch?.id
            : "",
          user: "",
          category: this.state.selectedCategorieSearch
            ? this.state.selectedCategorieSearch?.id
            : "",
          site: this.state.selectedSiteSearch
            ? this.state.selectedSiteSearch?.id
            : "",
          state: "",
        })
      );
    });
  };

  handleArrowSort = (sortByClicked, value) => {
    // ovde moras da imas 2 parametra, moras da prosledis naziv po kome ce se sortirati i drugi je 'up' ili 'down' po tome ces znati koji arrow je kliknut
    if (value === "Up") {
      const sorted = this.state.data.sort((a, b) => {
        if (
          sortByClicked === "ctr" ||
          sortByClicked === "clk" ||
          sortByClicked === "imp"
        ) {
          return a.stats[sortByClicked] - b.stats[sortByClicked];
        }
      });
      this.setState({ data: sorted });
      setTimeout(() => {
        this.setState({ page: 1 });

        // this.paginate(1);
      });
    } else if (value === "Down") {
      const sorted = this.state.data.sort((a, b) => {
        if (
          sortByClicked === "ctr" ||
          sortByClicked === "clk" ||
          sortByClicked === "imp"
        ) {
          return b.stats[sortByClicked] - a.stats[sortByClicked];
        }
      });
      this.setState({ data: sorted });
      setTimeout(() => {
        this.setState({ page: 1 });

        // this.paginate(1);
      });
    } else {
      this.setState({ sortName: sortByClicked, sortDir: value });

      this.props.dispatch(
        GetWidgetsListActionRequest({
          search: this.state.inputValue,
          limit: this.state.countPerPage,
          page: this.state.page,
          sortName: sortByClicked,
          sortDir: value,
          status: this.state.selectedStatusSearch
            ? this.state.selectedStatusSearch?.id
            : "",
          user: "",
          category: this.state.selectedCategorieSearch
            ? this.state.selectedCategorieSearch?.id
            : "",
          site: this.state.selectedSiteSearch
            ? this.state.selectedSiteSearch?.id
            : "",
          state: "",
        })
      );
    }
  };

  handleHashArrowClick = (item) => {
    this.setState({
      hashesArrowDown: !this.state.hashesArrowDown,
      hashesArrowWitchIsOn: item,
    });
  };

  handleAllView = (value) => {
    this.setState({ countPerPage: parseInt(value) });
    setTimeout(() => {
      this.setState({ page: 1 });

      this.props.dispatch(
        GetWidgetsListActionRequest({
          search: this.state.inputValue,
          limit: this.state.countPerPage,
          page: this.state.page,
          sortName: this.state.sortName,
          sortDir: this.state.sortDir,
          status: this.state.selectedStatusSearch
            ? this.state.selectedStatusSearch?.id
            : "",
          user: "",
          category: this.state.selectedCategorieSearch
            ? this.state.selectedCategorieSearch?.id
            : "",
          site: this.state.selectedSiteSearch
            ? this.state.selectedSiteSearch?.id
            : "",
          state: "",
        })
      );
    });
  };

  handleCountPerPage = (e) => {
    // if (e.target.value === "" || e.target.value === "0") {
    //   this.setState({ countPerPage: 10 });
    //   setTimeout(() => {
    //     this.setState({ page: 1 });

    //     this.props.dispatch(
    //       GetWidgetsListActionRequest({
    //         search: "",
    //         limit: this.state.countPerPage,
    //         page: this.state.page,
    //         sortName: this.state.sortName,
    //         sortDir: this.state.sortDir,
    //         status: this.state.selectedStatusSearch
    //           ? this.state.selectedStatusSearch?.id
    //           : "",
    //         user: "",
    //         category: this.state.selectedCategorieSearch
    //           ? this.state.selectedCategorieSearch?.id
    //           : "",
    //         site: this.state.selectedSiteSearch
    //           ? this.state.selectedSiteSearch?.id
    //           : "",
    //         state: "",
    //       })
    //     );
    //   });
    // } else {
    this.setState({ countPerPage: parseInt(e.target.value) });
    setTimeout(() => {
      this.setState({ page: 1 });

      this.props.dispatch(
        GetWidgetsListActionRequest({
          search: this.state.inputValue,
          limit: this.state.countPerPage,
          page: this.state.page,
          sortName: this.state.sortName,
          sortDir: this.state.sortDir,
          status: this.state.selectedStatusSearch
            ? this.state.selectedStatusSearch?.id
            : "",
          user: "",
          category: this.state.selectedCategorieSearch
            ? this.state.selectedCategorieSearch?.id
            : "",
          site: this.state.selectedSiteSearch
            ? this.state.selectedSiteSearch?.id
            : "",
          state: "",
        })
      );
    });
    // }
  };

  handleAddSomeMore = () => {
    this.props.history.push({
      pathname: "/widgets/create",
      data: { buttonClicked: "editDiv", createNew: true },
    });
  };

  handleSearchOnMainPage = (el, secondElement) => {
    console.log(el, secondElement);
    if (this.props.location?.data?.searchByuser && !secondElement) {
      this.setState({ selectedUserSearch: el });
      const newData = this.state.data.filter((elm) => {
        console.log(elm, el);
        return elm.owner.id === el.id;
      });
      this.setState({ data: newData });
      setTimeout(() => {
        this.props.dispatch(
          GetWidgetsListActionRequest({
            search: this.state.inputValue,
            limit: this.state.countPerPage,
            page: this.state.page,
            sortName: this.state.sortName,
            sortDir: this.state.sortDir,
            status: this.state.selectedStatusSearch
              ? this.state.selectedStatusSearch?.id
              : "",
            user: "",
            category: this.state.selectedCategorieSearch
              ? this.state.selectedCategorieSearch?.id
              : "",
            site: this.state.selectedSiteSearch
              ? this.state.selectedSiteSearch?.id
              : "",
            state: "",
          })
        );
      });
    } else if (this.props.location?.data?.searchBycategory && !secondElement) {
      this.setState({ selectedCategorieSearch: el });
      setTimeout(() => {
        this.props.dispatch(
          GetWidgetsListActionRequest({
            search: this.state.inputValue,
            limit: this.state.countPerPage,
            page: this.state.page,
            sortName: this.state.sortName,
            sortDir: this.state.sortDir,
            status: this.state.selectedStatusSearch
              ? this.state.selectedStatusSearch?.id
              : "",
            user: "",
            category: this.state.selectedCategorieSearch
              ? this.state.selectedCategorieSearch?.id
              : "",
            site: this.state.selectedSiteSearch
              ? this.state.selectedSiteSearch?.id
              : "",
            state: "",
          })
        );
      });
    } else if (this.props.location?.data?.searchBy && !secondElement) {
      this.setState({ selectedSiteSearch: el });
      setTimeout(() => {
        this.props.dispatch(
          GetWidgetsListActionRequest({
            search: this.state.inputValue,
            limit: this.state.countPerPage,
            page: this.state.page,
            sortName: this.state.sortName,
            sortDir: this.state.sortDir,
            status: this.state.selectedStatusSearch
              ? this.state.selectedStatusSearch?.id
              : "",
            user: "",
            category: this.state.selectedCategorieSearch
              ? this.state.selectedCategorieSearch?.id
              : "",
            site: this.state.selectedSiteSearch
              ? this.state.selectedSiteSearch?.id
              : "",
            state: "",
          })
        );
      });
    } else {
      if (secondElement === "sites") {
        this.setState({ selectedSiteSearch: el });
        setTimeout(() => {
          this.props.dispatch(
            GetWidgetsListActionRequest({
              search: this.state.inputValue,
              limit: this.state.countPerPage,
              page: this.state.page,
              sortName: this.state.sortName,
              sortDir: this.state.sortDir,
              status: this.state.selectedStatusSearch
                ? this.state.selectedStatusSearch?.id
                : "",
              user: "",
              category: this.state.selectedCategorieSearch
                ? this.state.selectedCategorieSearch?.id
                : "",
              site: this.state.selectedSiteSearch
                ? this.state.selectedSiteSearch?.id
                : "",
              state: "",
            })
          );
        });
      } else if (secondElement === "categories") {
        this.setState({ selectedCategorieSearch: el });
        setTimeout(() => {
          this.props.dispatch(
            GetWidgetsListActionRequest({
              search: this.state.inputValue,
              limit: this.state.countPerPage,
              page: this.state.page,
              sortName: this.state.sortName,
              sortDir: this.state.sortDir,
              status: this.state.selectedStatusSearch
                ? this.state.selectedStatusSearch?.id
                : "",
              user: "",
              category: this.state.selectedCategorieSearch
                ? this.state.selectedCategorieSearch?.id
                : "",
              site: this.state.selectedSiteSearch
                ? this.state.selectedSiteSearch?.id
                : "",
              state: "",
            })
          );
        });
      }
    }
  };

  deletesiteFunction = () => {
    this.props.dispatch(
      DeleteWidgetActionRequest({
        id: this.state.idForDelete,
      })
    );
  };

  handleTrashFunctionaliti = (id) => {
    this.setState({ confirmMessage: true, idForDelete: id });
  };

  handleAllOptionsOnMain = (el, sortBy) => {
    if (sortBy === "categories") {
      this.setState({ selectedCategorieSearch: "" });
    }
    if (sortBy === "sites") {
      this.setState({ selectedSiteSearch: "" });
    }
    setTimeout(() => {
      this.props.dispatch(
        GetWidgetsListActionRequest({
          search: this.state.inputValue,
          limit: this.state.countPerPage,
          page: this.state.page,
          sortName: this.state.sortName,
          sortDir: this.state.sortDir,
          status: this.state.selectedStatusSearch
            ? this.state.selectedStatusSearch?.id
            : "",
          user: "",
          category: this.state.selectedCategorieSearch
            ? this.state.selectedCategorieSearch?.id
            : "",
          site: this.state.selectedSiteSearch
            ? this.state.selectedSiteSearch?.id
            : "",
          state: "",
        })
      );
    });
  };

  render() {
    const { loading } = this.state;

    return (
      <>
        <SearchContainer
          page={this.state.page}
          handleAllOptionsOnMain={this.handleAllOptionsOnMain}
          handleSearchOnMainPage={this.handleSearchOnMainPage}
          handleAddSomeMore={this.handleAddSomeMore}
          state={this.state}
          handleCountPerPage={this.handleCountPerPage}
          handleAllView={this.handleAllView}
          pageName={"WIDGETS"}
          handleSearchBar={this.handleSearchBar}
          handleSubtmit={this.handleSubtmit}
          handleSortByStatus={this.handleSortByStatus}
          handlePageChange={this.handlePageChange}
        />
        {/* {this.state.addButtonClicked && <AddContainer> */}
        {/* {!selectedSiteSearch && <p style={{ color: '#7befff', fontSize: '18px', alignSelf: 'center', padding: '0 10px' }}>Please choose a site.</p>} */}
        {/* <Select
                        className="basic-single"
                        classNamePrefix="select"
                        // defaultValue={colourOptions[0]}
                        // isLoading={true}
                        placeholder='Select a widget to copy'
                        styles={customSelectStyles}
                        isClearable={true}
                        isSearchable={true}
                        name="merge"
                        options={optionss}
                    />
                    <button><p>Create widget</p></button> */}
        {/* </AddContainer>} */}

        {this.state.checkboxList.length !== 0 && (
          <EditableInline
            state={this.state}
            handleEditableInlineStatus={this.handleEditableInlineStatus}
            handleEditableInlineDropDown={this.handleEditableInlineDropDown}
          />
        )}
        {this.state.confirmMessage && (
          <div className="confurmTextOnMani">
            <h4>Are you sure</h4>
            <button onClick={this.deletesiteFunction}>Yes</button>
            <button
              className="nobutton"
              onClick={() => this.setState({ confirmMessage: false })}
            >
              No
            </button>
          </div>
        )}
        <div className="mainTableDiv">
          {!loading && this.state.data.length !== 0 ? (
            <ShortTableRowContainer
              data={this.state.data}
              state={this.state}
              handleTrashFunctionaliti={this.handleTrashFunctionaliti}
              handleHashArrowClick={this.handleHashArrowClick}
              pageName={"widgets"}
              handleArrowSort={this.handleArrowSort}
              handleCheckbox={this.handleCheckbox}
              checkboxList={this.state.checkboxList}
            />
          ) : loading ? (
            <p className="loadingOnShort" style={{ textAlign: "center" }}>
              Loading...
            </p>
          ) : (
            this.state.data.length === 0 && (
              <p className="loadingOnShort" style={{ textAlign: "center" }}>
                No data
              </p>
            )
          )}
          {!loading && this.state.data.length !== 0 ? (
            <TableRowContainer
              data={this.state.data}
              state={this.state}
              handleTrashFunctionaliti={this.handleTrashFunctionaliti}
              handleHashArrowClick={this.handleHashArrowClick}
              pageName={"widgets"}
              handleArrowSort={this.handleArrowSort}
              handleCheckbox={this.handleCheckbox}
              checkboxList={this.state.checkboxList}
            />
          ) : loading ? (
            <p className="loadingOnBig" style={{ textAlign: "center" }}>
              Loading...
            </p>
          ) : (
            this.state.data.length === 0 && (
              <p className="loadingOnBig" style={{ textAlign: "center" }}>
                No data
              </p>
            )
          )}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const { WidgetReducer, SitesListReducer, UsersReducer, CategoryReducer } =
    state;
  const { getSitesList } = SitesListReducer;
  const { getUsersList } = UsersReducer;
  const { getCategoryList } = CategoryReducer;

  const { getWidgetsList, deleteWidget, updateWidgetDetails } = WidgetReducer;

  return {
    getWidgetsList,
    deleteWidget,
    updateWidgetDetails,
    getSitesList,
    getUsersList,
    getCategoryList,
  };
};

export default connect(mapStateToProps, null)(Widgets);
