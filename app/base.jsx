
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
let range = (
    (i, f, step) =>  
    {i=i||0;f=f||1;step=step||1;let out=[];
    for(let ii=i; ii<f;ii=ii+step){out.push(ii)};
    return out}
);


class Img extends React.Component {
    state = {
        
    }
    render() {


        return (
            <div 
                onClick={genlink(this.props.click)} 
                className={"img " + (this.props.className||"")}
                style={asi(
                    {
                        width:this.props.size||"",
                        height:this.props.size||"",
                        BackgroundImage:`url('${this.props.src||""}')`
                    },
                    this.props.style
                )}
            >

            </div>
        )
    }
}
