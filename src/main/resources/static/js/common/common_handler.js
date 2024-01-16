import {SearchBoxRenderer} from "../search/search_box_renderer.js";

class CommonHandler {
    constructor() {
        // this.commonApi = new CommonApi();
    }

    setKeyupToSearchInput(searchInput, param) {
        searchInput.addEventListener('input', async () => {
            param.keyword = searchInput.value;
            console.log(param);
            await new SearchBoxRenderer(param).render();
        });
    }
}

export {CommonHandler}