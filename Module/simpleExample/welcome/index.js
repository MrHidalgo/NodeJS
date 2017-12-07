const evening = require("./evening"),
    morning = require("./morning");

module.exports = {
  getMorningMessage: () => {
      console.log(`${morning}`);
  },
  getEveningMessage: () => {
      console.log(`${evening}`);
  }
};
