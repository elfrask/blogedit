
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
    App:(url) => {

        let events = {
            save:() => {},
            close:() => {
                me.close()
            },
            public:() => {},
            load:() => {}
        }
        let modo = "frame"
        let me = {
            url:url||"/blogedit",
            active:false,
            onsave:(e) => {events.save = e},
            onpublic:(e) => {events.public = e},
            onclose:(e) => {events.close = (...x) => {
                let sali = e(...x)
                me.close()
                return sali
            }},
            onload:(e) => {events.load = e},
            open:{
                win:(win) => {
                    if (me.active) return undefined;
                    me.active = true;
                    let frame 
                    if (win) frame = open(me.url, "blogedit", "lol=0");
                    else frame = open(me.url)
                    frame.addEventListener("load", () => {
                        let win = frame.window;
                        win.on.save(events.save);
                        win.on.close(events.close);
                        win.on.public(events.public);
                        win.on.load(events.load);
                    })
                    me.frame = frame;
                    modo = "win"
                },
                div:(d=document.getElementById()) => {
                    
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
                        let win = frame.contentWindow;
                        win.on.save(events.save);
                        win.on.close(events.close);
                        win.on.public(events.public);
                        win.on.load(events.load);
                    })
                    me.frame = frame
                    modo = "frame"
                }
            },
            close:() => {

                if (!me.active) return undefined;
                me.active = false;
                
                if (modo==="win") {
                    me.frame.window.close();
                    console.log("closed win")
                } else if (modo==="frame") {
                    me.frame.remove()
                    console.log("closed frame")
                }
            },
            frame:{},
        };

        return me
    },
    
}