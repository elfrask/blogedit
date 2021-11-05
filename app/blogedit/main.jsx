
let screens = []
let open_gui = (gui) => {
    screens.forEach(x=>{(x).style.display = "none"});
    screens[gui].style.display = "block";
} 


let create_option = (img, call) => ({img:img, call:call})

let options = [
    create_option("/src/img/rich/bold.png", () => {
        document.execCommand("bold")
    }),
    create_option("/src/img/rich/italic.png", () => {
        document.execCommand("italic")
    }),
    create_option("/src/img/rich/underline.png", () => {
        document.execCommand("underline")
    }),
];


class App extends React.Component {
    render() {
        return (
            <div className="fill">
                <div className="head">
                    <div className="bt_head r" onClick={genlink(()=>open_gui(3))}>
                        <Img src={"/src/img/preferences.png"} size="30px" />
                    </div>
                </div>
                <div className="body">
                    <div className="doc l">
                        <div className="documento" id="doc">

                        </div>
                    </div>
                    <div className="pro l">
                        <div className="head" style={{backgroundColor:"#445"}}>
                            
                            {
                                ([
                                    ["/src/img/project.png", () => {open_gui(0); render_project_tree()}],
                                    ["/src/img/config.png", () => open_gui(1)],
                                    ["/src/img/project.png", () => open_gui(2)],
                                ]).map(x=> {
                                    return(
                                        <div className="bt_head" onClick={genlink(x[1])}>
                                            <Img src={x[0]} size="30px" />
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className="body" style={{backgroundColor:"transparent"}}>
                            {([
                                ["proj", Project_gui], 
                                ["arg"], 
                                ["script"], 
                                ["conf"]
                            ]).map(x=>{
                                screens.push(x[0])
                                let Ren = x[1]||(()=><div/>)
                                return(
                                    <div id={x[0]} className="box-pro">
                                        <Ren/>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <div id="keyrich" className="keyHelp rich">
                    <div className="container rich" style={{
                        backgroundColor:"#00000033"
                    }}>
                        {
                            options.map(x=>{
                                return(
                                    <button className="bt_head rich" onClick={x.call}>
                                        <Img src={x.img} size="25px" className="rich" />
                                    </button>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
};


document.addEventListener("click", (e) => {
    let mod = e.target;

    while (true) {
        
        if (mod.tagName!=="BODY") break


        if (mod.tagName!=="DIV") {
            console.log(mod)
            if (mod.classList.length===0) {
                mod = mod.parentNode
                
            } else {
                break
                
            }
            
        } else {
            mod = mod.parentNode
        }
    }

    console.log(mod)

    let targ = (
        mod.className.match("plug-gui-textbox-rich")||
        mod.className.match("rich")||
        mod.className.match("keyboard-gui")
    );

    //console.log(targ)


    if(targ) {
        go("keyrich").style.height = "max-content";
    } else {
        go("keyrich").style.height = "0px";
    }

})

ReactDOM.render(
    <App></App>,
    go("__body__"),
    () => {
        screens = screens.map(x=>go(x))
        open_gui(0);
        render_project_tree();
        loads_fin.forEach(x=>x())
    }
)
