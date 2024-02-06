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
                    const noteParam = new NoteParam();
                    const prevNoteId = RendererFactory.get("note").props.prevNoteId;
                    const selectedNoteId = RendererFactory.get("note").props.selectedNoteId;

                    noteParam.data = await this.noteApi.getAllNotes(getNoteUIParamJsonStr());
                    noteParam.prevNoteId = selectedNoteId;
                    noteParam.selectedNoteId = noteId;
                    RendererFactory.get("note").render(noteParam);


                    const sortType = RendererFactory.get("notePage").props.sortType;
                    const direction = RendererFactory.get("notePage").props.direction;

                    const pageParam = new NoteParam();
                    pageParam.data = await HandlerFactory.get("notePage").getNotePageData(noteId, sortType, direction);
                    pageParam.selectedNoteId = noteId;
                    pageParam.sortType = sortType;
                    pageParam.direction = direction;
                    pageParam.selectedPageId = RendererFactory.get("notePage").props.selectedPageId;

                    RendererFactory.get("notePage").render(pageParam);

                    window.history.pushState({
                        'selectedNoteId': RendererFactory.get("note").props.selectedNoteId,
                        'prevNoteId': RendererFactory.get("note").props.prevNoteId,
                        'noteData' : RendererFactory.get("note").props.data,
                        'pageData' : RendererFactory.get("notePage").props.data},
                        "",
                        "/note/" + ItemData.getItemNoById(noteId)
                    );
                }
            });
        });
    }

    setApiAddGroupNoteBtn(addGroupDiv, param) {

        addGroupDiv.innerHTML = "";
        addGroupDiv.innerHTML = `<a class="flex w-[100%] items-center text-center justify-center hover:cursor-pointer hover:bg-gray-300 hover:text-black">새그룹 추가</a>`;
        const addGroupBtn = addGroupDiv.querySelector("a");
        addGroupBtn.addEventListener("click", async () => {
            const msg = await this.noteApi.addGroupNote();
            const data = await this.getNoteData();

            const noteParam = new NoteParam();
            noteParam.data = data;

            RendererFactory.get("note").render(noteParam);
        });
    }
}

export {NoteHandler};