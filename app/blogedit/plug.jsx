function set_plug(name, plug) {
    plugins[name] = plug
};

let Elements = {
    textbox:(id, desc, text, multiline, rich) => ({id:id, text:text, mul:multiline||false, rich:rich||false, type:"textbox", desc:desc}),
    button:(id, desc, img, click) => ({id:id, click:click, type:"button", img:img, desc:desc}),
    image:(id, desc, img) => ({type:"image", id:id, img:img, desc:desc})
}


function create_plug(name, gui = [], template) {
    let salida = (pr, callback) => {
        let pro = asi(pr||template||{}, {});
        
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
                                
                                salida = (
                                    <div id={"tmp-plug_" + x.id} contentEditable="true"  onKeyUp={() => {
                                        let pop = go("tmp-plug_" + x.id)
                                        if (x.rich) {
                                            pro[x.id] = {
                                                text:pop.innerText,
                                                rich:pop.innerHTML
                                            };
                                        } else {
                                            pro[x.id] = pop.innerText;
                                        }
                                        //console.log(pop.innerText)
                                        refresh()
                                    }} className={"plug-gui-textbox " + 
                                    (x.mul?"plug-gui-textbox-mul":"")}>
                                        {pro[x.id]||x.text||""}
                                    </div>
                                )
                            } else if (x.type == "button") {
                                salida = (
                                    <div id={"tmp-plug_" + x.id} contentEditable="true" onClick={() => {
                                        
                                        ;(x.click||(()=>{})) (go("tmp-plug_" + x.id), pro, refresh);
                                        
                                        try {
                                            refresh()
                                        } catch (error) {
                                            
                                        }
                                    }} className={"plug-gui-button"}>
                                        <Img src={x.img} />
                                    </div>
                                )
                            } else if (x.type == "image") {
                                salida = (
                                    <div id={"tmp-plug_" + x.id} className="plug-gui-image" onClick={() => {
                                        let pop = go("tmp-plug_" + x.id);
                                        tools.LoadImageFromFile().then(t=> {
                                            pop.style.backgroundImage = `url('${t}')`;

                                            pro[x.id] = t;
                                            //console.log("cargado")
                                            
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
        return [pro, Gui, refresh, gui, template]
    };
    return salida
}



let plugins = {
    Project: create_plug("Proyecto", [
        Elements.textbox("name", "Titulo", projecto.name, false, false),
        Elements.textbox("desc", "Descripcion", projecto.description, true, false),
        Elements.image("img", "Portada", projecto.img),
    ], {
        
    })
};

let proji = {};

function main_pro() {
    
    proji = plugins.Project({
        name:projecto.name,
        desc:projecto.description,
        img:projecto.img,
        bg:projecto.bg
    }, (pro) => {
        let pop = go("doc");
        //console.log(pop, pro)
        pop.style.backgroundColor = pro.color;
        projecto.bg = pro.color;
        projecto.name = pro.name;
        projecto.img = pro.img;
        projecto.description = pro.desc;
        document.title = `Blogedit: ${projecto.name}`
    });

    document.title = `Blogedit: ${projecto.name}`;
    render_project_tree()
};

setend(main_pro)
