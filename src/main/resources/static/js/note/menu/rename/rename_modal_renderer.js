import { RenameModalHandler } from "./rename_modal_handler.js";
import {HandlerFactory} from "../../../initializer.js";
class RenameModalRenderer {
    constructor() {
        this.renderTarget = "rename-note-modal";
        this.props = {
            'itemInfo' : null
        };
        this.handler = HandlerFactory.get("renameModal");
    }
    preRender(param) {
        Object.keys(this.props).forEach((key) => {
            if (param[key] !== undefined) {
                this.props[key] = param[key];
            }
        });
    }

    async render(param) {
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
        const renameBtnDiv = document.querySelector("#rename-btn");
        this.handler.setApiToRenameBtn(renameBtnDiv, param);
    }
}

export { RenameModalRenderer };