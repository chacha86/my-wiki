import {SearchApi} from "./search_api.js";
import {NoteRenderer} from "../note/note_renderer.js";
import {NotePageRenderer} from "../note/note_page/note_page_renderer.js";
import {NotePageContentRenderer} from "../note/note_page_content/note_page_content_renderer.js";

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

    setClickToItems(searchResultItems, param) {
        searchResultItems.forEach((item) => {
            item.addEventListener('click', async (e) => {

                param.selectedNoteId = item.getAttribute('data-note-id');
                await new NoteRenderer(param).render();
                const pageId = item.getAttribute('data-page-id');
                if(pageId != null || pageId !== undefined) {
                    param.selectedPageId = pageId;
                    await new NotePageRenderer(param).render();
                    await new NotePageContentRenderer(param).render();
                }
            });
        });
    }

}

export {SearchBoxHandler}