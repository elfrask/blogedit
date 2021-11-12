
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
let toArray = (t=[]) => {
    let a = []; 
    //console.log(t.length)
    for (let i= 0; i < t.length; i++) {
        a.push(t[i])
    };

    return a
}
function tohtml(str) {
    var array = [];
    
    for (var i=str.length-1;i>=0;i--) {
        if (str[i]===" ") {
            array.unshift(['&nbsp'].join(''));
        } else if (str[i]===tools.chars.N) {
            array.unshift(['<br>'].join(''));
        } else {
            array.unshift(['&#', str[i].charCodeAt(), ';'].join(''));
        }
    }
    return array.join('');
}
function auto_grow(element) {
    element.style.height = "5px";
    element.style.height = (element.scrollHeight+5)+"px";
    element.style.overflow = "hidden"
}
var none = (()=>{});
function setend(p) {
    loads_fin.push(p)
}

function createHTML(tag, pro) {
    let salida = document.createElement(tag||"div");
    asi(salida, pro||{})
    salida.child = (...childs) => {
        childs.forEach(x=> {
            salida.appendChild(x)
        })
        return salida
    };
    return salida
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
        //file.onchange = () => {console.log("cambio")}
        
        file.addEventListener("change", (t) => {
            let fit = file.files[0];
            let read = new FileReader();
            
            //console.log("llego")

            read.addEventListener("loadend", () => {
                res(read.result)
                file.remove()
            });
            read.addEventListener("error", err)

            read.readAsDataURL(fit)
        });
        

        file.click()
    }),
    LoadFile:(filter) => new Promise((res, err) => {
        let file = document.createElement("input")
        file.type = "file";
        file.accept = filter||"*";
        file.style.display = "none"
        document.body.appendChild(file)
        //file.onchange = () => {console.log("cambio")}
        
        file.addEventListener("change", (t) => {
            let fit = file.files[0];
            
            //console.log("llego")
            
            let modo = {
                text:() => new Promise((re, er) => {
                    
                    let read = new FileReader();
                    read.addEventListener("loadend", () => {
                        re(read.result)
                        file.remove()
                    });
                    read.addEventListener("error", err)
                    read.readAsText(fit)
                    
                }),
                data:() => new Promise((re, er) => {
                    
                    let read = new FileReader();
                    read.addEventListener("loadend", () => {
                        re(read.result)
                        file.remove()
                    });
                    read.addEventListener("error", err)
                    read.readAsDataURL(fit)

                }),
            };

            res(modo)

        });
        

        file.click()
    }),
    SaveFile:(data, name, isdata) => {
        
        function download(dat) {
            let save = document.createElement("a");
            save.href = dat;
            save.download = name;
            
            let clicker = new MouseEvent("click", {
                view:window,
                bubbles:true,
                cancelable:true
            });

            save.dispatchEvent(clicker);

            if (!isdata) {
                (window.URL || window.webkitURL).revokeObjectURL(save.href)
            }
        };
        
        if (isdata) {
            download(data)
        } else {
            let b = new Blob([data], {type:"text/plain"});
            let reader = new FileReader();

            reader.addEventListener("load", (e) => {
                download(e.target.result)
            });
            reader.readAsDataURL(b)
        }
    }
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
