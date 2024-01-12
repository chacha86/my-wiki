import { RenameModalHandler } from "./rename_modal_handler.js";
class RenameModalRenderer {
    constructor(param) {

        this.param = param;
        this.handler = new RenameModalHandler();
        this.renderTarget = "rename-note-modal";
        this.renameModalParamData = this.param["renameModalData"];
        this.noteMoveModalData = {
            'selectedNoteId': null,
            'targetNoteId': null,
        };
    }
    async render() {
        this.postRender();
        this.eventHandle();
    }

    postRender() {
        const renameBtn = document.querySelector("#rename-btn");
        let noteInfo = this.renameModalParamData.noteInfo;
        this.handler.setApiToRenameBtn(renameBtn, noteInfo);
    }

    eventHandle() {

    }
}

export { RenameModalRenderer };