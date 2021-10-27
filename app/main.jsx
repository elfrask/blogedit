

class App extends React.Component {
    render() {
        return (
            <div className="fill">
                <div className="head">
                    {range(0, 10).map(x=>"Hola")}
                </div>
                <div className="body">
                    <div id="doc" className="doc l">

                    </div>
                    <div id="pro" className="pro l">

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