import {NoteData, ItemData, NoteRenderer} from "../../note_renderer.js";
import {NoteMoveModalRenderer} from "./note_move_modal_renderer.js";
import {NoteMenuApi} from "../note_menu_api.js";
import {HandlerFactory, RendererFactory} from "../../../initializer.js";
import {NoteParam} from "../../noteParam.js";

class NoteMoveModalHandler {
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

    noteItemList.forEach((item) => {
            item.addEventListener('click', async (e) => {
                // const prevSelectedNoteElement = null;
                const moveParam = new NoteParam();
                const currentSelectedNoteElement = e.target;
                const noteIdNo = this.getNoteIdNoFromElement(currentSelectedNoteElement);
                const destinationNoteId = ItemData.getNoteIdByItemNo(noteIdNo);
                const moveTargetNoteId = param.moveTargetNoteId;
                const data = await HandlerFactory.get("noteMenu").getMoveNoteTree(ItemData.getItemNoById(moveTargetNoteId));

                moveParam.moveTargetNoteId = moveTargetNoteId;
                moveParam.destinationNoteId = destinationNoteId;
                moveParam.data = data;

                RendererFactory.get("noteMoveModal").render(moveParam);

                // if (prevSelectedNoteElement != null) {
                //     prevSelectedNoteElement.classList.remove("bg-gray-500", "rounded-md");
                // }
                // currentSelectedNoteElement.classList.add("bg-gray-500", "rounded-md");

            });
        });
    }

    setUpdateApiToMoveBtn(moveBtnDiv, param) {
        moveBtnDiv.innerHTML = "";
        moveBtnDiv.innerHTML = `<a>이동</a>`

        document.querySelector("#move-btn a").addEventListener("click", async () => {
            const destinationNoteId = RendererFactory.get("noteMoveModal").props.destinationNoteId;
            const moveTargetNoteId = RendererFactory.get("noteMoveModal").props.moveTargetNoteId;
            const noteParam = new NoteParam();
            const moveParam = new NoteParam();

            if (destinationNoteId == null) {
                alert("이동할 노트를 선택해주세요.");
                return;
            }
            if (destinationNoteId === moveTargetNoteId) {
                alert("같은 곳으로는 이동이 불가능합니다.");
                return;
            }

            const updateMoveNoteParam = {
                "moveTargetId": ItemData.getItemNoById(moveTargetNoteId),
                "destinationId": ItemData.getItemNoById(destinationNoteId)
            };

            const msg = await this.noteMenuApi.updateMoveNote(updateMoveNoteParam);
            const selectedNoteId = RendererFactory.get("note").props.selectedNoteId;
            const noteData = await HandlerFactory.get("note").getNoteData();

            noteParam.selectedNoteId = selectedNoteId;
            noteParam.data = noteData;

            RendererFactory.get("note").render(noteParam);

            const moveData = await HandlerFactory.get("noteMenu").getMoveNoteTree(ItemData.getItemNoById(moveTargetNoteId));
            moveParam.data = moveData;

            RendererFactory.get("noteMoveModal").render(moveParam);
        });
    }

    setMoveCloseBtn(moveCloseBtnDiv, param) {
        const moveCloseBtn = `
            <button class="btn move-close">Close</button>
        `;

        moveCloseBtnDiv.innerHTML = "";
        moveCloseBtnDiv.innerHTML = moveCloseBtn;

        document.querySelector("#move-close-btn button").addEventListener("click", () => {
            const moveParam = new NoteParam();
            moveParam.destinationNoteId = null;
            moveParam.data = param.data;
            RendererFactory.get("noteMoveModal").render(moveParam);
            document.querySelector("#my_modal_2").close();
        });

    }

    getNoteIdNoFromElement(element) {
        return element.getAttribute('data-note-id');
    }

    getElementByDataNoteId(dataNoteId) {
        return document.querySelector(`[data-note-id="${dataNoteId}"]`);
    }
}

export {NoteMoveModalHandler}