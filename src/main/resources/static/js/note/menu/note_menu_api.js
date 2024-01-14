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


    async renameNote(itemInfo) {
        const url = "/api/notes/update/" + itemInfo.itemIdNo;
        const param = {
            noteName: itemInfo.newNoteName
        }
        return await aPostFetch(url, JSON.stringify(param));
    }

    async deletePage(pageIdNo) {
        const url = "/api/pages/delete/" + pageIdNo;
        return await aPostFetch(url, getNoteUIParamJsonStr());
    }

    async renamePage(renamePageParam) {
        const url = "/api/notes/update/" + renamePageParam.itemIdNo;
        const param = {
            noteName: renamePageParam.newNoteName
        }
        return await aPostFetch(url, JSON.stringify(param));
    }

    async updateMovePage(movePageParam) {
        const url = "/api/pages/move/" + movePageParam.pageIdNo;
        const param = {
            noteId: movePageParam.noteIdNo,
        };
        return await aPostFetch(url, JSON.stringify(param));
    }
}

export {NoteMenuApi}