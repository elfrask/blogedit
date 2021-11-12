var none = (() => {});

let on = {
    save:(e) => {
        events.save = e
    },
    public:(e) => {
        events.public = e
    },
    close:(e) => {
        events.close = e
    },
    load:(e) => {
        events.load = e
    }
};

window.on = on;

let events = {
    save: (e) => {
        console.log("data:", e)
    },
    public: (e) => {
        console.log("public data:", e)
    },
    close: () => {
        console.log("Closed app")
    },
    load:() => {
        console.log("load end")
    }
}