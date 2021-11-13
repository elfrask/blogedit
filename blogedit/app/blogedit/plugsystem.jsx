function set_plug(plug) {
    plugins[plug.name] = plug
};

let Elements = {
    textbox:(id, desc, text, multiline, rich) => ({id:id, text:text, mul:multiline||false, rich:rich||false, type:"textbox", desc:desc}),
    button:(id, desc, img, click) => ({id:id, click:click, type:"button", img:img, desc:desc}),
    image:(id, desc, img) => ({type:"image", id:id, img:img, desc:desc}),
    color:(id, desc, color) => ({type:"color", id:id, desc:desc, color:color}),
}


function create_plug(name, gui = [], gen=none) {
    

    let salida = (pr, callback) => {
        let pro = asi(pr||{}, {});
        
        function refresh() {
            (callback||(() =>{}))(pro)
        }

        class Gui extends React.Component{
            render() {
                return (
                    <div className="container" style={{
                        backgroundColor:"#00000055",
                        overflowX:"hidden"
                    }}>
                        <div className="name-plug">
                            {name||"Plugin sin nombre"}
                        </div>
                        {gui.map(x=>{
                            let salida = []
                            //console.log(x)
                            if (x.type == "textbox") {

                                let press = () => {
                                    let pop = go("tmp-plug_" + x.id)
                                    if (x.rich) {
                                        pro[x.id] = pop.innerHTML
                                        /*{
                                            text:pop.innerText,
                                            rich:pop.innerHTML
                                        };*/
                                    } else {
                                        pro[x.id] = pop.value;
                                    }
                                    //console.log(pop.innerText)
                                    refresh()
                                };

                                if (x.rich) {
                                    salida = (
                                        <div id={"tmp-plug_" + x.id} contentEditable="true"  onKeyUp={press} 
                                        className={"plug-gui-textbox " + 
                                        (x.mul?"plug-gui-textbox-mul":"") + " " +
                                        (x.rich?"plug-gui-textbox-rich":"")
                                        } dangerouslySetInnerHTML={{
                                            __html:(pro[x.id]||tohtml(x.text)||"")
                                        }} style={{
                                            lineHeight:"normal"
                                        }}>
                                           
                                        </div>
                                    )
                                    
                                } else {
                                    if (x.mul) {
                                        salida=(
                                            <textarea onKeyUp={() => {press()}}
                                            onInput={(e) => {
                                                auto_grow(e.target)
                                            }}
                                            style={{
                                                height:"45px"
                                            }}
                                            id={"tmp-plug_" + x.id}
                                            className={"plug-gui-textbox-input " + 
                                            (x.mul?"plug-gui-textbox-mul":"") + " " +
                                            (x.rich?"plug-gui-textbox-rich":"")
                                            }>
                                                {(pro[x.id]||(x.text)||"")}
                                            </textarea>
                                        )
                                    } else {
                                        
                                        salida = (
                                            <input onKeyUp={press} id={"tmp-plug_" + x.id}
                                            className={"plug-gui-textbox-input " + 
                                            (x.mul?"plug-gui-textbox-mul":"") + " " +
                                            (x.rich?"plug-gui-textbox-rich":"")
                                            }
                                            type="text" 
                                            defaultValue={(pro[x.id]||(x.text)||"")}
                                            />
                                        )
                                    }

                                }
                            } else if (x.type == "button") {
                                salida = (
                                    <button id={"tmp-plug_" + x.id} onClick={() => {
                                        
                                        ;(x.click||(()=>{})) (go("tmp-plug_" + x.id), pro, refresh);
                                        
                                        try {
                                            refresh()
                                        } catch (error) {
                                            
                                        }
                                    }} className={"plug-gui-button"}>
                                        <Img src={x.img} />
                                    </button>
                                )
                            } else if (x.type == "color") {
                                salida = (
                                    <input id={"tmp-plug_" + x.id} type="color" onChange={(t) => {
                                        
                                        pro[x.id] = go("tmp-plug_" + x.id).value;
                                        refresh()
                                        
                                    }} className={"plug-gui-color"} value={x.color||"#ffffff"} />
                                )
                            } else if (x.type == "image") {
                                salida = (
                                    <div id={"tmp-plug_" + x.id} className="plug-gui-image" 
                                    style={{
                                        backgroundImage:`url('${pro.img}')`
                                    }}
                                    onClick={() => {
                                        let pop = go("tmp-plug_" + x.id);
                                        tools.LoadImageFromFile().then(t=> {
                                            pop.style.backgroundImage = `url('${t}')`;

                                            pro[x.id] = t;
                                            //console.log("cargado")
                                            refresh()
                                            
                                        }).catch(t=>{
                                            //console.log("error")
                                            pop.addEventListener("error", () => {
                                                pop.style.transition = "0.4s";
                                                pop.style.backgroundColor="red"
                                                console.log("no cargado")
                                                setTimeout(() => {
                                                    pop.style.backgroundColor="-"
                                                }, 1000)
                                            })
                                        })
                                    }}>


                                    </div>
                                )
                            }
                            return (
                                <div className="proter">
                                    <div className="value-desc">
                                        {x.desc||"Sin descripcion"}:
                                    </div>
                                    {salida}
                                </div>
                            )
                        })}
                        
                    </div>
                )
            }
        };
        refresh()
        return {
            pro:pro,
            Gui:Gui,
            update:refresh,
            template:gui,
            name:name,
            generator:gen,
            onChange:callback
        }
    };
    return({
        name:name,
        template:gui,
        generator:gen,
        create:salida
    })
}

let VoidPlug = create_plug("void", [], []);

let loading = {};

let proji = VoidPlug.create();

let ProjectTemplate = create_plug("Entrada", [
    Elements.textbox("title", "Titulo", projecto.title, false, false),
    Elements.textbox("desc", "Descripcion", projecto.description, true, false),
    Elements.image("img", "Portada", projecto.img),
    
])

function main_pro() {
    
    proji = ProjectTemplate.create({
        title:projecto.title,
        desc:projecto.description,
        img:projecto.img,
        //bg:projecto.bg
    }, (pro) => {
        let pop = go("doc");
        //console.log(pop, pro)
        pop.style.backgroundColor = pro.color;
        //projecto.bg = pro.color;
        projecto.title = pro.title;
        projecto.img = pro.img;
        projecto.description = pro.desc;
        document.title = `Blogedit: ${projecto.title}`
    });

    document.title = `Blogedit: ${projecto.title}`;

    ReactDOM.render(
        <proji.Gui/>,
        go("arg"),
        () => {
        	go("doc").innerHTML = projecto.data;
            let g = document.getElementsByTagName("textarea");
            setTimeout(() => {
                toArray(g).forEach(x=> {
                    auto_grow(x)
                })

            }, 1000)
        }
    );

};

setend(main_pro)
