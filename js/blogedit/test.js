
let go = (e) => document.getElementById(e);
let app


function open_blog() {

    app = Blogedit.Window();
    
    app.onsave((a) => {
        console.log(a);
        alert("aceptado")
    });
    
    app.open()
}

