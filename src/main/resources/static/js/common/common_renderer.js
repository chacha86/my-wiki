import {CommonHandler} from "./common_handler.js";

class CommonRenderer {
    constructor(param) {
        this.param = param;
        this.handler = new CommonHandler();
    }

    render() {

        this.postRender();
    }

    postRender() {

        this.eventHandle();
    }
    eventHandle() {
        const searchInput = document.querySelector("#search-input");
        this.handler.setKeyupToSearchInput(searchInput, this.param);
    }
}

export {CommonRenderer};