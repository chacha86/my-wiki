import {aPostFetch} from "../../note_api.js";

class NotePageApi {
    async getAllPagesByNote(param) {
        const url = "/api/notes/" + param.noteId + "/pages";
        return await aPostFetch(url, JSON.stringify(param));
    }

    async addPage(noteIdNo) {
        let url = "/api/pages/add/" + noteIdNo;
        return await aPostFetch(url, null);
    }
}

export {NotePageApi}