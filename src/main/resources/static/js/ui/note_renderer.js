import {
    setPageSideMenu,
    setNoteSideMenu,
    getNoteUIParamJsonStr,
    changeSelectedItem
} from "./note_list_ui_util.js";
import {renderingNotePage} from "./note_page_renderer.js";
import { addContextMenuEventToNote } from "./item_menu_renderer.js";
import { postFetch } from "../note_api.js";
// import {renderingNotePage} from "./note_page_renderer";

let selectedNoteId = null;
let prevNoteId = null;

function renderingNoteTree2(noteUIParam) {
    const url = "/api/notes";
    postFetch(url, noteUIParam, function (data) {
        setNoteSideMenu(data.noteUIParam);
        setPageSideMenu(data.noteUIParam);

        const noteItemList = document.querySelector("#note-item-list");

        const html = `
            ${createNoteTree(data.noteTree, data.noteUIParam)}
        `;

        noteItemList.innerHTML = html;
        addContextMenuEventToNote();

        document.querySelectorAll("#note-item-list li a").forEach(item => {
            item.addEventListener("click", function (e) {
                const noteId = item.parentElement.getAttribute("id");
                if(noteId != null) {
                    const noteIdNo = noteId.split("-")[1];
                    renderingNotePage(noteIdNo);

                    prevNoteId = selectedNoteId;
                    changeSelectedItem(noteId, prevNoteId, " bg-gray-500 text-white rounded-md");
                    selectedNoteId = noteId;
                }
            });
        });
        // renderingNotePage();
    });
}

function renderingNoteTree(data) {
    setNoteSideMenu(data.noteUIParam);
    setPageSideMenu(data.noteUIParam);

    const noteItemList = document.querySelector("#note-item-list");

    const html = `
            ${createNoteTree(data.noteTree, data.noteUIParam)}
        `;

    noteItemList.innerHTML = html;
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
                ${note.groupYn === 0 ? `<a class=${noteAnchorClass}">${note.name}</a>` : ``}
                ${note.groupYn === 1 ? createChildNoteTree(note, noteUIParam, noteItemClass, noteAnchorClass, createNoteTree) : ''}
            </li>
        `
}

export {renderingNoteTree2, getNoteUIParamJsonStr, selectedNoteId}