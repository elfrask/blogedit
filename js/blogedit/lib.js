
let Blogedit = {
    Frame:(url) => {
        let me = {
            url:url||"/blogedit",
            active:false,
            save:() => {},
            closer:() => {
                frame.remove();
                me.active = false;
            },
            public:() => {},
            onsave:(e) => {me.save = e},
            onpublic:(e) => {me.public = e},
            onclose:(e) => {me.closer = e},
            open:(d=document.getElementById()) => {
                if (me.active) return undefined;
                me.active = true;
                let frame = document.createElement("iframe");
                frame.src = me.url;
                Object.assign(frame.style, {
                    width:"100%",
                    height:"100%",
                });
                d.appendChild(frame)
                frame.addEventListener("load", () => {
                    setTimeout(()=> {
                        frame.contentWindow.save = me.save
                        frame.contentWindow.closer = me.closer
                        frame.contentWindow.public = me.public
                    }, 2000)
                })
                me.frame = frame
            },
            close:() => {
                if (!me.active) return undefined;
                me.active = false;
                frame.remove();
            },
            frame:{},
        };

        return me
    },
    Window:(url) => {
        let me = {
            url:url||"/blogedit",
            active:false,
            save:() => {},
            closer:() => {
                me.frame.window.close();
                me.active = false;
            },
            public:() => {},
            onsave:(e) => {me.save = e},
            onpublic:(e) => {me.public = e},
            onclose:(e) => {me.closer = e},
            open:() => {
                if (me.active) return undefined;
                me.active = true;
                let frame = open(me.url, "_self", {
                    hola:"saludos"
                });
                
                frame.addEventListener("load", () => {
                    setTimeout(()=> {
                        frame.window.save = me.save
                        frame.window.closer = me.closer
                        frame.window.public = me.public
                    }, 2000)
                })
                me.frame = frame
            },
            close:() => {
                if (!me.active) return undefined;
                me.active = false;
                me.frame.window.close();
            },
            frame:{},
        };

        return me
    },
    
}