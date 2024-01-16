import {NotePageContentApi} from "./note_page_content_api.js";
import {NotePageContentRenderer} from "./note_page_content_renderer.js";
import {ItemData} from "../note_renderer.js";
import {NotePageRenderer} from "../note_page/note_page_renderer.js";
import {postFetch} from "../../note_api.js";

class NotePageContentEventHandler {
    constructor() {
        this.notePageContentApi = new NotePageContentApi();
    }

    setContentUpdateBtn(pageUpdateBtn, param) {

        pageUpdateBtn.addEventListener("click", async (e) => {
            const title = document.querySelector(".title").value;
            const content = editor.getMarkdown();

            const updateContentParam = {
                pageIdNo: ItemData.getItemNoById(param.selectedPageId),
                title: title,
                content: content
            }

            let msg = await this.notePageContentApi.updateContent(updateContentParam);

            let notePageRenderer = new NotePageRenderer(param);
            notePageRenderer.render().catch((e) => {
                console.error(e);
            });

            // let notePageContentRenderer = new NotePageContentRenderer(param);
            // notePageContentRenderer.render().catch((e) => {
            //     console.error(e);
            // });
        });
    }

    setContentDeleteBtn(pageDeleteBtn, param) {
        pageDeleteBtn.addEventListener("click", async (e) => {
            const deleteContentParam = {
                pageIdNo: ItemData.getItemNoById(param.selectedPageId)
            }

            let msg = await this.notePageContentApi.deleteContent(deleteContentParam);

            let notePageParam = {
                'selectedNoteId': param.selectedNoteId,
                'selectedPageId': null,
            };
            let notePageRenderer = new NotePageRenderer(notePageParam);
            notePageRenderer.render().catch((e) => {
                console.error(e);
            });

            let notePageContentRenderer = new NotePageContentRenderer(notePageParam);
            notePageContentRenderer.render().catch((e) => {
                console.error(e);
            });
        });
    }

    setTitleEnter(titleInput) {
        titleInput.setAttribute('spellcheck', 'false');
        titleInput.addEventListener('keydown', (e) => {
            if (e.keyCode === 13) {
                e.preventDefault();
                editor.focus();
            }
        });

    }

    addEvent(notePageContentData) {
        const pageDeleteBtn = document.querySelector("#page-delete-btn");
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


        titleInput.value = data.notePageDto.title;
        editor.setMarkdown(data.notePageDto.notePageDetailDto.content);
    }
}

export {NotePageContentEventHandler}