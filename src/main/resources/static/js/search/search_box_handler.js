import {SearchApi} from "./search_api.js";

class SearchBoxHandler {
    constructor() {
        this.searchApi = new SearchApi();
    }

    async getSearchList(keyword) {

        const searchParam = {
            "keyword": keyword
        }

        return await this.searchApi.getSearchResults(searchParam);
    }
}

export {SearchBoxHandler}