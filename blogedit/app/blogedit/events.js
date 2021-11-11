let none = (() => {});

let on = {
    save:() => {

    }
};

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
}