import {changeSelectedItem, getNoteUIParamJsonStr} from "../../ui/note_list_ui_util.js";
import {NotePageContentRenderer} from "../note_page_content/note_page_content_renderer.js";
import {NotePageApi} from "./note_page_api.js";
import {NoteData} from "../note_renderer.js";
import {NotePageRenderer} from "./note_page_renderer.js";

class NotePageHandler {
    constructor() {
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

    setAddApiToBtn(addPageDiv, noteData) {

        console.log("setAddApiToBtn");
        console.log(noteData);

        addPageDiv.innerHTML = "";
        addPageDiv.innerHTML = "<a>+</a>";

        const addPageBtn = addPageDiv.querySelector("a");
        addPageBtn.addEventListener("click", async () => {
            if(noteData.selectedNoteId === null) {
                alert("Please select a note to add a new note");
                return;
            }

            const noteElement = document.querySelector('#' + noteData.selectedNoteId);
            console.log("noteElement");
            console.log(noteElement);
            const noteInfo = NoteData.getNoteInfoByNoteIdNo(NoteData.getNo(NoteData.getNoteIdByElement(noteElement)));
            const msg = await this.notePageApi.addPage(noteInfo);

            let param = new Map();
            param["notePageData"] = noteData;

            let notePageRenderer = new NotePageRenderer(param);
            notePageRenderer.render().catch((e) => {
                console.log(e)
            });
        });
    }
}

export {NotePageHandler};