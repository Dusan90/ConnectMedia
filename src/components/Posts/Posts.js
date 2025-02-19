import React, { Component } from "react";
import SearchContainer from "../../containers/SearchContainer/SearchContainer";
import { connect } from "react-redux";
import arrowUp from "../../assets/img/TableIcons/arrow(1).svg";
import secondarrowDown from "../../assets/img/TableIcons/arrow.svg";
import secondTrash from "../../assets/img/TableIcons/trash.svg";
import visit from "../../assets/img/TableIcons/visit.svg";
import edit from "../../assets/img/TableIcons/edit.svg";
// import posts from '../../assets/img/TableIcons/posts.svg'
import stats from "../../assets/img/TableIcons/stats.svg";
// import widgets from '../../assets/img/TableIcons/widgets.svg'
import EditableInline from "../../containers/EditableInline/EditableInline";
import history from "../../routes/History";
import AddContainer from "../../containers/AddContainer/AddContainer";
import {
  GetPostsListActionRequest,
  DeletePostActionRequest,
  UpdatePostDetailsActionRequest,
} from "../../store/actions/PostActions";
import { GetSitesListActionRequest } from "../../store/actions/SitesListAction";
import { GetCategoryListActionRequest } from "../../store/actions/CategoryAction";
import { GetUsersListActionRequest } from "../../store/actions/UsersActions";

import moment from "moment";
import { NotificationManager } from "react-notifications";
import { filtering } from "./Filtering";
import Util from "../../containers/util";

import "../Home/Home.scss";

export class Posts extends Component {
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
      addButtonClicked: false,
      selectedSiteSearch: null,
      selectedCategorieSearch: null,
      selectedStatusSearch: null,
      urlForCreatePost: "",
      idForDelete: "",
      sitesList: [],

      dataToRender: [],
      mamxPages: "",
      loading: true,
      sortName: "",
      sortDir: "",
      first_position: false,
      priority: false,
      custom_only: false,
    };
    this.inputEl = React.createRef(null);
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
    const dataa = JSON.parse(sessionStorage.getItem("filterPosts"));
    if (dataa) {
      this.setState({
        custom_only: dataa.filters?.custom_only
          ? dataa.filters?.custom_only
          : false,
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
        priority: dataa.filters?.priority ? dataa.filters?.priority : false,
        first_position: dataa.filters?.first_position
          ? dataa.filters?.first_position
          : false,
      });
      setTimeout(() => {
        this.props.dispatch(
          GetPostsListActionRequest({
            custom_only: dataa.filters?.custom_only
              ? dataa.filters?.custom_only
              : "",
            search: dataa.search ? dataa.search : "",
            limit: dataa.limit,
            page: parseInt(dataa.page) + 1,
            sortName: dataa.sort_key,
            sortDir: dataa.sort_dir,
            priority: dataa.filters?.priority ? dataa.filters?.priority : "",
            first_position: dataa.filters?.first_position
              ? dataa.filters?.first_position
              : "",
            status: this.state.selectedStatusSearch
              ? this.state.selectedStatusSearch?.id
              : "",
            user: "",
            category: this.state.selectedCategorieSearch
              ? this.state.selectedCategorieSearch?.id
              : "",
            site: dataa.filters?.site ? dataa.filters?.site : "",
            state: "",
          })
        );
      });
    } else {
      this.props.dispatch(
        GetPostsListActionRequest({
          search: "",
          limit: this.state.countPerPage,
          page: this.state.page,
          sortName: this.state.sortName,
          sortDir: this.state.sortDir,
          priority: this.state.priority,
          custom_only: this.state.custom_only,
          first_position: this.state.first_position,
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
      getPostsList,
      deletePost,
      getSitesList,
      updatePostDetails,
      getUsersList,
      getCategoryList,
    } = this.props;
    const {
      loading: getPostsListLoading,
      error: getPostsListError,
      data: getPostsListData,
    } = getPostsList;
    const {
      loading: deletePostLoading,
      error: deletePostError,
      data: deletePostData,
    } = deletePost;
    const {
      loading: getSitesListLoading,
      error: getSitesListError,
      data: getSitesListData,
    } = getSitesList;
    const {
      data: updatePostDetailsData,
      loading: updatePostDetailsLoading,
      error: updatePostDetailsError,
      errorData: updatePostDetailsErrorData,
    } = updatePostDetails;

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
      prevProps.getPostsList !== getPostsList &&
      !getPostsListLoading &&
      !getPostsListError &&
      getPostsListData
    ) {
      if (
        selectedStatusSearch ||
        selectedCategorieSearch ||
        selectedSiteSearch ||
        inputValue
      ) {
        this.setState({
          data: getPostsListData.data,
          info: getPostsListData.info,
          loading: false,
        });
        sessionStorage.setItem(
          "filterPosts",
          JSON.stringify(getPostsListData?.info)
        );
      } else {
        this.setState({
          data: getPostsListData.data,
          info: getPostsListData.info,
          loading: false,
        });
        sessionStorage.setItem(
          "filterPosts",
          JSON.stringify(getPostsListData?.info)
        );
      }

      setTimeout(() => {
        if (
          selectedSiteSearch === null &&
          selectedCategorieSearch === null &&
          inputValue === null &&
          selectedStatusSearch === null
        ) {
          if (this.props.location?.data?.searchBy && getPostsListData.data) {
            this.handleSearchOnMainPage(this.props.location?.data?.searchBy);
          } else if (
            this.props.location?.data?.searchByuser &&
            getPostsListData.data
          ) {
            this.handleSearchOnMainPage(
              this.props.location?.data?.searchByuser
            );
          } else if (
            this.props.location?.data?.searchBycategory &&
            getPostsListData.data
          ) {
            this.handleSearchOnMainPage(
              this.props.location?.data?.searchBycategory
            );
          } else if (
            this.props.location?.dataFromStats?.searchBycategory &&
            getPostsListData.data
          ) {
            this.handleStatsSearch(this.props.location?.dataFromStats);
          }
        }
      });
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

    if (
      prevProps.updatePostDetails !== updatePostDetails &&
      !updatePostDetailsError &&
      !updatePostDetailsLoading &&
      updatePostDetailsData
    ) {
      NotificationManager.success("Post successfully updated", "Success", 2000);
      this.props.dispatch(
        GetPostsListActionRequest({
          custom_only: this.state.custom_only,
          search: this.state.inputValue,
          limit: this.state.countPerPage,
          page: this.state.page,
          sortName: this.state.sortName,
          priority: this.state.priority,
          first_position: this.state.first_position,
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
      prevProps.updatePostDetails !== updatePostDetails &&
      updatePostDetailsError &&
      updatePostDetailsErrorData
    ) {
      NotificationManager.error(
        `${updatePostDetailsErrorData.data.message}`,
        "Failed",
        2000
      );
    }

    if (
      prevProps.deletePost !== deletePost &&
      !deletePostError &&
      !deletePostLoading &&
      deletePostData
    ) {
      NotificationManager.success("Post successfully deleted", "Success", 2000);
      this.setState({ confirmMessage: false });
      this.props.dispatch(
        GetPostsListActionRequest({
          custom_only: this.state.custom_only,
          search: this.state.inputValue,
          limit: this.state.countPerPage,
          page: this.state.page,
          sortName: this.state.sortName,
          priority: this.state.priority,
          first_position: this.state.first_position,
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
      prevProps.getSitesList !== getSitesList &&
      !getSitesListLoading &&
      !getSitesListError &&
      getSitesListData
    ) {
      const allCategoryesOfAllSites = getSitesListData?.data?.map(
        (el) => el.categories
      );
      const merged = [].concat.apply([], allCategoryesOfAllSites);
      const uniqueChars = merged.filter(
        (thing, index, self) =>
          index === self.findIndex((t) => t.id === thing.id)
      );
      this.setState({ sitesList: uniqueChars });
    } else if (
      !getSitesListLoading &&
      !getSitesListError &&
      !getSitesListData
    ) {
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
  }

  handlePageChange = (value) => {
    this.setState({ page: value });
    // this.paginate(value);
    setTimeout(() => {
      this.props.dispatch(
        GetPostsListActionRequest({
          custom_only: this.state.custom_only,
          search: this.state.inputValue,
          limit: this.state.countPerPage,
          page: this.state.page,
          priority: this.state.priority,
          first_position: this.state.first_position,
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

  handleStatsSearch = (el) => {
    if (
      this.props.location?.dataFromStats?.searchBycategory &&
      !this.state.selectedCategorieSearch &&
      !this.state.selectedStatusSearch &&
      !this.state.selectedSiteSearch
    ) {
      this.setState({
        selectedCategorieSearch: el.searchBycategory,
        selectedStatusSearch: { id: el.status },
        selectedSiteSearch: el.searchByuser,
      });
      setTimeout(() => {
        this.props.dispatch(
          GetPostsListActionRequest({
            custom_only: this.state.custom_only,
            search: this.state.inputValue,
            limit: this.state.countPerPage,
            page: this.state.page,
            priority: this.state.priority,
            first_position: this.state.first_position,
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
  };

  handleSearchOnMainByprioOrFirst = (value, el) => {
    if (el === "prio") {
      this.setState({ priority: value });
    } else if (el === "first") {
      this.setState({ first_position: value });
    } else if (el === "custom") {
      this.setState({ custom_only: value });
    }

    setTimeout(() => {
      this.props.dispatch(
        GetPostsListActionRequest({
          custom_only: this.state.custom_only,
          search: this.state.inputValue,
          limit: this.state.countPerPage,
          page: this.state.page,
          sortName: this.state.sortName,
          priority: this.state.priority,
          first_position: this.state.first_position,
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

  handleSortByStatus = (value) => {
    if (this.state.selectedStatusSearch?.id === value || value === "NOTRASH") {
      this.setState({ selectedStatusSearch: "" });
    } else {
      this.setState({ selectedStatusSearch: { id: value } });
    }

    setTimeout(() => {
      this.props.dispatch(
        GetPostsListActionRequest({
          custom_only: this.state.custom_only,
          search: this.state.inputValue,
          limit: this.state.countPerPage,
          page: this.state.page,
          sortName: this.state.sortName,
          priority: this.state.priority,
          first_position: this.state.first_position,
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

  handleAllOptionsOnMain = (el, sortBy) => {
    if (sortBy === "categories") {
      this.setState({ selectedCategorieSearch: "" });
    } else if (sortBy === "sites") {
      this.setState({ selectedSiteSearch: "" });
    }
    setTimeout(() => {
      this.props.dispatch(
        GetPostsListActionRequest({
          custom_only: this.state.custom_only,
          search: this.state.inputValue,
          limit: this.state.countPerPage,
          page: this.state.page,
          priority: this.state.priority,
          first_position: this.state.first_position,
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
    //     GetPostsListActionRequest({
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
        GetPostsListActionRequest({
          custom_only: this.state.custom_only,
          search: value,
          limit: this.state.countPerPage,
          page: this.state.page,
          priority: this.state.priority,
          first_position: this.state.first_position,
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

  haneldeRedirect = (value, tabClicked) => {
    if (tabClicked === "edit") {
      history.push({
        pathname: `/posts/${value.id}`,
        data: { buttonClicked: "editDiv" },
      });
    } else if (tabClicked === "stats") {
      history.push({
        pathname: `/posts/${value.id}`,
        data: { buttonClicked: "statsDiv" },
      });
    }
    // else if (tabClicked === 'portal') {
    //     history.push({
    //         pathname: `/posts`,
    //         data: { searchBy: value, prevPath: window.location.pathname }
    //     })
    // }
    else if (tabClicked === "visit") {
      window.open(`${value?.link && value?.link}`);
    }
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
          return a[sortByClicked] - b[sortByClicked];
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
    } else if (value === "Down") {
      const sorted = this.state.data.sort((a, b) => {
        if (
          sortByClicked === "ctr" ||
          sortByClicked === "clk" ||
          sortByClicked === "imp"
        ) {
          return b[sortByClicked] - a[sortByClicked];
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
    } else {
      this.setState({ sortName: sortByClicked, sortDir: value });
      this.props.dispatch(
        GetPostsListActionRequest({
          custom_only: this.state.custom_only,
          search: this.state.inputValue,
          limit: this.state.countPerPage,
          page: this.state.page,
          priority: this.state.priority,
          first_position: this.state.first_position,
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

  handlePageRedirect = (e, item) => {
    if (!e.target.id || e.target.id !== "noredirection") {
      history.push({
        pathname: `/posts/${item.id}`,
        state: item,
      });
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
        GetPostsListActionRequest({
          custom_only: this.state.custom_only,
          search: this.state.inputValue,
          limit: this.state.countPerPage,
          page: this.state.page,
          priority: this.state.priority,
          first_position: this.state.first_position,
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
    //       GetPostsListActionRequest({
    //         search: "",
    //         limit: this.state.countPerPage,
    //         page: this.state.page,
    //         priority: this.state.priority,
    //         first_position: this.state.first_position,
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
        GetPostsListActionRequest({
          custom_only: this.state.custom_only,
          search: this.state.inputValue,
          limit: this.state.countPerPage,
          page: this.state.page,
          priority: this.state.priority,
          first_position: this.state.first_position,
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
    this.setState({ addButtonClicked: !this.state.addButtonClicked });
  };

  handleSearchOnMainPage = (el, secondElement) => {
    if (this.props.location?.data?.searchByuser && !secondElement) {
      this.setState({ selectedUserSearch: el });
      const newData = this.state.data.filter((elm) => {
        return elm.owner === el.id;
      });
      this.setState({ data: newData });
      setTimeout(() => {
        this.props.dispatch(
          GetPostsListActionRequest({
            custom_only: this.state.custom_only,
            search: this.state.inputValue,
            limit: this.state.countPerPage,
            page: this.state.page,
            priority: this.state.priority,
            first_position: this.state.first_position,
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
          GetPostsListActionRequest({
            custom_only: this.state.custom_only,
            search: this.state.inputValue,
            limit: this.state.countPerPage,
            page: this.state.page,
            priority: this.state.priority,
            first_position: this.state.first_position,
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
          GetPostsListActionRequest({
            custom_only: this.state.custom_only,
            search: this.state.inputValue,
            limit: this.state.countPerPage,
            page: this.state.page,
            priority: this.state.priority,
            first_position: this.state.first_position,
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

    if (secondElement === "sites") {
      this.setState({ selectedSiteSearch: el });
      setTimeout(() => {
        this.props.dispatch(
          GetPostsListActionRequest({
            custom_only: this.state.custom_only,
            search: this.state.inputValue,
            limit: this.state.countPerPage,
            page: this.state.page,
            priority: this.state.priority,
            first_position: this.state.first_position,
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
          GetPostsListActionRequest({
            custom_only: this.state.custom_only,
            search: this.state.inputValue,
            limit: this.state.countPerPage,
            page: this.state.page,
            priority: this.state.priority,
            first_position: this.state.first_position,
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
  };

  deletesiteFunction = () => {
    this.props.dispatch(
      DeletePostActionRequest({
        id: this.state.idForDelete,
      })
    );
  };

  handleTrashFunctionaliti = (id) => {
    this.setState({ confirmMessage: true, idForDelete: id });
  };

  findcategory = (item) => {
    // const mapcategorynames = this.props.getCategoryList?.data?.data.filter(
    //   (el) => item.categories.includes(el.id)
    // );
    // let getNames = mapcategorynames?.slice(0, 2).map((element, i) => {
    //   return (
    //     <p id="noredirection" key={i}>
    //       <a
    //         id="noredirection"
    //         onClick={() => {
    //           const newData = item.categories.filter(
    //             (elm) => elm !== element.id
    //           );
    //           this.props.dispatch(
    //             UpdatePostDetailsActionRequest({
    //               id: item.id,
    //               categories: newData,
    //             })
    //           );
    //         }}
    //       >{`${element.name}, `}</a>
    //     </p>
    //   );
    // });

    let getNames = item?.categories?.slice(0, 2).map((element, i) => {
      return (
        <p id="noredirection" key={i}>
          <a id="noredirection">{`${element}${
            item?.categories.length - 1 !== i ? "," : ""
          } `}</a>
        </p>
      );
    });
    return getNames;
  };

  render() {
    const { urlForCreatePost, data, selectedSiteSearch, loading } = this.state;
    const { getSitesList } = this.props;

    if (this.state.hashesArrowDown) {
      setTimeout(() => {
        this.inputEl.current && this.inputEl.current.focus();
      });
    }

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
          pageName={"POSTS"}
          handleSearchBar={this.handleSearchBar}
          handleSubtmit={this.handleSubtmit}
          handleSortByStatus={this.handleSortByStatus}
          handleSearchOnMainByprioOrFirst={this.handleSearchOnMainByprioOrFirst}
          handleHomePageSort={this.handleHomePageSort}
          handlePageChange={this.handlePageChange}
        />
        {this.state.addButtonClicked && (
          <AddContainer>
            {!selectedSiteSearch && (
              <p
                style={{
                  color: "#7befff",
                  fontSize: "18px",
                  alignSelf: "center",
                  padding: "0 10px",
                }}
              >
                Please choose site.
              </p>
            )}
            {selectedSiteSearch && (
              <input
                type="text"
                onChange={(e) =>
                  this.setState({ urlForCreatePost: e.target.value })
                }
                placeholder="Enter URL"
              />
            )}
            {selectedSiteSearch && urlForCreatePost && (
              <button
                onClick={() =>
                  this.props.history.push({
                    pathname: "/posts/create",
                    data: {
                      urlpost: urlForCreatePost,
                      site: selectedSiteSearch,
                      buttonClicked: "editDiv",
                      createNew: true,
                    },
                  })
                }
              >
                <p>Create post</p>
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
            <div className="shortScreenTableDiv">
              {data.length !== 0 &&
                data.map((item, key) => {
                  return (
                    <div key={key} className="mainDivShotScreen">
                      {Util.isRoot() && (
                        <div className="checkAndTrashDiv">
                          {/* <input type="checkbox" value={this.state.checkboxList} checked={this.state.checkboxList[item.id]} onChange={(e) => this.handleCheckbox(e, item)} /> */}
                          <img
                            src={secondTrash}
                            onClick={() =>
                              this.handleTrashFunctionaliti(item.id)
                            }
                            alt="trash"
                          />
                        </div>
                      )}
                      <div className="statusDiv">
                        <div>
                          <div className="arrowDiv">
                            <img
                              src={arrowUp}
                              onClick={() =>
                                this.handleArrowSort("status", "1")
                              }
                              alt="arrow"
                            />
                            <img
                              src={secondarrowDown}
                              onClick={() =>
                                this.handleArrowSort("status", "-1")
                              }
                              alt="arrow"
                            />
                          </div>
                          <p>STATUS</p>
                        </div>
                        <div
                          className="coloredDivStatus"
                          style={{
                            background:
                              item.status === 1
                                ? "#ABD996"
                                : item.status === 0
                                ? "#dfe094"
                                : item.status === 2
                                ? "#e09494"
                                : item.status === 3
                                ? "#295265"
                                : "",
                          }}
                        >
                          {item.status === 1
                            ? "PUBLISHED"
                            : item.status === 0
                            ? "DRAFT"
                            : item.status === 2
                            ? "ERROR"
                            : item.status === 3
                            ? "TRASH"
                            : ""}
                        </div>
                      </div>

                      <div
                        className="ownerDiv"
                        onClick={(e) => this.handlePageRedirect(e, item)}
                      >
                        <div>
                          <div className="arrowDiv">
                            <img
                              src={arrowUp}
                              onClick={() => this.handleArrowSort("site", "1")}
                              alt="arrow"
                            />
                            <img
                              src={secondarrowDown}
                              onClick={() => this.handleArrowSort("site", "-1")}
                              alt="arrow"
                            />
                          </div>
                          <p>Site</p>
                        </div>
                        <div className="ownerClass">
                          <p
                            id="noredirection"
                            onClick={() => history.push(`/sites/${item.site}`)}
                          >
                            {getSitesList?.data?.data.map((el) =>
                              el.id === item.site ? el.name : ""
                            )}
                          </p>
                        </div>
                      </div>
                      <div className="ownerDiv">
                        <div>
                          <div className="arrowDiv">
                            <img
                              src={arrowUp}
                              onClick={() => this.handleArrowSort("image", "1")}
                              alt="arrow"
                            />
                            <img
                              src={secondarrowDown}
                              onClick={() =>
                                this.handleArrowSort("image", "-1")
                              }
                              alt="arrow"
                            />
                          </div>
                          <p>img</p>
                        </div>
                        <div className="ownerClass tdWithImgDiv">
                          <img src={item.image} alt="" />
                        </div>
                      </div>
                      <div className="ownerDiv">
                        <div>
                          <div className="arrowDiv">
                            <img
                              src={arrowUp}
                              onClick={() =>
                                this.handleArrowSort("timestamp", "1")
                              }
                              alt="arrow"
                            />
                            <img
                              src={secondarrowDown}
                              onClick={() =>
                                this.handleArrowSort("timestamp", "-1")
                              }
                              alt="arrow"
                            />
                          </div>
                          <p>Date</p>
                        </div>
                        <div className="ownerClass">
                          {item?.timestamp &&
                            `${moment(new Date(item?.timestamp)).format(
                              "DD/MM/YYYY"
                            )}`}
                        </div>
                      </div>

                      <div className="ownerDiv">
                        <div>
                          <div className="arrowDiv">
                            <img
                              src={arrowUp}
                              onClick={() => this.handleArrowSort("title", "1")}
                              alt="arrow"
                            />
                            <img
                              src={secondarrowDown}
                              onClick={() =>
                                this.handleArrowSort("title", "-1")
                              }
                              alt="arrow"
                            />
                          </div>
                          <p>Name</p>
                        </div>
                        <div
                          className="ownerClass"
                          style={{ fontSize: "12px" }}
                        >
                          {" "}
                          {item?.priority && !item?.first_position ? (
                            <p
                              style={{
                                background: "#e09494",
                                fontSize: "12px",
                                height: "50px",
                                display: "flex",
                                lineHeight: "15px",
                                fontWeight: "500",
                                alignItems: "center",
                              }}
                            >
                              {item.title}
                            </p>
                          ) : item?.priority && item?.first_position ? (
                            <p
                              style={{
                                background: "rgb(171, 217, 150)",
                                fontSize: "12px",
                                height: "50px",
                                display: "flex",
                                lineHeight: "15px",
                                fontWeight: "500",
                                alignItems: "center",
                              }}
                            >
                              {item.title}
                            </p>
                          ) : (
                            item?.title
                          )}
                        </div>
                      </div>
                      <div className="mainForIcons">
                        <div className="divWithClicableIcons">
                          {/* <img src={posts} alt="posts" />
                                        <p onClick={() => this.haneldeRedirect(item, 'portal')}>portal</p> */}
                          <img src={visit} alt="visit" />
                          <p
                            onClick={() => this.haneldeRedirect(item, "visit")}
                          >
                            visit
                          </p>
                          {Util.isRoot() && <img src={edit} alt="edit" />}
                          {Util.isRoot() && (
                            <p
                              onClick={() => this.haneldeRedirect(item, "edit")}
                            >
                              edit
                            </p>
                          )}
                          <img src={stats} alt="stats" />
                          <p
                            onClick={() => this.haneldeRedirect(item, "stats")}
                          >
                            stats
                          </p>
                        </div>
                      </div>
                      <div className="mainDivHashes">
                        <>
                          <div className="divWithHashes">
                            {/* <p>{this.props.getCategoryList?.data?.data.map((el, index) => el.id === item.site ? el.name : '')}</p> */}
                            {/* <p>{this.props.getCategoryList?.data?.data.filter(el => item.categories.includes(el.id) ? el.name : '')}</p> */}
                            {this.findcategory(item)}

                            <div className="box">
                              {item?.categories.length > 2 && (
                                <p>
                                  +<span>{item?.categories.length - 2}</span>
                                </p>
                              )}

                              <img
                                src={secondarrowDown}
                                alt="arrow"
                                style={{ marginLeft: "5px" }}
                                onClick={() => this.handleHashArrowClick(item)}
                              />
                            </div>
                          </div>
                          {this.state.hashesArrowDown &&
                            item.id === this.state.hashesArrowWitchIsOn.id && (
                              <div
                                id="noredirection"
                                className="offeredHashes"
                                ref={this.inputEl}
                                onBlur={() => this.handleHashArrowClick(item)}
                                tabindex="1"
                              >
                                {item.categories.map((el) => {
                                  return <p>{el}</p>;
                                })}
                                {/* {getSitesList.data?.data?.map((el, i) => {
                                  if (el.id === item.site) {
                                    return el.categories.map((el, i) => {
                                      return (
                                        <div
                                          onClick={() => {
                                            if (
                                              !item.categories.includes(
                                                el.category.id
                                              )
                                            ) {
                                              const pushData =
                                                item.categories.concat(
                                                  el.category.id
                                                );
                                              this.props.dispatch(
                                                UpdatePostDetailsActionRequest({
                                                  id: item.id,
                                                  categories: pushData,
                                                })
                                              );
                                              this.handleHashArrowClick(item);
                                            } else {
                                              const popData =
                                                item.categories.filter(
                                                  (elm) =>
                                                    elm !== el.category.id
                                                );
                                              this.props.dispatch(
                                                UpdatePostDetailsActionRequest({
                                                  id: item.id,
                                                  categories: popData,
                                                })
                                              );
                                              this.handleHashArrowClick(item);
                                            }
                                          }}
                                          style={{
                                            background:
                                              item.categories.includes(
                                                el.category?.id
                                              )
                                                ? "#e09494"
                                                : "",
                                          }}
                                          key={i}
                                          id="noredirection"
                                        >
                                          <p id="noredirection">
                                            {el.category?.name}
                                          </p>
                                        </div>
                                      );
                                    });
                                  }
                                })} */}
                              </div>
                            )}
                        </>
                      </div>
                      <div className="mainDivInOutTxr bigStatics">
                        <div className="statistic">
                          <div>
                            <div className="arrowDiv">
                              <img
                                src={arrowUp}
                                onClick={() =>
                                  this.handleArrowSort("imp", "Up")
                                }
                                alt="arrow"
                              />
                              <img
                                src={secondarrowDown}
                                onClick={() =>
                                  this.handleArrowSort("imp", "Down")
                                }
                                alt="arrow"
                              />
                            </div>
                            <p>imp</p>
                          </div>
                          <p>{item.imp?.toLocaleString()}</p>
                        </div>
                        <div className="statistic">
                          <div>
                            <div className="arrowDiv">
                              <img
                                src={arrowUp}
                                onClick={() =>
                                  this.handleArrowSort("clk", "Up")
                                }
                                alt="arrow"
                              />
                              <img
                                src={secondarrowDown}
                                onClick={() =>
                                  this.handleArrowSort("clk", "Down")
                                }
                                alt="arrow"
                              />
                            </div>
                            <p>clk</p>
                          </div>
                          <p>{item.clk?.toLocaleString()}</p>
                        </div>
                        <div className="statistic">
                          <div>
                            <div className="arrowDiv">
                              <img
                                src={arrowUp}
                                onClick={() =>
                                  this.handleArrowSort("ctr", "Up")
                                }
                                alt="arrow"
                              />
                              <img
                                src={secondarrowDown}
                                onClick={() =>
                                  this.handleArrowSort("ctr", "Down")
                                }
                                alt="arrow"
                              />
                            </div>
                            <p>ctr</p>
                          </div>
                          <p>{item.ctr?.toLocaleString()}</p>
                        </div>
                        {/* <div className="statistic">
                          <div>
                            <div className="arrowDiv">
                              <img
                                src={arrowUp}
                                onClick={() =>
                                  this.handleArrowSort("wimp", "Up")
                                }
                                alt="arrow"
                              />
                              <img
                                src={secondarrowDown}
                                onClick={() =>
                                  this.handleArrowSort("wimp", "Down")
                                }
                                alt="arrow"
                              />
                            </div>
                            <p>wimp</p>
                          </div>
                          <p>{item.txr}</p>
                        </div> */}
                        {/* <div className="statistic">
                          <div>
                            <div className="arrowDiv">
                              <img
                                src={arrowUp}
                                onClick={() =>
                                  this.handleArrowSort("wclk", "Up")
                                }
                                alt="arrow"
                              />
                              <img
                                src={secondarrowDown}
                                onClick={() =>
                                  this.handleArrowSort("wclk", "Down")
                                }
                                alt="arrow"
                              />
                            </div>
                            <p>wclk</p>
                          </div>
                          <p>{item.txr}</p>
                        </div> */}
                        {/* <div className="statistic">
                          <div>
                            <div className="arrowDiv">
                              <img
                                src={arrowUp}
                                onClick={() =>
                                  this.handleArrowSort("wctr", "Up")
                                }
                                alt="arrow"
                              />
                              <img
                                src={secondarrowDown}
                                onClick={() =>
                                  this.handleArrowSort("wctr", "Down")
                                }
                                alt="arrow"
                              />
                            </div>
                            <p>wctr</p>
                          </div>
                          <p>{item.txr}</p>
                        </div> */}
                        {/* <div className="statistic">
                          <div>
                            <div className="arrowDiv">
                              <img
                                src={arrowUp}
                                onClick={() =>
                                  this.handleArrowSort("pimp", "Up")
                                }
                                alt="arrow"
                              />
                              <img
                                src={secondarrowDown}
                                onClick={() =>
                                  this.handleArrowSort("pimp", "Down")
                                }
                                alt="arrow"
                              />
                            </div>
                            <p>pimp</p>
                          </div>
                          <p>{item.txr}</p>
                        </div> */}
                      </div>
                    </div>
                  );
                })}
            </div>
          ) : loading ? (
            <p style={{ textAlign: "center" }} className="loadingOnShort">
              Loading...
            </p>
          ) : (
            this.state.data.length === 0 && (
              <p style={{ textAlign: "center" }} className="loadingOnShort">
                No data
              </p>
            )
          )}
          {!loading && this.state.data.length !== 0 ? (
            <table>
              <thead>
                <tr>
                  {/* <th></th> */}
                  {Util.isRoot() && <th></th>}
                  <th>
                    <div>
                      <div>
                        <img
                          src={arrowUp}
                          onClick={() => this.handleArrowSort("status", "1")}
                          alt="arrow"
                        />
                        <img
                          src={secondarrowDown}
                          onClick={() => this.handleArrowSort("status", "-1")}
                          alt="arrow"
                        />
                      </div>
                      <p>STATUS</p>
                    </div>
                  </th>
                  <th>
                    <div>
                      <div>
                        <img
                          src={arrowUp}
                          onClick={() => this.handleArrowSort("site", "1")}
                          alt="arrow"
                        />
                        <img
                          src={secondarrowDown}
                          onClick={() => this.handleArrowSort("site", "-1")}
                          alt="arrow"
                        />
                      </div>
                      <p>Site</p>
                    </div>
                  </th>
                  <th>
                    <div>
                      <div>
                        <img
                          src={arrowUp}
                          onClick={() => this.handleArrowSort("image", "1")}
                          alt="arrow"
                        />
                        <img
                          src={secondarrowDown}
                          onClick={() => this.handleArrowSort("image", "-1")}
                          alt="arrow"
                        />
                      </div>
                      <p>Img</p>
                    </div>
                  </th>
                  <th>
                    <div>
                      <div>
                        <img
                          src={arrowUp}
                          onClick={() => this.handleArrowSort("timestamp", "1")}
                          alt="arrow"
                        />
                        <img
                          src={secondarrowDown}
                          onClick={() =>
                            this.handleArrowSort("timestamp", "-1")
                          }
                          alt="arrow"
                        />
                      </div>
                      <p>Date</p>
                    </div>
                  </th>
                  <th>
                    <div>
                      <div>
                        <img
                          src={arrowUp}
                          onClick={() => this.handleArrowSort("title", "1")}
                          alt="arrow"
                        />
                        <img
                          src={secondarrowDown}
                          onClick={() => this.handleArrowSort("title", "-1")}
                          alt="arrow"
                        />
                      </div>
                      <p>Name</p>
                    </div>
                  </th>
                  <th></th>
                  {/* <th></th> */}
                  <th>
                    <div>
                      <div>
                        <img
                          src={arrowUp}
                          onClick={() => this.handleArrowSort("imp", "Up")}
                          alt="arrow"
                        />
                        <img
                          src={secondarrowDown}
                          onClick={() => this.handleArrowSort("imp", "Down")}
                          alt="arrow"
                        />
                      </div>
                      <p>imp</p>
                    </div>
                  </th>
                  <th>
                    <div>
                      <div>
                        <img
                          src={arrowUp}
                          onClick={() => this.handleArrowSort("clk", "Up")}
                          alt="arrow"
                        />
                        <img
                          src={secondarrowDown}
                          onClick={() => this.handleArrowSort("clk", "Down")}
                          alt="arrow"
                        />
                      </div>
                      <p>clk</p>
                    </div>
                  </th>
                  <th>
                    <div>
                      <div>
                        <img
                          src={arrowUp}
                          onClick={() => this.handleArrowSort("ctr", "Up")}
                          alt="arrow"
                        />
                        <img
                          src={secondarrowDown}
                          onClick={() => this.handleArrowSort("ctr", "Down")}
                          alt="arrow"
                        />
                      </div>
                      <p>ctr</p>
                    </div>
                  </th>
                  {/* <th>
                    <div>
                      <div>
                        <img
                          src={arrowUp}
                          onClick={() => this.handleArrowSort("wimp", "Up")}
                          alt="arrow"
                        />
                        <img
                          src={secondarrowDown}
                          onClick={() => this.handleArrowSort("wimp", "Down")}
                          alt="arrow"
                        />
                      </div>
                      <p>wimp</p>
                    </div>
                  </th> */}
                  {/* <th>
                    <div>
                      <div>
                        <img
                          src={arrowUp}
                          onClick={() => this.handleArrowSort("wclk", "Up")}
                          alt="arrow"
                        />
                        <img
                          src={secondarrowDown}
                          onClick={() => this.handleArrowSort("wclk", "Down")}
                          alt="arrow"
                        />
                      </div>
                      <p>wclk</p>
                    </div>
                  </th> */}
                  {/* <th>
                    <div>
                      <div>
                        <img
                          src={arrowUp}
                          onClick={() => this.handleArrowSort("wctr", "Up")}
                          alt="arrow"
                        />
                        <img
                          src={secondarrowDown}
                          onClick={() => this.handleArrowSort("wctr", "Down")}
                          alt="arrow"
                        />
                      </div>
                      <p>wctr</p>
                    </div>
                  </th> */}
                  {/* <th>
                    <div>
                      <div>
                        <img
                          src={arrowUp}
                          onClick={() => this.handleArrowSort("pimp", "Up")}
                          alt="arrow"
                        />
                        <img
                          src={secondarrowDown}
                          onClick={() => this.handleArrowSort("pimp", "Down")}
                          alt="arrow"
                        />
                      </div>
                      <p>pimp</p>
                    </div>
                  </th> */}
                </tr>
              </thead>

              <tbody>
                {data.length !== 0 &&
                  data.map((item, key) => {
                    return (
                      <tr
                        key={key}
                        onClick={(e) => this.handlePageRedirect(e, item)}
                      >
                        {/* <td><input type="checkbox" id='noredirection' value={this.state.checkboxList} checked={this.state.checkboxList[item.id]} onChange={(e) => this.handleCheckbox(e, item)} /></td> */}
                        {Util.isRoot() && (
                          <td>
                            <img
                              src={secondTrash}
                              onClick={() =>
                                this.handleTrashFunctionaliti(item.id)
                              }
                              alt="trash"
                              id="noredirection"
                            />
                          </td>
                        )}
                        <td>
                          {" "}
                          <div
                            className="coloredDivStatus"
                            style={{
                              background:
                                item.status === 1
                                  ? "#ABD996"
                                  : item.status === 0
                                  ? "#dfe094"
                                  : item.status === 2
                                  ? "#e09494"
                                  : item.status === 3
                                  ? "#295265"
                                  : "",
                            }}
                          >
                            {item.status === 1
                              ? "PUBLISHED"
                              : item.status === 0
                              ? "DRAFT"
                              : item.status === 2
                              ? "ERROR"
                              : item.status === 3
                              ? "TRASH"
                              : ""}
                          </div>
                        </td>
                        <td>
                          <div className="ownerClass">
                            <p
                              id="noredirection"
                              onClick={() =>
                                history.push(`/sites/${item.site}`)
                              }
                            >
                              {getSitesList?.data?.data.map((el) =>
                                el.id === item.site ? el.name : ""
                              )}
                            </p>
                          </div>
                        </td>
                        <td>
                          <div className="ownersNameClass tdWithImgDiv">
                            <img src={item.image} alt="" />
                          </div>
                        </td>
                        {/* <td>
                                     <div className="divWithClicableIcons">
                                        <img src={posts} alt="posts" />
                                        <p onClick={() => this.haneldeRedirect(item)}>portal</p>
                                        <img src={visit} alt="visit" />
                                        <p onClick={() => this.haneldeRedirect(item)}>visit</p>
                                        <img src={edit} alt="edit" />
                                        <p onClick={() => this.haneldeRedirect(item)}>edit</p>
                                        <img src={stats} alt="stats" />
                                        <p onClick={() => this.haneldeRedirect(item)}>stats</p>
                                    </div>
                                    </td> */}

                        <td>
                          {item?.timestamp &&
                            `${moment(item?.timestamp * 1000).format(
                              "DD/MM/YYYY"
                            )}`}
                        </td>
                        <td>
                          {item?.priority && !item?.first_position ? (
                            <p
                              style={{
                                background: "#e09494",
                                height: "47px",
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              {item.title}
                            </p>
                          ) : item?.priority && item?.first_position ? (
                            <p
                              style={{
                                background: "rgb(171, 217, 150)",
                                height: "47px",
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              {item.title}
                            </p>
                          ) : (
                            item?.title
                          )}
                        </td>
                        <td>
                          <>
                            <div className="divWithHashes">
                              {/* <p>{this.props.getCategoryList?.data?.data.map(el => el.id === item.site ? el.name : '')}</p> */}
                              {/* <p>{this.props.getCategoryList?.data?.data.filter(el => item.categories.includes(el.id) && el)}</p> */}
                              {this.findcategory(item)}

                              <div className="box">
                                {item?.categories.length > 2 && (
                                  <p>
                                    +<span>{item?.categories.length - 2}</span>
                                  </p>
                                )}
                                <img
                                  src={secondarrowDown}
                                  style={{ marginLeft: "5px" }}
                                  id="noredirection"
                                  alt="arrow"
                                  onClick={() =>
                                    this.handleHashArrowClick(item)
                                  }
                                />
                              </div>
                            </div>
                            {this.state.hashesArrowDown &&
                              item.id ===
                                this.state.hashesArrowWitchIsOn.id && (
                                <div
                                  id="noredirection"
                                  className="offeredHashes"
                                  ref={this.inputEl}
                                  onBlur={() => this.handleHashArrowClick(item)}
                                  tabindex="1"
                                >
                                  {item.categories.map((el) => {
                                    return <p>{el}</p>;
                                  })}
                                  {/* {getSitesList.data?.data?.map((el, i) => {
                                    if (el.id === item.site) {
                                      return el.categories.map((el, i) => {
                                        return (
                                          <div
                                            onClick={() => {
                                              if (
                                                !item.categories.includes(
                                                  el.category.id
                                                )
                                              ) {
                                                const pushData =
                                                  item.categories.concat(
                                                    el.category.id
                                                  );
                                                this.props.dispatch(
                                                  UpdatePostDetailsActionRequest(
                                                    {
                                                      id: item.id,
                                                      categories: pushData,
                                                    }
                                                  )
                                                );
                                                this.handleHashArrowClick(item);
                                              } else {
                                                const popData =
                                                  item.categories.filter(
                                                    (elm) =>
                                                      elm !== el.category.id
                                                  );
                                                this.props.dispatch(
                                                  UpdatePostDetailsActionRequest(
                                                    {
                                                      id: item.id,
                                                      categories: popData,
                                                    }
                                                  )
                                                );
                                                this.handleHashArrowClick(item);
                                              }
                                            }}
                                            style={{
                                              background:
                                                item.categories.includes(
                                                  el.category?.id
                                                )
                                                  ? "#e09494"
                                                  : "",
                                            }}
                                            key={i}
                                            id="noredirection"
                                          >
                                            <p id="noredirection">
                                              {el.category?.name}
                                            </p>
                                          </div>
                                        );
                                      });
                                    }
                                  })} */}
                                </div>
                              )}
                          </>
                        </td>
                        <td>{item.imp?.toLocaleString()}</td>
                        <td>{item.clk?.toLocaleString()}</td>
                        <td>{item.ctr?.toLocaleString()}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
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
  const { CategoryReducer, PostsReducer, SitesListReducer, UsersReducer } =
    state;
  const { getCategoryList } = CategoryReducer;
  const { getPostsList, deletePost, updatePostDetails } = PostsReducer;
  const { getSitesList } = SitesListReducer;
  const { getUsersList } = UsersReducer;

  return {
    getCategoryList,
    getPostsList,
    getSitesList,
    deletePost,
    updatePostDetails,
    getUsersList,
  };
};

export default connect(mapStateToProps, null)(Posts);
