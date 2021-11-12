
let go = (e) => document.getElementById(e);
let app
let data = {};


function open_blog() {

    app = Blogedit.App();
    
    app.onsave((a) => {
        console.log(a);
        data = a;
        go("content").innerHTML= data.data;
    });

    app.onload((x) => {
        console.log("Cargado perros")
        x.load(data)
    })
    
    app.open.win()
}

