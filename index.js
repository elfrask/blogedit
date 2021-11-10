let express = require("express");
let fs = require("fs")
let cors = require("cors")
//let bp = require("body-parser");
//let galleta = require("cookie-parser");
let app = express();
//app.use(cors({origin:"*"}));

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
//let vineapps = require("./lib/vineapps_api");
function open(p) {
    return {
        read:()=>fs.readFileSync(p, "utf-8"),
        react:(title, r)=>{
            let result = "";
            //console.log(r)

            if (Array.isArray(r)) {
                result = r.map(t => `<script type="text/babel" src="${t}"></script>`).join(" ")
            } else {
                result = `<script type="text/babel" src="${r}"></script>`
            }
            //console.log(result)
            return fs.readFileSync(p, "utf-8").replace(
                "${title}",
                title
            ).replace(
                "${script}", 
                result
            )
        },
        write:(data) => fs.writeFileSync(p, data),
    }
};

//app.use(bp.urlencoded({extended:true}));
//app.use(bp.json());
//app.use(galleta(["vine", "code", "app"]));
app.get("/blogedit", (req, res) => {
    res.send(
        open("./html/template.html").react("Blogedit", [
            "/app/blogedit/guis.jsx",
            "/app/blogedit/plugsystem.jsx",
            "/app/blogedit/main.jsx",
        ])
    )
});

app.get("/", (req, res) => {
    res.send(
        open("./html/test.html").read()
    )
});

(["css", "js", "app", "src"]).forEach(X=>{
    if (!fs.existsSync("./"+X)) {
        fs.mkdirSync("./"+X)
    };
    app.use("/" + X, express.static("./"+X))
});


app.listen(4900, () => {
    console.log("server open in the port 4900")
})