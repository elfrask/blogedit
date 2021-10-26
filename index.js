let express = require("express");
let fs = require("fs")
//let bp = require("body-parser");
//let galleta = require("cookie-parser");
let app = express();
//let vineapps = require("./lib/vineapps_api");
function open(p) {
    return {
        read:()=>fs.readFileSync(p, "utf-8"),
        react:(r)=>fs.readFileSync(p, "utf-8") + `<script type="text/babel" src="${r}"></script>`,
        write:(data) => fs.writeFileSync(p, data),
    }
};

//app.use(bp.urlencoded({extended:true}));
//app.use(bp.json());
//app.use(galleta(["vine", "code", "app"]));
app.get("/", (req, res) => {
    res.send(
        open("./html/template.html").react("/app/main.jsx")
    )
});

(["css", "js", "app"]).forEach(X=>{
    if (!fs.existsSync("./"+X)) {
        fs.mkdirSync("./"+X)
    };
    app.use("/" + X, express.static("./"+X))
});


app.listen(4900, () => {
    console.log("server open in the port 4900")
})