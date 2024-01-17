import {SearchBoxRenderer} from "../search/search_box_renderer.js";

class CommonHandler {
    constructor() {
        // this.commonApi = new CommonApi();
    }

    setKeyupToSearchInput(searchInput, param) {
        searchInput.addEventListener('input',  (e) => {
            const targetValue = e.target.value;
            param.keyword = targetValue;
            if(targetValue.length === 0) {
                console.log("keyword is empty");
                return;
            }
            console.log(e.target.value);
            new SearchBoxRenderer(param).render();
        });
    }
}

export {CommonHandler}