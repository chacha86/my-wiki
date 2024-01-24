import {changeSelectedItem, getNoteUIParamJsonStr} from "../ui/note_list_ui_util.js";
import {NotePageRenderer} from "./note_page/note_page_renderer.js";
import {ItemData, NoteApi, NoteRenderer} from "./note_renderer.js";
import {HandlerFactory, RendererFactory} from "../initializer.js";
import {NoteParam} from "./noteParam.js";
import {NotePageApi} from "./note_page/note_page_api.js";

class NoteHandler {
    constructor() {
        this.noteApi = new NoteApi();
        this.notePageApi = new NotePageApi();
    }

    async getNoteData() {
        return await this.noteApi.getAllNotes(getNoteUIParamJsonStr());
    }

    setRenderPageBySelect(noteItemList, param) {

        noteItemList.forEach(item => {
            item.addEventListener("click", async (e) => {
                const noteId = item.parentElement.getAttribute("id");
                if (noteId != null) {
                    // noteDataRefer.prevNoteId = noteDataRefer.selectedNoteId;
                    // noteDataRefer.selectedNoteId = noteId;
                    // changeSelectedItem(noteId, noteDataRefer.prevNoteId, " bg-gray-500 text-white rounded-md");
                    //
                    // let param = {
                    //     selectedNoteId: noteDataRefer.selectedNoteId,
                    //     prevNoteId: noteDataRefer.prevNoteId,
                    // };

                    const noteParam = new NoteParam();
                    noteParam.data = await this.noteApi.getAllNotes(getNoteUIParamJsonStr());
                    noteParam.selectedNoteId = noteId;
                    RendererFactory.get("note").render(noteParam);


                    const sortType = RendererFactory.get("notePage").props.sortType;
                    const direction = RendererFactory.get("notePage").props.direction;

                    const pageParam = new NoteParam();
                    pageParam.data = await HandlerFactory.get("notePage").getNotePageData(noteId, sortType, direction);
                    RendererFactory.get("notePage").render(pageParam);

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