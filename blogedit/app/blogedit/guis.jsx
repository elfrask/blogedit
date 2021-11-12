
let projecto = {
    title:"Sin Titulo",
    description:"",
    img:"",
    data:"",
};

let engine = {
    save: () => {
        projecto.data = go("doc").innerHTML
        events.save(projecto);
    },
    close: () => {
        events.close(projecto);
        
    },
    public: () => {
        events.public(projecto);
        
    },
}


class Bn extends React.Component {
    state = {

    }
    render() {
        return (
            <div
            id={this.props.id} 
            className={"box-node " + (this.props.className||"")}
            style={this.props.style}
            >
                {this.props.children}
            </div>
        )
    }
}

class Nodo extends React.Component {
    state = {
        show:false
    }
    render() {

        let click = () => {
            this.setState({
                show:!this.state.show
            })
        };

        if (this.props.click) {
            click = genlink(this.props.click);
            this.state.show = true
        };

        return (
            <div className="node">
                <div className="node-title" onClick={click}>
                    {this.props.title||"Titulo"}
                </div>
                <div className="node-list" style={{
                    display:(this.state.show?"block":"none")
                }}>
                    {this.props.children}
                </div>
            </div>
        )
    }
}


function open_propertys(pro, Gui, callback) {
    
    //console.log(pro, Gui)
    
    ReactDOM.render(
        <div>
            <Gui pro={pro||{}}/>
            total
        </div>,
        go("arg"),
        () => {
            
            ;(callback||(()=>{}))();

            open_gui(1);
        }
    )
}

function op_f(name, call) {
    return {
        name:name,
        call:call
    }
}

let op_file = [
    op_f("Guardar", () => engine.save()),
    op_f("Publicar", () => engine.public()),
    op_f("Cerrar", () => engine.close()),
    op_f("Abrir Archivo", () => {
        tools.LoadFile("*.json").then(x=>{
            x.text().then(s=>{
                let load = JSON.parse(s);

                projecto = load;
                //console.log(s)
                main_pro()
            })
        })
    }),
    op_f("Guardar como Archivo", () => {
        projecto.data = go("doc").innerHTML;
        tools.SaveFile(JSON.stringify(projecto), projecto.title+".json")
    }),
    op_f("Exportar como HTML5", () => {
        projecto.data = go("doc").innerHTML;
        tools.SaveFile(projecto.data, projecto.title+".html")
    }),
    
]

class Project_gui extends React.Component {
    render() {
        return (
            <div id="tree_proj" className="container" style={{
                backgroundColor:"#00000055",
                overflowX:"hidden"
            }}>
                {op_file.map(x=>{

                    return(
                        <div className="bt_head" onClick={x.call} style={{
                            width:"100%"
                        }}>
                            {x.name}
                        </div>
                    )
                })}
            </div>
        )
    }
}

class Info_gui extends React.Component {
    render() {
        return (
            <div className="container" style = {{
                backgroundColor:"#00000055",
                overflowX:"hidden",
                padding:"10px",
                width:"calc(100% - 20px)",
                height:"calc(100% - 20px)",
            }}>
                Blogedit es un editor/CMS basico hecho para el 
                desarrollo de la informacion para personas externas
                o internas al equipo.
                <br />
                <br />
                Autor: <a href="https://portafolio.frask.repl.co"
                style={{color:"gold"}}>Frask Dreemurr</a>  
                <br />
                Version: 1.0
            </div>
        )
    }
}

let pos_doc = [];

