function set_plug(name, plug) {
    plugins[name] = plug
};

let Elements = {
    textbox:(id, text, multiline, rich) => ({id:id, text:text, mul:multiline||false, rich:rich||false, type:"textbox"}),
    button:(id, click) => ({id:id, click:click, type:"button"}),
}

function refresh() {
    
}

function create_plug(gui = []) {
    let pro = {};

    class Gui extends React.Component{
        render() {
            return (
                <div>
                    {gui.map(x=>{
                        let salida = []
                        if (x.type == "textbox") {
                            
                            salida = (
                                <div id={"tmp-plug_" + x.id} contentEditable="true" onChange={() => {
                                    if (x.rich) {
                                        let pop = go("tmp-plug_" + x.id)
                                        pro[x.id] = {
                                            text:pop.innerText,
                                            rich:pop.innerHTML
                                        };
                                        
                                    } else {
                                        
                                        pro[x.id] = go("tmp-plug_" + x.id).innerText;
                                    }
                                    
                                    refresh()
                                }} className={"plug-gui-textbox " + 
                                (x.mul?"plug-gui-textbox-mul":"")}>
                                    {pro[x.id]||x.text||""}
                                </div>
                            )
                        } else if (x.type == "button") {

                        }

                    })}
                </div>
            )
        }
    };

    return [pro, Gui]
}



let plugins = {
    Project:create_plug([
        Elements.textbox("name", projecto.name, false, false)
    ])
};
