import {NotePageContentHandler} from "./note_page_content_handler.js";
import {NotePageContentApi} from "./note_page_content_api.js";
import {NoteData} from "../note_renderer.js";
import {HandlerFactory} from "../../initializer.js";

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
        this.props = {
            'data': null
        };

        this.handler = HandlerFactory.get("notePageContent");
    }
    async preRender(param) {
        Object.keys(this.props).forEach((key) => {
            if (param[key] !== undefined) {
                this.props[key] = param[key];
            }
        });

        if (this.props.data == null) {
            this.props.data = await this.handler.getNotePageData(this.props.selectedNoteId, this.props.sortType, this.props.direction);
        }
    }

    async render(param) {
        await this.preRender(param);

        const contentHeader = document.querySelector("#" + this.renderTarget);

        if (param.selectedPageId == null) {
            contentHeader.innerHTML = "";
            editor.setMarkdown("");
            return;
        }

        const data = this.props.data;
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

        this.postRender(param);
    }

    postRender(param) {
        Object.keys(this.props).forEach((key) => {
            param[key] = this.props[key];
        });
        this.eventHandle(param);
    }

    eventHandle(param) {
        const updateBtn = document.querySelector("#page-update-btn");
        this.handler.setContentUpdateBtn(updateBtn, param);

        const deleteBtn = document.querySelector("#page-delete-btn");
        this.handler.setContentDeleteBtn(deleteBtn, param);

        const titleInput = document.querySelector(".title");
        this.handler.setTitleEnter(titleInput);
    }
}

export {NotePageContentHandler, NotePageContentRenderer}