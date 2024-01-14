import {aPostFetch} from "../../note_api.js";

class NotePageApi {
    async getAllPagesByNote(noteIdNo) {
        const url = "/api/notes/" + noteIdNo + "/pages";
        return await aPostFetch(url, null);
    }

    async addPage(noteIdNo) {
        let url = "/api/pages/add/" + noteIdNo;
        return await aPostFetch(url, null);
    }
}

export {NotePageApi}