import React from "react";

const data = [{ img: "img", title: "title", date: "date" }];

function ViewWidgets({ data }) {
  return (
    <div
      className="mainDivStyle"
      contentEditable="true"
      dangerouslySetInnerHTML={{ __html: data }}
    >
      {/* 
            {data.length !== 0 ? data.map(el => <div className="mapedDiv">
                <img className="imgStyle" src="https://thumb1.shutterstock.com/mosaic_250/2389049/1365289022/stock-photo-a-surreal-image-of-an-african-elephant-wearing-black-and-white-zebra-stripes-1365289022.jpg" alt="asdf" />
                <h1 className="h1Style">Naslov neki tamo koji ce iskociti kao glavni</h1>
                <p className="pStyle">07/10/2021 ∙ 09:35 ∙ Politika</p>
            </div>) : <p className='loadingOnBig' style={{ textAlign: 'center' }}>Loading...</p>} */}
      {/* <iframe title="Iframe Example">{data}</iframe>
      <iframe
        src="https://connectmedia.rs/api/v1/widget/6/test"
        width="100%"
        height="500px"
        title="description"
      ></iframe> */}
    </div>
  );
}

export default ViewWidgets;
