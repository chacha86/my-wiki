import {changeSelectedItem, getNoteUIParamJsonStr} from "../../ui/note_list_ui_util.js";
import {NotePageContentRenderer} from "../note_page_content/note_page_content_renderer.js";
import {NotePageApi} from "./note_page_api.js";
import {NoteData} from "../note_renderer.js";

class NotePageHandler {
    constructor(paramData) {
        this.notePageApi = new NotePageApi();
    }

    async getNotePageData(noteData) {
        let data = null;
        if (noteData.selectedNoteId != null) {
            const selectedNoteIdNo = NoteData.getNo(noteData.selectedNoteId);
            data = await this.notePageApi.getAllPagesByNote(selectedNoteIdNo);
        }
        return data;
    }
    setRenderContentByPage(pageItemList, notePageData) {
        pageItemList.forEach(item => {
            item.addEventListener("click", (e) => {
                const pageId = item.parentElement.getAttribute("id");
                if(pageId != null) {
                    notePageData.prevNotePageId = notePageData.selectedPageId;
                    changeSelectedItem(pageId, notePageData.prevNotePageId, " bg-gray-500 text-white rounded-md");
                    notePageData.selectedPageId = pageId;

                    let param = new Map();
                    param["notePageData"] = notePageData;

                    let notePageContentRenderer = new NotePageContentRenderer(param);
                    notePageContentRenderer.render().catch((e) => {
                        console.log(e)
                    });
                }
            });
        });
    }
}

export {NotePageHandler};