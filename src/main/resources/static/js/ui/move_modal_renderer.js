import {
    setPageSideMenu,
    setNoteSideMenu, getNoteUIParamJsonStr,
} from "./note_list_ui_util.js";
import {postFetch} from "../note_api.js";
import {renderingNoteTree2} from "./note_renderer.js"

const modalCloseBtn = document.querySelector(".move-close");
modalCloseBtn.addEventListener('click', function () {
    const modal = document.querySelector("#move-note-modal");
    modal.innerHTML = "";
});

function renderingMoveModalNoteTree(noteUIParam, noteInfo) {
    const url = "/api/notes/move";
    console.log("------------------------------123");
    console.log(noteInfo);
    const moveNoteParam = {
        "noteId": noteInfo.noteIdNo,
        "noteUIParam": JSON.parse(noteUIParam)
    }
    postFetch(url, JSON.stringify(moveNoteParam), function (data) {
        console.log(data);
        setNoteSideMenu(data.noteUIParam);
        setPageSideMenu(data.noteUIParam);

        const noteItemList = document.querySelector("#move-note-modal");

        const html = `
            ${createNoteTree(data.noteTree, data.noteUIParam)}
        `;

        noteItemList.innerHTML = html;

        let parentItems = document.querySelectorAll(".parent");

        let itemContentHover = " hover:bg-gray-200 hover:rounded-md";
        let collapse = " inline-block w-[20px] text-center text-[1.3rem] shadow border border-black select-none"
        let collapseHover = " hover:font-bold hover:bg-gray-200 cursor-pointer";
        let collapseNeg = " bg-gray-200 shadow-inner border border-black";

        parentItems.forEach(function (item) {

            const childList = item.parentElement.querySelector(".child-list");
            if (childList != null) {
                let collapseSpan = document.createElement("span");
                // collapseSpan.setAttribute("class", "collapse");
                collapseSpan.setAttribute("class", "my-collapse " + collapse + collapseHover);
                collapseSpan.innerHTML = "+";
                let firstChild = item.firstChild;
                item.insertBefore(collapseSpan, firstChild);
            }
            if (item.getAttribute("open") === "false") {
                let subItems = item.nextElementSibling;

                if (subItems != null) {
                    console.log(subItems);
                    subItems.style.display = "none";
                }
            }
        });

        let collapseItems = document.querySelectorAll(".parent .my-collapse");
        collapseItems.forEach(function (item) {
            item.addEventListener("click", function () {
                let parentItem = item.parentElement;
                let subItems = parentItem.nextElementSibling;

                if (parentItem.getAttribute("open") === "true") {
                    item.innerHTML = "+";
                    // item.classList.remove("collapse-neg");
                    item.setAttribute("class", "my-collapse " + collapse + collapseHover);
                    subItems.style.display = "none";
                    parentItem.setAttribute("open", "false");
                } else {
                    item.innerHTML = "-";
                    item.setAttribute("class", "my-collapse " + collapse + collapseHover + collapseNeg);
                    // item.classList.add("collapse-neg");
                    subItems.style.display = "block";
                    parentItem.setAttribute("open", "true");
                }
            });
        });

        let noteItem = document.querySelectorAll(".content");
        let prevSelectedNote = null;
        let currentSelectedNote = null;

        noteItem.forEach(function (item) {
            item.addEventListener('click', function (e) {
                prevSelectedNote = currentSelectedNote;
                currentSelectedNote = e.target;
                if (prevSelectedNote != null) {
                    prevSelectedNote.classList.remove("bg-gray-500", "rounded-md");
                }
                currentSelectedNote.classList.add("bg-gray-500", "rounded-md");
            });
        });

        let moveBtn = document.querySelector("#move-btn");
        moveBtn.addEventListener('click', function () {
            if (currentSelectedNote == null) {
                alert("이동할 노트를 선택해주세요.");
                return;
            }
            const currentSelectedNoteId = currentSelectedNote.getAttribute("data-note-id");
            console.log(currentSelectedNoteId);
            console.log(noteInfo.noteIdNo);

            if(currentSelectedNoteId === noteInfo.noteIdNo) {
                alert("같은 곳으로는 이동이 불가능합니다.");
                return;
            }
            const url = "/api/notes/update/move";
            const updateMoveNoteParam = {
                "moveTargetId": noteInfo.noteIdNo,
                "destinationId": currentSelectedNote.getAttribute("data-note-id")
            }
            postFetch(url, JSON.stringify(updateMoveNoteParam), function (data) {
                renderingNoteTree2(getNoteUIParamJsonStr());
            });
        });
        // const noteItem = document.querySelectorAll("#move-note-modal summary");
        // noteItem.forEach((item) => {
        //     item.addEventListener('click', function (e) {
        //         let span = document.createElement("span");
        //         span.innerHTML = "aaa";
        //         item.appendChild(span);
        //
        //         e.stopPropagation();
        //         e.preventDefault();
        //     });
        // });
    });
}

function createNoteTree(noteList, noteUIParam) {
    return `
            ${noteList.map((note) => {
        if (note.groupYn === 0) {
            return '';
        }
        return `${createNoteItem(note, noteUIParam)}`;
    }).join('')}
        `
}

function createChildNoteTree(note, noteUIParam, recurFunc) {
    let childList = " child-list pl-[30px]";

    return `
            <div class="${childList}">
                ${note.children.length > 0 ? recurFunc(note.children, noteUIParam) : ''}
            </div>
        `
}

function createNoteItem(note, noteUIParam) {
    let item = " h-[50px] p-[5px]";
    let itemContent = " inline-block w-[90%] p-[5px]";
    let itemContentHover = " hover:bg-gray-200 hover:rounded-md cursor-default";
    let collapse = " inline-block w-[20px] text-center text-[1.3rem] shadow border border-black select-none"
    let collapseHover = " hover:font-bold hover:bg-gray-200 cursor-pointer";
    let collapseNeg = " bg-gray-200 shadow-inner border border-black";

    let itemParent = "item parent" + item;
    return `
            <div class="item-group">
                <div class="${itemParent}" open="true">
                    <span data-note-id="${note.id}" class="${"content" + itemContent + itemContentHover}" selected="false">${note.name}</span>
                </div>
                ${note.groupYn === 1 ? createChildNoteTree(note, noteUIParam, createNoteTree) : ''}
            </div>
        `
}

// <div id="${'note-' + note.id}" data-note-name="${note.name}" data-note-type="${note.groupYn}" class="${groupItemClass}">
//     ${note.groupYn === 1 ? createChildNoteTree(note, noteUIParam, noteItemClass, noteAnchorClass, createNoteTree) : ''}
// </div>
// ${note.groupYn === 0 ? `<a class=${noteAnchorClass}">${note.name}</a>` : ``}

export {renderingMoveModalNoteTree}