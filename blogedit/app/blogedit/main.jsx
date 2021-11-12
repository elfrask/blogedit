
let screens = []
let open_gui = (gui) => {
    screens.forEach(x=>{(x).style.display = "none"});
    screens[gui].style.display = "block";
} 


let create_option = (img, call) => ({img:img, call:call})

let options = [
    create_option("src/img/rich/bold.png", () => {
        document.execCommand("bold")
    }),
    create_option("src/img/rich/italic.png", () => {
        document.execCommand("italic")
    }),
    create_option("src/img/rich/underline.png", () => {
        document.execCommand("underline")
    }),
    create_option("src/img/rich/size.png", () => {
        open_hedi((
            <input 
            id="tmp-range-up" 
            type="range" 
            className="fill" 
            max="7" 
            min="1" 
            onChange={(e) => {
                console.log(e.target.value)
                document.execCommand("fontSize", false, parseInt(e.target.value))
            }}/>
        ), imagen("src/img/rich/size.png", "30px"), () => {
            go("tmp-range-up").value = "3"
        })
    }),
    create_option("src/img/rich/l.png", () => {
        document.execCommand("justifyLeft")
    }),
    create_option("src/img/rich/center.png", () => {
        document.execCommand("justifyCenter")
    }),
    create_option("src/img/rich/r.png", () => {
        document.execCommand("justifyRight")
    }),
    create_option("src/img/rich/justify.png", () => {
        document.execCommand("justifyFull")
    }),
    create_option("src/img/rich/color.png", (obj) => {
        open_hedi(
            <input type="color" className="fill" onChange={(e) => {
                document.execCommand("foreColor", false, e.target.value)
                obj.style.backgroundColor = e.target.value
            }} />,
            imagen("src/img/rich/color.png", "30px")
        )
    }),
    create_option("src/img/rich/paletter.png", (obj) => {
        open_hedi(
            <input type="color" className="fill" onChange={(e) => {
                document.execCommand("backColor", false, e.target.value)
                obj.style.backgroundColor = e.target.value
            }} />,
            imagen("src/img/rich/paletter.png", "30px")
        )
    }),
    create_option("src/img/rich/del.png", () => {
        document.execCommand("removeFormat")
    }),
    create_option("src/img/rich/img.png", () => {
        tools.LoadImageFromFile().then(x=>{
            document.execCommand(
                "insertHTML", 
                false, 
                `<img src="${x}" width="100%" height="400px">`
            );
            document.execCommand("justifyCenter")
            
        })
    }),
    create_option("src/img/rich/link.png", (obj) => {
        open_hedi(
            <input type="text" className="fill text-gui-up" id="tmp-gui-up-link" />,
            imagen("/src/img/rich/link.png", "30px"),
            none,
            () => {
                let pop = go("tmp-gui-up-link");
                let link = pop.value
                document.execCommand("createLink", false, link)
                document.execCommand("foreColor", false, "orange")
            }
        )
    }),
    create_option("src/img/rich/unlink.png", () => {
        document.execCommand("unlink");
        document.execCommand("removeFormat");
        document.execCommand("fontSize", false, 3)
    })
    
    
];



function imagen(src, size) {
    return(
        <Img src={src} size={size}/>
    )
}

let hedi_done = none;

function open_hedi(Gui, icon, call, hedi_call) {
    
    hedi_done = () => {
        (hedi_call||none)();
        hedi_done = none;
    }

    ReactDOM.render(
        Gui,
        go("hedi_gui"),
        () => {
            go("hedi").style.display="block";
            (call||(() =>{}))()
        }
    )
    ReactDOM.render(
        icon,
        go("img_hedi"),
    )
    
}


let prop = false;
function show_hidden_prop() {
    prop = !prop
    go("propers").style.zIndex = (prop?"1":"-1")
}

class App extends React.Component {
    render() {
        return (
            <div className="fill">
                <div className="head">
                    <div className="bt_head l" onClick={engine.save}>
                        <Img src={"src/img/save.png"} size="30px" />
                    </div>
                    <div className="bt_head l" onClick={engine.close}>
                        <Img src={"src/img/close.png"} size="30px" />
                    </div>
                    

                    <div className="bt_head r port" onClick={() => {
                        show_hidden_prop()
                    }}>
                        <Img src={"src/img/ops.png"} size="30px" />
                    </div>
                    
                </div>
                <div className="hedi" id="hedi" style={{display:"none"}}>
                    <button className="bt_head l" onClick={(e) => {
                        go("hedi").style.display = "none"
                        hedi_done(e)
                    }}>
                        <Img src={"src/img/rich/done.png"} size="30px" />
                    </button>
                    <div className="medio l" style={{
                        width:"50px",
                        height:"50px"
                    }} id="img_hedi">

                    </div>
                    <div className="container l" id="hedi_gui" style={{
                        backgroundColor:"#00000033",
                        width:"calc(100% - 160px)",
                    }}>

                    </div>
                </div>
                <div className="body">
                    <div className="doc l">
                        <div className="documento rich" contentEditable="true" id="doc" onKeyUp={(e) => {
                            projecto.data = e.target.innerHTML;
                            console.log("cambio")
                        }}>
                            
                        </div>
                    </div>
                    <div className="pro l" id="propers">
                        <div className="head" style={{backgroundColor:"#445"}}>
                            
                            {
                                ([
                                    ["src/img/config.png", () => open_gui(0)],
                                    ["src/img/project.png", () => open_gui(1)],
                                    ["src/img/info.png", () => open_gui(2)],
                                ]).map(x=> {
                                    return(
                                        <div className="bt_head"
                                        style={{
                                            width:"33.33333333333%"
                                        }} 
                                        onClick={genlink(x[1])}>
                                            <Img src={x[0]} size="30px" />
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className="body-base" style={{backgroundColor:"transparent"}}>
                            {([
                                ["arg"],
                                ["proj", Project_gui], 
                                ["pre", Info_gui],
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
                    <div className="container rich keygui" id="richi" style={{
                        backgroundColor:"#00000033",
                        display:"block"
                    }}>
                        <div 
                        className="rich"
                        style={{
                            width:"max-content"
                        }}
                        >
                            {
                                options.map((x, y)=>{
                                    return(
                                        <button id={"keyhelp-" + y} className="bt_head rich" onClick={() => x.call(go("keyhelp-" + y))}>
                                            <Img src={x.img} size="25px" className="rich" />
                                        </button>
                                    )
                                })
                            }

                        </div>
                    </div>
                    
                </div>
            </div>
        )
    }
};


document.addEventListener("click", (e) => {
    return false
    let mod = e.target;

    while (true) {

        
        
        if ([undefined, null].includes(mod.tagName)) return null
        if (mod.tagName==="BODY") break


        if (mod.tagName==="DIV") {
            //console.log(mod.classList)
            if (mod.classList.length===0) {
                mod = mod.parentNode
                
            } else {
                break
                
            }
            
        } else {
            mod = mod.parentNode
        }
    }

    //console.log(mod)

    let targ = (
        mod.className.match("plug-gui-textbox-rich")||
        mod.className.match("rich")||
        mod.className.match("keyboard-gui")
    );

    let ro = toArray(document.getElementsByClassName("rich-open"));
    let kg = toArray(document.getElementsByClassName("keygui"));
    //console.log(ro)

    let cgui = mod.className.match("rich");

    if(targ) {
        go("keyrich").style.height = "max-content";
        
        ro.forEach(x=>{
            x.style.display ="block"
        })

        if (!cgui) {
            kg.forEach(x=>{
                x.style.display = "none"
            });

            go("richi").style.display = "block"

        }
        
    } else {
        go("keyrich").style.height = "0px";
        ro.forEach(x=> {
            x.style.display = "none";

        })
        
    }

})

function reload(p) {
    projecto = p||projecto;

    main_pro();
    go("")
}

ReactDOM.render(
    <App></App>,
    go("__body__"),
    () => {
        screens = screens.map(x=>go(x))
        open_gui(0);
        
        loads_fin.forEach(x=>x())
        events.load({
            events:events,
            project:projecto,
            load:(e) => {
                e=e||{};
                asi(projecto, e);
                //console.log(projecto)
                main_pro();
            }
        })
    }
)
