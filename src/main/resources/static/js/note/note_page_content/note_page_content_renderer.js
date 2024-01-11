import {NotePageContentEventHandler} from "./note_page_content_handler.js";
import {NotePageContentApi} from "./note_page_content_api.js";
import {NoteData} from "../note_renderer.js";



class NotePageContentRenderer {
    constructor(param) {
        this.param = param;
        this.notePageContentApi = new NotePageContentApi();
        this.eventHandler = new NotePageContentEventHandler();
        this.notePageContentData = {
            'data' : null
        };
        this.renderTarget = "content-header";
    }

    async render() {
        let notePageData = this.param["notePageData"];
        let data = await this.notePageContentApi.getPageContentByPage(NoteData.getNo(notePageData.selectedPageId));
        this.notePageContentData.data = data;

        let html = `
            <input class="title block border-b-[1px] font-bold p-[10px] mb-[10px] focus:outline-none" type="text"
                   name="title">
                <div>
                    <a id="page-update-btn" class="font-bold text-blue-500 p-[10px]">🛠️ 저장하기</a>
                    <a id="page-delete-btn" class="font-bold text-red-500 p-[10px]">🗑️ 삭제하기</a>
                </div>`;

        const contentHeader = document.querySelector("#" + this.renderTarget);
        contentHeader.innerHTML = html;
        this.postRender();
        this.eventHandle();
    }

    postRender() {
    }

    eventHandle() {
        this.eventHandler.addEvent(this.notePageContentData);
    }
}

export {NotePageContentEventHandler, NotePageContentRenderer}