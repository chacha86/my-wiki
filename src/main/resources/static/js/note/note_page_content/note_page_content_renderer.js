import {NotePageContentHandler} from "./note_page_content_handler.js";
import {NotePageContentApi} from "./note_page_content_api.js";
import {NoteData} from "../note_renderer.js";

class NotePageContentData {
    static getUpdateDateMsg(date) {
        if(date == null) return '';

        const dateStr = date[0] + '년 ' + date[1] + '월 ' + date[2] + '일 ' + date[3] + '시 ' + date[4] + '분';
        return dateStr + '에 마지막으로 변경';
    }
}
class NotePageContentRenderer {
    constructor(param) {
        this.param = param;
        this.renderTarget = "content-header";
        this.notePageContentDataRefer = {
            'data': null
        };

        this.notePageContentApi = new NotePageContentApi();
        this.eventHandler = new NotePageContentHandler();
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
        console.log(data);
        contentHeader.innerHTML = `
            <div class="mb-[10px] text-right text-[gray]">${NotePageContentData.getUpdateDateMsg(data.notePageDto.updateDate)}</div>
            <div class="content-header flex justify-between">
            <input class="title block border-b-[1px] font-bold mb-[10px] focus:outline-none select-none" type="text"
                   name="title">
                <div>
                    <a id="page-update-btn" class="font-bold text-blue-400 p-[10px] hover:cursor-pointer"><i class="fa-solid fa-floppy-disk"></i> 저장하기</a>
                    <a id="page-delete-btn" class="font-bold text-red-400 p-[10px] hover:cursor-pointer"><i class="fa-solid fa-trash"></i> 삭제하기</a>
                </div>
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

export {NotePageContentHandler, NotePageContentRenderer}