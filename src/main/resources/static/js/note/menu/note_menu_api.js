import {aPostFetch, postFetch} from "../../note_api.js";
import {getNoteUIParamJsonStr} from "../../ui/note_list_ui_util.js";

class NoteMenuApi {
    async addNote(noteIdNo, param) {
        const url = "/api/notes/add/" + noteIdNo;
        return await aPostFetch(url, param);
    }

    async addGroupNote(noteIdNo) {

        let url = "/api/notes/add-group";
        let noteUIParamJson = getNoteUIParamJsonStr();
        if(noteIdNo != null) {
            url = url + '/' + noteIdNo;
        }

        return await aPostFetch(url, noteUIParamJson);
    }
    async deleteNote(noteIdNo) {
        const noteUIParamJson = getNoteUIParamJsonStr();
        const url = "/api/notes/delete/" + noteIdNo;

        return await aPostFetch(url, noteUIParamJson);
    }
    async moveNote(noteIdNo) {
        const url = "/api/notes/move/" + noteIdNo;
        return await aPostFetch(url, getNoteUIParamJsonStr());
    }

    async updateMove(param) {
        const url = "/api/notes/update/move";
        return await aPostFetch(url, param);
    }


    async renameNote(noteInfo) {
        const url = "/api/notes/update/" + noteInfo.noteIdNo;
        const param = {
            noteName: noteInfo.newNoteName
        }
        return await aPostFetch(url, JSON.stringify(param));
    }
}

export {NoteMenuApi}