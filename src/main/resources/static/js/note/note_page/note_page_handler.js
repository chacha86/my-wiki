import {changeSelectedItem} from "../../ui/note_list_ui_util.js";
import {NotePageContentRenderer} from "../note_page_content/note_page_content_renderer.js";
import {NotePageApi} from "./note_page_api.js";
import {ItemData} from "../note_renderer.js";
import {NotePageRenderer} from "./note_page_renderer.js";

class NotePageHandler {
    constructor() {
        this.notePageApi = new NotePageApi();
    }

    async getNotePageData(noteData) {
        if (noteData.selectedNoteId == null) {
            return null;
        }

        const param = {
            'noteIdNo': ItemData.getItemNoById(noteData.selectedNoteId),
            'sortType': 'TITLE',
            'sort': 0
        };
        return await this.notePageApi.getAllPagesByNote(param);
    }

    setRenderContentByPage(pageItemList, param) {
        pageItemList.forEach(item => {
            item.addEventListener("click", (e) => {
                const pageId = item.parentElement.getAttribute("id");
                if (pageId != null) {
                    param.prevPageId = param.selectedPageId;
                    changeSelectedItem(pageId, param.prevPageId, " bg-gray-500 text-white rounded-md");
                    param.selectedPageId = pageId;

                    let notePageContentRenderer = new NotePageContentRenderer(param);
                    notePageContentRenderer.render().catch((e) => {
                        console.log(e)
                    });
                }
            });
        });
    }

    setAddApiToBtn(addPageDiv, notePageData) {

        addPageDiv.innerHTML = "";
        addPageDiv.innerHTML = `<a class="border p-[5px] hover:bg-gray-300 hover:text-black hover:cursor-pointer">
           <i class="fa-solid fa-file-circle-plus"></i> 
        </a>`;

        const addPageBtn = addPageDiv.querySelector("a");
        addPageBtn.addEventListener("click", async () => {
            if (notePageData.selectedNoteId === null) {
                alert("Please select a note to add a new note");
                return;
            }

            const itemInfo = ItemData.getItemInfoById(notePageData.selectedNoteId);
            const msg = await this.notePageApi.addPage(itemInfo.itemIdNo);

            let param = {
                'selectedNoteId': notePageData.selectedNoteId,
                'selectedPageId': notePageData.selectedPageId,
                'prevNoteId': notePageData.prevNoteId,
                'prevPageId': notePageData.prevPageId,
            };

            let notePageRenderer = new NotePageRenderer(param);
            notePageRenderer.render().catch((e) => {
                console.log(e)
            });
        });
    }

    setSortApiToBtn(sortBtnDiv, param) {
        sortBtnDiv.innerHTML = "";
        sortBtnDiv.innerHTML = `
                                <a class="border p-[5px] hover:bg-gray-300 hover:text-black hover:cursor-pointer">
                                    <i class="fa-solid fa-arrow-down-wide-short"></i>
                                </a>
                                <a class="border p-[5px] hover:bg-gray-300 hover:text-black hover:cursor-pointer">
                                    <i class="fa-solid fa-arrow-up-wide-short"></i>
                                </a>
                                `;

        const sortBtn = sortBtnDiv.querySelector("a");
        // sortBtn.addEventListener("click", async () => {
        //
        // }
    }
}

export {NotePageHandler};