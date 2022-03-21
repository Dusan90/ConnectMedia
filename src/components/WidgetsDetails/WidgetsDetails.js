import React, { Component } from "react";
import { Link } from "react-router-dom";
import NavWidget from "../../containers/NavWidget/NavWidget";
// import xButton from '../../assets/img/SiteDetails/xButton.svg'
import { connect } from "react-redux";
import "../SiteDetails/SiteDetails.scss";
import arrowUp from "../../assets/img/TableIcons/arrow(1).svg";
import secondarrowDown from "../../assets/img/TableIcons/arrow.svg";
import SaveButtonEdit from "../../containers/Buttons/SaveButtonEdit";
import Chart from "../../containers/Chart/Chart";
import VerticalChart from "../../containers/Chart/VerticalChart";
import Select from "react-select";
import {
  GetWidgetsListActionRequest,
  GetWidgetDetailsActionRequest,
  CreateWidgetActionRequest,
  UpdateWidgetDetailsActionRequest,
  DeleteWidgetActionRequest,
  ViewWidgetActionRequest,
} from "../../store/actions/WidgetActions";
import { GetCategoryListActionRequest } from "../../store/actions/CategoryAction";
import { GetSitesListActionRequest } from "../../store/actions/SitesListAction";
import { SpecWidgetChartRequest } from "../../store/actions/ChartAction";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Util from "../../containers/util";
import { GetPostsListActionRequest } from "../../store/actions/PostActions";

import ViewWidgets from "./ViewWidgets";

import { NotificationManager } from "react-notifications";

import "./WidgetsDetails.scss";

const customSelectStyles = {
  control: (base, state) => ({
    ...base,
    // height: "48px",
    flex: "1",
    fontWeight: "500",
    // background: "white",
    background: "#d6dbdc",
    // !props.organization && props.color && "rgb(245, 192, 192)",
  }),
  placeholder: () => ({
    color: "black",
  }),
};

const options = [0, 1, 2, 3];

export class WidgetsDetails extends Component {
  constructor(prosp) {
    super(prosp);
    this.state = {
      isIteditable: false,
      whichisit: "",
      WidgetDetailsData: "",
      siteDetailsData: "",
      tabClicked: "",
      dataState: null,
      name: null,
      site: null,
      status: null,
      publicValue: null,
      image: null,
      description: null,
      categories: null,
      sites: null,
      include: null,
      minima: null,
      direct: null,
      append: null,
      same_window: null,
      ignore_impressions: null,
      count: null,
      width: null,
      height: null,
      encoding: null,
      template: null,
      siteOptions: [],
      wordToPass: "",
      widgetChartData: "",
      viewWidget: "",
      startDate: new Date().setDate(new Date().getDate() - 7),
      endDate: new Date(),
      blacklisted_tags: null,
      numberOfBlockSites: [],
      numberOfCustomPosts: [],
      inherit_posts_from: null,
      inputValueForCustomPosts: "",
      Postdata: [],
      widgetOption: [],
      watermark: null,
    };
  }

  handleWhereEverNav = (page) => {
    if (page === "editDiv") {
      Util.isRoot() && this.setState({ isIteditable: true });
    } else if (page === "statsDiv") {
      this.setState({ isIteditable: false });
    } else if (page === "viewDiv") {
      window.open(
        `https://www.w4m.rs/api/v1/widget/${this.props.match.params.id}/test`
      );
    } else if (page === "embedDiv") {
      this.setState({ isIteditable: false });
    } else {
      this.setState({ isIteditable: false });
    }
    this.setState({ tabClicked: page, wordToPass: "" });
  };

  componentDidMount() {
    this.props.dispatch(
      GetWidgetsListActionRequest({
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
    this.props.dispatch(
      GetPostsListActionRequest({
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
        custom_only: "true",
      })
    );

    if (!this.props?.location?.data?.createNew) {
      this.props.dispatch(
        GetWidgetDetailsActionRequest({
          id: this.props.match.params.id,
        })
      );
    }
    this.props.dispatch(
      SpecWidgetChartRequest({
        id: this.props.match.params.id,
        from: Math.round(new Date(this.state.startDate).getTime() / 1000),
        to: Math.round(new Date(this.state.endDate).getTime() / 1000),
      })
    );
    this.props.dispatch(
      ViewWidgetActionRequest({ id: this.props.match.params.id })
    );
  }

  componentDidUpdate(prevProps) {
    const {
      getWidgetDetails,
      getCategoryList,
      deleteWidget,
      createWidget,
      updateWidgetDetails,
      getSitesList,
      specWidgetChart,
      viewWidget,
      getPostsList,
      getWidgetsList,
    } = this.props;
    const {
      loading: getWidgetsListLoading,
      error: getWidgetsListError,
      data: getWidgetsListData,
    } = getWidgetsList;
    const {
      loading: getPostsListLoading,
      error: getPostsListError,
      data: getPostsListData,
    } = getPostsList;
    const {
      data: getWidgetDetailsData,
      loading: getWidgetDetailsLoading,
      error: getWidgetDetailsError,
    } = getWidgetDetails;
    const {
      data: getCategoryListData,
      loading: getCategoryListLoading,
      error: getCategoryListError,
    } = getCategoryList;
    const {
      data: deleteWidgetData,
      loading: deleteWidgetLoading,
      error: deleteWidgetError,
    } = deleteWidget;
    const {
      data: createWidgetData,
      loading: createWidgetLoading,
      error: createWidgetError,
      errorData: createWidgetErrorData,
    } = createWidget;
    const {
      data: updateWidgetDetailsData,
      loading: updateWidgetDetailsLoading,
      error: updateWidgetDetailsError,
      errorData: updateWidgetDetailsErrorData,
    } = updateWidgetDetails;
    const {
      data: getSitesListData,
      loading: getSitesListLoading,
      error: getSitesListError,
    } = getSitesList;
    const {
      data: specWidgetChartData,
      loading: specWidgetChartLoading,
      error: specWidgetChartError,
    } = specWidgetChart;
    const {
      data: viewWidgetData,
      loading: viewWidgetLoading,
      error: viewWidgetError,
    } = viewWidget;
    if (
      prevProps.getWidgetsList !== getWidgetsList &&
      !getWidgetsListLoading &&
      !getWidgetsListError &&
      getWidgetsListData
    ) {
      const widgetsOptions = getWidgetsListData.data.map((el) => {
        return { value: el.id, label: el.name ? el.name : "no name" };
      });
      this.setState({
        widgetOption: widgetsOptions,
      });
    }

    if (
      prevProps.getPostsList !== getPostsList &&
      !getPostsListLoading &&
      !getPostsListError &&
      getPostsListData
    ) {
      const postsOptions = getPostsListData.data.map((el) => {
        return { value: el.id, label: el.title ? el.title : "no name" };
      });
      this.setState({
        Postdata: postsOptions,
      });
    }

    if (
      prevProps.viewWidget !== viewWidget &&
      !viewWidgetError &&
      !viewWidgetLoading &&
      viewWidgetData
    ) {
      this.setState({ viewWidget: viewWidgetData.data });
    }

    if (
      prevProps.specWidgetChart !== specWidgetChart &&
      !specWidgetChartError &&
      !specWidgetChartLoading &&
      specWidgetChartData
    ) {
      this.setState({ widgetChartData: specWidgetChartData.data });
    }

    if (
      prevProps.getSitesList !== getSitesList &&
      !getSitesListError &&
      !getSitesListLoading &&
      getSitesListData
    ) {
      const siteOptions = getSitesListData.data.map((el) => {
        return { value: el.id, label: el.name ? el.name : "no name" };
      });
      this.setState({ siteOptions });
    }

    if (
      prevProps.getCategoryList !== getCategoryList &&
      !getCategoryListError &&
      !getCategoryListLoading &&
      getCategoryListData
    ) {
      this.setState({
        categoryList: getCategoryListData.data,
      });
    }

    if (
      prevProps.getWidgetDetails !== getWidgetDetails &&
      !getWidgetDetailsError &&
      !getWidgetDetailsLoading &&
      getWidgetDetailsData
    ) {
      const existCustomPosts = getWidgetDetailsData.data?.forced_posts?.map(
        (el) => {
          return { id: el.id, name: el.title ? el.title : "no title" };
        }
      );
      const whitchIsIt = !getWidgetDetailsData.data?.inherit_posts_from
        ? {}
        : getWidgetDetailsData.data?.inherit_posts_from;
      const inheritedFrom =
        Object.keys(whitchIsIt).length !== 0
          ? {
              value: whitchIsIt.id,
              label: whitchIsIt.name,
            }
          : whitchIsIt;
      this.setState({
        dataState: getWidgetDetails.data.status,
        WidgetDetailsData: getWidgetDetailsData.data,
        name: getWidgetDetailsData.data?.name,
        append: getWidgetDetailsData.data?.append,
        count: getWidgetDetailsData.data?.count,
        encoding: getWidgetDetailsData.data?.encoding,
        width: getWidgetDetailsData.data?.width,
        height: getWidgetDetailsData.data?.height,
        template: getWidgetDetailsData.data?.template,
        description: getWidgetDetailsData.data?.description,
        numberOfBlockSites: getWidgetDetailsData.data?.blacklisted_sites,
        numberOfCustomPosts: existCustomPosts,
        inherit_posts_from: inheritedFrom,
        watermark: getWidgetDetailsData.data?.watermark,
      });
      if (getWidgetDetailsData?.data?.blacklisted_tags?.length !== 0) {
        const tagToshow = getWidgetDetailsData?.data?.blacklisted_tags.map(
          (el) => el
        );
        this.setState({
          // tagToshow.join('\r\n')
          blacklisted_tags: tagToshow.join("\r\n").trim(),
          // .replace(/ /g, "\n"),
        });
      }
    }

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
      this.props.history.push("/widgets");
    }

    if (
      prevProps.createWidget !== createWidget &&
      !createWidgetError &&
      !createWidgetLoading &&
      createWidgetData
    ) {
      NotificationManager.success(
        "Widget successfully created",
        "Success",
        2000
      );
      this.props.history.push("/widgets");
    } else if (
      prevProps.createWidget !== createWidget &&
      createWidgetError &&
      createWidgetErrorData
    ) {
      NotificationManager.error(
        `${createWidgetErrorData.data.message}`,
        "Failed",
        2000
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

  handleChangeTags = (e) => {
    this.setState({ blacklisted_tags: e.target.value });
  };

  handleButtonActive = (page) => {
    if (page === "save") {
      const {
        name,
        site,
        dataState,
        image,
        description,
        categories,
        sites,
        include,
        minima,
        direct,
        append,
        same_window,
        ignore_impressions,
        count,
        width,
        height,
        encoding,
        template,
        publicValue,
        blacklisted_tags,
        numberOfBlockSites,
        numberOfCustomPosts,
        inherit_posts_from,
        watermark,
      } = this.state;
      if (this.props.location.data?.createNew) {
        this.props.dispatch(
          CreateWidgetActionRequest({
            name,
            site: site?.value,
            status: dataState,
            public: publicValue,
            image,
            description,
            categories,
            sites,
            include,
            minima,
            direct,
            append,
            same_window,
            ignore_impressions,
            watermark,
            count,
            width,
            height,
            encoding,
            template,
            blacklisted_tags:
              typeof blacklisted_tags === "string"
                ? blacklisted_tags
                    .replace(/\r\n/g, "\r")
                    .replace(/\n/g, "\r")
                    .replace(/  +/g, " ")
                    .replace(/, /g, "\r")
                    .replace(/,/g, "\r")
                    .trim()
                    .split(/\r/)
                    .filter((el) => el)
                : null,
            blacklisted_sites: numberOfBlockSites,
            forced_posts: numberOfCustomPosts,
            inherit_posts_from,
          })
        );
      } else {
        this.props.dispatch(
          UpdateWidgetDetailsActionRequest({
            id: this.props.match.params.id,
            name,
            site: site?.value,
            status: dataState,
            public: publicValue,
            image,
            description,
            categories,
            sites,
            include,
            minima,
            direct,
            append,
            same_window,
            ignore_impressions,
            watermark,
            count,
            width,
            height,
            encoding,
            template,
            blacklisted_tags:
              typeof blacklisted_tags === "string"
                ? blacklisted_tags
                    .replace(/\r\n/g, "\r")
                    .replace(/\n/g, "\r")
                    .replace(/  +/g, " ")
                    .replace(/, /g, "\r")
                    .replace(/,/g, "\r")
                    .trim()
                    .split(/\r/)
                    .filter((el) => el)
                : null,
            blacklisted_sites: numberOfBlockSites,
            forced_posts: numberOfCustomPosts,
            inherit_posts_from,
          })
        );
      }
    } else if (page === "cancel") {
      this.setState({ isIteditable: false, wordToPass: "canceled" });
    } else {
      this.setState({ whichisit: page });
    }
  };

  handleStatusChange = (status) => {
    this.setState({ dataState: status });
  };

  handleTrashClick = () => {
    this.setState({ confirmMessage: true });
  };

  deleteuserFunction = () => {
    this.props.dispatch(
      DeleteWidgetActionRequest({
        id: this.props.match.params.id,
      })
    );
  };

  handleSite = (value) => {
    this.setState({ site: value });
  };

  handlewidgetInput = (e) => {
    if (e.target.type === "number") {
      this.setState({ [e.target.name]: parseInt(e.target.value) });
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  };

  handlePostDetailsCategorie = (value) => {
    const saveData = value.length !== 0 ? value.map((el) => el.value) : [];
    this.setState({ categories: saveData });
  };

  // handleSearchOnSelect = (e) => {
  //   const value = e.toLowerCase();
  //   this.setState({ inputValueForCustomPosts: value });
  //   if (value.length >= 3) {

  //   }
  // };

  render() {
    const {
      isIteditable,
      dataState,
      site,
      categoryList,
      wordToPass,
      tabClicked,
      WidgetDetailsData,
      publicValue,
      include,
      direct,
      same_window,
      ignore_impressions,
      watermark,
      siteOptions,
      numberOfBlockSites,
      numberOfCustomPosts,
      Postdata,
    } = this.state;

    console.log(this.state);

    const categorialOption = categoryList?.map((el) => {
      return { value: el.id, label: el.name };
    });

    const optionsSelection = numberOfBlockSites.map((el) => {
      return el.id;
    });

    const optionsS = siteOptions.map((el) => {
      if (optionsSelection.includes(el.value)) {
        return { ...el, isdisabled: true };
      } else {
        return el;
      }
    });

    const optionsSelectionCustomPosts = numberOfCustomPosts?.map((el) => {
      return el.id;
    });

    const optionsCustomPosts = Postdata?.map((el) => {
      if (optionsSelectionCustomPosts.includes(el.value)) {
        return { ...el, isdisabled: true };
      } else {
        return el;
      }
    });

    return (
      <div className="mainSiteDetailsDiv">
        <NavWidget
          handleWhereEverNav={this.handleWhereEverNav}
          wordToPass={wordToPass}
          handleTrashClick={this.handleTrashClick}
          isButtonNamepased={this.props?.location?.data?.buttonClicked}
          pageName={"widgets"}
        />
        {this.state.confirmMessage && (
          <div className="confurmText">
            <h4>Are you sure</h4>
            <button onClick={this.deleteuserFunction}>Yes</button>
            <button
              className="nobutton"
              onClick={() => this.setState({ confirmMessage: false })}
            >
              No
            </button>
          </div>
        )}
        {tabClicked === "statsDiv" && (
          <>
            {" "}
            <h2
              style={{ marginBottom: "20px" }}
            >{`Chart for widget ${WidgetDetailsData?.name}`}</h2>
            <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
              <h4>Select date range</h4>
              <div
                style={{ display: "flex", gap: "10px" }}
                className="datePickerDiv"
              >
                <DatePicker
                  dateFormat="dd/MM/yyyy"
                  selected={this.state.startDate}
                  onChange={(date) => {
                    this.setState({ startDate: date });
                    setTimeout(() => {
                      this.props.dispatch(
                        SpecWidgetChartRequest({
                          id: this.props.match.params.id,
                          from: Math.round(
                            new Date(this.state.startDate).getTime() / 1000
                          ),
                          to: Math.round(
                            new Date(this.state.endDate).getTime() / 1000
                          ),
                        })
                      );
                    });
                  }}
                  selectsStart
                  startDate={this.state.startDate}
                  endDate={this.state.endDate}
                />
                <DatePicker
                  dateFormat="dd/MM/yyyy"
                  selected={this.state.endDate}
                  onChange={(date) => {
                    this.setState({ endDate: date });
                    setTimeout(() => {
                      this.props.dispatch(
                        SpecWidgetChartRequest({
                          id: this.props.match.params.id,
                          from: Math.round(
                            new Date(this.state.startDate).getTime() / 1000
                          ),
                          to: Math.round(
                            new Date(this.state.endDate).getTime() / 1000
                          ),
                        })
                      );
                    });
                  }}
                  selectsEnd
                  startDate={this.state.startDate}
                  endDate={this.state.endDate}
                  minDate={this.state.startDate}
                />
              </div>
            </div>
            <div>
              <table style={{ marginTop: "20px" }}>
                <thead>
                  <tr style={{ height: "40px" }}>
                    <th style={{ width: "100px" }}>Date</th>
                    <th style={{ width: "100px" }}>Impressions</th>
                    <th style={{ width: "100px" }}>Clicks</th>
                    <th style={{ width: "100px" }}>Ctr (%)</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.widgetChartData.length !== 0 &&
                    this.state.widgetChartData?.map((el) => (
                      <tr style={{ height: "40px" }}>
                        <td
                          style={{
                            borderTop: "1px solid black",
                            textAlign: "center",
                          }}
                        >
                          {el.name}
                        </td>
                        <td
                          style={{
                            borderTop: "1px solid black",
                            textAlign: "center",
                          }}
                        >
                          {el.impressions.toLocaleString()}
                        </td>
                        <td
                          style={{
                            borderTop: "1px solid black",
                            textAlign: "center",
                          }}
                        >
                          {el.clicks.toLocaleString()}
                        </td>
                        <td
                          style={{
                            borderTop: "1px solid black",
                            textAlign: "center",
                          }}
                        >
                          {el.ctr.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                </tbody>
                <tfoot>
                  <tr style={{ height: "40px" }}>
                    <td
                      style={{
                        borderTop: "1px solid black",
                        textAlign: "center",
                        fontWeight: "bold",
                      }}
                    >
                      Total
                    </td>
                    <td
                      style={{
                        borderTop: "1px solid black",
                        textAlign: "center",
                        fontWeight: "bold",
                      }}
                    >
                      {this.state.widgetChartData.length !== 0 &&
                        this.state.widgetChartData
                          ?.reduce((a, b) => +a + +b.impressions, 0)
                          .toLocaleString()}
                    </td>
                    <td
                      style={{
                        borderTop: "1px solid black",
                        textAlign: "center",
                        fontWeight: "bold",
                      }}
                    >
                      {this.state.widgetChartData.length !== 0 &&
                        this.state.widgetChartData
                          ?.reduce((a, b) => +a + +b.clicks, 0)
                          .toLocaleString()}
                    </td>
                    <td
                      style={{
                        borderTop: "1px solid black",
                        textAlign: "center",
                        fontWeight: "bold",
                      }}
                    >
                      {this.state.widgetChartData.length !== 0 &&
                      !isNaN(
                        (this.state.widgetChartData?.reduce(
                          (a, b) => +a + +b.clicks,
                          0
                        ) /
                          this.state.widgetChartData?.reduce(
                            (a, b) => +a + +b.impressions,
                            0
                          )) *
                          100
                      )
                        ? (
                            (this.state.widgetChartData?.reduce(
                              (a, b) => +a + +b.clicks,
                              0
                            ) /
                              this.state.widgetChartData?.reduce(
                                (a, b) => +a + +b.impressions,
                                0
                              )) *
                            100
                          ).toLocaleString()
                        : 0}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
            <div style={{ height: "500px", marginTop: "20px" }}>
              <Chart
                dataToShow={this.state.widgetChartData}
                fields={{ 0: "clicks", 1: "ctr", 2: "impressions" }}
                customStyle={{ padding: "0" }}
              />
            </div>
            {/* <h1
              style={{
                marginTop: "50px",
                textAlign: "center",
                fontSize: "30px",
              }}
            >
              Daily totals for post
            </h1> */}
            {/* <div style={{ height: `200px` }}>
              <VerticalChart customData={data} customStyle={{ padding: "0" }} />
            </div> */}
          </>
        )}
        {tabClicked !== "statsDiv" && tabClicked !== "viewDiv" && (
          <h2 style={{ marginBottom: "20px" }}>{`Details for widget ${
            WidgetDetailsData?.name ? WidgetDetailsData?.name : ""
          }`}</h2>
        )}
        {tabClicked !== "statsDiv" &&
          tabClicked !== "embedDiv" &&
          tabClicked !== "viewDiv" && (
            <div className="mainSiteInfoDiv">
              <div className="leftSideDiv">
                <div className="generalDiv">
                  <h1>General</h1>
                  <div className="status_div">
                    <h4>Status</h4>
                    {!isIteditable && (
                      <div
                        className="coloredDivStatus"
                        style={{
                          background:
                            WidgetDetailsData?.status === 1
                              ? "#ABD996"
                              : WidgetDetailsData?.status === 0
                              ? "#DFE094"
                              : WidgetDetailsData?.status === 2
                              ? "#E09494"
                              : WidgetDetailsData?.status === 2
                              ? "#295265"
                              : "",
                        }}
                      >
                        {WidgetDetailsData?.status === 1
                          ? "PUBLISHED"
                          : WidgetDetailsData?.status === 0
                          ? "DRAFT"
                          : WidgetDetailsData?.status === 2
                          ? "ERROR"
                          : WidgetDetailsData?.status === 3
                          ? "TRASH"
                          : ""}
                      </div>
                    )}
                    {isIteditable && (
                      <div className="mainOptionDiv">
                        {options.map((item, key) => {
                          return (
                            <div
                              key={key}
                              onClick={() => this.handleStatusChange(item)}
                              className="coloredDivStatus"
                              style={{
                                height: item === dataState && "47px",
                                background:
                                  item === 1
                                    ? "#ABD996"
                                    : item === 0
                                    ? "#DFE094"
                                    : item === 2
                                    ? "#E09494"
                                    : item === 3
                                    ? "#295265"
                                    : "",
                              }}
                            >
                              {item === 1
                                ? "PUBLISHED"
                                : item === 0
                                ? "DRAFT"
                                : item === 2
                                ? "ERROR"
                                : item === 3
                                ? "TRASH"
                                : ""}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                  <div className="name_div">
                    <h4>Name</h4>
                    {!isIteditable && <p>{WidgetDetailsData?.name}</p>}
                    {isIteditable && (
                      <input
                        type="text"
                        name="name"
                        value={this.state.name}
                        onChange={(e) => this.handlewidgetInput(e)}
                      />
                    )}
                  </div>
                  {/* <div className="url_div">
                    <h4>Public</h4>
                    {!isIteditable && (
                      <p>
                        {WidgetDetailsData && `${WidgetDetailsData["public"]}`}
                      </p>
                    )}
                    {isIteditable && (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <input
                          style={{ width: "20px" }}
                          type="checkbox"
                          name="check"
                          value={
                            publicValue !== null
                              ? publicValue
                              : WidgetDetailsData["public"]
                          }
                          checked={
                            publicValue !== null
                              ? publicValue
                              : WidgetDetailsData["public"]
                          }
                          onChange={(e) =>
                            this.setState({ publicValue: e.target.checked })
                          }
                        />
                      </div>
                    )}
                  </div> */}
                  <h1 style={{ margin: "20px 0" }}>Default content</h1>

                  {/* <div className="owner_div">
                    <h4>Include site</h4>
                    {!isIteditable && <p>{`${WidgetDetailsData?.include}`}</p>}
                    {isIteditable && (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <input
                          style={{ width: "20px" }}
                          type="checkbox"
                          name="check"
                          value={
                            include !== null
                              ? include
                              : WidgetDetailsData?.include
                          }
                          checked={
                            include !== null
                              ? include
                              : WidgetDetailsData?.include
                          }
                          onChange={(e) =>
                            this.setState({ include: e.target.checked })
                          }
                        />
                      </div>
                    )}
                  </div> */}
                  {/* <div className="owner_div">
                    <h4>Link direct</h4>
                    {!isIteditable && <p>{`${WidgetDetailsData?.direct}`}</p>}
                    {isIteditable && (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <input
                          style={{ width: "20px" }}
                          type="checkbox"
                          name="check"
                          value={
                            direct !== null ? direct : WidgetDetailsData?.direct
                          }
                          checked={
                            direct !== null ? direct : WidgetDetailsData?.direct
                          }
                          onChange={(e) =>
                            this.setState({ direct: e.target.checked })
                          }
                        />
                      </div>
                    )}
                  </div> */}
                  {/* <div className="description_div">
                    <h4>Open site posts in the same window</h4>
                    {!isIteditable && (
                      <p
                        style={{ marginLeft: "20px" }}
                      >{`${WidgetDetailsData?.same_window}`}</p>
                    )}
                    {isIteditable && (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <input
                          style={{ width: "20px" }}
                          type="checkbox"
                          name="check"
                          value={
                            same_window !== null
                              ? same_window
                              : WidgetDetailsData?.same_window
                          }
                          checked={
                            same_window !== null
                              ? same_window
                              : WidgetDetailsData?.same_window
                          }
                          onChange={(e) =>
                            this.setState({ same_window: e.target.checked })
                          }
                        />
                      </div>
                    )}
                  </div> */}
                  <div className="description_div">
                    <h4>Append to links</h4>
                    {!isIteditable && <p>{WidgetDetailsData?.append}</p>}
                    {isIteditable && (
                      <input
                        type="text"
                        name="append"
                        value={this.state.append}
                        onChange={(e) => this.handlewidgetInput(e)}
                      />
                    )}
                  </div>
                  <h1 style={{ margin: "20px 0" }}>Order</h1>
                  <div className="head_div">
                    <h4>Do not register impressions</h4>
                    {!isIteditable && (
                      <p
                        style={{ marginLeft: "20px" }}
                      >{`${WidgetDetailsData?.ignore_impressions}`}</p>
                    )}
                    {isIteditable && (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <input
                          style={{ width: "20px" }}
                          type="checkbox"
                          name="check"
                          value={
                            ignore_impressions !== null
                              ? ignore_impressions
                              : WidgetDetailsData?.ignore_impressions
                          }
                          checked={
                            ignore_impressions !== null
                              ? ignore_impressions
                              : WidgetDetailsData?.ignore_impressions
                          }
                          onChange={(e) =>
                            this.setState({
                              ignore_impressions: e.target.checked,
                            })
                          }
                        />
                      </div>
                    )}
                  </div>
                  <div className="head_div">
                    <h4>Watermark</h4>
                    {!isIteditable && (
                      <p>{`${WidgetDetailsData?.watermark}`}</p>
                    )}
                    {isIteditable && (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <input
                          style={{ width: "20px" }}
                          type="checkbox"
                          name="check"
                          value={
                            watermark !== null
                              ? watermark
                              : WidgetDetailsData?.watermark
                          }
                          checked={
                            watermark !== null
                              ? watermark
                              : WidgetDetailsData?.watermark
                          }
                          onChange={(e) =>
                            this.setState({
                              watermark: e.target.checked,
                            })
                          }
                        />
                      </div>
                    )}
                  </div>
                  <h1 style={{ margin: "20px 0" }}>Template data</h1>
                  <div className="description_div">
                    <h4>Count</h4>
                    {!isIteditable && <p>{WidgetDetailsData?.count}</p>}
                    {isIteditable && (
                      <input
                        type="number"
                        name="count"
                        value={this.state.count}
                        onChange={(e) => this.handlewidgetInput(e)}
                      />
                    )}
                  </div>
                  <div className="description_div">
                    <h4>Encoding</h4>
                    {!isIteditable && <p>{WidgetDetailsData?.encoding}</p>}
                    {isIteditable && (
                      <input
                        type="text"
                        name="encoding"
                        value={this.state.encoding}
                        onChange={(e) => this.handlewidgetInput(e)}
                      />
                    )}
                  </div>
                  <div className="description_div">
                    <h4>Image width</h4>
                    {!isIteditable && <p>{WidgetDetailsData?.width}</p>}
                    {isIteditable && (
                      <input
                        type="number"
                        name="width"
                        value={this.state.width}
                        onChange={(e) => this.handlewidgetInput(e)}
                      />
                    )}
                  </div>
                  <div className="description_div">
                    <h4>Image height</h4>
                    {!isIteditable && <p>{WidgetDetailsData?.height}</p>}
                    {isIteditable && (
                      <input
                        type="number"
                        name="height"
                        value={this.state.height}
                        onChange={(e) => this.handlewidgetInput(e)}
                      />
                    )}
                  </div>
                  {Util.isRoot() && (
                    <div className="description_div">
                      <h4>Template</h4>
                      {!isIteditable && <p>{WidgetDetailsData?.template}</p>}
                      {isIteditable && (
                        <textarea
                          defaultValue={this.state.template}
                          style={{
                            flex: "1",
                            padding: "10px",
                            background: "#d6dbdc",
                            marginRight: "20px",
                            border: "none",
                            borderRadius: "5px",
                          }}
                          type="text"
                          name="template"
                          onChange={(e) => this.handlewidgetInput(e)}
                        />
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div className="rightSideDiv">
                <div className="categoriesDiv">
                  <h1>Details</h1>

                  {/* <div className="categ_div">
                    <h4>Categories</h4>
                    {!isIteditable && (
                      <div className="listOfCateg">
                        <p>
                          {WidgetDetailsData?.categories?.map(
                            (el) => `${el.name} `
                          )}
                        </p>
                      </div>
                    )}
                    {isIteditable && WidgetDetailsData && (
                      <Select
                        className="basic-single"
                        classNamePrefix="select"
                        defaultValue={WidgetDetailsData?.categories?.map(
                          (el) => {
                            return { value: el.id, label: el.name };
                          }
                        )}
                        // defaultValue={colourOptions[0]}
                        onChange={this.handlePostDetailsCategorie}
                        // isLoading={true}
                        isMulti
                        styles={customSelectStyles}
                        // isClearable={true}
                        isSearchable={true}
                        name="merge"
                        options={categorialOption}
                      />
                    )}
                  </div> */}

                  <div className="categ_div selectable">
                    <h4 style={{ width: "100px" }}>Site</h4>
                    {!isIteditable && (
                      <p>
                        {site
                          ? siteOptions.map((el) =>
                              el.value === site ? el.label : ""
                            )
                          : WidgetDetailsData?.site?.name}
                      </p>
                    )}
                    {/* {isIteditable && <select style={{ flex: '1', marginRight: '20px', border: 'none', background: '#d6dbdc', textIndent: '10px', borderRadius: '5px' }}>
                                    <option className='options' value="test">test</option>
                                    <option className='options' value="test">test</option>
                                </select>} */}
                    {isIteditable && (
                      <Select
                        className="basic-single"
                        classNamePrefix="select"
                        // defaultValue={colourOptions[0]}
                        // isLoading={true}
                        onChange={this.handleSite}
                        placeholder={
                          site
                            ? siteOptions.map((el) =>
                                el.value === site ? el.label : ""
                              )
                            : WidgetDetailsData?.site?.name
                        }
                        styles={customSelectStyles}
                        isClearable={true}
                        isSearchable={true}
                        name="merge"
                        options={this.state.siteOptions}
                      />
                    )}
                  </div>
                  <div className="categ_div">
                    <h4>Owner</h4>
                    <Link to={`/users/${WidgetDetailsData?.owner?.id}`}>
                      {WidgetDetailsData?.owner?.email}
                    </Link>
                    {/* {isIteditable && <input type="text" placeholder='nina.aralica@alo.rs' />} */}
                  </div>
                  {/* <div className="categ_div">
                    <h4>Description</h4>
                    {!isIteditable && <p>{WidgetDetailsData?.description}</p>}
                    {isIteditable && (
                      <input
                        type="text"
                        name="description"
                        value={this.state.description}
                        onChange={(e) => this.handlewidgetInput(e)}
                      />
                    )}
                  </div> */}
                </div>
                <h1>Tags</h1>
                <div className="blacklisted_tags_div">
                  <h4>Blacklisted tags</h4>
                  {!isIteditable && (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                      }}
                    >
                      {WidgetDetailsData?.blacklisted_tags?.map((el) => (
                        <p
                          style={{
                            marginBottom: "5px",
                            justifySelf: "center",
                          }}
                        >
                          {el}
                        </p>
                      ))}
                    </div>
                  )}
                  {isIteditable && (
                    <textarea
                      name="blacklisted_tags"
                      value={
                        this.state.blacklisted_tags !== null
                          ? this.state.blacklisted_tags
                          : ""
                      }
                      onChange={(e) => this.handleChangeTags(e)}
                      // placeholder={siteDetailsData?.feeds?.map(
                      //   (el) => `${el.url} `
                      // )}
                    />
                  )}
                </div>
                <h1>Block list</h1>
                {this.state.numberOfBlockSites.length !== 0 &&
                  this.state.numberOfBlockSites.map((el, index) => (
                    <div
                      className="interval_div"
                      style={{ gap: isIteditable && "10px" }}
                      key={index}
                    >
                      {!isIteditable && <h4>{el.name}</h4>}
                      {isIteditable && (
                        <div style={{ flex: 1 }}>
                          <Select
                            value={{
                              label: `${el.name}`,
                            }}
                            className="basic"
                            classNamePrefix="select"
                            // placeholder={siteDetailsData?.translations.feed?.map(elm => elm.feed.id === el.id ? elm.category.name : '')}
                            styles={{
                              control: (base, state) => ({
                                ...base,
                                flex: 1,
                                fontWeight: "500",
                                background: "#d6dbdc",
                              }),
                              placeholder: () => ({
                                color: "black",
                              }),
                            }}
                            isSearchable={true}
                            name={`feed${el.id}`}
                            options={optionsS}
                            onChange={(e) => {
                              const newlist = [
                                ...this.state.numberOfBlockSites,
                              ];
                              if (newlist[index]["id"] === el.id) {
                                newlist[index]["id"] = e.value;
                                newlist[index]["name"] = e.label;
                                setTimeout(() => {
                                  this.setState({
                                    numberOfBlockSites: newlist,
                                  });
                                });
                              }
                            }}
                            isClearable={false}
                            isOptionDisabled={(option) => option.isdisabled}
                          />
                        </div>
                      )}
                      {/* {!isIteditable && <p>{el.ratio}</p>} */}
                      {/* {isIteditable && (
                        <input
                          type="number"
                          min="0"
                          style={{ flex: 1, margin: 0 }}
                          onChange={(e) => {
                            if (
                              (!isNaN(e.target.value) &&
                                parseInt(e.target.value) >= 0) ||
                              e.target.value === ""
                            ) {
                              const newlist = [
                                ...this.state.numberOfBlockSites,
                              ];
                              if (newlist[index]["id"] === el.id) {
                                newlist[index]["ratio"] = parseInt(
                                  e.target.value
                                );
                                setTimeout(() => {
                                  this.setState({
                                    numberOfBlockSites: newlist,
                                  });
                                });
                              }
                            }
                          }}
                          name="ratio"
                          value={el.ratio}
                        />
                      )} */}
                      {isIteditable && (
                        <p
                          className="deleteRatioRow"
                          onClick={() => {
                            const newlist = [...this.state.numberOfBlockSites];
                            if (newlist[index]["id"] === el.id) {
                              const newone = newlist.filter(
                                (elm) => elm.id !== el.id
                              );
                              setTimeout(() => {
                                this.setState({ numberOfBlockSites: newone });
                              });
                            }
                          }}
                        >
                          X
                        </p>
                      )}
                    </div>
                  ))}
                {isIteditable && (
                  <div className="interval_div">
                    <button
                      onClick={() => {
                        const newlist = [
                          ...this.state.numberOfBlockSites,
                          { id: "", name: "" },
                        ];
                        setTimeout(() => {
                          this.setState({ numberOfBlockSites: newlist });
                        });
                      }}
                      className="addingButton"
                    >
                      Add site
                    </button>
                  </div>
                )}
                {Util.isRoot() && <h1>Forced posts</h1>}
                {Util.isRoot() && (
                  <div
                    className="interval_div"
                    style={{ gap: isIteditable && "10px" }}
                  >
                    {Util.isRoot() && (
                      <h4 style={{ minWidth: "120px" }}>Inherit from</h4>
                    )}
                    {!isIteditable && Util.isRoot() && (
                      <h4>{this.state.inherit_posts_from?.label}</h4>
                    )}
                    {isIteditable && Util.isRoot() && (
                      <div style={{ flex: 1 }}>
                        <Select
                          placeholder={"Select widget..."}
                          value={
                            this.state.inherit_posts_from &&
                            Object.keys(this.state.inherit_posts_from)
                              .length !== 0
                              ? {
                                  label: `${this.state.inherit_posts_from.label}`,
                                }
                              : ""
                          }
                          className="basic"
                          classNamePrefix="select"
                          styles={{
                            control: (base, state) => ({
                              ...base,
                              flex: 1,
                              fontWeight: "500",
                              background: "#d6dbdc",
                            }),
                            placeholder: () => ({
                              color: "black",
                            }),
                          }}
                          isSearchable={true}
                          name={`feed${this.state.inherit_posts_from?.value}`}
                          options={this.state.widgetOption}
                          onChange={(e) => {
                            this.setState({ inherit_posts_from: e });
                          }}
                          isClearable={false}
                        />
                      </div>
                    )}
                    {isIteditable && (
                      <p
                        className="deleteRatioRow"
                        onClick={() => {
                          this.setState({
                            inherit_posts_from: {},
                          });
                        }}
                      >
                        X
                      </p>
                    )}
                  </div>
                )}
                {this.state.numberOfCustomPosts?.length !== 0 &&
                  Util.isRoot() &&
                  this.state.numberOfCustomPosts?.map((el, index) => (
                    <div
                      className="interval_div"
                      style={{ gap: isIteditable && "10px" }}
                      key={index}
                    >
                      {!isIteditable && <h4>{el.name}</h4>}
                      {isIteditable && (
                        <div style={{ flex: 1 }}>
                          <Select
                            placeholder={"Select custom post..."}
                            value={
                              el.name
                                ? {
                                    label: `${el.name}`,
                                  }
                                : ""
                            }
                            className="basic"
                            classNamePrefix="select"
                            styles={{
                              control: (base, state) => ({
                                ...base,
                                flex: 1,
                                fontWeight: "500",
                                background: "#d6dbdc",
                              }),
                              placeholder: () => ({
                                color: "black",
                              }),
                            }}
                            isSearchable={true}
                            name={`feed${el.id}`}
                            options={
                              // this.state.inputValueForCustomPosts.length >= 3
                              // ?
                              optionsCustomPosts
                              // : []
                            }
                            // onInputChange={(e) => {
                            //   this.handleSearchOnSelect(e);
                            // }}
                            onChange={(e) => {
                              const newlist = [
                                ...this.state.numberOfCustomPosts,
                              ];
                              if (newlist[index]["id"] === el.id) {
                                newlist[index]["id"] = e.value;
                                newlist[index]["name"] = e.label;
                                setTimeout(() => {
                                  this.setState({
                                    numberOfCustomPosts: newlist,
                                  });
                                });
                              }
                            }}
                            isClearable={false}
                            isOptionDisabled={(option) => option.isdisabled}
                          />
                        </div>
                      )}

                      {isIteditable && (
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            padding: "5px 0",
                            justifyContent: "space-between",
                          }}
                        >
                          <img
                            src={arrowUp}
                            onClick={() => {
                              const arr = this.state.numberOfCustomPosts;
                              const tem = arr[index];
                              if (index !== 0) {
                                arr[index] = arr[index - 1];
                                arr[index - 1] = tem;
                                this.setState({ numberOfCustomPosts: arr });
                              }
                            }}
                            alt="arrow"
                          />
                          <img
                            src={secondarrowDown}
                            onClick={() => {
                              const arr = this.state.numberOfCustomPosts;
                              const tem = arr[index];
                              if (index !== arr.length - 1) {
                                arr[index] = arr[index + 1];
                                arr[index + 1] = tem;
                                this.setState({ numberOfCustomPosts: arr });
                              }
                            }}
                            alt="arrow"
                          />
                        </div>
                      )}

                      {isIteditable && (
                        <p
                          className="deleteRatioRow"
                          onClick={() => {
                            const newlist = [...this.state.numberOfCustomPosts];
                            if (newlist[index]["id"] === el.id) {
                              const newone = newlist.filter(
                                (elm) => elm.id !== el.id
                              );
                              setTimeout(() => {
                                this.setState({ numberOfCustomPosts: newone });
                              });
                            }
                          }}
                        >
                          X
                        </p>
                      )}
                    </div>
                  ))}
                {isIteditable && Util.isRoot() && (
                  <div className="interval_div">
                    <button
                      onClick={() => {
                        const newlist = [
                          ...this.state.numberOfCustomPosts,
                          { id: "", name: "" },
                        ];
                        setTimeout(() => {
                          this.setState({ numberOfCustomPosts: newlist });
                        });
                      }}
                      className="addingButton"
                    >
                      Add post
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

        {isIteditable && tabClicked !== "viewDiv" && (
          <div className="buttonsDiv">
            <SaveButtonEdit
              labeltext={"Save changes"}
              handleButtonActive={() => this.handleButtonActive("save")}
              colorization={"ScrapeClass"}
              customStyle={{
                fontWeight: "bold",
                height: "58px",
                width: "260px",
              }}
            />
            <SaveButtonEdit
              labeltext={"Cancel"}
              handleButtonActive={() => this.handleButtonActive("cancel")}
              colorization={`ScrapeClass clicked`}
              customStyle={{
                fontWeight: "bold",
                height: "58px",
                width: "184px",
              }}
            />
          </div>
        )}

        {this.state.tabClicked === "embedDiv" && (
          <div>
            {/* Sync:
            <textarea
              className={"widget-embed-scripts"}
              value={`<script src="https://ayu.luciascipher.com/api/v1/embed/${WidgetDetailsData?.id}.js"></script>`}
              disabled={true}
            /> */}
            Async Div:
            <textarea
              className={"widget-embed-scripts"}
              value={`<div data-ayu-widget="${WidgetDetailsData?.id}"></div>`}
              disabled={true}
            />
            Async Js.
            <textarea
              className={"widget-embed-scripts"}
              value={`<script src="https://www.w4m.rs/api/v1/embed/tracker.js" async></script>`}
              disabled={true}
            />
          </div>
        )}

        {/* {this.state.tabClicked === "viewDiv" && (
          <ViewWidgets data={this.state.viewWidget} />
        )} */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    WidgetReducer,
    SitesListReducer,
    CategoryReducer,
    ChartRreducer,
    PostsReducer,
  } = state;
  const {
    getWidgetDetails,
    deleteWidget,
    createWidget,
    updateWidgetDetails,
    viewWidget,
    getWidgetsList,
  } = WidgetReducer;
  const { getCategoryList } = CategoryReducer;
  const { getSitesList, getSiteDetails } = SitesListReducer;
  const { specWidgetChart } = ChartRreducer;
  const { getPostsList } = PostsReducer;

  return {
    getPostsList,
    getWidgetDetails,
    getSitesList,
    getSiteDetails,
    getCategoryList,
    deleteWidget,
    createWidget,
    updateWidgetDetails,
    specWidgetChart,
    viewWidget,
    getWidgetsList,
  };
};

export default connect(mapStateToProps, null)(WidgetsDetails);
