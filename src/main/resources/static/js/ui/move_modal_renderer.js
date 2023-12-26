import {
    setPageSideMenu,
    setNoteSideMenu, getNoteUIParamJsonStr,
} from "./note_list_ui_util.js";
import {postFetch} from "../note_api.js";

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

        const noteItem = document.querySelectorAll("#move-note-modal summary");
        noteItem.forEach((item) => {
            item.addEventListener('click', function (e) {
                let span = document.createElement("span");
                span.innerHTML = "aaa";
                item.appendChild(span);

                e.stopPropagation();
                e.preventDefault();
            });
        });
    });
}

function createNoteTree(noteList, noteUIParam) {
    return `
            ${noteList.map((note) => {
        return `${createNoteItem(note, noteUIParam)}`;
    }).join('')}
        `
}

function createChildNoteTree(note, noteUIParam, noteItemClass, noteAnchorClass, recurFunc) {
    return `
            <details data-note-id="${note.id}" ${noteUIParam.openList.includes(note.id) ? "open" : ""}>
                <summary class="${noteItemClass}"><a class="${noteAnchorClass}">${note.name}</a></summary>
                <ul>
                    ${note.children.length > 0 ? recurFunc(note.children, noteUIParam) : ''}
                </ul>
            </details>
        `
}

function createNoteItem(note, noteUIParam) {
    let noteItemClass = "hover:bg-gray-500 hover:text-white hover:rounded-md";
    let groupItemClass = note.groupYn === 0 ? noteItemClass : "";
    let noteAnchorClass = "min-w-[120px]";

    return `
            <li id="${'note-' + note.id}" data-note-name="${note.name}" data-note-type="${note.groupYn}" class="${groupItemClass}">
                ${note.groupYn === 1 ? createChildNoteTree(note, noteUIParam, noteItemClass, noteAnchorClass, createNoteTree) : ''}
            </li>
        `
}

// ${note.groupYn === 0 ? `<a class=${noteAnchorClass}">${note.name}</a>` : ``}

export {renderingMoveModalNoteTree}