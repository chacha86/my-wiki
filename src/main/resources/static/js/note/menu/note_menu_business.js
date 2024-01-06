import {NoteMenuApi} from "./note_menu_api.js";
import {NoteMoveModalRenderer} from "./move/note_move_modal_renderer.js";

class NoteMenuBusiness {
    constructor(paramData) {
        this.NoteMenuApi = new NoteMenuApi();
        this.paramData = paramData;
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
        return await this.NoteMenuApi.addNote(noteIdNo);
    }

    async addGroupNote(noteIdNo) {
        return await this.NoteMenuApi.addGroupNote(noteIdNo);
    }

    async deleteNote(noteIdNo) {
        return await this.NoteMenuApi.deleteNote(noteIdNo);
    }

    async moveNote(param) {
        return await this.NoteMenuApi.moveNote(param);
    }
    async updateMove(param) {
        console.log(param);
        return await this.NoteMenuApi.updateMove(JSON.stringify(param));
    }
    async moveNoteModal(noteId, noteUIParam) {
        const moveModal = document.querySelector('#my_modal_2');

        let noteMoveModalRenderer = new NoteMoveModalRenderer(this.paramData);
        noteMoveModalRenderer.render();
        moveModal.show();
    }
}

export {NoteMenuBusiness}