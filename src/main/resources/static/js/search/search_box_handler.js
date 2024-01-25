import {SearchApi} from "./search_api.js";
import {ItemData, NoteRenderer} from "../note/note_renderer.js";
import {NotePageRenderer} from "../note/note_page/note_page_renderer.js";
import {NotePageContentRenderer} from "../note/note_page_content/note_page_content_renderer.js";
import {NotePageApi} from "../note/note_page/note_page_api.js";
import {NoteParam} from "../note/noteParam.js";
import {HandlerFactory, RendererFactory} from "../initializer.js";

class SearchBoxHandler {
    constructor() {
        this.searchApi = new SearchApi();
        this.notePageApi = new NotePageApi();
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
                const selectedNoteId = item.getAttribute('data-note-id');
                const selectedPageId = item.getAttribute('data-page-id');

                const noteParam = new NoteParam();
                noteParam.selectedNoteId = selectedNoteId;
                noteParam.data = await HandlerFactory.get("note").getNoteData();
                RendererFactory.get('note').render(noteParam);

                if(selectedPageId != null || selectedPageId !== undefined) {
                    const sortType = RendererFactory.get("notePage").props.sortType;
                    const direction = RendererFactory.get("notePage").props.direction;
                    const pageParam = new NoteParam();
                    pageParam.selectedNoteId = selectedNoteId;
                    pageParam.selectedPageId = selectedPageId;
                    pageParam.sortType = sortType;
                    pageParam.direction = direction;
                    pageParam.data = await HandlerFactory.get("notePage").getNotePageData(selectedNoteId, sortType, direction);

                    RendererFactory.get('notePage').render(pageParam);

                    const contentParam = new NoteParam();

                    contentParam.selectedNoteId = selectedNoteId;
                    contentParam.selectedPageId = selectedPageId;
                    contentParam.data = await HandlerFactory.get("notePageContent").getContentByPageId(selectedPageId);

                    RendererFactory.get("notePageContent").render(contentParam);
                }
            });
        });
    }

}

export {SearchBoxHandler}