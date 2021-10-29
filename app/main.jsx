

class App extends React.Component {
    render() {
        return (
            <div className="fill">
                <div className="head">
                    
                    
                </div>
                <div className="body">
                    <div className="doc l">
                        <div className="documento" id="doc">

                        </div>
                    </div>
                    <div className="pro l">
                        <div className="head" style={{backgroundColor:"#445"}}>
                            <div className="bt_head">Proyecto</div>
                            <div className="bt_head">Diseño</div>
                            <div className="bt_head">Script</div>
                        </div>
                        <div className="body" style={{backgroundColor:"transparent"}}>
                            interfaz
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


ReactDOM.render(
    <App></App>,
    go("__body__"),
    () => {
        
    }
)