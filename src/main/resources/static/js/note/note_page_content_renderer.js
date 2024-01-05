import {aPostFetch, postFetch} from "../note_api.js";
import {getNoteUIParamJsonStr} from "../ui/note_list_ui_util.js";
import {NotePageData} from "./note_page_renderer.js";

class NotePageContentApi {
    async getPageContentByPage(pageIdNo) {
        const url = "/api/notes/pages/" + pageIdNo;
        return await aPostFetch(url, getNoteUIParamJsonStr());
    }
}
class NotePageContentEventHandler {
    constructor(paramData) {
        this.paramData = paramData;
    }

    addEvent() {
        let notePageContentData = this.paramData["notePageContentData"];
        let data = notePageContentData.getData();
        const pageUpdateBtn = document.querySelector("#page-update-btn");
        const pageDeleteBtn = document.querySelector("#page-delete-btn");

        pageUpdateBtn.addEventListener("click", (e) => {
            const title = document.querySelector(".title").value;
            const content = editor.getMarkdown();
            const url = "/api/pages/update/" + notePageIdNo;
            console.log("---------------------> notePageIdNo : " + data.notePageDto.noteId);
            const notePageParamDto = {
                noteId: data.notePageDto.noteId,
                title: title,
                content: content
            }
            postFetch(url, JSON.stringify(notePageParamDto), (data) => {
                this.note.renderingNotePage(data.noteId);
            });
        });

        pageDeleteBtn.addEventListener("click", (e) => {
            const url = "/api/pages/delete/" + notePageIdNo;
            const deleteParamDto = {
                noteId: data.notePageDto.noteId,
            }

            postFetch(url, JSON.stringify(deleteParamDto), (data) => {
                // selectedPageId = null;
                const contentHeader = document.querySelector(".content-header");
                contentHeader.innerHTML = "";
                editor.setMarkdown("");
                this.note.renderingNotePage(data.noteId);
            });
        });

        const titleInput = document.querySelector(".title");
        titleInput.setAttribute('spellcheck', 'false');
        titleInput.addEventListener('keydown', (e) => {
            if (e.keyCode === 13) {
                e.preventDefault();
                editor.focus();
            }
        });

        titleInput.value = data.notePageDto.title;
        editor.setMarkdown(data.notePageDto.notePageDetailDto.content);
    }
}

class NotePageContentData {
    constructor(data) {
        this.data = data;
    }

    setData(data) {
        this.data = data;
    }

    getData() {
        return this.data;
    }
}
class NotePageContentRenderer {
    constructor(paramData) {
        this.paramData = paramData;
        if(paramData["notePageContentData"] == null || paramData["notePageContentData"] === undefined) {
            this.paramData["notePageContentData"] = new NotePageContentData(null, null);
        }
        this.notePageContentApi = new NotePageContentApi();
        this.eventHandler = new NotePageContentEventHandler(this.paramData);
    }

    async render() {
        let notePageData = this.paramData["notePageData"];
        let notePageContentData = this.paramData["notePageContentData"];
        let data = await this.notePageContentApi.getPageContentByPage(notePageData.getSelectedPageNo());
        notePageContentData.setData(data);
        let html = `
            <input class="title block border-b-[1px] font-bold p-[10px] mb-[10px] focus:outline-none" type="text"
                   name="title">
                <div>
                    <a id="page-update-btn" class="font-bold text-blue-500 p-[10px]">🛠️ 저장하기</a>
                    <a id="page-delete-btn" class="font-bold text-red-500 p-[10px]">🗑️ 삭제하기</a>
                </div>`;

        const contentHeader = document.querySelector(".content-header");
        contentHeader.innerHTML = html;
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

export {NotePageContentData, NotePageContentEventHandler, NotePageContentRenderer}