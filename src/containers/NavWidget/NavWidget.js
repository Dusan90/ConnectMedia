import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./NavWidget.scss";
import edit from "../../assets/img/SiteDetails/Frame.svg";
import editBlack from "../../assets/img/SiteDetails/editBlack(1).svg";
import stats from "../../assets/img/SiteDetails/Frame(1).svg";
import statsBlack from "../../assets/img/SiteDetails/statsBlack.svg";
import posts from "../../assets/img/SiteDetails/Frame(2).svg";
import postsBlack from "../../assets/img/SiteDetails/postsBlack.svg";
import widgets from "../../assets/img/SiteDetails/Frame(3).svg";
import widgetsBlack from "../../assets/img/SiteDetails/widgetsBlack.svg";
import trash from "../../assets/img/SiteDetails/Icons9.svg";
import Util from "../../containers/util";

function NavWidget({
  handleWhereEverNav,
  pageName,
  handleTrashClick,
  isButtonNamepased,
  wordToPass,
  isCustom,
}) {
  const [whichIsActive, setWhichIsActive] = useState(
    isButtonNamepased ? isButtonNamepased : "siteDetails"
  );

  const history = useHistory();

  useEffect(() => {
    if (isButtonNamepased) {
      handlePageChange(isButtonNamepased);
    }
  }, []);

  const handlePageChange = (page) => {
    setWhichIsActive(page);
    handleWhereEverNav(page);
  };

  return (
    <div className="mainSiteDetailsNavigation">
      <div className="siteDetailsNavigate">
        <div
          onClick={() => {
            return handlePageChange("goback"), history.goBack();
          }}
          className={`goback ${whichIsActive === "goback" && "active"}`}
        >
          <p>GO BACK</p>
        </div>
        <div
          onClick={() => handlePageChange("siteDetails")}
          className={`siteDetails ${
            whichIsActive === "siteDetails" && "active"
          }`}
        >
          <p>Site details</p>
        </div>
        {Util.isRoot() && (
          <div
            onClick={() => handlePageChange("editDiv")}
            className={`editDiv ${
              whichIsActive === "editDiv" &&
              wordToPass !== "canceled" &&
              "active"
            }`}
          >
            <img
              src={
                whichIsActive === "editDiv" && wordToPass !== "canceled"
                  ? editBlack
                  : edit
              }
              alt="edit"
            />
            <p>edit</p>
          </div>
        )}
        {pageName !== "users" && pageName !== "categories" && (
          <div
            onClick={() => handlePageChange("statsDiv")}
            className={`statsDiv ${whichIsActive === "statsDiv" && "active"}`}
          >
            <img
              src={whichIsActive === "statsDiv" ? statsBlack : stats}
              alt="stats"
            />
            <p>stats</p>
          </div>
        )}
        {pageName === "posts" && isCustom && (
          <div
            onClick={() => handlePageChange("promoDiv")}
            className={`promoDiv ${whichIsActive === "promoDiv" && "active"}`}
          >
            <img
              src={whichIsActive === "promoDiv" ? statsBlack : stats}
              alt="promo"
            />
            <p>promo</p>
          </div>
        )}
        {(pageName === "users" || pageName === "categories") && (
          <div
            onClick={() => handlePageChange("sitesDiv")}
            className={`sitesDiv ${whichIsActive === "sitesDiv" && "active"}`}
          >
            <img
              src={whichIsActive === "sitesDiv" ? postsBlack : posts}
              alt="posts"
            />
            <p>sites</p>
          </div>
        )}
        {pageName === "widgets" && Util.isRoot() && (
          <div
            onClick={() => handlePageChange("viewDiv")}
            className={`viewDiv ${whichIsActive === "viewDiv" && "active"}`}
          >
            <img
              src={whichIsActive === "viewDiv" ? postsBlack : posts}
              alt="posts"
            />
            <p>view</p>
          </div>
        )}
        {pageName === "widgets" && Util.isRoot() && (
          <div
            onClick={() => handlePageChange("embedDiv")}
            className={`embedDiv ${whichIsActive === "embedDiv" && "active"}`}
          >
            {/* <img src={whichIsActive === 'viewDiv' ? postsBlack : posts} alt="posts" /> */}
            <p>embed</p>
          </div>
        )}
        {pageName !== "posts" && pageName !== "widgets" && (
          <div
            onClick={() => {
              return handlePageChange("postsDiv");
            }}
            className={`postsDiv ${whichIsActive === "postsDiv" && "active"}`}
          >
            <img
              src={whichIsActive === "postsDiv" ? postsBlack : posts}
              alt="posts"
            />
            <p>posts</p>
          </div>
        )}
        {pageName !== "posts" && pageName !== "widgets" && (
          <div
            onClick={() => handlePageChange("widgetsDiv")}
            className={`widgetsDiv ${
              whichIsActive === "widgetsDiv" && "active"
            }`}
          >
            <img
              src={whichIsActive === "widgetsDiv" ? widgetsBlack : widgets}
              alt="widgets"
            />
            <p>widgets</p>
          </div>
        )}
        {Util.isRoot() && (
          <div className="trashDiv">
            <img src={trash} onClick={handleTrashClick} alt="trash" />
          </div>
        )}
      </div>
    </div>
  );
}

export default NavWidget;
