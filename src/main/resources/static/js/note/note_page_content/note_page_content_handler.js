import {NotePageContentApi} from "./note_page_content_api.js";
import {NotePageContentRenderer} from "./note_page_content_renderer.js";
import {ItemData, NoteData} from "../note_renderer.js";
import {NotePageRenderer} from "../note_page/note_page_renderer.js";
import {postFetch} from "../../note_api.js";
import {NotePageApi} from "../note_page/note_page_api.js";
import {NoteParam} from "../noteParam.js";
import {HandlerFactory, RendererFactory} from "../../initializer.js";

class NotePageContentHandler {
    constructor() {
        this.notePageContentApi = new NotePageContentApi();
        this.notePageApi = new NotePageApi();
    }

    async getContentByPageId(pageId) {
        return await this.notePageContentApi
            .getPageContentByPage(ItemData.getItemNoById(pageId));
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

            const msg = await this.notePageContentApi.updateContent(updateContentParam);

            const pageParam = new NoteParam();

            pageParam.selectedNoteId = param.selectedNoteId;
            pageParam.selectedPageId = param.selectedPageId;
            pageParam.data = await HandlerFactory.get("notePage").getNotePageData(param.selectedNoteId, RendererFactory.get("notePage").props.sortType, RendererFactory.get("notePage").props.direction);

            RendererFactory.get("notePage").render(pageParam);

            const contentParam = new NoteParam();
            contentParam.selectedNoteId = param.selectedNoteId;
            contentParam.selectedPageId = param.selectedPageId;
            contentParam.data = await HandlerFactory.get("notePageContent").getContentByPageId(param.selectedPageId);

            RendererFactory.get("notePageContent").render(contentParam);
        });
    }

    setContentDeleteBtn(pageDeleteBtn, param) {
        pageDeleteBtn.addEventListener("click", async (e) => {
            const deleteContentParam = {
                pageIdNo: ItemData.getItemNoById(param.selectedPageId)
            }

            let msg = await this.notePageContentApi.deleteContent(deleteContentParam);

            const pageParam = new NoteParam();
            const contentParam = new NoteParam();

            pageParam.selectedNoteId = param.selectedNoteId;
            pageParam.selectedPageId = null;
            pageParam.data = await HandlerFactory.get("notePage").getNotePageData(param.selectedNoteId, RendererFactory.get("notePage").props.sortType, RendererFactory.get("notePage").props.direction);

            RendererFactory.get("notePage").render(pageParam);

            contentParam.selectedPageId = null;
            RendererFactory.get("notePageContent").render(contentParam);


            // const contentParam = new NoteParam();
            // contentParam.selectedNoteId = param.selectedNoteId;
            // contentParam.selectedPageId = param.selectedPageId;
            // contentParam.data = await HandlerFactory.get("notePageContent").getContentByPageId(param.selectedPageId);
            //
            // RendererFactory.get("notePageContent").render(contentParam);
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

export {NotePageContentHandler}