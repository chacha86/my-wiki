import {CommonHandler} from "./common_handler.js";
import {HandlerFactory} from "../initializer.js";

class CommonRenderer {
    constructor() {
        this.props = {

        };
        this.handler = HandlerFactory.get("common");
    }

    preRender(param) {
        Object.keys(this.props).forEach((key) => {
            if (param[key] != null) {
                this.props[key] = param[key];
            }
        });
    }
    render(param) {
        this.preRender(param);
        this.postRender(param);
    }

    postRender(param) {
        Object.keys(this.props).forEach((key) => {
            param[key] = this.props[key];
        });
        this.eventHandle(param);
    }
    eventHandle(param) {
        const searchInput = document.querySelector("#search-input");
        this.handler.setKeyupToSearchInput(searchInput, param);
    }
}

export {CommonRenderer};