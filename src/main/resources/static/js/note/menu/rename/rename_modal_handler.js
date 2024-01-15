import {NoteMenuApi} from "../note_menu_api.js";
import {ItemData, NoteRenderer} from "../../note_renderer.js";
import {NotePageRenderer} from "../../note_page/note_page_renderer.js";

class RenameModalHandler {
    constructor() {
        this.noteMenuApi = new NoteMenuApi();
    }

    setApiToRenameBtn(renameBtnDiv, param) {

        renameBtnDiv.innerHTML = "";
        renameBtnDiv.innerHTML = "<a>OK</a>";
        const renameBtn = renameBtnDiv.querySelector('a');

        let itemInfo = param.itemInfo;

        renameBtn.addEventListener('click', async () => {
            const noteNameInput = document.querySelector('#new-item-text');
            let renderer = new NoteRenderer(new Map());
            let msg = "";

            param.newNoteName = noteNameInput.value;

            if(itemInfo.itemType === 'page') {
                renderer = new NotePageRenderer(param);
                msg = await this._renamePage(param);

            }
            else {
                msg = await this._renameNote(param);
            }

            renderer.render().catch((err) => {
                console.log(err);
            });
        });
    }

    async _renameNote(param) {
        const renameNoteParam = {
            itemIdNo: param.itemInfo.itemIdNo,
            noteName: param.newNoteName,
        }
        await this.noteMenuApi.renameNote(renameNoteParam);
    }

    async _renamePage(param) {
        const renamePageParam = {
            pageIdNo: param.itemInfo.itemIdNo,
            title: param.newNoteName,
            content: editor.getMarkdown()
        }

        return await this.noteMenuApi.renamePage(renamePageParam);
    }
}

export {RenameModalHandler};