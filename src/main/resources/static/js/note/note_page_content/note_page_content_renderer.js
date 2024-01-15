import {NotePageContentEventHandler} from "./note_page_content_handler.js";
import {NotePageContentApi} from "./note_page_content_api.js";
import {NoteData} from "../note_renderer.js";



class NotePageContentRenderer {
    constructor(param) {
        this.param = param;
        this.renderTarget = "content-header";
        this.notePageContentDataRefer = {
            'data' : null
        };

        this.notePageContentApi = new NotePageContentApi();
        this.eventHandler = new NotePageContentEventHandler();
    }

    async render() {
        console.log("NotePageContentRenderer render");
        console.log(this.param);

        let data = await this.notePageContentApi.getPageContentByPage(NoteData.getNo(this.param.selectedPageId));
        console.log(data);
        this.notePageContentDataRefer.data = data;
        let html = "";
        html = `
            <input class="title block border-b-[1px] font-bold p-[10px] mb-[10px] focus:outline-none" type="text"
                   name="title">
                <div>
                    <a id="page-update-btn" class="font-bold text-blue-500 p-[10px]">🛠️ 저장하기</a>
                    <a id="page-delete-btn" class="font-bold text-red-500 p-[10px]">🗑️ 삭제하기</a>
                </div>`;

        const contentHeader = document.querySelector("#" + this.renderTarget);
        contentHeader.innerHTML = html;

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
    }
}

export {NotePageContentEventHandler, NotePageContentRenderer}