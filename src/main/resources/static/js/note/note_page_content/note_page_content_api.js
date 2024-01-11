import {aPostFetch} from "../../note_api.js";
import {getNoteUIParamJsonStr} from "../../ui/note_list_ui_util.js";

class NotePageContentApi {
    async getPageContentByPage(pageIdNo) {
        const url = "/api/notes/pages/" + pageIdNo;
        return await aPostFetch(url, getNoteUIParamJsonStr());
    }
}

export {NotePageContentApi}