
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
let loads_fin = [];
function setend(p) {
    loads_fin.push(p)
}
let range = (
    (i, f, step) =>  
    {i=i||0;f=f||1;step=step||1;let out=[];
    for(let ii=i; ii<f;ii=ii+step){out.push(ii)};
    return out}
);

let tools = {
    pickColor:(x, y) => new Promise((res, err) => {
        let meno = document.createElement("input");
        meno.type = "color";
        asi(meno.style, {
            position:"absolute",
            top:(x||0)+"px",
            left:(y||0)+"px",
            opacity:"0"
        })
        meno.addEventListener("change", (t) => {
            console.log("llego", meno.value)
            res(meno.value+"")
            meno.remove()
            
        })
        meno.addEventListener("abort", (x) => {
            err(x)
        })
        document.body.appendChild(meno);
        meno.click();
    }),
    LoadImageFromFile:() => new Promise((res, err) => {
        let file = document.createElement("input")
        file.type = "file";
        file.accept = "image/*";
        file.style.display = "none"
        document.body.appendChild(file)
        file.onchange = () => {console.log("cambio")}
        
        file.addEventListener("change", (t) => {
            let fit = file.files[0];
            let read = new FileReader();
            
            console.log("llego")

            read.addEventListener("loadend", () => {
                res(read.result)
                file.remove()
            });
            read.addEventListener("error", err)

            read.readAsDataURL(fit)
        });
        

        file.click()
    })
}


class Img extends React.Component {
    state = {
        
    }
    render() {

        //console.log(this.props)
        return (
            <div 
                onClick={genlink(this.props.click)} 
                className={"img " + (this.props.className||"")}
                style={asi(
                    {
                        width:this.props.size||"",
                        height:this.props.size||"",
                        backgroundImage:`url('${this.props.src||""}')`
                    },
                    this.props.style
                )}
            >

            </div>
        )
    }
}
