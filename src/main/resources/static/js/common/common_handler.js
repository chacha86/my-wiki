import {SearchBoxRenderer} from "../search/search_box_renderer.js";
import {HandlerFactory, RendererFactory} from "../initializer.js";
import {NoteParam} from "../note/noteParam.js";

class CommonHandler {
    constructor() {
        // this.commonApi = new CommonApi();
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