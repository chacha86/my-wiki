import { RenameModalHandler } from "./rename_modal_handler.js";
class RenameModalRenderer {
    constructor(param) {
        this.param = param;
        this.handler = new RenameModalHandler();
        this.renderTarget = "rename-note-modal";
    }
    async render() {
        this.postRender();
        this.eventHandle();
    }

    postRender() {
        this.eventHandle();
    }

    eventHandle(param) {

        const renameBtnDiv = document.querySelector("#rename-btn");
        this.handler.setApiToRenameBtn(renameBtnDiv, this.param);
    }
}

export { RenameModalRenderer };