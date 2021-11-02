function set_plug(name, plug) {
    plugins[name] = plug
};

let Elements = {
    textbox:(id, text, multiline, rich) => ({id:id, text:text, mul:multiline||false, rich:rich||false, type:"textbox"}),
    button:(id, img, click) => ({id:id, click:click, type:"button", img:img}),
    image:(id, img) => ({type:"image", id:id, img:img})
}


function create_plug(gui = []) {
    let salida = (pr, callback) => {
        let pro = pr||{};
        
        function refresh() {
            (callback||(() =>{}))(pro)
        }

        class Gui extends React.Component{
            render() {
                return (
                    <div>
                        {gui.map(x=>{
                            let salida = []
                            console.log(x)
                            if (x.type == "textbox") {
                                
                                salida = (
                                    <div id={"tmp-plug_" + x.id} contentEditable="true" onChange={() => {
                                        let pop = go("tmp-plug_" + x.id)
                                        if (x.rich) {
                                            pro[x.id] = {
                                                text:pop.innerText,
                                                rich:pop.innerHTML
                                            };
                                        } else {
                                            pro[x.id] = pop.innerText;
                                        }
                                        
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
                                    <div id={"tmp-plug_" + x.id} className="plug-gui-image">

                                    </div>
                                )
                            }
                            return salida
                        })}
                    </div>
                )
            }
        };

        return [pro, Gui, refresh, gui]
    };
    return salida
}




let plugins = {
    Project: create_plug([
        Elements.textbox("name", projecto.name, false, false),
        Elements.textbox("desc", projecto.description, true, false),
        Elements.image("img", projecto.img),
        Elements.button("color", "/src/icon/color.png", (obj, pro, ref) => {
            tools.pickColor(obj.offsetLeft, obj.offsetTop + obj.offsetHeight).then((x)=>{
                x.style.backgroundColor = x;
                pro.color = x;
                console.log("teo:", pro)
                ref()
            })
        })
    ])
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
        console.log(pop, pro)
        pop.style.backgroundColor = pro.color;
        projecto.bg = pro.color;
        projecto.name = pro.name;
        projecto.img = pro.img;
        projecto.description = pro.desc;
        document.title = `Blogedit: ${projecto.name}`
    })
};

setend(main_pro)
