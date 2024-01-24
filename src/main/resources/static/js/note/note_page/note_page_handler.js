import {changeSelectedItem} from "../../ui/note_list_ui_util.js";
import {NotePageContentRenderer} from "../note_page_content/note_page_content_renderer.js";
import {NotePageApi} from "./note_page_api.js";
import {ItemData} from "../note_renderer.js";
import {NotePageRenderer} from "./note_page_renderer.js";

class NotePageHandler {
    constructor() {
        this.notePageApi = new NotePageApi();
    }

    async getNotePageData(param) {
        console.assert(param.selectedNoteId != null, "selectedNoteId is null");

        if(param.sortType == null) {
            param.sortType = "TITLE";
        }

        if(param.direction == null) {
            param.direction = 0;
        }

        param.noteIdNo = ItemData.getItemNoById(param.selectedNoteId);
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

            const itemInfo = ItemData.getItemInfoById(param.selectedNoteId);
            const msg = await this.notePageApi.addPage(itemInfo.itemIdNo);
            param.data = await this.getNotePageData(param);

            let notePageRenderer = new NotePageRenderer(param);
            notePageRenderer.render().catch((e) => {
                console.log(e)
            });
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

                sortBtn.classList.contains("desc") ? param.direction = 1 : param.direction = 0;
                param.sortType = "TITLE";
                param.data = await this.notePageApi.getAllPagesByNote(param);

                let notePageRenderer = new NotePageRenderer(param);
                notePageRenderer.render().catch((e) => {
                    console.error(e);
                });
            });
        });
        // sortBtn.addEventListener("click", async () => {
        //
        // }
    }
}

export {NotePageHandler};