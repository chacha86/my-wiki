import {NoteMenuApi} from "../note_menu_api.js";
import {NoteRenderer} from "../../note_renderer.js";
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

            itemInfo.newNoteName = noteNameInput.value;

            if(itemInfo.itemType === 'page') {
                renderer = new NotePageRenderer(param);
                msg = await this.noteMenuApi.renamePage(itemInfo);
            }

            msg = await this.noteMenuApi.renameNote(itemInfo);

            renderer.render().catch((err) => {
                console.log(err);
            });
        });
    }
}

export {RenameModalHandler};