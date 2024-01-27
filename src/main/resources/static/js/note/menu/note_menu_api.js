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

    async updateMoveNote(param) {
        const url = "/api/notes/update/move";
        return await aPostFetch(url, JSON.stringify(param));
    }


    async renameNote(renameNoteParam) {
        const url = "/api/notes/update/" + renameNoteParam.itemIdNo;
        return await aPostFetch(url, JSON.stringify(renameNoteParam));
    }

    async deletePage(pageIdNo) {
        const url = "/api/pages/delete/" + pageIdNo;
        return await aPostFetch(url, getNoteUIParamJsonStr());
    }

    async renamePage(renamePageParam) {
        const url = "/api/pages/update/" + renamePageParam.pageIdNo;
        return await aPostFetch(url, JSON.stringify(renamePageParam));
    }

    async updateMovePage(movePageParam) {
        const url = "/api/pages/update/move/" + movePageParam.pageIdNo;
        return await aPostFetch(url, JSON.stringify(movePageParam));
    }

    async movePage() {
        const url = "/api/pages/move";
        return await aPostFetch(url, getNoteUIParamJsonStr());
    }
}

export {NoteMenuApi}