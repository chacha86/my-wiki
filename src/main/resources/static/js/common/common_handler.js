import {SearchBoxRenderer} from "../search/search_box_renderer.js";
import {HandlerFactory, RendererFactory} from "../initializer.js";
import {NoteParam} from "../note/noteParam.js";

class CommonHandler {
    constructor() {
        // this.commonApi = new CommonApi();
    }

    setPopState() {
        window.addEventListener('popstate', (e) => {
            const state = e.state;
            console.assert(state !== null, "state is null");

            const noteParam = new NoteParam();
            const pageParam = new NoteParam();

            noteParam.selectedNoteId = state.selectedNoteId;
            noteParam.prevNoteId = state.prevNoteId;
            noteParam.data = state.noteData;
            RendererFactory.get("note").render(noteParam);

            pageParam.selectedNoteId = state.selectedNoteId;
            pageParam.selectedPageId = state.selectedPageId;
            pageParam.prevPageId = state.prevPageId;
            pageParam.data = state.pageData;

            RendererFactory.get("notePage").render(pageParam);
        });
    }
    setKeyupToSearchInput(searchInput, param) {
        searchInput.addEventListener('input',  async (e) => {
            const keyword = e.target.value;
            if(keyword.length === 0) {
                console.log("keyword is empty");
                return;
            }
            const searchParam = new NoteParam();
            searchParam.data = await HandlerFactory.get("searchBox").getSearchList(keyword);
            RendererFactory.get("searchBox").render(searchParam);
        });
    }
}

export {CommonHandler}