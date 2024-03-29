import React, { Component } from "react";
import SearchContainer from "../../containers/SearchContainer/SearchContainer";
import { connect } from "react-redux";
import arrowUp from "../../assets/img/TableIcons/arrow(1).svg";
import secondarrowDown from "../../assets/img/TableIcons/arrow.svg";
// import visit from '../../assets/img/TableIcons/visit.svg'
import edit from "../../assets/img/TableIcons/edit.svg";
import posts from "../../assets/img/TableIcons/posts.svg";
import stats from "../../assets/img/TableIcons/stats.svg";
import widgets from "../../assets/img/TableIcons/widgets.svg";
import history from "../../routes/History";
import AddContainer from "../../containers/AddContainer/AddContainer";
import {
  CreateUserActionRequest,
  GetUsersListActionRequest,
} from "../../store/actions/UsersActions";
import { NotificationManager } from "react-notifications";
import "../Home/Home.scss";
import Util from "../../containers/util";

export class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      data: [],
      info: "",
      filteredDate: "",
      inputValue: "",
      countPerPage: 20,
      addButtonClicked: false,
      newUseremail: "",
      newUserpassword: "",
      newUsername: "",

      dataToRender: [],
      mamxPages: "",
      loading: true,
      sortName: "",
      sortDir: "",
    };
  }

  // paginate = (page) => {
  //     const { countPerPage, filteredDate, data } = this.state
  //     const dataToRender = filteredDate ? filteredDate : data
  //     let limit = countPerPage;
  //     let pages = Math.ceil(dataToRender.length / countPerPage);
  //     const offset = (page - 1) * limit;
  //     const newArray = dataToRender.slice(offset, offset + limit);

  //     this.setState({
  //         dataToRender: newArray,
  //         loading: false,
  //         maxPages: pages,

  //     });
  // }

  componentDidMount() {
    this.props.dispatch(
      GetUsersListActionRequest({
        search: "",
        limit: this.state.countPerPage,
        page: this.state.page,
        sortName: this.state.sortName,
        sortDir: this.state.sortDir,
      })
    );
  }

  componentDidUpdate(prevProps) {
    const { createUser, getUsersList } = this.props;
    const {
      loading: createUserLoading,
      error: createUserError,
      data: createUserData,
      errorData: createUserErrorData,
    } = createUser;
    const {
      loading: getUsersListLoading,
      error: getUsersListError,
      data: getUsersListData,
    } = getUsersList;

    if (
      prevProps.getUsersList !== getUsersList &&
      !getUsersListLoading &&
      !getUsersListError &&
      getUsersListData
    ) {
      this.setState({
        data: getUsersListData.data,
        info: getUsersListData.info,
        loading: false,
      });
      //   setTimeout(() => {
      // this.setState({ page: 1 });
      // this.paginate(1);
      //   });
    }

    if (
      prevProps.createUser !== createUser &&
      !createUserLoading &&
      !createUserError &&
      createUserData
    ) {
      this.setState({
        newUseremail: "",
        newUserpassword: "",
        newUsername: "",
        addButtonClicked: false,
      });
      this.props.dispatch(
        GetUsersListActionRequest({
          search: "",
          limit: this.state.countPerPage,
          page: this.state.page,
          sortName: this.state.sortName,
          sortDir: this.state.sortDir,
        })
      );
      NotificationManager.success("User successfully created", "Success", 2000);
    } else if (
      prevProps.createUser !== createUser &&
      createUserError &&
      createUserErrorData
    ) {
      NotificationManager.error(
        `${createUserErrorData.data.message}`,
        "Failed",
        2000
      );
    }
  }

  handlePageChange = (value) => {
    this.setState({ page: value });
    // this.paginate(value);
    setTimeout(() => {
      this.props.dispatch(
        GetUsersListActionRequest({
          search: "",
          limit: this.state.countPerPage,
          page: this.state.page,
          sortName: this.state.sortName,
          sortDir: this.state.sortDir,
        })
      );
    });
  };

  handleSubtmit = (e) => {
    e.preventDefault();
    // const value = this.state.inputValue.toLowerCase();
    // const newData = this.state.data.filter((el) => {
    //   return el.email?.toLowerCase().includes(value);
    // });

    // this.setState({ filteredDate: newData });
    // setTimeout(() => {
    //   this.setState({ page: 1 });
    //   this.paginate(1);
    // });
    // this.props.dispatch(
    //   GetUsersListActionRequest({
    //     search: value,
    //     limit: this.state.countPerPage,
    //     page: this.state.page,
    //   })
    // );
  };

  handleSearchBar = (e) => {
    this.setState({ inputValue: e.target.value });
    const value = e.target.value.toLowerCase();

    this.props.dispatch(
      GetUsersListActionRequest({
        search: value,
        limit: this.state.countPerPage,
        page: this.state.page,
        sortName: this.state.sortName,
        sortDir: this.state.sortDir,
      })
    );
  };

  haneldeRedirect = (value, tabClicked) => {
    if (tabClicked === "edit") {
      history.push({
        pathname: `/users/${value.id}`,
        data: { buttonClicked: "editDiv" },
      });
    } else if (tabClicked === "sites") {
      history.push({
        pathname: `/sites`,
        data: { searchByuser: value, prevPath: window.location.pathname },
      });
    } else if (tabClicked === "posts") {
      history.push({
        pathname: `/posts`,
        data: { searchByuser: value, prevPath: window.location.pathname },
      });
    } else if (tabClicked === "widgets") {
      history.push({
        pathname: `/widgets`,
        data: { searchByuser: value, prevPath: window.location.pathname },
      });
    }
  };

  handleArrowSort = (sortByClicked, value) => {
    this.setState({ sortName: sortByClicked, sortDir: value });
    this.props.dispatch(
      GetUsersListActionRequest({
        search: "",
        limit: this.state.countPerPage,
        page: this.state.page,
        sortName: sortByClicked,
        sortDir: value,
      })
    );
    // ovde moras da imas 2 parametra, moras da prosledis naziv po kome ce se sortirati i drugi je 'up' ili 'down' po tome ces znati koji arrow je kliknut
    // if (value === "Up") {
    //   const sorted = this.state.data.sort((a, b) => {
    //     if (
    //       typeof a[sortByClicked] === "string" ||
    //       typeof b[sortByClicked] === "string"
    //     ) {
    //       return b[sortByClicked]?.localeCompare(a[sortByClicked]);
    //     } else if (
    //       typeof a[sortByClicked] === "object" ||
    //       typeof b[sortByClicked] === "object"
    //     ) {
    //       return b[sortByClicked]["name"]?.localeCompare(
    //         a[sortByClicked]["name"]
    //       );
    //     }
    //   });
    //   this.setState({ data: sorted });
    //   setTimeout(() => {
    //     this.setState({ page: 1 });
    //     // this.paginate(1);
    //   });
    // } else if (value === "Down") {
    //   const sorted = this.state.data.sort((a, b) => {
    //     if (
    //       typeof a[sortByClicked] === "string" ||
    //       typeof b[sortByClicked] === "string"
    //     ) {
    //       return a[sortByClicked]?.localeCompare(b[sortByClicked]);
    //     } else if (
    //       typeof a[sortByClicked] === "object" ||
    //       typeof b[sortByClicked] === "object"
    //     ) {
    //       return a[sortByClicked]["name"]?.localeCompare(
    //         b[sortByClicked]["name"]
    //       );
    //     }
    //   });
    //   this.setState({ data: sorted });
    //   setTimeout(() => {
    //     this.setState({ page: 1 });
    //     // this.paginate(1);
    //   });
    // }
  };

  handlePageRedirect = (e, item) => {
    if (!e.target.id || e.target.id !== "noredirection") {
      history.push({
        pathname: `/users/${item.id}`,
        state: item,
      });
    }
  };

  handleAllView = (value) => {
    this.setState({ countPerPage: parseInt(value) });
    setTimeout(() => {
      this.setState({ page: 1 });
      this.props.dispatch(
        GetUsersListActionRequest({
          search: "",
          limit: this.state.countPerPage,
          page: this.state.page,
          sortName: this.state.sortName,
          sortDir: this.state.sortDir,
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
    //       GetUsersListActionRequest({
    //         search: "",
    //         limit: this.state.countPerPage,
    //         page: this.state.page,
    //         sortName: this.state.sortName,
    //         sortDir: this.state.sortDir,
    //       })
    //     );
    //   });
    // } else {
    this.setState({ countPerPage: parseInt(e.target.value) });
    setTimeout(() => {
      this.setState({ page: 1 });
      this.props.dispatch(
        GetUsersListActionRequest({
          search: "",
          limit: this.state.countPerPage,
          page: this.state.page,
          sortName: this.state.sortName,
          sortDir: this.state.sortDir,
        })
      );
    });
    // }
  };

  handleAddSomeMore = () => {
    const { getSelfUser } = this.props;
    if (getSelfUser?.data?.data?.roles?.includes(0) || Util?.isRoot()) {
      this.setState({ addButtonClicked: !this.state.addButtonClicked });
    } else {
      NotificationManager.error(
        `You don't have a permission to do that`,
        "Failed",
        2000
      );
    }
  };

  handleCreateUser = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleClickCreateUser = () => {
    this.props.dispatch(
      CreateUserActionRequest({
        email: this.state.newUseremail,
        password: this.state.newUserpassword,
        name: this.state.newUsername,
      })
    );
  };

  render() {
    const { data, loading } = this.state;

    return (
      <>
        <SearchContainer
          page={this.state.page}
          handleAddSomeMore={this.handleAddSomeMore}
          pageName={"USERS"}
          state={this.state}
          handleCountPerPage={this.handleCountPerPage}
          handleAllView={this.handleAllView}
          handleSearchBar={this.handleSearchBar}
          handleSubtmit={this.handleSubtmit}
          handlePageChange={this.handlePageChange}
          customStyleForlesTabs={true}
        />
        {this.state.addButtonClicked && (
          <AddContainer>
            <input
              type="email"
              placeholder="Enter email"
              id="newUseremail"
              onChange={(e) => this.handleCreateUser(e)}
            />
            <input
              type="password"
              placeholder="Enter password"
              id="newUserpassword"
              onChange={(e) => this.handleCreateUser(e)}
            />
            <input
              type="text"
              placeholder="Name"
              id="newUsername"
              onChange={(e) => this.handleCreateUser(e)}
            />
            <button onClick={this.handleClickCreateUser}>
              <p>Create user</p>
            </button>
          </AddContainer>
        )}
        <div className="mainTableDiv">
          {!loading && this.state.data.length !== 0 ? (
            <div className="shortScreenTableDiv">
              {data.length !== 0 &&
                data.map((item, key) => {
                  return (
                    <div key={key} className="mainDivShotScreen">
                      <div
                        className="nazivDiv"
                        onClick={(e) => this.handlePageRedirect(e, item)}
                      >
                        <div>
                          <div className="arrowDiv">
                            <img
                              src={arrowUp}
                              onClick={() =>
                                this.handleArrowSort("email", "Up")
                              }
                              alt="arrow"
                            />
                            <img
                              src={secondarrowDown}
                              onClick={() =>
                                this.handleArrowSort("email", "Down")
                              }
                              alt="arrow"
                            />
                          </div>
                          <p>{"Email"}</p>
                        </div>
                        <div className="ownersNameClass">{item.email}</div>
                      </div>
                      <div className="mainForIcons">
                        <div className="divWithClicableIcons">
                          {/* <img src={visit} alt="visit" />
                                        <p onClick={() => this.haneldeRedirect(item)}>visit</p> */}
                          <img src={edit} alt="edit" />
                          <p onClick={() => this.haneldeRedirect(item, "edit")}>
                            edit
                          </p>
                          <img src={stats} alt="sites" />
                          <p
                            onClick={() => this.haneldeRedirect(item, "sites")}
                          >
                            sites
                          </p>
                          <img src={posts} alt="posts" />
                          <p
                            onClick={() => this.haneldeRedirect(item, "posts")}
                          >
                            posts
                          </p>
                          <img src={widgets} alt="widgets" />
                          <p
                            onClick={() =>
                              this.haneldeRedirect(item, "widgets")
                            }
                          >
                            widgets
                          </p>
                        </div>
                      </div>
                      <div className="nazivDiv">
                        <div>
                          <div className="arrowDiv">
                            {/* <img src={arrowUp} alt="arrow" onClick={() => this.handleArrowSort('roles', 'Up')} />
                                            <img src={secondarrowDown} alt="arrow" onClick={() => this.handleArrowSort('roles', 'Down')} /> */}
                          </div>
                          <p>{"Roles"}</p>
                        </div>
                        <div className="ownersNameClass">
                          {item.nazivKorisnika}
                        </div>
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
                  <th>
                    <div>
                      <div>
                        <img
                          src={arrowUp}
                          alt="arrow"
                          onClick={() => this.handleArrowSort("email", "1")}
                        />
                        <img
                          src={secondarrowDown}
                          alt="arrow"
                          onClick={() => this.handleArrowSort("email", "-1")}
                        />
                      </div>
                      <p>Email</p>
                    </div>
                  </th>
                  <th></th>
                  <th>
                    <div>
                      <div>
                        {/* <img src={arrowUp} alt="arrow" onClick={() => this.handleArrowSort('roles', 'Up')} />
                                            <img src={secondarrowDown} alt="arrow" onClick={() => this.handleArrowSort('roles', 'Down')} /> */}
                      </div>
                      <p>Roles</p>
                    </div>
                  </th>
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
                        <td>
                          <div className="ownerClass">{item.email}</div>
                        </td>
                        <td>
                          <div className="divWithClicableIcons">
                            {/* <img src={visit} alt="visit" />
                                        <p onClick={() => this.haneldeRedirect(item, 'visit')} id='noredirection'>visit</p> */}
                            <img src={edit} alt="edit" />
                            <p
                              onClick={() => this.haneldeRedirect(item, "edit")}
                              id="noredirection"
                            >
                              edit
                            </p>
                            <img src={stats} alt="sites" />
                            <p
                              onClick={() =>
                                this.haneldeRedirect(item, "sites")
                              }
                              id="noredirection"
                            >
                              sites
                            </p>
                            <img src={posts} alt="posts" />
                            <p
                              onClick={() =>
                                this.haneldeRedirect(item, "posts")
                              }
                              id="noredirection"
                            >
                              posts
                            </p>
                            <img src={widgets} alt="widgets" />
                            <p
                              onClick={() =>
                                this.haneldeRedirect(item, "widgets")
                              }
                              id="noredirection"
                            >
                              widgets
                            </p>
                          </div>
                        </td>
                        <td>
                          <div className="divWithHashes">
                            <p>
                              {item?.roles?.length !== 0 &&
                                item?.roles?.map((el) =>
                                  el === 0
                                    ? "Admin "
                                    : el === 1
                                    ? "Moderator "
                                    : el === 2
                                    ? "Editor "
                                    : ""
                                )}
                            </p>
                          </div>
                        </td>
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
  const { UsersReducer } = state;
  const { createUser, getUsersList, getSelfUser } = UsersReducer;
  return {
    createUser,
    getUsersList,
    getSelfUser,
  };
};

export default connect(mapStateToProps, null)(Users);
