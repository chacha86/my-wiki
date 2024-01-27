import {aPostFetch} from "../note_api.js";

class SearchApi {

    async getSearchResults(searchParam) {
        const url = "/api/notes/search";
        return await aPostFetch(url, JSON.stringify(searchParam));
    }
}

export {SearchApi}