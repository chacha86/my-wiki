class Base {

    constructor(url, itemPrefix, customClass) {
        this.prevId = null;
        this.currentId = null;
        this.url = url;
        this.itemPrefix = itemPrefix;
        this.customClass = customClass;
    }

    postFetch(url, jsonData, callback) {

        const headerName = document.querySelector("#csrf-header").value;
        const token = document.querySelector("#csrf-token").value;

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                [headerName]: token
            },
            body: jsonData
        })
            .then(response => response.json())
            .then(data => {
                callback(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    changeSelectedItem(currentItemId, prevItemId, customClass) {

        const currentItem = document.querySelector("#" + currentItemId);
        const prevItem = document.querySelector("#" + prevItemId);
        //
        let originClass = currentItem.getAttribute("class")
        let newClass = originClass + customClass;
        //
        currentItem.setAttribute("class", newClass);
        if (prevItem != null) {
            prevItem.setAttribute("class", originClass);
        }
    }

    render(data, func) {
        // const url = "/api/notes/pages/" + this.currentId;
        const noteUIParamJson = getNoteUIParamJsonStr();
        this.postFetch(this.url, noteUIParamJson, function (data) {

            func(data);
            // const titleInput = document.querySelector(".title");
            // titleInput.value = data.notePageDto.title;
            // editor.setMarkdown(data.notePageDto.notePageDetailDto.content);

            const currentItemId = this.itemPrefix + this.currentId;
            const prevItemId = this.itemPrefix + this.prevId;

            this.changeSelectedItem(currentItemId, prevItemId, this.customClass);
            this.prevId = this.currentId;

        });
    }
}
