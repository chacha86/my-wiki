import {NoteMenuApi} from "../note_menu_api.js";
import {ItemData, NoteRenderer} from "../../note_renderer.js";
import {NotePageRenderer} from "../../note_page/note_page_renderer.js";
import {HandlerFactory, RendererFactory} from "../../../initializer.js";
import {NoteParam} from "../../noteParam.js";

class RenameModalHandler {
    constructor() {
        this.noteMenuApi = new NoteMenuApi();
    }

    setApiToRenameBtn(renameBtnDiv, param) {

        renameBtnDiv.innerHTML = "";
        renameBtnDiv.innerHTML = "<a>OK</a>";
        const renameBtn = renameBtnDiv.querySelector('a');
        const itemInfo = param.itemInfo;

        renameBtn.addEventListener('click', async () => {
            const noteNameInput = document.querySelector('#new-item-text');
            const newName = noteNameInput.value;
            const renderParam = new NoteParam();

            let renderer = RendererFactory.get("note");
            let msg = "";

            if(itemInfo.itemType === 'page') {
                renderer = RendererFactory.get("notePage");
                msg = await this._renamePage(itemInfo.itemIdNo, newName);

                renderParam.sortType = renderer.props.sortType;
                renderParam.direction = renderer.props.direction;
                renderParam.selectedNoteId = renderer.props.selectedNoteId;
                renderParam.selectedPageId = renderer.props.selectedPageId;
                renderParam.data = await HandlerFactory.get("notePage").getNotePageData(renderer.props.selectedNoteId, renderer.props.sortType, renderer.props.direction);
            }
            else {
                msg = await this._renameNote(itemInfo.itemIdNo, newName);
                renderParam.selectedNoteId = renderer.props.selectedNoteId;
                renderParam.data = await HandlerFactory.get("note").getNoteData();
            }

            renderer.render(renderParam);
        });
    }

    async _renameNote(noteIdNo, newName) {
        const renameNoteParam = {
            itemIdNo: noteIdNo,
            noteName: newName,
        }
        await this.noteMenuApi.renameNote(renameNoteParam);
    }

    async _renamePage(pageIdNo, newName) {
        const renamePageParam = {
            pageIdNo: pageIdNo,
            title: newName,
            content: editor.getMarkdown()
        }

        return await this.noteMenuApi.renamePage(renamePageParam);
    }
}

export {RenameModalHandler};