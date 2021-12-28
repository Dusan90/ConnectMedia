import React, { Component } from "react";
import Table from "rc-table";
import { connect } from "react-redux";
import "./Stats.scss";
import { GetStatsActionRequest } from "../../store/actions/StatsAction";
import { GetCategoryListActionRequest } from "../../store/actions/CategoryAction";
import { v4 as uuidv4 } from "uuid";

export class Stats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [],
      data: [],
    };
  }

  componentDidMount() {
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

    this.props.dispatch(GetStatsActionRequest());
  }

  handleRedirect = (el, secondArg, elm) => {
    // console.log(el, elm);
    if (secondArg === "published") {
      this.props.history.push({
        pathname: `/posts`,
        dataFromStats: {
          searchBycategory: el.stats[elm],
          searchByuser: el,
          status: 1,
          pageName: "stats",
        },
      });
    } else {
      this.props.history.push({
        pathname: `/posts`,
        dataFromStats: {
          searchBycategory: el.stats[elm],
          searchByuser: el,
          status: 0,
          pageName: "stats",
        },
      });
    }
  };

  componentDidUpdate(prevProps) {
    const { getStats, getCategoryList } = this.props;
    const {
      loading: getStatsLoading,
      error: getStatsError,
      data: getStatsData,
    } = getStats;
    const {
      loading: getCategoryListLoading,
      error: getCategoryListError,
      data: getCategoryListData,
    } = getCategoryList;

    if (
      prevProps.getCategoryList !== getCategoryList &&
      !getCategoryListLoading &&
      !getCategoryListError &&
      getCategoryListData
    ) {
      let filteredCategories = getCategoryListData?.data?.map((el, i) => {
        return {
          title: el.name,
          dataIndex: el.name.toLowerCase(),
          key: el.name.toLowerCase(),
        };
      });
      const columns = [
        { title: "Site", dataIndex: "site", key: "site" },
        ...filteredCategories,
        { title: "Total", dataIndex: "total", key: "total" },
      ];
      this.setState({ columns });
    }

    if (
      prevProps.getStats !== getStats &&
      !getStatsLoading &&
      !getStatsError &&
      getStatsData
    ) {
      const dataToShow = getStatsData?.data?.stats?.map((el) => {
        const elem = Object.keys(el.stats);
        const newasdf =
          elem.length !== 0 &&
          elem.map((elm) => {
            return {
              [`${elm.toLowerCase()}`]: [
                <p>
                  <span
                    className="underskoredSpan"
                    onClick={() => this.handleRedirect(el, "published", elm)}
                  >
                    {el.stats[elm]["stats"]["published"]}
                  </span>{" "}
                  <span
                    onClick={() => this.handleRedirect(el, "draft", elm)}
                    className="span2 underskoredSpan"
                  >
                    {el.stats[elm]["stats"]["draft"]}
                  </span>
                </p>,
              ],
            };
          });
        let arrayoFObj =
          newasdf && newasdf.reduce((r, c) => Object.assign(r, c), {});
        return {
          statusState: el.state,
          key: el.id,
          site: [
            <p
              className="underskoredP"
              onClick={() => this.props.history.push(`/sites/${el.id}`)}
            >
              {el.name}
            </p>,
          ],
          ...arrayoFObj,
          total: [
            <p>
              <span className="underskoredSpan">{el.total.published}</span>{" "}
              <span className="span2 underskoredSpan">{el.total.draft}</span>
            </p>,
          ],
        };
      });

      const totals = getStatsData?.data?.total?.map((el) => {
        return {
          [`${el.name.toLowerCase()}`]: [
            <p>
              <span>{el.stats.published}</span>{" "}
              <span className="span2">{el.stats.draft}</span>
            </p>,
          ],
        };
      });

      let arrayoFObj = totals.reduce((r, c) => Object.assign(r, c), {
        site: [<p>Total</p>],
        key: uuidv4(),
        total: [
          <p>
            <span>{getStatsData?.data?.overall.published}</span>{" "}
            <span className="span2">{getStatsData?.data?.overall.draft}</span>
          </p>,
        ],
      });

      this.setState({ data: [...dataToShow, arrayoFObj] });
    }
  }

  render() {
    const { columns } = this.state;
    return (
      <div className="mainStatsDiv">
        <Table
          columns={columns}
          data={this.state.data}
          rowClassName={(record, index) => {
            if (record.statusState === 0) {
              return "draft";
            } else if (record.statusState === 1) {
              return "published";
            } else if (record.statusState === 2) {
              return "error";
            } else if (record.statusState === 3) {
              return "trash";
            } else {
              return "";
            }
          }}
        />
        <div className="StatsMainShortTable">
          {this.state.data.map((item, key) => {
            return (
              <div key={key} className="mainDivShotScreenStats">
                <div
                  className={`mainDivInOutStats ${
                    item.statusState === 0 && "draft"
                  } ${item.statusState === 2 && "error"} ${
                    item.statusState === 3 && "trash"
                  }`}
                >
                  {columns.map((el, i) => {
                    return (
                      <div key={i} className="statistic">
                        <div>
                          <p>{el.title}</p>
                        </div>
                        <div className="valueP">{item[el.key]}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { StatsReducer, CategoryReducer } = state;
  const { getStats } = StatsReducer;
  const { getCategoryList } = CategoryReducer;

  return {
    getStats,
    getCategoryList,
  };
};

export default connect(mapStateToProps, null)(Stats);
