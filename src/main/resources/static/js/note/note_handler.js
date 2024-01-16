import {changeSelectedItem, getNoteUIParamJsonStr} from "../ui/note_list_ui_util.js";
import {NotePageRenderer} from "./note_page/note_page_renderer.js";
import {NoteApi, NoteRenderer} from "./note_renderer.js";

class NoteHandler {
    constructor() {
        this.noteApi = new NoteApi();
    }

    async getNoteData() {
        return await this.noteApi.getAllNotes(getNoteUIParamJsonStr());
    }

    setRenderPageBySelect(noteItemList, param) {
        const noteDataRefer = param.noteDataRefer;
        noteItemList.forEach(item => {
            item.addEventListener("click", (e) => {
                const noteId = item.parentElement.getAttribute("id");
                if (noteId != null) {
                    noteDataRefer.prevNoteId = noteDataRefer.selectedNoteId;
                    noteDataRefer.selectedNoteId = noteId;
                    changeSelectedItem(noteId, noteDataRefer.prevNoteId, " bg-gray-500 text-white rounded-md");

                    let param = {
                        selectedNoteId: noteDataRefer.selectedNoteId,
                        prevNoteId: noteDataRefer.prevNoteId,
                    };

                    let notePageRenderer = new NotePageRenderer(param);
                    notePageRenderer.render().catch((e) => {
                        console.log(e)
                    });
                }
            });
        });
    }

    setApiAddGroupNoteBtn(addGroupDiv) {

        addGroupDiv.innerHTML = "";
        addGroupDiv.innerHTML = `<a class="flex w-[100%] items-center text-center justify-center hover:cursor-pointer hover:bg-gray-300 hover:text-black">새그룹 추가</a>`;
        const addGroupBtn = addGroupDiv.querySelector("a");
        addGroupBtn.addEventListener("click", async () => {
            const msg = await this.noteApi.addGroupNote();
            const renderer = new NoteRenderer(new Map());
            renderer.render().catch((e) => {
                console.error(e)
            });
        });
    }
}

export {NoteHandler};