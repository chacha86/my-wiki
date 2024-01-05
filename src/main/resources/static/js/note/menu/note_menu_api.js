import {aPostFetch} from "../../note_api.js";

class NoteMenuApi {
    async addNote(noteIdNo, param) {
        const url = "/api/notes/add/" + noteIdNo;
        return await aPostFetch(url, param);
    }
}

export {NoteMenuApi}