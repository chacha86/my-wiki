import {NotePageContentEventHandler} from "./note_page_content_handler.js";
import {NotePageContentApi} from "./note_page_content_api.js";
import {NoteData} from "../note_renderer.js";


class NotePageContentRenderer {
    constructor(param) {
        this.param = param;
        this.renderTarget = "content-header";
        this.notePageContentDataRefer = {
            'data': null
        };

        this.notePageContentApi = new NotePageContentApi();
        this.eventHandler = new NotePageContentEventHandler();
    }

    async render() {
        const contentHeader = document.querySelector("#" + this.renderTarget);

        if (this.param.selectedPageId == null) {
            contentHeader.innerHTML = "";
            editor.setMarkdown("");
            return;
        }

        let data = await this.notePageContentApi
            .getPageContentByPage(NoteData.getNo(this.param.selectedPageId));

        this.notePageContentDataRefer.data = data;

        contentHeader.innerHTML = `
            <input class="title block border-b-[1px] font-bold p-[10px] mb-[10px] focus:outline-none select-none" type="text"
                   name="title">
                <div>
                    <a id="page-update-btn" class="font-bold text-blue-500 p-[10px]">🛠️ 저장하기</a>
                    <a id="page-delete-btn" class="font-bold text-red-500 p-[10px]">🗑️ 삭제하기</a>
                </div>`;

        const titleInput = document.querySelector(".title");
        titleInput.value = data.notePageDto.title;
        editor.setMarkdown(data.notePageDto.notePageDetailDto.content);

        this.postRender();
    }

    postRender() {

        this.eventHandle(this.param);
    }

    eventHandle(param) {
        const updateBtn = document.querySelector("#page-update-btn");
        this.eventHandler.setContentUpdateBtn(updateBtn, param);

        const deleteBtn = document.querySelector("#page-delete-btn");
        this.eventHandler.setContentDeleteBtn(deleteBtn, param);

        const titleInput = document.querySelector(".title");
        this.eventHandler.setTitleEnter(titleInput);
    }
}

export {NotePageContentEventHandler, NotePageContentRenderer}