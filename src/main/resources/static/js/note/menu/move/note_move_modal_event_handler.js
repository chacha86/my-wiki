import {NoteMenuBusiness} from "../note_menu_business.js";
import {NoteRenderer} from "../../note_renderer.js";
import {postFetch} from "../../../note_api.js";
import {getNoteUIParamJsonStr, renderingNoteTree2} from "../../../ui/note_renderer.js";
import {renderingMoveModalNoteTree} from "../../../ui/move_modal_renderer.js";
import {NoteMoveModalRenderer} from "./note_move_modal_renderer.js";
import {NoteMenuApi} from "../note_menu_api.js";

class NoteMoveModalEventHandler {
    constructor(paramData) {
        this.paramData = paramData;
        this.noteMoveModalData = this.paramData["noteMoveModalData"];
        this.noteMenuApi = new NoteMenuApi();
    }

    addEvent() {
        let collapseItems = document.querySelectorAll(".parent .move-tree-collapse");
        let collapse = " inline-block w-[20px] text-center text-[1.3rem] shadow border border-black select-none"
        let collapseHover = " hover:font-bold hover:bg-gray-200 cursor-pointer";
        let collapseNeg = " bg-gray-200 shadow-inner border border-black";

        console.log(this.noteMoveModalData)
        collapseItems.forEach((item) => {
            item.addEventListener("click", () => {
                let parentItem = item.parentElement;
                let subItems = parentItem.nextElementSibling;

                if (parentItem.getAttribute("open") === "true") {
                    item.innerHTML = "+";
                    item.setAttribute("class", "move-tree-collapse " + collapse + collapseHover);
                    subItems.style.display = "none";
                    parentItem.setAttribute("open", "false");
                } else {
                    item.innerHTML = "-";
                    item.setAttribute("class", "move-tree-collapse " + collapse + collapseHover + collapseNeg);
                    // item.classList.add("collapse-neg");
                    subItems.style.display = "block";
                    parentItem.setAttribute("open", "true");
                }
            });
        });

        let noteItem = document.querySelectorAll(".move-tree-content");
        let prevSelectedNoteElement = null;
        let currentSelectedNoteElement = null;

        noteItem.forEach((item) => {
            item.addEventListener('click', (e) => {
                prevSelectedNoteElement = this.getElementByDataNoteId(this.noteMoveModalData.selectedNoteIdNo);
                currentSelectedNoteElement = e.target;
                this.noteMoveModalData.selectedNoteIdNo = this.getNoteIdFromElement(currentSelectedNoteElement);
                if (prevSelectedNoteElement != null) {
                    prevSelectedNoteElement.classList.remove("bg-gray-500", "rounded-md");
                }
                currentSelectedNoteElement.classList.add("bg-gray-500", "rounded-md");
            });
        });

        let moveBtnDiv = document.querySelector("#move-btn");
        moveBtnDiv.innerHTML = "";
        moveBtnDiv.innerHTML = `<a>이동</a>`
        document.querySelector("#move-btn a").addEventListener("click", this.moveCompleteCallback.bind(this));
    }

    async moveCompleteCallback() {
        let currentSelectedNoteId = this.noteMoveModalData.selectedNoteIdNo;
        let targetNoteId = this.noteMoveModalData.targetNoteIdNo;
        console.log(this.noteMoveModalData);
        if (currentSelectedNoteId == null) {
            alert("이동할 노트를 선택해주세요.");
            return;
        }
        if (currentSelectedNoteId === targetNoteId) {
            alert("같은 곳으로는 이동이 불가능합니다.");
            return;
        }

        const updateMoveNoteParam = {
            "moveTargetId": targetNoteId,
            "destinationId": currentSelectedNoteId
        }

        let msg = await this.noteMenuApi.updateMove(JSON.stringify(updateMoveNoteParam));
        console.log(msg);
        let noteRenderer = new NoteRenderer(this.paramData);
        noteRenderer.render().catch((e) => {
            console.error(e);
        });
        let noteMoveModalRenderer = new NoteMoveModalRenderer(this.paramData);
        noteMoveModalRenderer.render().catch((e) => {
            console.error(e);
        });
    }

    getNoteIdFromElement(element) {
        return element.getAttribute('data-note-id');
    }

    getElementByDataNoteId(dataNoteId) {
        return document.querySelector(`[data-note-id="${dataNoteId}"]`);
    }
}

export {NoteMoveModalEventHandler}