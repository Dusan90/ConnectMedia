import React, { Component } from "react";
import { Link } from "react-router-dom";
import NavWidget from "../../containers/NavWidget/NavWidget";
import arrowUp from "../../assets/img/TableIcons/arrow(1).svg";
import secondarrowDown from "../../assets/img/TableIcons/arrow.svg";
// import xButton from '../../assets/img/SiteDetails/xButton.svg'
import { connect } from "react-redux";
import "./SiteDetails.scss";
import SaveButtonEdit from "../../containers/Buttons/SaveButtonEdit";
import {
  GetSiteDetailsActionRequest,
  DeleteSiteActionRequest,
  UpdateSiteDetailsActionRequest,
  GetSitesListActionRequest,
} from "../../store/actions/SitesListAction";
import {
  BindCategoryActionRequest,
  UnbindCategoryActionRequest,
  GetCategoryListActionRequest,
} from "../../store/actions/CategoryAction";
import { SpecSiteChartRequest } from "../../store/actions/ChartAction";
import Chart from "../../containers/Chart/Chart";
import Select from "react-select";
import { NotificationManager } from "react-notifications";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const test2 = [
  { mesto: "Beograd", title: "vesti" },
  { mesto: "dobra vest", title: "vesti" },
  { mesto: "dobra vest", title: "vesti" },
  { mesto: "kultura", title: "zanimljivosti" },
];

const options = [0, 1, 2, 3];

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

export class SiteDetails extends Component {
  constructor(prosp) {
    super(prosp);
    this.state = {
      isIteditable: false,
      whichisit: "",
      treeButtonsMotivation: "",
      dataState: null,
      tabClicked: "",
      confirmMessage: false,
      siteDetailsData: "",
      name: null,
      url: null,
      description: null,
      head: null,
      encoding: null,
      factor: null,
      minimum: null,
      tracking: null,
      auto_publish: null,
      better_images: null,
      feed_definition: null,
      post_definition: null,
      refresh_interval: null,
      copy_from_site: null,
      guess_remote: null,
      tag_map: null,
      cateOptions: [],
      categories: [],
      RSS: null,
      feed_translations: [],
      remote_translations: [],
      wordToPass: "",
      siteChartData: "",
      ratio: null,
      numberOfRatio: [],
      optionsForRatioSelect: [],
      random_ratio: null,
      post_lifetime: null,
      ctr_ratio: null,
      startDate: new Date().setDate(new Date().getDate() - 7),
      endDate: new Date(),
    };
  }

  componentDidMount() {
    if (this.props.getCategoryList?.data?.data) {
      const optionsData = this.props.getCategoryList?.data?.data?.map((el) => {
        return { value: el.id, label: el.name };
      });
      this.setState({ cateOptions: optionsData });
    } else {
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

    if (this.props?.location?.data?.url) {
      this.setState({ url: this.props.location.data?.url });
    } else {
      this.props.dispatch(
        GetSiteDetailsActionRequest({
          id: this.props.match.params.id,
        })
      );
    }

    this.props.dispatch(
      SpecSiteChartRequest({
        id: this.props.match.params.id,
        from: Math.round(new Date(this.state.startDate).getTime() / 1000),
        to: Math.round(new Date(this.state.endDate).getTime() / 1000),
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
  }

  componentDidUpdate(prevProps) {
    const {
      getSiteDetails,
      deleteSite,
      updateSiteDetails,
      getCategoryList,
      unbindCategory,
      bindCategory,
      specSiteChart,
      getSitesList,
    } = this.props;
    const {
      data: getSitesListData,
      loading: getSitesListLoading,
      error: getSitesListError,
    } = getSitesList;
    const {
      data: specSiteChartData,
      loading: specSiteChartLoading,
      error: specSiteChartError,
    } = specSiteChart;
    const {
      data: getSiteDetailsData,
      loading: getSiteDetailsLoading,
      error: getSiteDetailsError,
    } = getSiteDetails;
    const {
      data: getCategoryListData,
      loading: getCategoryListLoading,
      error: getCategoryListError,
    } = getCategoryList;
    const {
      data: deleteSiteData,
      loading: deleteSiteLoading,
      error: deleteSiteError,
    } = deleteSite;
    // const { data: createSiteData, loading: createSiteLoading, error: createSiteError, errorData: createSiteErrorData } = createSite;
    const {
      data: updateSiteDetailsData,
      loading: updateSiteDetailsLoading,
      error: updateSiteDetailsError,
      errorData: updateSiteDetailsErrorData,
    } = updateSiteDetails;
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
      prevProps.getSitesList !== getSitesList &&
      !getSitesListError &&
      !getSitesListLoading &&
      getSitesListData
    ) {
      const option = getSitesListData.data.map((el) => {
        return { value: el.id, label: el.name };
      });
      this.setState({ optionsForRatioSelect: option });
    }

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
      if (!this.props?.location?.data?.url) {
        this.props.dispatch(
          GetSiteDetailsActionRequest({
            id: this.props.match.params.id,
          })
        );
      }
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
      if (!this.props?.location?.data?.url) {
        this.props.dispatch(
          GetSiteDetailsActionRequest({
            id: this.props.match.params.id,
          })
        );
      }
    }

    if (
      prevProps.specSiteChart !== specSiteChart &&
      !specSiteChartError &&
      !specSiteChartLoading &&
      specSiteChartData
    ) {
      this.setState({ siteChartData: specSiteChartData.data });
    }

    if (
      prevProps.getSiteDetails !== getSiteDetails &&
      !getSiteDetailsError &&
      !getSiteDetailsLoading &&
      getSiteDetailsData
    ) {
      this.setState({
        dataState: getSiteDetails.data.state,
        siteDetailsData: getSiteDetailsData.data,
        name: getSiteDetailsData.data?.name,
        url: getSiteDetailsData.data?.url,
        description: getSiteDetailsData.data?.description,
        head: getSiteDetailsData.data?.head,
        encoding: getSiteDetailsData.data?.encoding,
        factor: getSiteDetailsData.data?.factor,
        minimum: getSiteDetailsData.data?.minimum,
        feed_definition: getSiteDetailsData.data?.feed_definition,
        post_definition: getSiteDetailsData.data?.post_definition,
        refresh_interval: getSiteDetailsData.data?.refresh_interval,
        guess_remote: getSiteDetailsData.data?.guess_remote,
        tag_map: getSiteDetailsData.data?.tag_map,
        ratio: getSiteDetailsData.data?.ratio,
        numberOfRatio: getSiteDetailsData.data?.ratios,
        random_ratio: getSiteDetailsData.data?.random_ratio,
        post_lifetime: getSiteDetailsData.data?.post_lifetime,
        ctr_ratio: getSiteDetailsData.data?.ctr_ratio,
      });
      if (getSiteDetailsData?.data?.translations?.feed.length !== 0) {
        this.setState({
          feed_translations: getSiteDetailsData?.data?.translations?.feed?.map(
            (el) => {
              return { feed: el.feed?.id, category: el.category?.id };
            }
          ),
        });
      }
      if (getSiteDetailsData?.data?.feeds?.length !== 0) {
        const rssTofilter = getSiteDetailsData?.data?.feeds?.filter(
          (el) => el.active && el
        );
        const rssToshow = rssTofilter.map((el) => el.url);
        this.setState({
          RSS: rssToshow.join(" ").replace(/ /g, "\n"),
        });
      }
      if (getSiteDetailsData?.data?.categories !== 0) {
        const newData = getSiteDetailsData?.data?.categories.map((el) => {
          return el;
          // 'category': el.category.id, 'expire': el.expire, 'keep': el.keep, "max_age": el.max_age,
          // 'min_ctr': el.min_ctr, 'min_imp': el.min_imp
        });

        this.setState({ categories: newData });
      }
    }

    if (
      prevProps.getCategoryList !== getCategoryList &&
      !getCategoryListError &&
      !getCategoryListLoading &&
      getCategoryListData
    ) {
      const optionsData = getCategoryListData?.data?.map((el) => {
        return { value: el.id, label: el.name };
      });
      this.setState({ cateOptions: optionsData });
    }

    if (
      prevProps.deleteSite !== deleteSite &&
      !deleteSiteError &&
      !deleteSiteLoading &&
      deleteSiteData
    ) {
      NotificationManager.success("Site successfully deleted", "Success", 2000);
      this.props.history.push("/sites");
    }

    // if (prevProps.createSite !== createSite && !createSiteError && !createSiteLoading && createSiteData) {
    //     NotificationManager.success("Site successfully created", "Success", 2000);
    //     this.props.history.push('/sites')
    // } else if (prevProps.createSite !== createSite && createSiteError && createSiteErrorData) {
    //     NotificationManager.error(`${createSiteErrorData.data.message}`, "Failed", 2000);

    // }

    if (
      prevProps.updateSiteDetails !== updateSiteDetails &&
      !updateSiteDetailsError &&
      !updateSiteDetailsLoading &&
      updateSiteDetailsData
    ) {
      NotificationManager.success("Site successfully updated", "Success", 2000);
      this.props.history.push("/sites");
    } else if (
      prevProps.updateSiteDetails !== updateSiteDetails &&
      updateSiteDetailsError &&
      updateSiteDetailsErrorData
    ) {
      NotificationManager.error(
        `${updateSiteDetailsErrorData.data.message}`,
        "Failed",
        2000
      );
    }
  }

  handleWhereEverNav = (page) => {
    if (page === "editDiv") {
      this.setState({ isIteditable: true });
    } else if (page === "statsDiv") {
      this.setState({ isIteditable: false });
    } else if (page === "postsDiv") {
      this.props.history.push({
        pathname: "/posts",
        data: { searchBy: this.state.siteDetailsData, prevPath: "/sites" },
      });
    } else if (page === "widgetsDiv") {
      this.props.history.push({
        pathname: "/widgets",
        data: { searchBy: this.state.siteDetailsData, prevPath: "/sites" },
      });
    } else {
      this.setState({ isIteditable: false });
    }
    this.setState({ tabClicked: page, wordToPass: "" });
  };

  handleTreeButtons = (item) => {
    this.setState({ treeButtonsMotivation: item });
  };

  handleButtonActive = (page) => {
    if (page === "save") {
      const {
        name,
        url,
        description,
        feed_translations,
        categories,
        dataState,
        head,
        RSS,
        encoding,
        factor,
        minimum,
        tracking,
        auto_publish,
        better_images,
        feed_definition,
        post_definition,
        refresh_interval,
        copy_from_site,
        guess_remote,
        tag_map,
        ratio,
        numberOfRatio,
        random_ratio,
        post_lifetime,
        ctr_ratio,
      } = this.state;
      const categorieFormating = categories.map((el) => {
        return {
          category: el.category.id,
          expire: el.expire,
          keep: el.keep,
          max_age: el.max_age,
          min_ctr: el.min_ctr,
          min_imp: el.min_imp,
        };
      });
      this.props.dispatch(
        UpdateSiteDetailsActionRequest({
          id: this.props.match.params.id,
          name,
          url,
          description,
          head,
          encoding,
          factor,
          minimum,
          tracking,
          auto_publish,
          better_images,
          feed_definition,
          post_definition,
          refresh_interval,
          copy_from_site,
          guess_remote,
          tag_map,
          state: dataState,
          feeds:
            typeof RSS === "string"
              ? RSS.replace(/\s+/g, " ").trim().split(" ")
              : null,
          categories: categorieFormating,
          feed_translations,
          ratio,
          ratios: numberOfRatio,
          random_ratio,
          post_lifetime,
          ctr_ratio,
        })
      );
    } else if (page === "cancel") {
      this.setState({ isIteditable: false, wordToPass: "canceled" });
    } else {
      this.setState({ whichisit: page });
    }
  };

  handleStatusChange = (status) => {
    this.setState({ dataState: status });
  };

  handleChange = (e) => {
    if (e.target.type === "number") {
      this.setState({ [e.target.name]: parseInt(e.target.value) });
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  };

  handleChangeRSS = (e) => {
    this.setState({ RSS: e.target.value });
  };

  arrowSort = (value, sortBy) => {
    console.log(value, sortBy);
  };

  handleTrashClick = () => {
    this.setState({ confirmMessage: true });
  };

  deletesiteFunction = () => {
    this.props.dispatch(
      DeleteSiteActionRequest({
        id: this.props.match.params.id,
      })
    );
  };

  handleOption = (item) => {
    const categorialOption = this.state.siteDetailsData?.categories?.map(
      (el) => {
        return { value: el.category.id, label: el.category.name };
      }
    );
    if (item.length > categorialOption?.length) {
      if (categorialOption?.length === 0) {
        this.props.dispatch(
          BindCategoryActionRequest({
            siteId: this.state.siteDetailsData?.id,
            categoryId: item[0]["value"],
          })
        );
      } else {
        const element = categorialOption.map((el) => {
          return el.value;
        });
        const intersection = item.filter((itemm) => {
          if (!element.includes(itemm.value)) {
            return itemm;
          }
        });
        // const intersection = item.filter((entry1) => {
        //     return categorialOption.some((entry2) => { return entry1.value !== entry2.value });
        // });
        this.props.dispatch(
          BindCategoryActionRequest({
            siteId: this.state.siteDetailsData?.id,
            categoryId: intersection[0]["value"],
          })
        );
      }
    } else if (item.length < categorialOption?.length) {
      if (item.length === 0) {
        this.props.dispatch(
          UnbindCategoryActionRequest({
            siteId: this.state.siteDetailsData?.id,
            categoryId: categorialOption[0]["value"],
          })
        );
      } else {
        const intersection = categorialOption?.filter((entry1) => {
          return item.some((entry2) => {
            return entry1.value !== entry2.value;
          });
        });
        this.props.dispatch(
          UnbindCategoryActionRequest({
            siteId: this.state.siteDetailsData?.id,
            categoryId: intersection[0]["value"],
          })
        );
      }
    }
  };

  handleFeedTraslation = (e, item) => {
    if (e.value === "none") {
      const noneValue = this.state.feed_translations.filter((el) => {
        return el.feed !== item;
      });
      this.setState({ feed_translations: noneValue });
    } else {
      if (this.state.feed_translations.length === 0) {
        this.setState({
          feed_translations: [{ feed: item, category: e.value }],
        });
      } else {
        let copyFeed = this.state.feed_translations.filter(
          (el) => el.feed !== item
        );
        if (copyFeed.length !== 0) {
          this.setState({
            feed_translations: [
              ...this.state.feed_translations,
              { feed: item, category: e.value },
            ],
          });
        } else {
          copyFeed.push({ feed: item, category: e.value });
          this.setState({ feed_translations: copyFeed });
        }
      }
    }
  };

  handleChangeCategory = (e, item) => {
    item[e.target.name] = parseInt(e.target.value);
  };

  render() {
    const {
      isIteditable,
      whichisit,
      wordToPass,
      treeButtonsMotivation,
      dataState,
      tabClicked,
      siteDetailsData,
      tracking,
      better_images,
      auto_publish,
      copy_from_site,
      numberOfRatio,
      optionsForRatioSelect,
    } = this.state;
    const categorialOption = siteDetailsData?.categories?.map(
      (el) => el.category.id
    );

    const optionsSelection = numberOfRatio.map((el) => {
      return el.id;
    });

    const optionsS = optionsForRatioSelect.map((el) => {
      if (optionsSelection.includes(el.value)) {
        return { ...el, isdisabled: true };
      } else {
        return el;
      }
    });

    console.log(categorialOption);

    return (
      <div className="mainSiteDetailsDiv">
        <NavWidget
          isButtonNamepased={this.props?.location?.data?.buttonClicked}
          wordToPass={wordToPass}
          handleWhereEverNav={this.handleWhereEverNav}
          handleTrashClick={this.handleTrashClick}
        />
        {this.state.confirmMessage && (
          <div className="confurmText">
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
        {tabClicked === "statsDiv" && (
          <>
            <h2
              style={{ marginBottom: "20px" }}
            >{`Chart for site ${siteDetailsData?.name}`}</h2>
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
                        SpecSiteChartRequest({
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
                        SpecSiteChartRequest({
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
            <div style={{ height: "500px", marginTop: "20px" }}>
              <Chart
                customStyle={{ padding: "0" }}
                dataToShow={this.state.siteChartData}
                fields={{ 0: "in", 1: "out", 2: "txr" }}
              />
            </div>
            <div>
              <table style={{ marginTop: "20px" }}>
                <thead>
                  <tr style={{ height: "40px" }}>
                    <th style={{ width: "100px" }}>Date</th>
                    <th style={{ width: "100px" }}>In</th>
                    <th style={{ width: "100px" }}>Out</th>
                    <th style={{ width: "100px" }}>Txr</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.siteChartData.length !== 0 &&
                    this.state.siteChartData?.map((el) => (
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
                          {el.in}
                        </td>
                        <td
                          style={{
                            borderTop: "1px solid black",
                            textAlign: "center",
                          }}
                        >
                          {el.out}
                        </td>
                        <td
                          style={{
                            borderTop: "1px solid black",
                            textAlign: "center",
                          }}
                        >
                          {el.txr}
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
                      {this.state.siteChartData.length !== 0 &&
                        this.state.siteChartData?.reduce(
                          (a, b) => +a + +b.in,
                          0
                        )}
                    </td>
                    <td
                      style={{
                        borderTop: "1px solid black",
                        textAlign: "center",
                      }}
                    >
                      {this.state.siteChartData.length !== 0 &&
                        this.state.siteChartData?.reduce(
                          (a, b) => +a + +b.out,
                          0
                        )}
                    </td>
                    <td
                      style={{
                        borderTop: "1px solid black",
                        textAlign: "center",
                      }}
                    >
                      {this.state.siteChartData.length !== 0 &&
                        this.state.siteChartData?.reduce(
                          (a, b) => +a + +b.txr,
                          0
                        )}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </>
        )}
        {tabClicked !== "statsDiv" && (
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
                          siteDetailsData?.state === 1
                            ? "#ABD996"
                            : siteDetailsData?.state === 0
                            ? "#DFE094"
                            : siteDetailsData?.state === 2
                            ? "#E09494"
                            : siteDetailsData?.state === 3
                            ? "#295265"
                            : "",
                      }}
                    >
                      {siteDetailsData?.state === 1
                        ? "PUBLISHED"
                        : siteDetailsData?.state === 0
                        ? "DRAFT"
                        : siteDetailsData?.state === 2
                        ? "ERROR"
                        : siteDetailsData?.state === 3
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
                                  : "#295265",
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
                  {!isIteditable && <p>{siteDetailsData?.name}</p>}
                  {isIteditable && (
                    <input
                      onChange={(e) => this.handleChange(e)}
                      type="text"
                      name="name"
                      value={this.state.name}
                    />
                  )}
                </div>
                <div className="url_div">
                  <h4>Url</h4>
                  {!isIteditable && (
                    <a
                      style={{ textDecoration: "underline" }}
                      onClick={() => {
                        siteDetailsData?.url &&
                          window.open(siteDetailsData?.url);
                      }}
                    >
                      {siteDetailsData?.url}
                    </a>
                  )}
                  {isIteditable && (
                    <input
                      type="text"
                      onChange={(e) => this.handleChange(e)}
                      value={this.state.url}
                      placeholder={
                        this.state.url ? this.state.url : siteDetailsData?.url
                      }
                      name="url"
                    />
                  )}
                  {/* {isIteditable && <SaveButtonEdit labeltext={'Scrape'} colorization={'ScrapeClass'} customStyle={{ width: '135px', marginRight: '20px' }} />} */}
                </div>
                <div className="owner_div">
                  <h4>Owner</h4>
                  {
                    <Link to={`/users/${siteDetailsData?.owner?.id}`}>
                      {siteDetailsData?.owner?.email}
                    </Link>
                  }
                  {/* {isIteditable && <input type="text" onChange={(e) => this.handleChange(e)} name='Owner' placeholder='nina.aralica@alo.rs' />} */}
                  {/* {isIteditable && <Select
                                    className="basic-single"
                                    classNamePrefix="select"
                                    // defaultValue={colourOptions[0]}
                                    // isLoading={true}
                                    placeholder={this.state.owner.email}
                                    styles={customSelectStyles}
                                    isClearable={true}
                                    isSearchable={true}
                                    name="merge"
                                    options={optionss}
                                />} */}
                </div>
                {/* <div className="description_div">
                  <h4>Description</h4>
                  {!isIteditable && <p>{siteDetailsData?.description}</p>}
                  {isIteditable && (
                    <input
                      type="text"
                      onChange={(e) => this.handleChange(e)}
                      name="description"
                      value={this.state.description}
                    />
                  )}
                </div> */}
                {/* <div className="description_div">
                  <h4>Head</h4>
                  {!isIteditable && <p>{siteDetailsData?.head}</p>}
                  {isIteditable && (
                    <input
                      type="text"
                      onChange={(e) => this.handleChange(e)}
                      name="head"
                      value={this.state.head}
                    />
                  )}
                </div> */}
                {/* <div className="info_div">
                  <div className="endcFactMini">
                    <h4>Encoding</h4>
                    {!isIteditable && <p>{siteDetailsData?.encoding}</p>}
                    {isIteditable && (
                      <input
                        type="text"
                        onChange={(e) => this.handleChange(e)}
                        name="encoding"
                        value={this.state.encoding}
                        style={{ width: "40px" }}
                      />
                    )}
                  </div>

                  <div className="endcFactMini">
                    <h4>Factor</h4>
                    {!isIteditable && <p>{siteDetailsData?.factor}</p>}
                    {isIteditable && (
                      <input
                        type="number"
                        onChange={(e) => this.handleChange(e)}
                        name="factor"
                        value={this.state.factor}
                        style={{ width: "40px" }}
                      />
                    )}
                  </div>
                  <div className="endcFactMini">
                    <h4>Minimum</h4>
                    {!isIteditable && <p>{siteDetailsData?.minimum}</p>}
                    {isIteditable && (
                      <input
                        type="number"
                        onChange={(e) => this.handleChange(e)}
                        name="minimum"
                        value={this.state.minimum}
                        style={{ width: "40px" }}
                      />
                    )}
                  </div>
                </div> */}
                {/* <div className="tracking_div">
                  <h4>Tracking</h4>
                  {!isIteditable && <p>{`${siteDetailsData?.tracking}`}</p>}
                  {isIteditable && (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <input
                        name="tracking"
                        value={
                          tracking !== null
                            ? tracking
                            : siteDetailsData?.tracking
                        }
                        checked={
                          tracking !== null
                            ? tracking
                            : siteDetailsData?.tracking
                        }
                        onChange={(e) =>
                          this.setState({ tracking: e.target.checked })
                        }
                        style={{ width: "20px" }}
                        type="checkbox"
                      />{" "}
                      <label htmlFor="check">
                        enable user tracking (sets cookie)
                      </label>
                    </div>
                  )}
                </div> */}
              </div>

              <div className="feedDiv">
                <h1>Feed</h1>
                <div className="rss_div">
                  <h4>RSS</h4>
                  {!isIteditable && (
                    <Link to="#">
                      {siteDetailsData?.feeds?.map((el) =>
                        el.active ? `${el.url} ` : null
                      )}
                    </Link>
                  )}
                  {isIteditable && (
                    <textarea
                      name="RSS"
                      value={this.state.RSS !== null ? this.state.RSS : ""}
                      onChange={(e) => this.handleChangeRSS(e)}
                      // placeholder={siteDetailsData?.feeds?.map(
                      //   (el) => `${el.url} `
                      // )}
                    />
                  )}
                </div>
                {/* <div className="images_div">
                  <h4>Look for better images</h4>
                  {!isIteditable && (
                    <p>{`${siteDetailsData?.better_images}`}</p>
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
                        name="betterImage"
                        value={
                          better_images !== null
                            ? better_images
                            : siteDetailsData?.better_images
                        }
                        checked={
                          better_images !== null
                            ? better_images
                            : siteDetailsData?.better_images
                        }
                        onChange={(e) =>
                          this.setState({ better_images: e.target.checked })
                        }
                        style={{ width: "20px" }}
                        type="checkbox"
                      />{" "}
                      <label htmlFor="check">
                        scrape individual pages for images (insert only)
                      </label>
                    </div>
                  )}
                </div> */}
                {/* <div className="definition_div">
                  <h4>Feed definition</h4>
                  {!isIteditable && <p>{siteDetailsData?.feed_definition}</p>}
                  {isIteditable && (
                    <input
                      name="feed_definition"
                      value={this.state.feed_definition}
                      onChange={(e) => this.handleChange(e)}
                      type="text"
                    />
                  )}
                </div>
                <div className="definition_div">
                  <h4>Single post definition</h4>
                  {!isIteditable && <p>{siteDetailsData?.post_definition}</p>}
                  {isIteditable && (
                    <input
                      name="post_definition"
                      value={this.state.post_definition}
                      onChange={(e) => this.handleChange(e)}
                      type="text"
                    />
                  )}
                </div> */}
                {/* <div className='expression_div'>
                                <h4>Uniq ID expression</h4>
                                {!isIteditable && <p></p>}
                                {isIteditable && <input name='UniqIDExpression' onChange={(e) => this.handleChange(e)} type="text" placeholder='' />}

                            </div> */}
                <div className="interval_div">
                  <h4>Refresh interval (min)</h4>
                  {!isIteditable && <p>{siteDetailsData?.refresh_interval}</p>}
                  {isIteditable && (
                    <input
                      type="number"
                      onChange={(e) => this.handleChange(e)}
                      name="refresh_interval"
                      value={this.state.refresh_interval}
                    />
                  )}
                </div>
                <div className="interval_div">
                  <h4>Ratio (%)</h4>
                  {!isIteditable && <p>{siteDetailsData?.ratio}</p>}
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
                            this.setState({ ratio: val });
                          });
                        }
                      }}
                      name="ratio"
                      value={this.state.ratio !== null && this.state.ratio}
                    />
                  )}
                </div>
                <div className="interval_div">
                  <h4>Initial ratio (%)</h4>
                  {!isIteditable && <p>{siteDetailsData?.random_ratio}</p>}
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
                            this.setState({ random_ratio: val });
                          });
                        }
                      }}
                      name="ratio"
                      value={
                        this.state.random_ratio !== null &&
                        this.state.random_ratio
                      }
                    />
                  )}
                </div>
                <div className="interval_div">
                  <h4>Post lifetime (days)</h4>
                  {!isIteditable && <p>{siteDetailsData?.post_lifetime}</p>}
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
                            this.setState({ post_lifetime: val });
                          });
                        }
                      }}
                      name="ratio"
                      value={
                        this.state.post_lifetime !== null &&
                        this.state.post_lifetime
                      }
                    />
                  )}
                </div>
                <div className="interval_div">
                  <h4>Ctr ratio (%)</h4>
                  {!isIteditable && <p>{siteDetailsData?.ctr_ratio}</p>}
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
                            this.setState({ ctr_ratio: val });
                          });
                        }
                      }}
                      name="ratio"
                      value={
                        this.state.ctr_ratio !== null && this.state.ctr_ratio
                      }
                    />
                  )}
                </div>
                {/* <div className="autopublish_div">
                  <h4>Autopublish</h4>
                  {!isIteditable && <p>{`${siteDetailsData?.auto_publish}`}</p>}
                  {isIteditable && (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <input
                        name="auto_publish"
                        value={
                          auto_publish !== null
                            ? auto_publish
                            : siteDetailsData?.auto_publish
                        }
                        checked={
                          auto_publish !== null
                            ? auto_publish
                            : siteDetailsData?.auto_publish
                        }
                        onChange={(e) =>
                          this.setState({ auto_publish: e.target.checked })
                        }
                        style={{ width: "20px" }}
                        type="checkbox"
                      />{" "}
                      <label htmlFor="check">limit to feed</label>
                    </div>
                  )}
                </div> */}
                {/* {siteDetailsData?.categories?.length !== 0 &&
                  !siteDetailsData?.auto_publish && (
                    <div className="table_div">
                      <div className="leftTable">
                        <table>
                          <thead>
                            <tr>
                              <th>Category limits</th>
                              <th>Keep at most</th>
                              <th>Expire after (hrs)</th>
                            </tr>
                          </thead>
                          <tbody>
                            {siteDetailsData?.categories?.map((item, key) => {
                              return (
                                <tr key={key}>
                                  <td>
                                    {!isIteditable && (
                                      <p>{item.category?.name}</p>
                                    )}
                                    {isIteditable && (
                                      <input
                                        type="text"
                                        disabled
                                        placeholder={item.category.name}
                                      />
                                    )}
                                  </td>
                                  <td>
                                    {!isIteditable && <p> {item.keep}</p>}
                                    {isIteditable && (
                                      <input
                                        type="number"
                                        onChange={(e) =>
                                          this.handleChangeCategory(e, item)
                                        }
                                        name="keep"
                                        placeholder={item.keep}
                                      />
                                    )}
                                  </td>
                                  <td>
                                    {!isIteditable && <p> {item.expire}</p>}
                                    {isIteditable && (
                                      <input
                                        type="number"
                                        onChange={(e) =>
                                          this.handleChangeCategory(e, item)
                                        }
                                        name="expire"
                                        placeholder={item.expire}
                                      />
                                    )}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                      <div className="rightTable">
                        <table>
                          <thead>
                            <tr>
                              <th>Min impressions</th>
                              <th>Min CTR (%)</th>
                              <th>Max Age (hrs)</th>
                            </tr>
                          </thead>
                          <tbody>
                            {siteDetailsData?.categories?.map((item, key) => {
                              return (
                                <tr key={key}>
                                  <td>
                                    {!isIteditable && <p>{item.min_imp}</p>}
                                    {isIteditable && (
                                      <input
                                        type="number"
                                        onChange={(e) =>
                                          this.handleChangeCategory(e, item)
                                        }
                                        name="min_imp"
                                        placeholder={item.min_imp}
                                      />
                                    )}
                                  </td>
                                  <td>
                                    {!isIteditable && <p> {item.min_ctr}</p>}
                                    {isIteditable && (
                                      <input
                                        type="number"
                                        onChange={(e) =>
                                          this.handleChangeCategory(e, item)
                                        }
                                        name="min_ctr"
                                        placeholder={item.min_ctr}
                                      />
                                    )}
                                  </td>
                                  <td>
                                    {!isIteditable && <p> {item.max_age}</p>}
                                    {isIteditable && (
                                      <input
                                        type="number"
                                        onChange={(e) =>
                                          this.handleChangeCategory(e, item)
                                        }
                                        name="max_age"
                                        placeholder={item.max_age}
                                      />
                                    )}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )} */}
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
                        {siteDetailsData?.categories?.map(
                          (el) => `${el.category.name} `
                        )}
                      </p>
                    </div>
                  )}
                  {isIteditable && categorialOption && (
                    <Select
                      defaultValue={categorialOption?.map((el) => {
                        return this.state.cateOptions.find(
                          (elm) => elm.value === el
                        );
                      })}
                      className="basic-single"
                      classNamePrefix="select"
                      // defaultValue={colourOptions[0]}
                      // isLoading={true}
                      isMulti
                      styles={customSelectStyles}
                      isClearable={false}
                      isSearchable={true}
                      name="merge"
                      options={this.state.cateOptions}
                      onChange={(e) => this.handleOption(e)}
                    />
                  )}
                </div>
                {/* <div className="copySite_div">
                  <h4>Copy from site</h4>
                  {!isIteditable && (
                    <p> {`${siteDetailsData?.copy_from_site}`}</p>
                  )}
                  {isIteditable && (
                    <div>
                      <input
                        type="checkbox"
                        value={
                          copy_from_site !== null
                            ? copy_from_site
                            : siteDetailsData?.copy_from_site
                        }
                        checked={
                          copy_from_site !== null
                            ? copy_from_site
                            : siteDetailsData?.copy_from_site
                        }
                        onChange={(e) =>
                          this.setState({ copy_from_site: e.target.checked })
                        }
                        name="copy_from_site"
                      />{" "}
                      <label htmlFor="check">
                        copy site categories to new posts
                      </label>
                    </div>
                  )}
                </div> */}
                {/* <div className="guessRemote_div">
                  <h4>
                    Guess remote category from url - enter the number of the
                    path segment
                  </h4>
                  {!isIteditable && <p>{siteDetailsData?.guess_remote}</p>}
                  {isIteditable && (
                    <input
                      name="guess_remote"
                      value={this.state.guess_remote}
                      type="number"
                      onChange={(e) => this.handleChange(e)}
                    />
                  )}
                </div> */}
                {/* <div className="indexTag_div">
                  <h4>
                    Index of tag for mapping <br /> (1=first,2=seocnd,..)
                  </h4>
                  {!isIteditable && <p>{siteDetailsData?.tag_map}</p>}
                  {isIteditable && (
                    <input
                      name="tag_map"
                      value={this.state.tag_map}
                      type="number"
                      onChange={(e) => this.handleChange(e)}
                    />
                  )}
                </div> */}
              </div>
              <div className="feedCategoriesDiv">
                <h1>
                  Feed -<span>{`>`}</span> Category
                </h1>
                {siteDetailsData?.feeds?.length !== 0 &&
                  siteDetailsData?.feeds?.map((el) => {
                    if (el.active) {
                      return (
                        <div key={el.id} className="feedCat_div">
                          <Link to={"#"}>{el.url}</Link>
                          {!isIteditable && (
                            <p>
                              {siteDetailsData?.translations.feed?.map((elm) =>
                                elm.feed.id === el.id ? elm.category?.name : ""
                              )}
                            </p>
                          )}
                          {isIteditable && (
                            <div className="selectAndX">
                              <Select
                                // defaultValue={siteDetailsData?.translations.feed?.map(el => el.category.name && `${el.category.id}`)}
                                className="basic-single"
                                classNamePrefix="select"
                                // defaultValue={colourOptions[0]}
                                // isLoading={true}
                                placeholder={siteDetailsData?.translations.feed?.map(
                                  (elm) =>
                                    elm.feed.id === el.id
                                      ? elm.category?.name
                                      : ""
                                )}
                                styles={customSelectStyles}
                                // isClearable={true}
                                isSearchable={true}
                                name={`feed${el.id}`}
                                options={[
                                  { value: "none", label: "None" },
                                  ...this.state.cateOptions,
                                ]}
                                onChange={(e) =>
                                  this.handleFeedTraslation(e, el.id)
                                }
                              />
                              {/* <select>
                                          <option className='options' value="">none selected</option>
                                      </select> */}
                              {/* <img src={xButton} alt="x" /> */}
                            </div>
                          )}
                        </div>
                      );
                    }
                  })}
              </div>

              <div className="remoteCategoriesDiv">
                {/* <div className="divButtonsmaping">
                  <h1>
                    Remote Category -<span>{`>`}</span> Category
                  </h1>
                  {isIteditable && (
                    <div>
                      <SaveButtonEdit
                        labeltext={"Add default"}
                        handleButtonActive={() =>
                          this.handleTreeButtons("AddDefault")
                        }
                        colorization={`ScrapeClass ${
                          whichisit === "AddDefault" && "clicked"
                        }`}
                        customStyle={{ minWidth: "100px" }}
                      />
                      <SaveButtonEdit
                        labeltext={"Clear map"}
                        handleButtonActive={() =>
                          this.handleTreeButtons("clear")
                        }
                        colorization={`ScrapeClass ${
                          whichisit === "clearMap" && "clicked"
                        }`}
                      />
                      <SaveButtonEdit
                        labeltext={"Sunc map"}
                        handleButtonActive={() =>
                          this.handleTreeButtons("syncMap")
                        }
                        colorization={`ScrapeClass ${
                          whichisit === "syncMap" && "clicked"
                        }`}
                      />
                    </div>
                  )}
                </div> */}
                {/* <table>
                  <thead>
                    <tr>
                      <th>
                        <div>
                          <div>
                            <img
                              src={arrowUp}
                              alt="arrow"
                              onClick={() => this.arrowSort("from", "Up")}
                            />
                            <img
                              src={secondarrowDown}
                              alt="arrow"
                              onClick={() => this.arrowSort("from", "Down")}
                            />
                          </div>
                          <p>from</p>
                        </div>
                      </th>
                      <th>
                        <div>
                          <div>
                            <img
                              src={arrowUp}
                              alt="arrow"
                              onClick={() => this.arrowSort("to", "Up")}
                            />
                            <img
                              src={secondarrowDown}
                              alt="arrow"
                              onClick={() => this.arrowSort("to", "Down")}
                            />
                          </div>
                          <p>to</p>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {treeButtonsMotivation !== "clear" &&
                      test2.map((el, key) => {
                        return (
                          <tr
                            key={key}
                            style={{ background: isIteditable && "white" }}
                          >
                            <td>
                              <p className="mainTitleName">{el.mesto}</p>
                            </td>
                            {!isIteditable && (
                              <td>
                                <p>{el.title}</p>
                              </td>
                            )}
                            {isIteditable && (
                              <td>
                                <div className="selectAndXx">
                                  <Select
                                    // defaultValue={siteDetailsData?.translations.feed?.map(el => el.category.name && `${el.category.id}`)}
                                    className="basic"
                                    classNamePrefix="select"
                                    // defaultValue={colourOptions[0]}
                                    // isLoading={true}
                                    // placeholder={siteDetailsData?.translations.feed?.map(elm => elm.feed.id === el.id ? elm.category.name : '')}
                                    styles={customSelectStyles}
                                    isClearable={true}
                                    isSearchable={true}
                                    name={`feed${el.id}`}
                                    // options={this.state.cateOptions}
                                    onChange={(e) =>
                                      this.handleFeedTraslation(e, el.id)
                                    }
                                  />
                                  {/* <img src={xButton} onClick={() => handleDelete} alt="x" /> */}
                {/* </div>
                              </td>
                            )}
                          </tr>
                        );
                      })}
                  </tbody> */}
                {/* // </table> */}
              </div>
              <h1>Ratio</h1>
              {this.state.numberOfRatio.length !== 0 &&
                this.state.numberOfRatio.map((el, index) => (
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
                          isClearable={true}
                          isSearchable={true}
                          name={`feed${el.id}`}
                          options={optionsS}
                          onChange={(e) => {
                            const newRatiolist = [...this.state.numberOfRatio];
                            if (newRatiolist[index]["id"] === el.id) {
                              newRatiolist[index]["id"] = e.value;
                              newRatiolist[index]["name"] = e.label;
                              setTimeout(() => {
                                this.setState({
                                  numberOfRatio: newRatiolist,
                                });
                              });
                            }
                          }}
                          isClearable={false}
                          isOptionDisabled={(option) => option.isdisabled}
                        />
                      </div>
                    )}
                    {!isIteditable && <p>{el.ratio}</p>}
                    {isIteditable && (
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
                            const newRatiolist = [...this.state.numberOfRatio];
                            if (newRatiolist[index]["id"] === el.id) {
                              newRatiolist[index]["ratio"] = parseInt(
                                e.target.value
                              );
                              setTimeout(() => {
                                this.setState({
                                  numberOfRatio: newRatiolist,
                                });
                              });
                            }
                          }
                        }}
                        name="ratio"
                        value={el.ratio}
                      />
                    )}
                    {isIteditable && (
                      <p
                        className="deleteRatioRow"
                        onClick={() => {
                          const newRatiolist = [...this.state.numberOfRatio];
                          if (newRatiolist[index]["id"] === el.id) {
                            const newone = newRatiolist.filter(
                              (elm) => elm.id !== el.id
                            );
                            setTimeout(() => {
                              this.setState({ numberOfRatio: newone });
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
                      const newRatiolist = [
                        ...this.state.numberOfRatio,
                        { id: "", name: "", ratio: "" },
                      ];
                      setTimeout(() => {
                        this.setState({ numberOfRatio: newRatiolist });
                      });
                    }}
                    className="addingButton"
                  >
                    Add ratio
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {isIteditable && (
          <div className="buttonsDiv">
            <SaveButtonEdit
              handleButtonActive={() => this.handleButtonActive("save")}
              labeltext={"Save changes"}
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
  const { SitesListReducer, CategoryReducer, ChartRreducer } = state;
  const {
    getSitesList,
    getSiteDetails,
    deleteSite,
    updateSiteDetails,
    createSite,
  } = SitesListReducer;
  const { getCategoryList, bindCategory, unbindCategory } = CategoryReducer;
  const { specSiteChart } = ChartRreducer;

  return {
    getSiteDetails,
    deleteSite,
    updateSiteDetails,
    createSite,
    getCategoryList,
    unbindCategory,
    bindCategory,
    specSiteChart,
    getSitesList,
  };
};

export default connect(mapStateToProps, null)(SiteDetails);
