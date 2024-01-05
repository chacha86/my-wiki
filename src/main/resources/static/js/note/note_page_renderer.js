import {aPostFetch, postFetch} from "../note_api.js";
import {addContextMenuEventToNote, addContextMenuEventToPage} from "../ui/item_menu_renderer.js";
import {changeSelectedItem, getNoteUIParamJsonStr} from "../ui/note_list_ui_util.js";
import {NotePageContentRenderer} from "./note_page_content_renderer.js";

class NotePageApi {
    async getAllPagesByNote(noteIdNo, param) {
        const url = "/api/notes/" + noteIdNo + "/pages";
        return await aPostFetch(url, JSON.stringify(param));
    }
}

class NotePageEventHandler {
    constructor(paramData) {
        this.paramData = paramData;
    }

    addEvent() {addContextMenuEventToPage()
        console.log(this.paramData);
        let notePageData = this.paramData["notePageData"];
        let data = notePageData.getData();
        if(data.pageId != null) {
            const page = document.querySelector("#page-" + data.pageId);
            let customClass = " bg-gray-500 text-white rounded-md";
            let originClass = page.getAttribute("class")
            let newClass = originClass + customClass;
            page.setAttribute("class", newClass);
        }
        document.querySelectorAll("#page-item-list li a").forEach(item => {
            item.addEventListener("click", (e) => {
                const pageId = item.parentElement.getAttribute("id");
                if(pageId != null) {
                    notePageData.prevNotePageId = notePageData.selectedPageId;
                    // const pageIdNo = pageId.split("-")[1];
                    changeSelectedItem(pageId, notePageData.prevNotePageId, " bg-gray-500 text-white rounded-md");
                    notePageData.selectedPageId = pageId;
                    let notePageContentRenderer = new NotePageContentRenderer(this.paramData);
                    notePageContentRenderer.render().catch((e) => {
                        console.log(e)
                    });
                }
            });
        });
    }
}

class NotePageData {
    constructor(selectedPageId, prevPageId) {
        this.selectedPageId = selectedPageId;
        this.prevPageId = prevPageId;
    }
    getSelectedPageNo() {
        return this.getNo(this.selectedPageId);
    }
    getPrevPageNo() {
        return this.getNo(this.prevPageId);
    }
    getNo(id) {
        return id.split("-")[1];
    }
    setData(data) {
        this.data = data;
    }
    getData() {
        return this.data;
    }
}

class NotePageRenderer {
    constructor(paramData) {
        this.paramData = paramData;
        if(paramData["notePageData"] == null || paramData["notePageData"] === undefined) {
            this.paramData["notePageData"] = new NotePageData(null, null);
        }
        this.notePageApi = new NotePageApi();
        this.eventHandler = new NotePageEventHandler(this.paramData);
    }

    async render() {
        let noteData = this.paramData["noteData"];
        let notePageData = this.paramData["notePageData"];
        let selectedPageIdNo = null;
        if (notePageData.selectedPageId != null) {
            selectedPageIdNo = notePageData.getSelectedPageNo();
        }
        const pageListParam = {
            noteId: noteData.getSelectedNoteNo(),
            pageId: selectedPageIdNo
        }
        const data = await this.notePageApi.getAllPagesByNote(noteData.getSelectedNoteNo(), pageListParam);

        notePageData.setData(data);
        const pageItemList = document.querySelector("#page-item-list");
        const html = `
            ${this.createNotePage(data.notePageDtoList)}
            `
        pageItemList.innerHTML = html;
        this.postRender();
    }
    postRender() {
        this.eventHandler.addEvent();
    }

    createNotePageItem(notePageDto) {
        let pageClass = "hover:bg-gray-500 hover:text-white hover:rounded-md";
        let pageLinkClass = "block p-[10px] text-[15px] hover:cursor-pointer";
        return `
            <li class="${pageClass}" id="page-${notePageDto.id}" data-page-title="${notePageDto.title}">
                <a class="${pageLinkClass}" id="page-${notePageDto.id}">${notePageDto.title}</a>
            </li>
        `
    }

    createNotePage(pageDtoList) {
        return `
            ${pageDtoList.map((notePageDto) => {
            return `${this.createNotePageItem(notePageDto)}`;
        }).join('')}
        `
    }
}

export {NotePageApi, NotePageEventHandler, NotePageData, NotePageRenderer};
