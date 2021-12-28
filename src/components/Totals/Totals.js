import React, { Component } from "react";
import SearchContainer from "../../containers/SearchContainer/SearchContainer";
import Chart from "../../containers/Chart/Chart";
import VerticalChart from "../../containers/Chart/VerticalChart";
import posts from "../../assets/img/SiteDetails/Frame(2).svg";
import postsBlack from "../../assets/img/SiteDetails/postsBlack.svg";
import {
  TotalRequest,
  SpecSiteChartRequest,
} from "../../store/actions//ChartAction";

import { connect } from "react-redux";
import "./Totals.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const test = [
  {
    status: "PUBLISHED",
    owner: "B92",
    nazivKorisnika: "B92.net",
    in: "11212",
    out: "2",
    txr: "0.02%",
  },
  {
    status: "PUBLISHED",
    owner: "Novosti",
    nazivKorisnika: "B92.net",
    in: "11212",
    out: "2",
    txr: "0.02%",
  },
];

export class Totals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataLength: 20,
      whichIsActive: "",
      data: test,
      filteredDate: [],
      inputValue: "",
      countPerPage: "",
      chartData: "",
      startDate: new Date().setDate(new Date().getDate() - 7),
      endDate: new Date(),
      loading: true,
    };
  }

  componentDidMount() {
    this.props.dispatch(
      TotalRequest({
        from: Math.round(new Date(this.state.startDate).getTime() / 1000),
        to: Math.round(new Date(this.state.endDate).getTime() / 1000),
      })
    );
  }

  handlePageChange = (page) => {
    this.setState({ whichIsActive: page });
  };

  componentDidUpdate(prevProps) {
    const { total, specSiteChart } = this.props;
    const { loading: totalLoading, error: totalError, data: totalData } = total;
    // const {
    //   loading: specSiteChartLoading,
    //   error: specSiteChartError,
    //   data: specSiteChartData,
    // } = specSiteChart;

    if (
      prevProps.total !== total &&
      !totalLoading &&
      !totalError &&
      totalData
    ) {
      this.setState({ chartData: totalData.data, loading: false });
    }

    // if (
    //   prevProps.specSiteChart !== specSiteChart &&
    //   !specSiteChartLoading &&
    //   !specSiteChartError &&
    //   specSiteChartData
    // ) {
    //   this.setState({ chartData: specSiteChartData.data });
    // }
  }

  handleHomePageSort = (value, sortBy) => {
    // const { filteredDate, data} = this.state
    // const toTheFilter = filteredDate.length === 0 ? data : filteredDate
    const newData = this.state.data.filter((el) => {
      if (sortBy === "users") {
        if (el.owner === value) {
          return el;
        }
      } else if (sortBy === "categories") {
        if (el.categories === value) {
          return el;
        }
      } else if (sortBy === "sites") {
        if (el.sites === value) {
          return el;
        }
      }
    });
    this.setState({ filteredDate: newData });
  };

  handleCountPerPage = (e) => {
    this.setState({ countPerPage: e.target.value });
  };

  handleSearchOnMainPage = (el, secondElement) => {
    this.props.dispatch(SpecSiteChartRequest({ id: el.id }));
    // if (this.props.location?.data?.searchByuser && !secondElement) {
    //     this.setState({ selectedUserSearch: el })
    //     const newData = this.state.data.filter(elm => {
    //         return elm.owner === el.id
    //     })
    //     this.setState({ data: newData })
    //     setTimeout(() => {
    //         this.setState({ page: 1 })

    //         this.paginate(1)
    //     });
    // }
    // else if (this.props.location?.data?.searchBycategory && !secondElement) {
    //     this.setState({ selectedCategorieSearch: el })
    //     setTimeout(() => {
    //         this.props.dispatch(GetPostsListActionRequest())
    //     });
    // }
    // else if (this.props.location?.data?.searchBy && !secondElement) {
    //     this.setState({ selectedSiteSearch: el })
    //     setTimeout(() => {
    //         this.props.dispatch(GetPostsListActionRequest())
    //     });
    // }

    // if (secondElement === 'sites') {
    //     this.setState({ selectedSiteSearch: el })
    //     setTimeout(() => {
    //         this.props.dispatch(GetPostsListActionRequest())
    //     });
    // } else if (secondElement === 'categories') {
    //     this.setState({ selectedCategorieSearch: el })
    //     setTimeout(() => {
    //         this.props.dispatch(GetPostsListActionRequest())
    //     });
    // }
  };

  handleAllOptionsOnMain = (el, sortBy) => {
    console.log(el, sortBy);
    this.props.dispatch(
      TotalRequest({
        from: Math.round(new Date(this.state.startDate).getTime() / 1000),
        to: Math.round(new Date(this.state.endDate).getTime() / 1000),
      })
    );
    // if (sortBy === "categories") {
    //     this.setState({ selectedCategorieSearch: '' })
    // } else if (sortBy === 'sites') {
    //     this.setState({ selectedSiteSearch: '' })
    // }
    // setTimeout(() => {
    //     this.props.dispatch(GetPostsListActionRequest())
    // });
  };

  render() {
    const { dataLength, whichIsActive } = this.state;
    return (
      <>
        <SearchContainer
          pageName={"TOTALS"}
          state={this.state}
          handleCountPerPage={this.handleCountPerPage}
          handleHomePageSort={this.handleHomePageSort}
          handleSearchOnMainPage={this.handleSearchOnMainPage}
          handleAllOptionsOnMain={this.handleAllOptionsOnMain}
          secondHeaderCustomStyle={{ height: "55px" }}
        />
        {/* <div style={{ padding: "0 35px" }}>
          <div className="mainSiteDetailsNavigationTotal">
            <div className="siteDetailsNavigate"> */}
        {/* <div
                onClick={() => {
                  return (
                    this.handlePageChange("goback"), this.props.history.goBack()
                  );
                }}
                className={`goback ${whichIsActive === "goback" && "active"}`}
              >
                <p>GO BACK</p>
              </div> */}
        {/* <div onClick={() => this.handlePageChange('siteDetails')} className={`siteDetails ${whichIsActive === 'siteDetails' && 'active'}`}><p>Site details</p></div> */}
        {/* <div
                onClick={() => this.handlePageChange("sitesDiv")}
                className={`sitesDiv ${
                  whichIsActive === "sitesDiv" && "active"
                }`}
              >
                <img
                  src={whichIsActive === "sitesDiv" ? postsBlack : posts}
                  alt="posts"
                />
                <p>sites</p>
              </div> */}
        {/* <div
                onClick={() => this.handlePageChange("postsPorDiv")}
                className={`postsPorDiv ${
                  whichIsActive === "postsPorDiv" && "active"
                }`}
              >
                <img
                  src={whichIsActive === "postsPorDiv" ? postsBlack : posts}
                  alt="posts"
                />

                <p>posts on portal</p>
              </div> */}
        {/* {
                <div
                  onClick={() => {
                    return this.handlePageChange("postsWidgDiv");
                  }}
                  className={`postsWidgDiv ${
                    whichIsActive === "postsWidgDiv" && "active"
                  }`}
                >
                  <img
                    src={whichIsActive === "postsWidgDiv" ? postsBlack : posts}
                    alt="posts"
                  />
                  <p>posts on widgets</p>
                </div>
              } */}
        {/* {
                <div
                  onClick={() => this.handlePageChange("widgetsDiv")}
                  className={`widgetsDiv ${
                    whichIsActive === "widgetsDiv" && "active"
                  }`}
                >
                  <img
                    src={whichIsActive === "widgetsDiv" ? postsBlack : posts}
                    alt="posts"
                  />
                  <p>widgets</p>
                </div>
              } */}
        {/* </div>
          </div>
        </div> */}

        <div
          style={{ height: "500px", marginTop: "20px" }}
          className="linechart"
        >
          <div
            style={{
              display: "flex",
              gap: "10px",
              marginBottom: "20px",
              padding: "0 35px",
            }}
          >
            <h4>Select date range</h4>
            <div style={{ display: "flex", gap: "10px" }}>
              <DatePicker
                selected={this.state.startDate}
                onChange={(date) => {
                  this.setState({ startDate: date, loading: true });
                  setTimeout(() => {
                    this.props.dispatch(
                      TotalRequest({
                        from: Math.round(
                          new Date(this.state.startDate).getTime() / 1000
                        ),
                        to: Math.round(
                          new Date(this.state.endDate).getTime() / 1000
                        ),
                      })
                    );
                  }, 1000);
                }}
                selectsStart
                startDate={this.state.startDate}
                endDate={this.state.endDate}
              />
              <DatePicker
                selected={this.state.endDate}
                onChange={(date) => {
                  this.setState({ endDate: date, loading: true });
                  setTimeout(() => {
                    this.props.dispatch(
                      TotalRequest({
                        from: Math.round(
                          new Date(this.state.startDate).getTime() / 1000
                        ),
                        to: Math.round(
                          new Date(this.state.endDate).getTime() / 1000
                        ),
                      })
                    );
                  }, 1000);
                }}
                selectsEnd
                startDate={this.state.startDate}
                endDate={this.state.endDate}
                minDate={this.state.startDate}
              />
              {this.state.loading && <p>Loading...</p>}
            </div>
          </div>
          {!this.state.loading && (
            <Chart
              dataToShow={this.state.chartData}
              fields={{ 0: "clicks", 1: "impressions", 2: "ctr" }}
            />
          )}
        </div>

        {!this.state.loading && (
          <div
            style={{ height: "500px", marginTop: "60px" }}
            className="linechart"
          >
            <Chart
              dataToShow={this.state.chartData}
              fields={{ 0: "visits", 1: "unique_perc", 2: "unique" }}
            />
          </div>
        )}
        {/* <h1
          className="secondHeaderOnTotals"
          style={{ marginTop: "50px", textAlign: "center" }}
        >
          Daily totals for sites
        </h1>
        <div style={{ height: `${dataLength * 30}px` }}>
          <VerticalChart />
        </div> */}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const { ChartRreducer } = state;
  const { total, specSiteChart } = ChartRreducer;

  return {
    total,
    specSiteChart,
  };
};

export default connect(mapStateToProps, null)(Totals);
