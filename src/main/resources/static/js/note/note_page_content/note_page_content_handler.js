import {NotePageContentApi} from "./note_page_content_api.js";
import {postFetch} from "../../note_api.js";

class NotePageContentEventHandler {
    constructor() {
        this.notePageContentApi = new NotePageContentApi();
    }

    addEvent(notePageContentData) {
        let data = notePageContentData.data;
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

export {NotePageContentEventHandler}