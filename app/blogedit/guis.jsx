
let projecto = {
    name:"Sin Titulo",
    bg:"#00000000",
    description:"",
    img:"",
    data:[],
    
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
    
    console.log(pro, Gui)
    
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


function render_project_tree() {
    ReactDOM.render(
        <Nodo title={"Project: " + projecto.name} click={() => {
            open_propertys(proji[0], proji[1], () => {})
        }}>
            {projecto.data.map(x=> {

            })} 

            <input type="color"></input>
        </Nodo>,
        go("tree_proj"),
        () => {}
    )
}



class Project_gui extends React.Component {
    render() {
        return (
            <div id="tree_proj" className="container" style={{
                backgroundColor:"#00000055",
                overflowX:"hidden"
            }}>

                
                
            </div>
        )
    }
}