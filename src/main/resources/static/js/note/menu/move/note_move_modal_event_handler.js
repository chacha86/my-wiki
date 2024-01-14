import {NoteData, ItemData, NoteRenderer} from "../../note_renderer.js";
import {NoteMoveModalRenderer} from "./note_move_modal_renderer.js";
import {NoteMenuApi} from "../note_menu_api.js";
import {getNoteUIParamJsonStr} from "../../../ui/note_list_ui_util.js";

class NoteMoveModalEventHandler {
    constructor() {
        this.noteMenuApi = new NoteMenuApi();
    }

    renderCollapseIcon(collapseItems) {

        let collapse = " inline-block w-[20px] text-center text-[1.3rem] shadow border border-black select-none"
        let collapseHover = " hover:font-bold hover:bg-gray-200 cursor-pointer";
        let collapseNeg = " bg-gray-200 shadow-inner border border-black";

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
    }

    setSelectEffect(noteItemList, param) {

        let noteMoveModalDataRefer = param.noteMoveModalDataRefer;
        let prevSelectedNoteElement = null;
        let currentSelectedNoteElement = null;

        noteItemList.forEach((item) => {
            item.addEventListener('click', (e) => {
                prevSelectedNoteElement = this.getElementByDataNoteId(NoteData.getNo(noteMoveModalDataRefer.destinationNoteId));

                currentSelectedNoteElement = e.target;
                noteMoveModalDataRefer.destinationNoteId = NoteData.getId(this.getNoteIdFromElement(currentSelectedNoteElement));
                if (prevSelectedNoteElement != null) {
                    prevSelectedNoteElement.classList.remove("bg-gray-500", "rounded-md");
                }
                currentSelectedNoteElement.classList.add("bg-gray-500", "rounded-md");

            });
        });
    }

    setUpdateApiToMoveBtn(moveBtn, param) {
        let moveBtnDiv = document.querySelector("#move-btn");
        moveBtnDiv.innerHTML = "";
        moveBtnDiv.innerHTML = `<a>이동</a>`

        let noteMoveModalDataRefer = param.noteMoveModalDataRefer;

        document.querySelector("#move-btn a").addEventListener("click", async () => {
            let currentSelectedNoteId = noteMoveModalDataRefer.destinationNoteId;

            if (currentSelectedNoteId == null) {
                alert("이동할 노트를 선택해주세요.");
                return;
            }
            if (currentSelectedNoteId === noteMoveModalDataRefer.moveTargetNoteId) {
                alert("같은 곳으로는 이동이 불가능합니다.");
                return;
            }

            const updateMoveNoteParam = {
                "moveTargetId": NoteData.getNo(noteMoveModalDataRefer.moveTargetNoteId),
                "destinationId": NoteData.getNo(currentSelectedNoteId)
            };

            let msg = await this.noteMenuApi.updateMoveNote(updateMoveNoteParam);

            let noteRenderer = new NoteRenderer(new Map());
            noteRenderer.render().catch((e) => {
                console.error(e);
            });

            const param = {
                "targetNoteId": noteMoveModalDataRefer.moveTargetNoteId,
                "moveNoteTree": await this.noteMenuApi.moveNote(ItemData.getItemNoById(noteMoveModalDataRefer.moveTargetNoteId))
            };

            let noteMoveModalRenderer = new NoteMoveModalRenderer(param);
            noteMoveModalRenderer.render().catch((e) => {
                console.error(e);
            });
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