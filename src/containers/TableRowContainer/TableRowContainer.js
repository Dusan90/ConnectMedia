import React, { useState, useEffect, useRef } from "react";
import arrowUp from "../../assets/img/TableIcons/arrow(1).svg";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import secondarrowDown from "../../assets/img/TableIcons/arrow.svg";
import secondTrash from "../../assets/img/TableIcons/trash.svg";
import visit from "../../assets/img/TableIcons/visit.svg";
import edit from "../../assets/img/TableIcons/edit.svg";
import posts from "../../assets/img/TableIcons/posts.svg";
import stats from "../../assets/img/TableIcons/stats.svg";
import widgets from "../../assets/img/TableIcons/widgets.svg";
import history from "../../routes/History";
import {
  BindCategoryActionRequest,
  UnbindCategoryActionRequest,
  GetCategoryListActionRequest,
} from "../../store/actions/CategoryAction";
import { UpdateWidgetDetailsActionRequest } from "../../store/actions/WidgetActions";
import Util from "../util";

function TableRowContainer({
  data,
  pageName,
  handleCheckbox,
  handleTrashFunctionaliti,
  checkboxList,
  handleArrowSort,
  handleHashArrowClick,
  state,
}) {
  const inputEl = useRef(null);
  const statee = useSelector((state) => state);
  const dispatch = useDispatch();
  const { CategoryReducer } = statee;
  const {
    loading: getCategoryListLoading,
    error: getCategoryListError,
    data: getCategoryListData,
    errorData: getCategoryListErrorData,
  } = CategoryReducer.getCategoryList;
  const [categoryList, setCategoryList] = useState([]);
  useEffect(() => {
    if (state.hashesArrowDown) {
      setTimeout(() => {
        inputEl.current && inputEl.current.focus();
      });
    }
  });

  useEffect(() => {
    if (
      !getCategoryListLoading &&
      !getCategoryListError &&
      getCategoryListData
    ) {
      setCategoryList(getCategoryListData.data);
    }
  }, [CategoryReducer.getCategoryList]);

  const history = useHistory();
  const haneldeRedirect = (value, tabClicked) => {
    if (tabClicked === "edit") {
      history.push({
        pathname: `/sites/${value.id}`,
        data: { buttonClicked: "editDiv" },
      });
    } else if (tabClicked === "stats") {
      history.push({
        pathname: `/sites/${value.id}`,
        data: { buttonClicked: "statsDiv" },
      });
    } else if (tabClicked === "posts") {
      history.push({
        pathname: `/posts`,
        data: { searchBy: value, prevPath: window.location.pathname },
      });
    } else if (tabClicked === "widgets") {
      history.push({
        pathname: `/widgets`,
        data: { searchBy: value, prevPath: window.location.pathname },
      });
    } else if (tabClicked === "embed") {
      history.push({
        pathname: `/widgets/${value.id}`,
        data: { buttonClicked: "embedDiv" },
      });
    }
  };

  const handlePageRedirect = (e, item) => {
    if (!e.target.id || e.target.id !== "noredirection") {
      if (pageName === "widgets") {
        history.push({
          pathname: `/widgets/${item.id}`,
          state: item,
        });
      } else {
        history.push({
          pathname: `/sites/${item.id}`,
          state: item,
        });
      }
    }
  };

  const hashesmaping =
    state?.hashesArrowWitchIsOn?.categories?.length !== 0
      ? state?.hashesArrowWitchIsOn?.categories?.map((el) => {
          if (pageName !== "widgets") {
            return el.category.id;
          } else {
            return el.id;
          }
        })
      : [];

  return (
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
                  onClick={() =>
                    handleArrowSort(
                      pageName === "widgets" ? "status" : "state",
                      "1"
                    )
                  }
                  alt="arrow"
                />
                <img
                  src={secondarrowDown}
                  onClick={() =>
                    handleArrowSort(
                      pageName === "widgets" ? "status" : "state",
                      "-1"
                    )
                  }
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
                  onClick={() =>
                    handleArrowSort(
                      pageName === "widgets" ? "site" : "owner",
                      "1"
                    )
                  }
                  alt="arrow"
                />
                <img
                  src={secondarrowDown}
                  onClick={() =>
                    handleArrowSort(
                      pageName === "widgets" ? "site" : "owner",
                      "-1"
                    )
                  }
                  alt="arrow"
                />
              </div>
              <p>{pageName === "widgets" ? "Site" : "OWNER"}</p>
            </div>
          </th>
          <th>
            <div>
              <div>
                <img
                  src={arrowUp}
                  onClick={() => handleArrowSort("name", "1")}
                  alt="arrow"
                />
                <img
                  src={secondarrowDown}
                  onClick={() => handleArrowSort("name", "-1")}
                  alt="arrow"
                />
              </div>
              <p>{pageName === "widgets" ? "Name" : "Name"}</p>
            </div>
          </th>
          <th></th>
          <th></th>
          <th>
            <div>
              <div>
                <img
                  src={arrowUp}
                  onClick={() =>
                    handleArrowSort(pageName === "widgets" ? "imp" : "in", "Up")
                  }
                  alt="arrow"
                />
                <img
                  src={secondarrowDown}
                  onClick={() =>
                    handleArrowSort(
                      pageName === "widgets" ? "imp" : "in",
                      "Down"
                    )
                  }
                  alt="arrow"
                />
              </div>
              <p>{pageName === "widgets" ? "imp" : "in"}</p>
            </div>
          </th>
          {((pageName !== "widgets" && Util.isRoot()) ||
            pageName === "widgets") && (
            <th>
              <div>
                <div>
                  <img
                    src={arrowUp}
                    onClick={() =>
                      handleArrowSort(
                        pageName === "widgets" ? "clk" : "out",
                        "Up"
                      )
                    }
                    alt="arrow"
                  />
                  <img
                    src={secondarrowDown}
                    onClick={() =>
                      handleArrowSort(
                        pageName === "widgets" ? "clk" : "out",
                        "Down"
                      )
                    }
                    alt="arrow"
                  />
                </div>
                <p>{pageName === "widgets" ? "clk" : "out"}</p>
              </div>
            </th>
          )}
          {((pageName !== "widgets" && Util.isRoot()) ||
            pageName === "widgets") && (
            <th>
              <div>
                <div>
                  <img
                    src={arrowUp}
                    onClick={() =>
                      handleArrowSort(
                        pageName === "widgets" ? "ctr" : "txr",
                        "Up"
                      )
                    }
                    alt="arrow"
                  />
                  <img
                    src={secondarrowDown}
                    onClick={() =>
                      handleArrowSort(
                        pageName === "widgets" ? "ctr" : "txr",
                        "Down"
                      )
                    }
                    alt="arrow"
                  />
                </div>
                <p>{pageName === "widgets" ? "ctr" : "txr"}</p>
              </div>
            </th>
          )}
        </tr>
      </thead>

      <tbody>
        {data.length !== 0 &&
          data.map((item, key) => {
            return (
              <tr key={key} onClick={(e) => handlePageRedirect(e, item)}>
                {/* <td><input type="checkbox" value={checkboxList} id='noredirection' checked={checkboxList[item.id]} onChange={(e) => handleCheckbox(e, item)} /></td> */}
                {Util.isRoot() && (
                  <td>
                    <img
                      src={secondTrash}
                      onClick={() => handleTrashFunctionaliti(item.id)}
                      alt="trash"
                      id="noredirection"
                    />
                  </td>
                )}
                <td>
                  {pageName !== "widgets" && (
                    <div
                      className="coloredDivStatus"
                      style={{
                        background:
                          item.state === 1
                            ? "#ABD996"
                            : item.state === 0
                            ? "#dfe094"
                            : item.state === 2
                            ? "#e09494"
                            : item.state === 3
                            ? "#295265"
                            : "",
                      }}
                    >
                      {item.state === 1
                        ? "PUBLISHED"
                        : item.state === 0
                        ? "DRAFT"
                        : item.state === 2
                        ? "ERROR"
                        : item.state === 3
                        ? "TRASH"
                        : ""}
                    </div>
                  )}
                  {pageName === "widgets" && (
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
                  )}
                </td>
                <td>
                  {pageName !== "widgets" && (
                    <div className="ownerClass">
                      <p
                        id="noredirection"
                        onClick={() => history.push(`/users/${item.owner.id}`)}
                      >
                        {item.owner.email}
                      </p>
                    </div>
                  )}
                  {pageName === "widgets" && (
                    <div className="ownerClass">
                      <p
                        id="noredirection"
                        onClick={() => history.push(`/sites/${item.site?.id}`)}
                      >
                        {item.site?.name}
                      </p>
                    </div>
                  )}
                </td>
                <td>
                  <div className="ownersNameClass">{item.name}</div>
                </td>
                <td>
                  <div className="divWithClicableIcons">
                    {((pageName === "widgets" && Util.isRoot()) ||
                      pageName !== "widgets") && (
                      <img src={visit} alt="visit" />
                    )}
                    {((pageName === "widgets" && Util.isRoot()) ||
                      pageName !== "widgets") && (
                      <p
                        onClick={() => {
                          pageName !== "widgets"
                            ? window.open(`${item?.url && item?.url}`)
                            : window.open(
                                `${item?.site?.url && item?.site?.url}`
                              );
                        }}
                        id="noredirection"
                      >
                        visit
                      </p>
                    )}
                    {Util.isRoot() && <img src={edit} alt="edit" />}
                    {pageName !== "widgets" && Util.isRoot() && (
                      <p
                        onClick={() => haneldeRedirect(item, "edit")}
                        id="noredirection"
                      >
                        edit
                      </p>
                    )}
                    {pageName === "widgets" && Util.isRoot() && (
                      <p
                        onClick={() =>
                          history.push({
                            pathname: `/widgets/${item.id}`,
                            data: { buttonClicked: "editDiv" },
                          })
                        }
                        id="noredirection"
                      >
                        edit
                      </p>
                    )}
                    <img src={stats} alt="stats" />
                    {pageName !== "widgets" && (
                      <p
                        onClick={() => haneldeRedirect(item, "stats")}
                        id="noredirection"
                      >
                        stats
                      </p>
                    )}
                    {pageName === "widgets" && (
                      <p
                        onClick={() =>
                          history.push({
                            pathname: `/widgets/${item.id}`,
                            data: { buttonClicked: "statsDiv" },
                          })
                        }
                        id="noredirection"
                      >
                        stats
                      </p>
                    )}
                    {pageName !== "widgets" && <img src={posts} alt="posts" />}
                    {pageName !== "widgets" && (
                      <p
                        onClick={() => haneldeRedirect(item, "posts")}
                        id="noredirection"
                      >
                        posts
                      </p>
                    )}
                    {pageName !== "widgets" && (
                      <img src={widgets} alt="widgets" />
                    )}
                    {pageName !== "widgets" && (
                      <p
                        onClick={() => haneldeRedirect(item, "widgets")}
                        id="noredirection"
                      >
                        widgets
                      </p>
                    )}
                    {pageName === "widgets" && Util.isRoot() && (
                      <img src={visit} alt="visit" />
                    )}
                    {pageName === "widgets" && Util.isRoot() && (
                      <p
                        onClick={() => haneldeRedirect(item, "embed")}
                        id="noredirection"
                      >
                        embed
                      </p>
                    )}
                  </div>
                </td>
                <td>
                  <>
                    <div className="divWithHashes">
                      {pageName !== "widgets" && (
                        <p id="noredirection">
                          {item?.categories?.slice(0, 2).map((el, i) => (
                            <a
                              key={i}
                              id="noredirection"
                              onClick={() => {
                                dispatch(
                                  UnbindCategoryActionRequest({
                                    siteId: item.id,
                                    categoryId: el.category.id,
                                  })
                                );
                              }}
                            >{`${el.category.name}, `}</a>
                          ))}
                        </p>
                      )}
                      {pageName === "widgets" && (
                        <p>
                          {item?.categories?.slice(0, 2).map((el, i) => (
                            <a
                              id="noredirection"
                              onClick={() => {
                                const newData = item.categories.map((elm) => {
                                  if (elm.id !== el.id) {
                                    return elm.id;
                                  }
                                });
                                dispatch(
                                  UpdateWidgetDetailsActionRequest({
                                    id: item.id,
                                    categories: newData,
                                  })
                                );
                              }}
                              key={i}
                            >{`${el.name}, `}</a>
                          ))}
                        </p>
                      )}
                      <div className="box">
                        {item?.categories.length > 2 && (
                          <p>
                            +<span>{item?.categories.length - 2}</span>
                          </p>
                        )}
                        <img
                          src={secondarrowDown}
                          style={{ marginLeft: "5px" }}
                          onClick={() => handleHashArrowClick(item)}
                          alt="arrow"
                          id="noredirection"
                        />
                      </div>
                    </div>
                    {state.hashesArrowDown &&
                      item.id === state.hashesArrowWitchIsOn.id && (
                        <div
                          ref={inputEl}
                          onBlur={() => handleHashArrowClick(item)}
                          tabIndex="1"
                          id="noredirection"
                          className="offeredHashes"
                        >
                          {categoryList.map((el, i) => {
                            return (
                              <div
                                key={i}
                                id="noredirection"
                                onClick={() => {
                                  if (pageName === "widgets") {
                                    let newArray = hashesmaping.concat(el.id);
                                    if (!hashesmaping.includes(el.id)) {
                                      dispatch(
                                        UpdateWidgetDetailsActionRequest({
                                          id: item.id,
                                          categories: newArray,
                                        })
                                      );
                                      handleHashArrowClick(item);
                                    } else {
                                      let newArray = hashesmaping.filter(
                                        (elm) => elm !== el.id
                                      );
                                      dispatch(
                                        UpdateWidgetDetailsActionRequest({
                                          id: item.id,
                                          categories: newArray,
                                        })
                                      );
                                      handleHashArrowClick(item);
                                    }
                                  } else {
                                    if (!hashesmaping.includes(el.id)) {
                                      dispatch(
                                        BindCategoryActionRequest({
                                          siteId: item.id,
                                          categoryId: el.id,
                                        })
                                      );
                                      handleHashArrowClick(item);
                                    } else {
                                      dispatch(
                                        UnbindCategoryActionRequest({
                                          siteId: item.id,
                                          categoryId: el.id,
                                        })
                                      );
                                      handleHashArrowClick(item);
                                    }
                                  }
                                }}
                                style={{
                                  background: hashesmaping?.includes(el.id)
                                    ? "#e09494"
                                    : "",
                                }}
                              >
                                <p id="noredirection">{el.name}</p>
                              </div>
                            );
                          })}
                        </div>
                      )}
                  </>
                </td>
                {pageName === "widgets" && (
                  <td>{item.stats.imp?.toLocaleString()}</td>
                )}
                {pageName === "widgets" && (
                  <td>{item.stats.clk?.toLocaleString()}</td>
                )}
                {pageName === "widgets" && (
                  <td>{item.stats.ctr?.toLocaleString()}</td>
                )}
                {pageName !== "widgets" && (
                  <td>{item.stats.in?.toLocaleString()}</td>
                )}
                {pageName !== "widgets" && Util.isRoot() && (
                  <td>{item.stats.out?.toLocaleString()}</td>
                )}
                {pageName !== "widgets" && Util.isRoot() && (
                  <td>{item.stats.txr?.toLocaleString()}</td>
                )}
              </tr>
            );
          })}
      </tbody>
    </table>
  );
}

export default TableRowContainer;
