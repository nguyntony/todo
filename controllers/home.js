const { layout } = require("../utils");

const home = (req, res) => {
    res.render("home", {
        ...layout,
        locals: {
            title: "Homepage"
        }
    });
};

module.exports = { home };
