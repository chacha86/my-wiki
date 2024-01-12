import {changeSelectedItem, getNoteUIParamJsonStr} from "../ui/note_list_ui_util.js";
import {NotePageRenderer} from "./note_page/note_page_renderer.js";
import {NoteApi} from "./note_renderer.js";

class NoteHandler {
    constructor() {
        this.noteApi = new NoteApi();
    }

    async getNoteData() {
        return await this.noteApi.getAllNotes(getNoteUIParamJsonStr());
    }

    setRenderPageBySelect(noteItemList, noteData) {
        noteItemList.forEach(item => {
            item.addEventListener("click", (e) => {
                const noteId = item.parentElement.getAttribute("id");
                if (noteId != null) {
                    noteData.prevNoteId = noteData.selectedNoteId;
                    noteData.selectedNoteId = noteId;
                    changeSelectedItem(noteId, noteData.prevNoteId, " bg-gray-500 text-white rounded-md");

                    let param = new Map();
                    param["noteData"] = noteData;

                    let notePageRenderer = new NotePageRenderer(param);
                    notePageRenderer.render().catch((e) => {
                        console.log(e)
                    });
                }
            });
        });
    }

}

export {NoteHandler};