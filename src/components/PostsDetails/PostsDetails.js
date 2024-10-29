import React, { Component } from "react";
import { Link } from "react-router-dom";
import NavWidget from "../../containers/NavWidget/NavWidget";
// import arrowUp from '../../assets/img/TableIcons/arrow(1).svg'
import { connect } from "react-redux";
// import xButton from '../../assets/img/SiteDetails/xButton.svg'
import "../SiteDetails/SiteDetails.scss";
import SaveButtonEdit from "../../containers/Buttons/SaveButtonEdit";
import Chart from "../../containers/Chart/Chart";
import VerticalChart from "../../containers/Chart/VerticalChart";
import Select from "react-select";
import {
  GetPostDetailsActionRequest,
  GetPostDetailsStatsPromoActionRequest,
  CreatePostActionRequest,
  UpdatePostDetailsActionRequest,
  DeletePostActionRequest,
} from "../../store/actions/PostActions";
import {
  GetSiteDetailsActionRequest,
  GetSitesListActionRequest,
} from "../../store/actions/SitesListAction";
import { SpecPostChartRequest } from "../../store/actions/ChartAction";
import { NotificationManager } from "react-notifications";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Util from "../../containers/util";

import moment from "moment";

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

export class PostsDetails extends Component {
  constructor(prosp) {
    super(prosp);
    this.state = {
      isIteditable: false,
      whichisit: "",
      dataState: null,
      confirmMessage: false,
      siteDetailsData: "",
      dataTest: "PUBLISHED",
      siteOptions: [],
      postDetailsData: "",
      file: null,
      imageFile: null,
      tabClicked: "",
      name: null,
      url: null,
      description: null,
      author: null,
      content: null,
      date: null,
      site: null,
      categories: null,
      wordToPass: "",
      postChartData: "",
      priority_lifetime: null,
      priority: null,
      is_custom: null,
      first_position: null,
      startDate: new Date().setDate(new Date().getDate() - 7),
      endDate: new Date(),
      lifetime: null,
      postDetailsDataStatsPromo: [],
      numberOfBlockSites: [],
    };
  }

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
    if (this.props?.location?.data?.urlpost) {
      this.setState({
        url: this.props.location.data?.urlpost,
        site: this.props.location.data?.site.id,
      });
      this.props.dispatch(
        GetSiteDetailsActionRequest({
          id: this.props.location.data?.site.id,
        })
      );
    } else {
      this.props.dispatch(
        GetPostDetailsActionRequest({
          id: this.props.match.params.id,
        })
      );
    }

    this.props.dispatch(
      SpecPostChartRequest({
        id: this.props.match.params.id,
        from: Math.round(new Date(this.state.startDate).getTime() / 1000),
        to: Math.round(new Date(this.state.endDate).getTime() / 1000),
      })
    );
  }

  componentDidUpdate(prevProps) {
    const {
      getPostDetails,
      getSiteDetails,
      deletePost,
      createPost,
      updatePostDetails,
      getSitesList,
      specPostChart,
      getPostDetailsStatsPromo,
    } = this.props;
    const {
      data: getPostDetailsData,
      loading: getPostDetailsLoading,
      error: getPostDetailsError,
    } = getPostDetails;
    const {
      data: getSiteDetailsData,
      loading: getSiteDetailsLoading,
      error: getSiteDetailsError,
    } = getSiteDetails;
    const {
      data: getPostDetailsStatsPromoData,
      loading: getPostDetailsStatsPromoLoading,
      error: getPostDetailsStatsPromoError,
    } = getPostDetailsStatsPromo;
    const {
      data: deletePostData,
      loading: deletePostLoading,
      error: deletePostError,
    } = deletePost;
    const {
      data: createPostData,
      loading: createPostLoading,
      error: createPostError,
      errorData: createPostErrorData,
    } = createPost;
    const {
      data: updatePostDetailsData,
      loading: updatePostDetailsLoading,
      error: updatePostDetailsError,
      errorData: updatePostDetailsErrorData,
    } = updatePostDetails;
    const {
      data: getSitesListData,
      loading: getSitesListLoading,
      error: getSitesListError,
    } = getSitesList;

    const {
      data: specPostChartData,
      loading: specPostChartLoading,
      error: specPostChartError,
    } = specPostChart;

    if (
      prevProps.specPostChart !== specPostChart &&
      !specPostChartError &&
      !specPostChartLoading &&
      specPostChartData
    ) {
      this.setState({ postChartData: specPostChartData.data });
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
      if (this.props?.location?.data?.urlpost) {
        console.log(this.props);
      } else {
        this.props.dispatch(
          GetPostDetailsActionRequest({
            id: this.props.match.params.id,
          })
        );
      }
    }

    if (
      prevProps.getSiteDetails !== getSiteDetails &&
      !getSiteDetailsError &&
      !getSiteDetailsLoading &&
      getSiteDetailsData
    ) {
      this.setState({
        // dataState: getSiteDetails.data.state,
        siteDetailsData: getSiteDetailsData.data,
      });
    }

    if (
      prevProps.getPostDetailsStatsPromo !== getPostDetailsStatsPromo &&
      !getPostDetailsStatsPromoError &&
      !getPostDetailsStatsPromoLoading &&
      getPostDetailsStatsPromoData
    ) {
      this.setState({
        // dataState: getPostDetailsStatsPromo.data.state,
        postDetailsDataStatsPromo: getPostDetailsStatsPromoData.data,
      });
    }

    if (
      prevProps.getPostDetails !== getPostDetails &&
      !getPostDetailsError &&
      !getPostDetailsLoading &&
      getPostDetailsData
    ) {
      this.props.dispatch(
        GetSiteDetailsActionRequest({
          id: getPostDetailsData.data.site.id,
        })
      );
      const arrayForExluded =
        getPostDetailsData.data?.exclude_on?.length !== 0 &&
        this.state.siteOptions?.length !== 0
          ? getPostDetailsData.data?.exclude_on?.map((el) => {
              return {
                id: this.state.siteOptions.find((option) => option.value === el)
                  ?.value,
                name: this.state.siteOptions.find(
                  (option) => option.value === el
                )?.lebel,
              };
            })
          : [];
      console.log(getPostDetails);
      this.setState({
        dataState: getPostDetails.data.state,
        postDetailsData: getPostDetailsData.data,
        name: getPostDetailsData.data?.title,
        url: getPostDetailsData.data["link"],
        description: getPostDetailsData.data?.description,
        author: getPostDetailsData.data?.author,
        content: getPostDetailsData.data?.content,
        priority_lifetime: getPostDetailsData.data?.priority_lifetime,
        lifetime: getPostDetailsData.data?.lifetime,
        priority: getPostDetailsData.data?.priority,
        is_custom: getPostDetailsData.data?.is_custom,
        first_position: getPostDetailsData.data?.first_position,
        numberOfBlockSites:
          getPostDetailsData.data?.exclude_on?.length === 0
            ? getPostDetailsData.data?.exclude_on
            : arrayForExluded,
        file: getPostDetailsData.data?.image,
        date: getPostDetailsData.data?.timestamp,
      });
      getPostDetailsData.data?.is_custom &&
        getPostDetailsData.data?.is_custom === true &&
        this.props.dispatch(
          GetPostDetailsStatsPromoActionRequest({
            id: this.props.match.params.id,
          })
        );
    }

    if (
      prevProps.deletePost !== deletePost &&
      !deletePostError &&
      !deletePostLoading &&
      deletePostData
    ) {
      NotificationManager.success("Post successfully deleted", "Success", 2000);
      this.props.history.push("/posts");
    }

    if (
      prevProps.createPost !== createPost &&
      !createPostError &&
      !createPostLoading &&
      createPostData
    ) {
      NotificationManager.success("Post successfully created", "Success", 2000);
      this.props.history.push("/posts");
    } else if (
      prevProps.createPost !== createPost &&
      createPostError &&
      createPostErrorData
    ) {
      NotificationManager.error(
        `${createPostErrorData.data.message}`,
        "Failed",
        2000
      );
    }

    if (
      prevProps.updatePostDetails !== updatePostDetails &&
      !updatePostDetailsError &&
      !updatePostDetailsLoading &&
      updatePostDetailsData
    ) {
      NotificationManager.success("Post successfully updated", "Success", 2000);
      this.props.history.push("/posts");
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
  }

  handleWhereEverNav = (page) => {
    if (page === "editDiv") {
      Util.isRoot() && this.setState({ isIteditable: true });
    } else {
      this.setState({ isIteditable: false });
    }
    this.setState({ tabClicked: page, wordToPass: "" });
  };

  handleButtonActive = (page) => {
    this.setState({ whichisit: page });
  };

  handleStatusChange = (status) => {
    this.setState({ dataState: status });
  };

  handleChangeFile = (event) => {
    this.setState({
      file: event.target.value,
      imageFile: null,
    });
  };

  handleButtonActive = (page) => {
    if (page === "save") {
      const {
        name,
        description,
        file,
        url,
        author,
        content,
        date,
        site,
        dataState,
        categories,
        priority_lifetime,
        lifetime,
        priority,
        is_custom,
        first_position,
        imageFile,
        numberOfBlockSites,
      } = this.state;
      if (this.props.location.data?.createNew) {
        this.props.dispatch(
          CreatePostActionRequest({
            image: file ? file : imageFile ? imageFile : null,
            title: name,
            link: url,
            description,
            author,
            content,
            timestamp: date ? date : Math.round(new Date().getTime() / 1000),
            site,
            status: dataState,
            categories,
            priority_lifetime,
            lifetime,
            priority,
            is_custom,
            first_position,
            exclude_on: numberOfBlockSites.map((el) => {
              return el.id;
            }),
          })
        );
      } else {
        this.props.dispatch(
          UpdatePostDetailsActionRequest({
            id: this.props.match.params.id,
            image: file ? file : imageFile ? imageFile : null,
            title: name,
            link: url,
            description,
            author,
            content,
            timestamp: date,
            site,
            status: dataState,
            categories,
            priority_lifetime,
            lifetime,
            priority,
            is_custom,
            first_position,
            exclude_on: numberOfBlockSites.map((el) => {
              return el.id;
            }),
          })
        );
      }
    } else if (page === "cancel") {
      this.setState({ isIteditable: false, wordToPass: "canceled" });
    } else {
      this.setState({ whichisit: page });
    }
  };

  handleSite = (value) => {
    this.setState({ site: value.value });
    this.props.dispatch(
      GetSiteDetailsActionRequest({
        id: value.value,
      })
    );
  };

  handleChangeInputs = (e) => {
    if (e.target.type === "date") {
      const d = new Date(e.target.value);
      const seconds = d.getTime() / 1000;
      this.setState({ [e.target.name]: parseInt(seconds) });
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  };

  handleuploadPicture = (e) => {
    if (e.target.files[0].name.match(/.(jpg|jpeg|png|gif)$/i)) {
      let img = e.target.files[0];
      this.setState({ imageFile: img, file: null });
    } else {
      NotificationManager.error(
        "Image must be in jpg,jpeg,png, or gif format",
        "Failed",
        2000
      );
    }
  };

  deleteuserFunction = () => {
    this.props.dispatch(
      DeletePostActionRequest({
        id: this.props.match.params.id,
      })
    );
  };

  handlePostDetailsCategorie = (value) => {
    const saveData = value.length !== 0 ? value.map((el) => el.value) : [];
    this.setState({ categories: saveData });
  };

  handleTrashClick = () => {
    this.setState({ confirmMessage: true });
  };
  render() {
    const {
      isIteditable,
      dataState,
      tabClicked,
      wordToPass,
      postDetailsData,
      site,
      siteOptions,
      siteDetailsData,
      priority,
      is_custom,
      first_position,
      numberOfBlockSites,
    } = this.state;
    const categorialOption = siteDetailsData?.categories?.map((el) => {
      return { value: el.category.id, label: el.category.name };
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

    return (
      <div className="mainSiteDetailsDiv">
        <NavWidget
          handleWhereEverNav={this.handleWhereEverNav}
          wordToPass={wordToPass}
          handleTrashClick={this.handleTrashClick}
          isButtonNamepased={this.props?.location?.data?.buttonClicked}
          isCustom={postDetailsData?.is_custom}
          pageName={"posts"}
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
            <h2
              style={{ marginBottom: "20px" }}
            >{`Chart for post ${postDetailsData?.title}`}</h2>
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
                        SpecPostChartRequest({
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
                        SpecPostChartRequest({
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
                  {this.state.postChartData.length !== 0 &&
                    this.state.postChartData?.map((el) => (
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
                      {this.state.postChartData.length !== 0 &&
                        this.state.postChartData
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
                      {this.state.postChartData.length !== 0 &&
                        this.state.postChartData
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
                      {this.state.postChartData.length !== 0 &&
                      !isNaN(
                        (this.state.postChartData?.reduce(
                          (a, b) => +a + +b.clicks,
                          0
                        ) /
                          this.state.postChartData?.reduce(
                            (a, b) => +a + +b.impressions,
                            0
                          )) *
                          100
                      )
                        ? (
                            (this.state.postChartData?.reduce(
                              (a, b) => +a + +b.clicks,
                              0
                            ) /
                              this.state.postChartData?.reduce(
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
                dataToShow={this.state.postChartData}
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
            </h1>
            <div style={{ height: `200px` }}>
              <VerticalChart customData={data} customStyle={{ padding: "0" }} />
            </div> */}
          </>
        )}
        {tabClicked === "promoDiv" && (
          <>
            <h2
              style={{ marginBottom: "20px" }}
            >{`Promo stats for post ${postDetailsData?.title}`}</h2>
            <div>
              <table style={{ marginTop: "20px" }}>
                <thead>
                  <tr style={{ height: "40px" }}>
                    <th style={{ width: "100px" }}>Origin</th>
                    <th style={{ width: "100px" }}>Clicks</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.postDetailsDataStatsPromo.length !== 0 &&
                    this.state.postDetailsDataStatsPromo?.map((el) => (
                      <tr style={{ height: "40px" }}>
                        <td
                          style={{
                            borderTop: "1px solid black",
                            textAlign: "center",
                          }}
                        >
                          {el.origin?.name}
                        </td>
                        <td
                          style={{
                            borderTop: "1px solid black",
                            textAlign: "center",
                          }}
                        >
                          {el.clicks}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </>
        )}
        {tabClicked !== "statsDiv" && tabClicked !== "promoDiv" && (
          <h2 style={{ marginBottom: "20px" }}>{`Details for post ${
            postDetailsData?.title ? postDetailsData?.title : ""
          }`}</h2>
        )}
        {tabClicked !== "statsDiv" && tabClicked !== "promoDiv" && (
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
                          postDetailsData?.status === 1
                            ? "#ABD996"
                            : postDetailsData?.status === 0
                            ? "#DFE094"
                            : postDetailsData?.status === 2
                            ? "#E09494"
                            : postDetailsData?.status === 3
                            ? "#295265"
                            : "",
                      }}
                    >
                      {postDetailsData?.status === 1
                        ? "PUBLISHED"
                        : postDetailsData?.status === 0
                        ? "DRAFT"
                        : postDetailsData?.status === 2
                        ? "ERROR"
                        : postDetailsData?.status === 3
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
                  {!isIteditable && <p>{postDetailsData?.title}</p>}
                  {isIteditable && (
                    <input
                      type="text"
                      name="name"
                      value={this.state.name}
                      onChange={(e) => this.handleChangeInputs(e)}
                    />
                  )}
                </div>
                <div className="url_div">
                  <h4>Url</h4>
                  {!isIteditable && (
                    <a
                      onClick={() =>
                        window.open(
                          `${postDetailsData && postDetailsData["link"]}`
                        )
                      }
                      href="#"
                    >
                      {postDetailsData["link"]}
                    </a>
                  )}
                  {isIteditable && (
                    <input
                      type="text"
                      name="url"
                      onChange={(e) => this.handleChangeInputs(e)}
                      value={this.state.url}
                      placeholder={
                        this.state.url
                          ? this.state.url
                          : postDetailsData["link"]
                      }
                    />
                  )}
                  {/* {isIteditable && <SaveButtonEdit labeltext={'Scrape'} colorization={'ScrapeClass'} customStyle={{ width: '135px', marginRight: '20px' }} />} */}
                </div>
                <h1 style={{ margin: "20px 0" }}>Canonical</h1>

                <div className="owner_div selectable">
                  <h4>Site</h4>
                  {!isIteditable && (
                    <p>
                      {site
                        ? siteOptions.map((el) =>
                            el.value === site ? el.label : ""
                          )
                        : postDetailsData?.site?.name}
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
                      defaultValue={this.state.siteOptions[site]}
                      onChange={this.handleSite}
                      // isLoading={true}
                      placeholder={
                        site
                          ? siteOptions.map((el) =>
                              el.value === site ? el.label : ""
                            )
                          : postDetailsData?.site?.name
                      }
                      styles={customSelectStyles}
                      isClearable={true}
                      isSearchable={true}
                      name="merge"
                      options={this.state.siteOptions}
                    />
                  )}
                </div>
                <div className="owner_div">
                  <h4>Owner</h4>
                  <Link to={`/users/${postDetailsData?.owner?.id}`}>
                    {postDetailsData?.owner?.email}
                  </Link>
                  {/* {isIteditable && <input type="text" placeholder='nina.aralica@alo.rs' />} */}
                </div>
                <div className="description_div">
                  <h4>Description</h4>
                  {!isIteditable && <p>{postDetailsData?.description}</p>}
                  {isIteditable && (
                    <input
                      name="description"
                      value={this.state.description}
                      onChange={(e) => this.handleChangeInputs(e)}
                      type="text"
                    />
                  )}
                </div>
                <div className="description_div">
                  <h4>Author</h4>
                  {!isIteditable && <p>{postDetailsData?.author}</p>}
                  {isIteditable && (
                    <input
                      name="author"
                      value={this.state.author}
                      onChange={(e) => this.handleChangeInputs(e)}
                      type="text"
                    />
                  )}
                </div>
                {Util.isRoot() && <h1 style={{ margin: "20px 0" }}>Order</h1>}
                {/* <div className="description_div">
                  <h4>Content</h4>
                  {!isIteditable && <p>{postDetailsData?.content}</p>}
                  {isIteditable && (
                    <input
                      type="text"
                      name="content"
                      value={this.state.content}
                      onChange={(e) => this.handleChangeInputs(e)}
                    />
                  )}
                </div> */}
                {Util.isRoot() && (
                  <div className="description_div">
                    <h4>Pri. lifetime (h)</h4>
                    {!isIteditable && (
                      <p>{postDetailsData?.priority_lifetime}</p>
                    )}
                    {isIteditable && (
                      <input
                        type="number"
                        min="0"
                        onChange={(e) => {
                          if (
                            (!isNaN(e.target.value) &&
                              parseInt(e.target.value) >= 0) ||
                            e.target.value === ""
                          ) {
                            let val =
                              e.target.value === ""
                                ? e.target.value
                                : parseInt(e.target.value);
                            setTimeout(() => {
                              this.setState({ priority_lifetime: val });
                            });
                          }
                        }}
                        name="ratio"
                        value={
                          this.state.priority_lifetime !== null &&
                          this.state.priority_lifetime
                        }
                      />
                    )}
                  </div>
                )}
                {Util.isRoot() && (
                  <div className="tracking_div">
                    <h4>Priority</h4>
                    {!isIteditable && <p>{`${postDetailsData?.priority}`}</p>}
                    {isIteditable && (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <input
                          name="priority"
                          value={
                            priority !== null
                              ? priority
                              : postDetailsData?.priority
                          }
                          checked={
                            priority !== null
                              ? priority
                              : postDetailsData?.priority
                          }
                          onChange={(e) =>
                            this.setState({ priority: e.target.checked })
                          }
                          style={{ width: "20px" }}
                          type="checkbox"
                        />{" "}
                        <label htmlFor="check">Is this post a priority</label>
                      </div>
                    )}
                  </div>
                )}
                {Util.isRoot() && (
                  <div className="tracking_div">
                    <h4>First position</h4>
                    {!isIteditable && (
                      <p>{`${postDetailsData?.first_position}`}</p>
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
                          name="first_position"
                          value={
                            first_position !== null
                              ? first_position
                              : postDetailsData?.first_position
                          }
                          checked={
                            first_position !== null
                              ? first_position
                              : postDetailsData?.first_position
                          }
                          onChange={(e) =>
                            this.setState({ first_position: e.target.checked })
                          }
                          style={{ width: "20px" }}
                          type="checkbox"
                        />{" "}
                        <label htmlFor="check">
                          Move this post into first position
                        </label>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className="rightSideDiv">
              <div className="categoriesDiv">
                <h1>Details</h1>
                <div className="categ_div">
                  <h4>Categories</h4>

                  <div className="listOfCateg">
                    <p>
                      {postDetailsData?.categories?.map(
                        (el, i) =>
                          `${el}${
                            postDetailsData?.categories.length - 1 !== i
                              ? ","
                              : ""
                          } `
                      )}
                    </p>
                  </div>

                  {/* {isIteditable && (
                    <Select
                      className="basic-single"
                      classNamePrefix="select"
                      defaultValue={postDetailsData?.categories?.map((el) => {
                        return { value: el.id, label: el };
                      })}
                      // isLoading={true}
                      onChange={this.handlePostDetailsCategorie}
                      isMulti
                      styles={customSelectStyles}
                      // isClearable={true}
                      isSearchable={true}
                      name="merge"
                      options={categorialOption}
                    />
                  )} */}
                </div>
                {Util.isRoot() && (
                  <div className="categ_div">
                    <h4>Lifetime</h4>
                    {!isIteditable && <p>{postDetailsData?.lifetime}</p>}
                    {isIteditable && (
                      <input
                        type="number"
                        min="0"
                        onChange={(e) => {
                          if (
                            (!isNaN(e.target.value) &&
                              parseInt(e.target.value) >= 0) ||
                            e.target.value === ""
                          ) {
                            let val =
                              e.target.value === ""
                                ? e.target.value
                                : parseInt(e.target.value);
                            setTimeout(() => {
                              this.setState({ lifetime: val });
                            });
                          }
                        }}
                        name="ratio"
                        value={
                          this.state.lifetime !== null && this.state.lifetime
                        }
                      />
                    )}
                  </div>
                )}
                {Util.isRoot() && (
                  <div className="categ_div">
                    <h4>Is custom</h4>
                    {!isIteditable && <p>{`${postDetailsData?.is_custom}`}</p>}
                    {isIteditable && (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <input
                          name="is_custom"
                          value={
                            is_custom !== null
                              ? is_custom
                              : postDetailsData?.is_custom
                          }
                          checked={
                            is_custom !== null
                              ? is_custom
                              : postDetailsData?.is_custom
                          }
                          onChange={(e) =>
                            this.setState({ is_custom: e.target.checked })
                          }
                          style={{ width: "20px" }}
                          type="checkbox"
                        />{" "}
                        <label htmlFor="check">Is this post custom</label>
                      </div>
                    )}
                  </div>
                )}
                <div className="categ_div">
                  <h4>Date</h4>

                  {!isIteditable && (
                    <p>
                      {postDetailsData?.timestamp &&
                        `${moment(
                          new Date(postDetailsData?.timestamp * 1000)
                        ).format("DD/MM/YYYY")}`}
                    </p>
                  )}
                  {isIteditable && (
                    <input
                      className="dateInput"
                      name="date"
                      onChange={(e) => this.handleChangeInputs(e)}
                      value={
                        this.state.date &&
                        `${moment(new Date(this.state.date * 1000)).format(
                          "YYYY-MM-DD"
                        )}`
                      }
                      type="date"
                      // placeholder={
                      //   postDetailsData?.timestamp &&
                      //   new Date(postDetailsData?.timestamp)
                      // }
                    />
                  )}
                </div>
                <div className="categ_div">
                  <h4>Image</h4>
                  {!isIteditable && (
                    <p>{postDetailsData?.image?.slice(0, 100)}</p>
                  )}
                  {isIteditable && (
                    <input
                      type="text"
                      id="file"
                      onChange={this.handleChangeFile}
                      value={
                        this.state.file
                          ? this.state.file
                          : this.state.imageFile
                          ? this.state.imageFile?.name
                          : ""
                      }
                    />
                  )}
                  {isIteditable && (
                    <label className="custom-file-upload">
                      <input
                        type="file"
                        onChange={(e) => this.handleuploadPicture(e)}
                        onClick={(e) => (e.target.value = "")}
                      />
                      Upload
                    </label>
                  )}
                </div>
                {this.state.file ? (
                  <div className="categ_div">
                    <img
                      style={{ width: "300px" }}
                      src={this.state.file}
                      alt="uploaded"
                    />
                  </div>
                ) : !this.state.file && this.state.imageFile ? (
                  <div className="categ_div">
                    <img
                      style={{ width: "300px" }}
                      src={URL.createObjectURL(this.state.imageFile)}
                      alt="uploaded"
                    />
                  </div>
                ) : postDetailsData?.image ? (
                  <div className="categ_div">
                    <img
                      style={{ width: "300px" }}
                      src={postDetailsData?.image}
                      alt="uploaded"
                    />
                  </div>
                ) : (
                  ""
                )}
              </div>
              {Util.isRoot() && <h1>Exclude on</h1>}
              {Util.isRoot() &&
                this.state.numberOfBlockSites.length !== 0 &&
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
                            const newlist = [...this.state.numberOfBlockSites];
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
              {Util.isRoot() && isIteditable && (
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
            </div>
          </div>
        )}

        {isIteditable && (
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
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { PostsReducer, SitesListReducer, CategoryReducer, ChartRreducer } =
    state;
  const {
    getPostDetails,
    deletePost,
    createPost,
    updatePostDetails,
    getPostDetailsStatsPromo,
  } = PostsReducer;
  const { getCategoryList } = CategoryReducer;
  const { getSitesList, getSiteDetails } = SitesListReducer;
  const { specPostChart } = ChartRreducer;
  return {
    getPostDetails,
    getSitesList,
    getSiteDetails,
    getPostDetailsStatsPromo,
    getCategoryList,
    deletePost,
    createPost,
    updatePostDetails,
    specPostChart,
  };
};

export default connect(mapStateToProps, null)(PostsDetails);
