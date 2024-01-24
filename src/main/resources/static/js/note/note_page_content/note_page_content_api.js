import {aPostFetch} from "../../note_api.js";
import {getNoteUIParamJsonStr} from "../../ui/note_list_ui_util.js";

class NotePageContentApi {
    async getPageContentByPage(pageIdNo) {
        const url = "/api/notes/pages/" + pageIdNo;
        return await aPostFetch(url,getNoteUIParamJsonStr());
    }

    async updateContent(updateContentParam) {
        const url = "/api/pages/update/" + updateContentParam.pageIdNo;
        return await aPostFetch(url, JSON.stringify(updateContentParam));
    }

    async deleteContent(deleteContentParam) {
        const url = "/api/pages/delete/" + deleteContentParam.pageIdNo;
        return await aPostFetch(url, JSON.stringify(deleteContentParam));
    }
}

export {NotePageContentApi}