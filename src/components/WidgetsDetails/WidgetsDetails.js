import React, { Component } from "react";
import { Link } from "react-router-dom";
import NavWidget from "../../containers/NavWidget/NavWidget";
// import xButton from '../../assets/img/SiteDetails/xButton.svg'
import { connect } from "react-redux";
import "../SiteDetails/SiteDetails.scss";
import SaveButtonEdit from "../../containers/Buttons/SaveButtonEdit";
import Chart from "../../containers/Chart/Chart";
import VerticalChart from "../../containers/Chart/VerticalChart";
import Select from "react-select";
import {
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
    };
  }

  handleWhereEverNav = (page) => {
    if (page === "editDiv") {
      this.setState({ isIteditable: true });
    } else if (page === "statsDiv") {
      this.setState({ isIteditable: false });
    } else if (page === "viewDiv") {
      window.open(
        `https://connectmedia.rs/api/v1/widget/${this.props.match.params.id}/test`
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
    } = this.props;
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
      });
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
            count,
            width,
            height,
            encoding,
            template,
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
            count,
            width,
            height,
            encoding,
            template,
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
      siteOptions,
    } = this.state;

    const categorialOption = categoryList?.map((el) => {
      return { value: el.id, label: el.name };
    });

    console.log(site);
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
              <div style={{ display: "flex", gap: "10px" }}>
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
                    <th style={{ width: "100px" }}>Clicks</th>
                    <th style={{ width: "100px" }}>Ctr</th>
                    <th style={{ width: "100px" }}>Impressions</th>
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
                        <td
                          style={{
                            borderTop: "1px solid black",
                            textAlign: "center",
                          }}
                        >
                          {el.impressions.toLocaleString()}
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
                      }}
                    >
                      Total
                    </td>
                    <td
                      style={{
                        borderTop: "1px solid black",
                        textAlign: "center",
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
                    <td
                      style={{
                        borderTop: "1px solid black",
                        textAlign: "center",
                      }}
                    >
                      {this.state.widgetChartData.length !== 0 &&
                        this.state.widgetChartData
                          ?.reduce((a, b) => +a + +b.impressions, 0)
                          .toLocaleString()}
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
          <h2
            style={{ marginBottom: "20px" }}
          >{`Details for widget ${WidgetDetailsData?.name}`}</h2>
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
                </div>
              </div>
              <div className="rightSideDiv">
                <div className="categoriesDiv">
                  <h1>Categories</h1>

                  <div className="categ_div">
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
                  </div>

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
              value={`<script src="https://connectmedia.rs/api/v1/embed/tracker.js" async></script>`}
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
  const { WidgetReducer, SitesListReducer, CategoryReducer, ChartRreducer } =
    state;
  const {
    getWidgetDetails,
    deleteWidget,
    createWidget,
    updateWidgetDetails,
    viewWidget,
  } = WidgetReducer;
  const { getCategoryList } = CategoryReducer;
  const { getSitesList, getSiteDetails } = SitesListReducer;
  const { specWidgetChart } = ChartRreducer;
  return {
    getWidgetDetails,
    getSitesList,
    getSiteDetails,
    getCategoryList,
    deleteWidget,
    createWidget,
    updateWidgetDetails,
    specWidgetChart,
    viewWidget,
  };
};

export default connect(mapStateToProps, null)(WidgetsDetails);
