import {getNoteUIParamJsonStr} from "../../ui/note_list_ui_util.js";
import {NoteRenderer} from "../note_renderer.js";
import {NoteMenuBusiness} from "./note_menu_business.js";
import {aPostFetch, postFetch} from "../../note_api.js";
import {NoteMoveModalRenderer} from "./move/note_move_modal_renderer.js";
import {NoteMenuApi} from "./note_menu_api.js";

class NoteMenuEventHandle {
    constructor(paramData) {
        this.paramData = paramData;
        this.noteMenuData = this.paramData["noteMenuData"];
        this.noteMenuApi = new NoteMenuApi();
    }

    addEvent() {
        let menuItemAnchorList = document.querySelectorAll("#item-menu-popup a");
        menuItemAnchorList.forEach((anchor) => {
            let apiName = anchor.getAttribute('data-api-name');
            let noteIdNo = anchor.getAttribute('data-note-no');
            anchor.addEventListener('click', (event) => {
                let apiFunc = this.getApiFunction(apiName);
                console.log(apiFunc);
                apiFunc(noteIdNo).then((data) => {
                    new NoteRenderer(this.paramData).render().catch((error) => {
                        console.error(error);
                    });
                });
            });
        })

    }
    getApiFunction(apiName) {
        switch (apiName) {
            case 'deleteNote':
                return this.deleteNote.bind(this);
            case 'addGroupNote':
                return this.addGroupNote.bind(this);
            case 'addNote':
                return this.addNote.bind(this);
            case 'renameNoteModal':
            // return renameNoteModal;
            case 'moveNoteModal':
                return this.moveNoteModal.bind(this);
            default:
                return null;
        }
    }

    async addNote(noteIdNo) {
        return await this.noteMenuApi.addNote(noteIdNo);
    }

    async addGroupNote(noteIdNo) {
        return await this.noteMenuApi.addGroupNote(noteIdNo);
    }

    async deleteNote(noteIdNo) {
        return await this.noteMenuApi.deleteNote(noteIdNo);
    }

    async moveNote(param) {
        return await this.noteMenuApi.moveNote(param);
    }
    async moveNoteModal(noteId, noteUIParam) {
        const moveModal = document.querySelector('#my_modal_2');
        this.paramData["moveNoteTree"] = await this.moveNote(getNoteUIParamJsonStr());
        let noteMoveModalRenderer = new NoteMoveModalRenderer(this.paramData);
        noteMoveModalRenderer.render();
        moveModal.show();
    }
}

export {NoteMenuEventHandle};