const Util = {
  isRoot() {
    const sessionData = JSON.parse(sessionStorage.getItem("root"));

    return sessionData;
  },
};

export default Util;
