
let go = (id) => document.getElementById(id);
let asi = (a, d) => Object.assign(a,d);
let genlink = (e) => {
    return() => {
        if (typeof(e) === "string") {
            document.location.assign(e)
        } else {
            if (typeof(e) === "function") e()
        }
    }
};


class Img extends React.Component {
    state = {

    };
    render() {


        return (
            <div 
                onClick={this.props.click} 
                className={"img " + (this.props.className||"")}
                style={asi(
                    {
                        width:this.props.size||"",
                        height:this.props.size||"",
                    },
                    this.props.style
                )}
            >
                
            </div>
        )
    }
}
