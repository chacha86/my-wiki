import {NoteMenuApi} from "../note_menu_api.js";
import {NoteRenderer} from "../../note_renderer.js";

class RenameModalHandler {
    constructor() {
        this.noteMenuApi = new NoteMenuApi();
    }

    setApiToRenameBtn(renameBtn, noteInfo) {
        renameBtn.addEventListener('click', async () => {
            const noteNameInput = document.querySelector('#new-note-name');
            noteInfo.newNoteName = noteNameInput.value;
            let msg = await this.noteMenuApi.renameNote(noteInfo);

            let noteRenderer = new NoteRenderer(new Map());
            noteRenderer.render();
        });
    }
}

export {RenameModalHandler};