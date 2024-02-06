import {changeSelectedItem} from "../../ui/note_list_ui_util.js";
import {NotePageContentRenderer} from "../note_page_content/note_page_content_renderer.js";
import {NotePageApi} from "./note_page_api.js";
import {ItemData} from "../note_renderer.js";
import {NotePageRenderer} from "./note_page_renderer.js";
import {HandlerFactory, RendererFactory} from "../../initializer.js";
import {NoteParam} from "../noteParam.js";

class NotePageHandler {
    constructor() {
        this.notePageApi = new NotePageApi();
    }

    async getNotePageData(selectedNoteId, sortType, direction) {
        console.assert(selectedNoteId != null, "selectedNoteId is null");

        if (sortType == null) {
            sortType = "TITLE";
        }

        if (direction == null) {
            direction = 0;
        }

        const noteIdNo = ItemData.getItemNoById(selectedNoteId);

        const param = {
            noteId: noteIdNo,
            sortType: sortType,
            direction: direction
        }
        return await this.notePageApi.getAllPagesByNote(param);
    }

    setRenderContentByPage(pageItemList, param) {
        console.assert(param.selectedNoteId != null, "selectedNoteId is null");

        pageItemList.forEach(item => {
            item.addEventListener("click", async (e) => {
                const pageId = item.parentElement.getAttribute("id");
                if (pageId != null) {
                    const pageParam = new NoteParam();
                    const selectedNoteId = param.selectedNoteId;
                    const prevPageId = param.prevPageId;
                    const sortType = RendererFactory.get("notePage").props.sortType;
                    const direction = RendererFactory.get("notePage").props.direction;

                    pageParam.data = await HandlerFactory.get("notePage").getNotePageData(selectedNoteId, sortType, direction);
                    pageParam.selectedNoteId = selectedNoteId;
                    pageParam.selectedPageId = pageId;
                    RendererFactory.get("notePage").render(pageParam);

                    const contentParam = new NoteParam();

                    contentParam.selectedNoteId = selectedNoteId;
                    contentParam.selectedPageId = pageId;
                    contentParam.data = await HandlerFactory.get("notePageContent").getContentByPageId(pageId);

                    RendererFactory.get("notePageContent").render(contentParam);

                    window.history.pushState({
                            'selectedNoteId': RendererFactory.get("note").props.selectedNoteId,
                            'prevNoteId': RendererFactory.get("note").props.prevNoteId,
                            'selectedPageId' : RendererFactory.get("notePage").props.selectedPageId,
                            'prevPageId' : RendererFactory.get("notePage").props.prevPageId,
                            'noteData' : RendererFactory.get("note").props.data,
                            'pageData' : RendererFactory.get("notePage").props.data},
                        "",
                        "/note/" + ItemData.getItemNoById(selectedNoteId) + "/page/" + ItemData.getItemNoById(pageId)
                    );
                }
            });
        });
    }

    setAddApiToBtn(addPageDiv, param) {

        addPageDiv.innerHTML = "";
        addPageDiv.innerHTML = `<a class="border p-[5px] hover:bg-gray-300 hover:text-black hover:cursor-pointer">
           <i class="fa-solid fa-file-circle-plus"></i> 
        </a>`;

        const addPageBtn = addPageDiv.querySelector("a");
        addPageBtn.addEventListener("click", async () => {
            if (param.selectedNoteId === null) {
                alert("Please select a note to add a new note");
                return;
            }

            const noteIdNo = ItemData.getItemNoById(param.selectedNoteId);
            const msg = await this.notePageApi.addPage(noteIdNo);

            const pageParam = new NoteParam();

            const noteId = param.selectedNoteId;
            const pageId = param.selectedPageId;
            const sortType = RendererFactory.get("notePage").props.sortType;
            const direction = RendererFactory.get("notePage").props.direction;

            pageParam.data = await HandlerFactory.get("notePage").getNotePageData(noteId, sortType, direction);
            pageParam.selectedNoteId = noteId;
            pageParam.selectedPageId = pageId;
            RendererFactory.get("notePage").render(pageParam);
        });
    }

    setSortApiToBtn(sortBtnDiv, param) {
        sortBtnDiv.innerHTML = "";
        sortBtnDiv.innerHTML = `
                                <a class="desc border p-[5px] hover:bg-gray-300 hover:text-black hover:cursor-pointer">
                                    <i class="fa-solid fa-arrow-down-wide-short"></i>
                                </a>
                                <a class="asc border p-[5px] hover:bg-gray-300 hover:text-black hover:cursor-pointer">
                                    <i class="fa-solid fa-arrow-up-wide-short"></i>
                                </a>
                                `;

        const sortBtnList = sortBtnDiv.querySelectorAll("a");
        sortBtnList.forEach((sortBtn) => {
            sortBtn.addEventListener("click", async (e) => {

                const sortType = "TITLE";
                const direction = sortBtn.classList.contains("desc") ? 1 : 0;
                const data = await HandlerFactory.get("notePage").getNotePageData(param.selectedNoteId, sortType, direction);

                const pageParam = new NoteParam();
                pageParam.data = data;
                pageParam.selectedNoteId = param.selectedNoteId;
                pageParam.selectedPageId = param.selectedPageId;
                pageParam.sortType = sortType;
                pageParam.direction = direction;

                RendererFactory.get("notePage").render(pageParam);
            });
        });
        // sortBtn.addEventListener("click", async () => {
        //
        // }
    }
}

export {NotePageHandler};