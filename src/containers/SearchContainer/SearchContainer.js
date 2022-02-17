import React, { useState, useEffect } from "react";
import trash from "../../assets/img/SecondHeader/Icons3.svg";
import {
  useSelector,
  //  useDispatch
} from "react-redux";
import { useLocation } from "react-router";
import search from "../../assets/img/SecondHeader/Frame.svg";
import plas from "../../assets/img/SecondHeader/Group5361.svg";
import arrowLeft from "../../assets/img/SecondHeader/Vector.svg";
import arrowRight from "../../assets/img/SecondHeader/Vector(1).svg";
import Pagination from "react-js-pagination";
import DropDown from "../DropDown/DropDown";
import Util from "../util";
// import { GetCategoryListActionRequest } from '../../store/actions/CategoryAction'
// import { GetSitesListActionRequest } from '../../store/actions/SitesListAction'
// import { GetUsersListActionRequest } from '../../store/actions/UsersActions'

import "../../components/Home/Home.scss";

function SearchContainer({
  page,
  handlePageChange,
  handleAllOptionsOnMain,
  selectedSiteSearch,
  handleSearchOnMainPage,
  pageName,
  state,
  handleAddSomeMore,
  handleCountPerPage,
  handleAllView,
  handleSortByStatus,
  handleSearchOnMainByprioOrFirst,
  handleSubtmit,
  handleSearchBar,
  secondHeaderCustomStyle,
  customStyleForlesTabs,
}) {
  const [user, setUser] = useState("all users");
  const [statusOn, setStatusOn] = useState(
    state.selectedStatusSearch?.id ? state.selectedStatusSearch?.id : "NOTRASH"
  );
  // const dispatch = useDispatch()
  const location = useLocation();
  const [showUserOptions, setShowUserOptions] = useState(false);
  const [categorie, setCategorie] = useState("all categories");
  const [showCategorieOptions, setShowCategorieOptions] = useState(false);
  const [sites, setSites] = useState("all sites");
  const [showSitesOptions, setShowSitesOptions] = useState(false);
  const states = useSelector((state) => state);
  const { CategoryReducer, SitesListReducer, UsersReducer } = states;
  const { error: getCategoryListError, data: getCategoryListData } =
    CategoryReducer.getCategoryList;
  const { error: getSitesListError, data: getSitesListData } =
    SitesListReducer.getSitesList;
  const { error: getUsersListError, data: getUsersListData } =
    UsersReducer.getUsersList;

  // useEffect(() => {
  //     if (!getCategoryListLoading && !getCategoryListError && !getCategoryListData) {
  //         dispatch(GetCategoryListActionRequest())
  //     }
  // }, [CategoryReducer.getCategoryList])

  // useEffect(() => {
  //     if (!getSitesListLoading && !getSitesListError && !getSitesListData) {
  //         dispatch(GetSitesListActionRequest())

  //     }
  // }, [SitesListReducer.getSitesList])

  // useEffect(() => {
  //     if (!getUsersListLoading && !getUsersListError && !getUsersListData) {
  //         dispatch(GetUsersListActionRequest())

  //     }
  // }, [UsersReducer.getUsersList])

  const handleChangeOptionsuser = (el) => {
    handleSearchOnMainPage(el, "users");
    setUser(el.name);
  };

  const handleChangeOptionscategorie = (el) => {
    handleSearchOnMainPage(el, "categories");
    setCategorie(el.name);
  };

  const handleUsersShow = () => {
    setShowUserOptions((prevProps) => {
      return !prevProps;
    });
    setShowCategorieOptions(false);
  };

  const handleCategorieShow = () => {
    setShowCategorieOptions((prevProps) => {
      return !prevProps;
    });
    setShowUserOptions(false);
    setShowSitesOptions(false);
  };

  const handleSitesShow = () => {
    setShowSitesOptions((prevProps) => {
      return !prevProps;
    });
    setShowCategorieOptions(false);
  };

  const handleChangeOptionssites = (el) => {
    handleSearchOnMainPage(el, "sites");

    setSites(el.name);
  };

  const handleAllOptionsUser = (el) => {
    setUser(el);
    handleAllOptionsOnMain(el, "users");
  };
  const handleAllOptionsSite = (el) => {
    setSites(el);
    handleAllOptionsOnMain(el, "sites");
  };
  const handleAllOptionsCateg = (el) => {
    setCategorie(el);
    handleAllOptionsOnMain(el, "categories");
  };

  const handleSearchByPrio = (el) => {
    setTimeout(() => {
      handleSearchOnMainByprioOrFirst(el, "prio");
    });
  };

  const handleSearchByFirst = (el) => {
    setTimeout(() => {
      handleSearchOnMainByprioOrFirst(el, "first");
    });
  };

  const handleStatusShow = (el) => {
    if (statusOn === el) {
      setStatusOn("");
    } else {
      setStatusOn(el);
    }
    handleSortByStatus(el);
  };

  useEffect(() => {
    if (location?.data?.searchBy && location?.data?.prevPath) {
      const pasedDataSearch = location?.data?.searchBy;
      const prePath = location?.data?.prevPath;
      prePath === "/sites" && handleSearchOnMainPage(pasedDataSearch, "sites");
    } else if (location?.data?.searchBycategory && location?.data?.prevPath) {
      const pasedDataSearch = location?.data?.searchBycategory;
      const prePath = location?.data?.prevPath;
      prePath === "/categories" && setCategorie(pasedDataSearch.name);
    } else if (location?.data?.searchByuser && location?.data?.prevPath) {
      const pasedDataSearch = location?.data?.searchByuser;
      const prePath = location?.data?.prevPath;
      prePath === "/users" && handleSearchOnMainPage(pasedDataSearch, "users");
    } else if (location?.dataFromStats?.searchBycategory) {
      const el = location?.dataFromStats;
      if (el.pageName === "stats") {
        setCategorie(el.searchBycategory?.name);
        setSites(el.searchByuser.name);
        setStatusOn(el.status);
      }
    }
  }, []);

  return (
    <div
      className="mainSecondHeaderDiv"
      style={secondHeaderCustomStyle && secondHeaderCustomStyle}
    >
      <div
        className={`secondHeaderDiv ${
          customStyleForlesTabs && "customStyleForlesTabs"
        } ${secondHeaderCustomStyle && "customStyleForTotals"} `}
      >
        <div
          className={`secondHeaderDivSection1 ${
            (pageName === "USERS" ||
              pageName === "CATEGORIES" ||
              pageName === "TOTALS") &&
            "secondUserHeaderDiv"
          }`}
        >
          <div className="info1">
            <div className={`box-1 ${pageName === "USERS" && "userAloneBox"}`}>
              <p style={{ marginRight: "30px" }}>{pageName}</p>
            </div>
            <div className="horizontal" />
            {pageName === "SITES" && (
              <div className="box-2" onClick={handleUsersShow}>
                <DropDown
                  label={
                    state.selectedUserSearch
                      ? getUsersListData?.data.find(
                          (el) => el.id === state.selectedUserSearch?.id
                        )?.name
                      : user
                  }
                  isItOpen={showUserOptions}
                  handleAllOptions={handleAllOptionsUser}
                  options={
                    !getUsersListError &&
                    getUsersListData &&
                    getUsersListData.data
                  }
                  handleChangeOptions={handleChangeOptionsuser}
                />
              </div>
            )}
            {(pageName === "POSTS" ||
              pageName === "WIDGETS" ||
              pageName === "CATEGORIES") && (
              <div className="box-2" onClick={handleSitesShow}>
                <DropDown
                  label={
                    state.selectedSiteSearch
                      ? getSitesListData?.data.find(
                          (el) => el.id === state.selectedSiteSearch?.id
                        )?.name
                      : sites
                  }
                  isItOpen={showSitesOptions}
                  handleAllOptions={handleAllOptionsSite}
                  options={
                    !getSitesListError &&
                    getSitesListData &&
                    getSitesListData.data
                  }
                  handleChangeOptions={handleChangeOptionssites}
                />
              </div>
            )}
            {pageName === "POSTS" && <div className="horizontal" />}
            {pageName === "POSTS" && (
              <div className="box-3">
                <div
                  className="mainPrio"
                  style={{
                    width: "100%",
                    // display: "flex",
                    // justifyContent: "space-evenly",
                  }}
                >
                  <div
                    className="priorityClass"
                    style={{
                      borderBottom: state.priority && "5px solid #94d7e0",
                      borderRight: "1px solid #94d7e0",
                      width: "100%",
                    }}
                    onClick={() => handleSearchByPrio(!state.priority)}
                  >
                    <p style={{ margin: "0 auto", padding: "0 5px 0 0" }}>
                      PRIORITY
                    </p>
                  </div>
                  {/* {pageName === "POSTS" && <div className="horizontal" />} */}
                  <div
                    className="firstClass"
                    style={{
                      borderBottom: state.first_position && "5px solid #94d7e0",
                      width: "100%",
                    }}
                    onClick={() => handleSearchByFirst(!state.first_position)}
                  >
                    <p style={{ margin: "0 auto" }}>FIRST</p>
                  </div>
                </div>
              </div>
            )}
            {/* {pageName !== "USERS" && pageName !== "TOTALS" && (
              <div className="horizontal" />
            )} */}
            {/* {pageName !== "USERS" &&
              pageName !== "TOTALS" &&
              pageName !== "CATEGORIES" && (
                <div className="box-3" onClick={handleCategorieShow}>
                  <DropDown
                    label={categorie}
                    isItOpen={showCategorieOptions}
                    handleAllOptions={handleAllOptionsCateg}
                    options={
                      !getCategoryListError &&
                      getCategoryListData &&
                      getCategoryListData.data
                    }
                    handleChangeOptions={handleChangeOptionscategorie}
                  />
                </div>
              )} */}
            {pageName !== "USERS" &&
              pageName !== "CATEGORIES" &&
              pageName !== "TOTALS" && <div className="horizontal" />}
          </div>
          {pageName !== "TOTALS" &&
            pageName !== "USERS" &&
            pageName !== "CATEGORIES" && (
              <div className="info2">
                <div className="sectionWithTrash">
                  <div
                    className="col1"
                    style={{
                      borderBottom:
                        state.selectedStatusSearch === "" &&
                        "5px solid #94d7e0",
                    }}
                    onClick={() => handleStatusShow("NOTRASH")}
                  >
                    <p>NO TRASH</p>
                  </div>
                  <div
                    className="col2"
                    style={{
                      borderBottom:
                        state.selectedStatusSearch?.id === 1 &&
                        "5px solid #94d7e0",
                    }}
                    onClick={() => handleStatusShow(1)}
                  >
                    <p>PUBLISHED</p>
                  </div>
                  <div
                    className="col3"
                    style={{
                      borderBottom:
                        state.selectedStatusSearch?.id === 0 &&
                        "5px solid #94d7e0",
                    }}
                    onClick={() => handleStatusShow(0)}
                  >
                    <p>DRAFT</p>
                  </div>
                  <div
                    className="col4"
                    style={{
                      borderBottom:
                        state.selectedStatusSearch?.id === 2 &&
                        "5px solid #94d7e0",
                    }}
                    onClick={() => handleStatusShow(2)}
                  >
                    <p>ERROR</p>
                  </div>

                  {Util.isRoot() && (
                    <div
                      className="trashDiv"
                      style={{
                        borderBottom:
                          state.selectedStatusSearch?.id === 3 &&
                          "5px solid #94d7e0",
                      }}
                      onClick={() => handleStatusShow(3)}
                    >
                      <img src={trash} alt="trash" />
                    </div>
                  )}
                </div>
              </div>
            )}
        </div>
        {pageName !== "TOTALS" && Util.isRoot() && (
          <div className="section2">
            <div className="sectionSearch">
              <div>
                <form onSubmit={handleSubtmit}>
                  <img src={search} alt="search" />
                  <input
                    type="text"
                    placeholder="search"
                    onChange={(e) => handleSearchBar(e)}
                    value={state.inputValue}
                  />
                </form>
              </div>
            </div>
            <div className="sectionWithAddButton">
              <div onClick={() => handleAddSomeMore()}>
                <img src={plas} alt="plas" />
                <p>add</p>
              </div>
            </div>
          </div>
        )}
      </div>
      {pageName !== "TOTALS" && (
        <div className="pagesAndPagination">
          <div className="divWithInfoText">
            LEGEND: <span>in:</span> clicks coming from site X,{" "}
            <span>out:</span> clicks sent to site X <span>txr:</span> out / in
          </div>
          <div className="pageInfoDiv">
            <div>
              <p
                style={{ fontSize: "13px", textAlign: "center", margin: 0 }}
              >{`${
                isNaN(state.countPerPage)
                  ? 0
                  : page * state.countPerPage - state.countPerPage
              } - ${
                isNaN(state.countPerPage) ? 0 : state.countPerPage * page
              } of ${state.info?.total}`}</p>
            </div>

            <input
              type="number"
              onChange={(e) => handleCountPerPage(e)}
              value={state.countPerPage}
            />
            <p>per page </p>
            <Pagination
              activePage={page}
              itemsCountPerPage={
                state.countPerPage ? parseInt(state.countPerPage) : 10
              }
              totalItemsCount={state.info?.total}
              pageRangeDisplayed={2}
              onChange={handlePageChange}
              hideFirstLastPages={true}
              prevPageText={<img src={arrowLeft} alt="arrowLeft" />}
              nextPageText={<img src={arrowRight} alt="arrowRight" />}
              itemClass={"mainLinkClass"}
            />
            <button onClick={() => handleAllView(state.info?.total)}>
              All
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchContainer;
