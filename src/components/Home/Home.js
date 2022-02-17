import React, { Component } from "react";
import "./Home.scss";
import { connect } from "react-redux";
import ViewSectionCard from "../../containers/viewSections/ViewSectionCard";
import TableRowContainer from "../../containers/TableRowContainer/TableRowContainer";
import ShortTableRowContainer from "../../containers/TableRowContainer/ShortTableRowContainer";
import SearchContainer from "../../containers/SearchContainer/SearchContainer";
import EditableInline from "../../containers/EditableInline/EditableInline";
import AddContainer from "../../containers/AddContainer/AddContainer";
import {
  GetSitesListActionRequest,
  DeleteSiteActionRequest,
  CreateSiteActionRequest,
} from "../../store/actions/SitesListAction";
import { GetCategoryListActionRequest } from "../../store/actions/CategoryAction";
import { GetUsersListActionRequest } from "../../store/actions/UsersActions";
import { NotificationManager } from "react-notifications";
import { filtering } from "./Filtering";
import Util from "../../containers/util";

export class Home extends Component {
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
      selectedUserSearch: null,
      selectedSiteSearch: null,
      selectedCategorieSearch: null,
      selectedStatusSearch: null,
      addButtonClicked: false,
      confirmMessage: false,
      urlForCreate: "",
      categoryList: "",
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
    const dataa = JSON.parse(sessionStorage.getItem("filterSites"));
    if (dataa) {
      this.setState({
        inputValue: dataa.search ? dataa.search : "",
        countPerPage: parseInt(dataa.limit),
        page: parseInt(dataa.page) + 1,
        sortName: dataa.sort_key,
        sortDir: dataa.sort_dir,
        selectedStatusSearch: dataa.filters?.state
          ? { id: parseInt(dataa.filters?.state) }
          : null,
        selectedUserSearch: dataa.filters?.owner
          ? { id: parseInt(dataa.filters?.owner) }
          : null,
      });
      this.props.dispatch(
        GetSitesListActionRequest({
          search: dataa.search ? dataa.search : "",
          limit: dataa.limit,
          page: parseInt(dataa.page) + 1,
          sortName: dataa.sort_key,
          sortDir: dataa.sort_dir,
          status: "",
          user: dataa.filters?.owner ? dataa.filters?.owner : "",
          category: this.state.selectedCategorieSearch
            ? this.state.selectedCategorieSearch?.id
            : "",
          site: "",
          state: dataa.filters?.state ? dataa.filters?.state : "",
        })
      );
    } else {
      this.props.dispatch(
        GetSitesListActionRequest({
          search: "",
          limit: this.state.countPerPage,
          page: this.state.page,
          sortName: this.state.sortName,
          sortDir: this.state.sortDir,
          status: "",
          user: this.state.selectedUserSearch
            ? this.state.selectedUserSearch
            : "",
          category: this.state.selectedCategorieSearch
            ? this.state.selectedCategorieSearch?.id
            : "",
          site: "",
          state: this.state.selectedStatusSearch
            ? this.state.selectedStatusSearch?.id
            : "",
        })
      );
    }
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

  componentDidUpdate(prevProps) {
    const {
      selectedSiteSearch,
      selectedCategorieSearch,
      selectedStatusSearch,
      inputValue,
      selectedUserSearch,
    } = this.state;

    const {
      getSitesList,
      deleteSite,
      getCategoryList,
      bindCategory,
      unbindCategory,
      createSite,
    } = this.props;
    const {
      data: createSiteData,
      loading: createSiteLoading,
      error: createSiteError,
      errorData: createSiteErrorData,
    } = createSite;

    const {
      data: getSitesListData,
      loading: getSitesListLoading,
      error: getSitesListError,
    } = getSitesList;
    const {
      data: deleteSiteData,
      loading: deleteSiteLoading,
      error: deleteSiteError,
    } = deleteSite;
    const {
      loading: getCategoryListLoading,
      error: getCategoryListError,
      data: getCategoryListData,
    } = getCategoryList;
    const {
      data: unbindCategoryData,
      loading: unbindCategoryLoading,
      error: unbindCategoryError,
    } = unbindCategory;
    const {
      data: bindCategoryData,
      loading: bindCategoryLoading,
      error: bindCategoryError,
    } = bindCategory;

    if (
      prevProps.bindCategory !== bindCategory &&
      !bindCategoryError &&
      !bindCategoryLoading &&
      bindCategoryData
    ) {
      NotificationManager.success(
        "Category successfully bind",
        "Success",
        2000
      );
      this.props.dispatch(
        GetSitesListActionRequest({
          search: this.state.inputValue,
          limit: this.state.countPerPage,
          page: this.state.page,
          sortName: this.state.sortName,
          sortDir: this.state.sortDir,
          status: "",
          user: this.state.selectedUserSearch
            ? this.state.selectedUserSearch?.id
            : "",
          category: this.state.selectedCategorieSearch
            ? this.state.selectedCategorieSearch?.id
            : "",
          site: "",
          state: this.state.selectedStatusSearch
            ? this.state.selectedStatusSearch?.id
            : "",
        })
      );
    }

    if (
      prevProps.createSite !== createSite &&
      !createSiteError &&
      !createSiteLoading &&
      createSiteData
    ) {
      NotificationManager.success("Site successfully created", "Success", 2000);
      this.props.history.push(`/sites/${createSiteData?.data?.id}`);
    } else if (
      prevProps.createSite !== createSite &&
      createSiteError &&
      createSiteErrorData
    ) {
      NotificationManager.error(
        `${createSiteErrorData.data.message}`,
        "Failed",
        2000
      );
    }

    if (
      prevProps.unbindCategory !== unbindCategory &&
      !unbindCategoryError &&
      !unbindCategoryLoading &&
      unbindCategoryData
    ) {
      NotificationManager.success(
        "Category successfully unbind",
        "Success",
        2000
      );
      this.props.dispatch(
        GetSitesListActionRequest({
          search: this.state.inputValue,
          limit: this.state.countPerPage,
          page: this.state.page,
          sortName: this.state.sortName,
          sortDir: this.state.sortDir,
          status: "",
          user: this.state.selectedUserSearch
            ? this.state.selectedUserSearch?.id
            : "",
          category: this.state.selectedCategorieSearch
            ? this.state.selectedCategorieSearch?.id
            : "",
          site: "",
          state: this.state.selectedStatusSearch
            ? this.state.selectedStatusSearch?.id
            : "",
        })
      );
    }

    if (
      prevProps.getCategoryList !== getCategoryList &&
      !getCategoryListLoading &&
      !getCategoryListError &&
      getCategoryListData
    ) {
      this.setState({ categoryList: getCategoryListData.data });
    }

    if (
      prevProps.getSitesList !== getSitesList &&
      !getSitesListError &&
      !getSitesListLoading &&
      getSitesListData
    ) {
      if (
        selectedStatusSearch ||
        selectedCategorieSearch ||
        selectedSiteSearch ||
        selectedUserSearch ||
        inputValue
      ) {
        this.setState({
          data: getSitesListData?.data,
          info: getSitesListData?.info,
          loading: false,
        });
        sessionStorage.setItem(
          "filterSites",
          JSON.stringify(getSitesListData?.info)
        );
      } else {
        this.setState({
          data: getSitesListData?.data,
          info: getSitesListData?.info,
          loading: false,
        });
        sessionStorage.setItem(
          "filterSites",
          JSON.stringify(getSitesListData?.info)
        );
      }
      if (
        selectedStatusSearch === null &&
        selectedCategorieSearch === null &&
        inputValue === null &&
        selectedUserSearch === null
      ) {
        setTimeout(() => {
          if (
            this.props.location?.data?.searchByuser &&
            getSitesListData.data
          ) {
            this.handleSearchOnMainPage(
              this.props.location?.data?.searchByuser
            );
          } else if (
            this.props.location?.data?.searchBycategory &&
            getSitesListData.data
          ) {
            this.handleSearchOnMainPage(
              this.props.location?.data?.searchBycategory
            );
          }
        });
      }
      //   setTimeout(() => {
      //     this.setState({ page: 1 });

      //     // this.paginate(1);
      //   });
    }

    if (
      prevProps.deleteSite !== deleteSite &&
      !deleteSiteError &&
      !deleteSiteLoading &&
      deleteSiteData
    ) {
      NotificationManager.success("Site successfully deleted", "Success", 2000);
      this.setState({ confirmMessage: false });
      this.props.dispatch(
        GetSitesListActionRequest({
          search: this.state.inputValue,
          limit: this.state.countPerPage,
          page: this.state.page,
          sortName: this.state.sortName,
          sortDir: this.state.sortDir,
          status: "",
          user: this.state.selectedUserSearch
            ? this.state.selectedUserSearch?.id
            : "",
          category: this.state.selectedCategorieSearch
            ? this.state.selectedCategorieSearch?.id
            : "",
          site: "",
          state: this.state.selectedStatusSearch
            ? this.state.selectedStatusSearch?.id
            : "",
        })
      );
    }
  }

  handlePageChange = (value) => {
    this.setState({ page: value });
    // this.paginate(value);
    setTimeout(() => {
      this.props.dispatch(
        GetSitesListActionRequest({
          search: this.state.inputValue,
          limit: this.state.countPerPage,
          page: this.state.page,
          sortName: this.state.sortName,
          sortDir: this.state.sortDir,
          status: "",
          user: this.state.selectedUserSearch
            ? this.state.selectedUserSearch?.id
            : "",
          category: this.state.selectedCategorieSearch
            ? this.state.selectedCategorieSearch?.id
            : "",
          site: "",
          state: this.state.selectedStatusSearch
            ? this.state.selectedStatusSearch?.id
            : "",
        })
      );
    });
  };

  handleSortByStatus = (value) => {
    if (this.state.selectedStatusSearch?.id === value || value === "NOTRASH") {
      this.setState({ selectedStatusSearch: "" });
    } else {
      this.setState({ selectedStatusSearch: { id: value } });
    }

    setTimeout(() => {
      this.props.dispatch(
        GetSitesListActionRequest({
          search: this.state.inputValue,
          limit: this.state.countPerPage,
          page: this.state.page,
          sortName: this.state.sortName,
          sortDir: this.state.sortDir,
          status: "",
          user: this.state.selectedUserSearch
            ? this.state.selectedUserSearch?.id
            : "",
          category: this.state.selectedCategorieSearch
            ? this.state.selectedCategorieSearch?.id
            : "",
          site: "",
          state: this.state.selectedStatusSearch
            ? this.state.selectedStatusSearch?.id
            : "",
        })
      );
    });
  };

  handleSubtmit = (e) => {
    e.preventDefault();

    // setTimeout(() => {
    //   this.props.dispatch(
    //     GetSitesListActionRequest({
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
        GetSitesListActionRequest({
          search: value,
          limit: this.state.countPerPage,
          page: this.state.page,
          sortName: this.state.sortName,
          sortDir: this.state.sortDir,
          status: "",
          user: this.state.selectedUserSearch
            ? this.state.selectedUserSearch?.id
            : "",
          category: this.state.selectedCategorieSearch
            ? this.state.selectedCategorieSearch?.id
            : "",
          site: "",
          state: this.state.selectedStatusSearch
            ? this.state.selectedStatusSearch?.id
            : "",
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

  handleArrowSort = (sortByClicked, value) => {
    console.log(sortByClicked, value);

    if (value === "Up") {
      const sorted = this.state.data.sort((a, b) => {
        if (
          sortByClicked === "in" ||
          sortByClicked === "out" ||
          sortByClicked === "txr"
        ) {
          return b.stats[sortByClicked] - a.stats[sortByClicked];
        }
        //  else {
        //   if (
        //     typeof a[sortByClicked] === "string" ||
        //     typeof b[sortByClicked] === "string"
        //   ) {
        //     return b[sortByClicked]?.localeCompare(a[sortByClicked]);
        //   } else {
        //     return b[sortByClicked] - a[sortByClicked];
        //   }
        // }
      });
      this.setState({ data: sorted });
      setTimeout(() => {
        this.setState({ page: 1 });

        // this.paginate(1);
      });
    } else if (value === "Down") {
      const sorted = this.state.data.sort((a, b) => {
        if (
          sortByClicked === "in" ||
          sortByClicked === "out" ||
          sortByClicked === "txr"
        ) {
          return a.stats[sortByClicked] - b.stats[sortByClicked];
        }
        // else {
        //   if (
        //     typeof a[sortByClicked] === "string" ||
        //     typeof b[sortByClicked] === "string"
        //   ) {
        //     return a[sortByClicked]?.localeCompare(b[sortByClicked]);
        //   } else {
        //     return a[sortByClicked] - b[sortByClicked];
        //   }
        // }
      });
      this.setState({ data: sorted });
      setTimeout(() => {
        this.setState({ page: 1 });

        // this.paginate(1);
      });
    } else {
      this.setState({ sortName: sortByClicked, sortDir: value });

      this.props.dispatch(
        GetSitesListActionRequest({
          search: this.state.inputValue,
          limit: this.state.countPerPage,
          page: this.state.page,
          sortName: sortByClicked,
          sortDir: value,
          status: "",
          user: this.state.selectedUserSearch
            ? this.state.selectedUserSearch?.id
            : "",
          category: this.state.selectedCategorieSearch
            ? this.state.selectedCategorieSearch?.id
            : "",
          site: "",
          state: this.state.selectedStatusSearch
            ? this.state.selectedStatusSearch?.id
            : "",
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
        GetSitesListActionRequest({
          search: this.state.inputValue,
          limit: this.state.countPerPage,
          page: this.state.page,
          sortName: this.state.sortName,
          sortDir: this.state.sortDir,
          status: "",
          user: this.state.selectedUserSearch
            ? this.state.selectedUserSearch?.id
            : "",
          category: this.state.selectedCategorieSearch
            ? this.state.selectedCategorieSearch?.id
            : "",
          site: "",
          state: this.state.selectedStatusSearch
            ? this.state.selectedStatusSearch?.id
            : "",
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
    //       GetSitesListActionRequest({
    //         search: "",
    //         limit: this.state.countPerPage,
    //         page: this.state.page,
    //         sortName: this.state.sortName,
    //         sortDir: this.state.sortDir,
    //         status: "",
    //         user: this.state.selectedUserSearch
    //           ? this.state.selectedUserSearch?.id
    //           : "",
    //         category: this.state.selectedCategorieSearch
    //           ? this.state.selectedCategorieSearch?.id
    //           : "",
    //         site: "",
    //         state: this.state.selectedStatusSearch
    //           ? this.state.selectedStatusSearch?.id
    //           : "",
    //       })
    //     );
    //   });
    // } else {
    this.setState({ countPerPage: parseInt(e.target.value) });
    setTimeout(() => {
      this.setState({ page: 1 });

      this.props.dispatch(
        GetSitesListActionRequest({
          search: this.state.inputValue,
          limit: this.state.countPerPage,
          page: this.state.page,
          sortName: this.state.sortName,
          sortDir: this.state.sortDir,
          status: "",
          user: this.state.selectedUserSearch
            ? this.state.selectedUserSearch?.id
            : "",
          category: this.state.selectedCategorieSearch
            ? this.state.selectedCategorieSearch?.id
            : "",
          site: "",
          state: this.state.selectedStatusSearch
            ? this.state.selectedStatusSearch?.id
            : "",
        })
      );
    });
    // }
  };
  handleSearchOnMainPage = (el, secondElement) => {
    if (this.props.location?.data?.searchByuser && !secondElement) {
      this.setState({ selectedUserSearch: el });
      setTimeout(() => {
        this.props.dispatch(
          GetSitesListActionRequest({
            search: this.state.inputValue,
            limit: this.state.countPerPage,
            page: this.state.page,
            sortName: this.state.sortName,
            sortDir: this.state.sortDir,
            status: "",
            user: this.state.selectedUserSearch
              ? this.state.selectedUserSearch?.id
              : "",
            category: this.state.selectedCategorieSearch
              ? this.state.selectedCategorieSearch?.id
              : "",
            site: "",
            state: this.state.selectedStatusSearch
              ? this.state.selectedStatusSearch?.id
              : "",
          })
        );
      });
    } else if (this.props.location?.data?.searchBycategory && !secondElement) {
      this.setState({ selectedCategorieSearch: el });
      setTimeout(() => {
        this.props.dispatch(
          GetSitesListActionRequest({
            search: this.state.inputValue,
            limit: this.state.countPerPage,
            page: this.state.page,
            sortName: this.state.sortName,
            sortDir: this.state.sortDir,
            status: "",
            user: this.state.selectedUserSearch
              ? this.state.selectedUserSearch?.id
              : "",
            category: this.state.selectedCategorieSearch
              ? this.state.selectedCategorieSearch?.id
              : "",
            site: "",
            state: this.state.selectedStatusSearch
              ? this.state.selectedStatusSearch?.id
              : "",
          })
        );
      });
    } else if (this.props.location?.data?.searchBy && !secondElement) {
      this.setState({ selectedSiteSearch: el });
      setTimeout(() => {
        this.props.dispatch(
          GetSitesListActionRequest({
            search: this.state.inputValue,
            limit: this.state.countPerPage,
            page: this.state.page,
            sortName: this.state.sortName,
            sortDir: this.state.sortDir,
            status: "",
            user: this.state.selectedUserSearch
              ? this.state.selectedUserSearch?.id
              : "",
            category: this.state.selectedCategorieSearch
              ? this.state.selectedCategorieSearch?.id
              : "",
            site: "",
            state: this.state.selectedStatusSearch
              ? this.state.selectedStatusSearch?.id
              : "",
          })
        );
      });
    } else {
      if (!this.state.addButtonClicked) {
        if (secondElement === "users") {
          this.setState({ selectedUserSearch: el });
          setTimeout(() => {
            this.props.dispatch(
              GetSitesListActionRequest({
                search: this.state.inputValue,
                limit: this.state.countPerPage,
                page: this.state.page,
                sortName: this.state.sortName,
                sortDir: this.state.sortDir,
                status: "",
                user: this.state.selectedUserSearch
                  ? this.state.selectedUserSearch?.id
                  : "",
                category: this.state.selectedCategorieSearch
                  ? this.state.selectedCategorieSearch?.id
                  : "",
                site: "",
                state: this.state.selectedStatusSearch
                  ? this.state.selectedStatusSearch?.id
                  : "",
              })
            );
          });
        } else if (secondElement === "categories") {
          this.setState({ selectedCategorieSearch: el });
          setTimeout(() => {
            this.props.dispatch(
              GetSitesListActionRequest({
                search: this.state.inputValue,
                limit: this.state.countPerPage,
                page: this.state.page,
                sortName: this.state.sortName,
                sortDir: this.state.sortDir,
                status: "",
                user: this.state.selectedUserSearch
                  ? this.state.selectedUserSearch?.id
                  : "",
                category: this.state.selectedCategorieSearch
                  ? this.state.selectedCategorieSearch?.id
                  : "",
                site: "",
                state: this.state.selectedStatusSearch
                  ? this.state.selectedStatusSearch?.id
                  : "",
              })
            );
          });
        }
      }
    }
  };

  handleAddSomeMore = () => {
    this.setState({ addButtonClicked: !this.state.addButtonClicked });
  };

  deletesiteFunction = () => {
    this.props.dispatch(
      DeleteSiteActionRequest({
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
    } else if (sortBy === "sites") {
      this.setState({ selectedSiteSearch: "" });
    } else if (sortBy === "users") {
      this.setState({ selectedUserSearch: "" });
    }
    setTimeout(() => {
      this.props.dispatch(
        GetSitesListActionRequest({
          search: this.state.inputValue,
          limit: this.state.countPerPage,
          page: this.state.page,
          sortName: this.state.sortName,
          sortDir: this.state.sortDir,
          status: "",
          user: this.state.selectedUserSearch
            ? this.state.selectedUserSearch?.id
            : "",
          category: this.state.selectedCategorieSearch
            ? this.state.selectedCategorieSearch?.id
            : "",
          site: "",
          state: this.state.selectedStatusSearch
            ? this.state.selectedStatusSearch?.id
            : "",
        })
      );
    });
  };

  render() {
    const { urlForCreate, loading } = this.state;

    return (
      <>
        {/* <div className='mainDivForViewSection' style={{ marginTop: '44px' }}>
                    <div >
                        <ViewSectionCard label={'<p><span>Info categories </span> <br> on site <span>Novosti.rs</span></p>'} description={'<p>Following categories were disabled: <span> sport, vesti, zabava </span> <br> They were disabled because they have less than 2 posts.</p>'} customDescriptionStyle={{ backgroundColor: '#AEE8F0' }} customStyle={{ backgroundColor: '#94D7E0' }} />
                    </div>
                    <div style={{ marginTop: '17px' }}>
                        <ViewSectionCard label={'<p><span>Warning categories </span> <br> on site <span>Novosti.rs</span></p>'} description={'<p>Following categories were disabled: <span> sport, vesti, zabava </span> <br> They were disabled because they have less than 2 posts.</p>'} customDescriptionStyle={{ backgroundColor: '#EFF0AE' }} customStyle={{ backgroundColor: '#DFE094' }} />
                    </div>
                    <div style={{ marginTop: '17px' }}>
                        <ViewSectionCard label={'<p><span>Error categories </span> <br> on site <span>Novosti.rs</span></p>'} description={'<p>Following categories were disabled: <span> sport, vesti, zabava </span> <br> They were disabled because they have less than 2 posts.</p>'} customDescriptionStyle={{ backgroundColor: '#F0D2AE' }} customStyle={{ backgroundColor: '#E0B494' }} />
                    </div>
                </div> */}
        <SearchContainer
          handleAllOptionsOnMain={this.handleAllOptionsOnMain}
          handleAddSomeMore={this.handleAddSomeMore}
          page={this.state.page}
          handleSearchOnMainPage={this.handleSearchOnMainPage}
          state={this.state}
          handleCountPerPage={this.handleCountPerPage}
          handleAllView={this.handleAllView}
          pageName={"SITES"}
          handleSearchBar={this.handleSearchBar}
          handleSubtmit={this.handleSubtmit}
          handlePageChange={this.handlePageChange}
          handleSortByStatus={this.handleSortByStatus}
        />
        {this.state.addButtonClicked && (
          <AddContainer>
            {/* {!selectedUserSearch && <p style={{ color: '#7befff', fontSize: '18px', alignSelf: 'center', padding: '0 10px' }}>Please choose owner.</p>} */}
            {
              <input
                type="text"
                onChange={(e) =>
                  this.setState({ urlForCreate: e.target.value })
                }
                placeholder="Enter Url"
              />
            }
            {urlForCreate && (
              <button
                onClick={() => {
                  //     this.props.history.push({
                  //     pathname: '/sites/create',
                  //     data: {
                  //         url: urlForCreate,
                  //         //  owner: selectedUserSearch,
                  //         buttonClicked: 'editDiv', createNew: true
                  //     }
                  // })
                  this.props.dispatch(
                    CreateSiteActionRequest({
                      url: urlForCreate,
                    })
                  );
                }}
              >
                <p>Create site</p>
              </button>
            )}
          </AddContainer>
        )}

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
              handleTrashFunctionaliti={this.handleTrashFunctionaliti}
              state={this.state}
              handleHashArrowClick={this.handleHashArrowClick}
              handleCheckbox={this.handleCheckbox}
              handleArrowSort={this.handleArrowSort}
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
              handleTrashFunctionaliti={this.handleTrashFunctionaliti}
              state={this.state}
              handleHashArrowClick={this.handleHashArrowClick}
              handleCheckbox={this.handleCheckbox}
              checkboxList={this.state.checkboxList}
              handleArrowSort={this.handleArrowSort}
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
  const { SitesListReducer, CategoryReducer } = state;
  const { getSitesList, deleteSite, createSite } = SitesListReducer;
  const { getCategoryList, bindCategory, unbindCategory } = CategoryReducer;

  return {
    getSitesList,
    deleteSite,
    getCategoryList,
    bindCategory,
    unbindCategory,
    createSite,
  };
};

export default connect(mapStateToProps, null)(Home);
