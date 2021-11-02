Elements.button("color", "Fondo", "/src/icon/color.png", (obj, pro, ref) => {
    tools.pickColor(obj.offsetLeft, obj.offsetTop + obj.offsetHeight).then((x)=>{
        obj.style.backgroundColor = x;
        pro.color = x;
        console.log("teo:", pro)
        ref()
    })
})
