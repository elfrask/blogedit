


set_plug(
    create_plug("Imagen", [
        Elements.image("img", "imagen", "")
    ], (api, pro, plug) => {
        
        
        let block = createHTML("div", {
            className:"img-doc-gui img"
        })
        
        api.doc.add(block);
        
        let result = plug.create(pro, (pror) => {
            block.style.backgroundImage = `url("${pror.img}")`
        })

        api.project.add(result);
        
        api.update()

    })
)