import {setPageSideMenu, setNoteSideMenu, getNoteUIParamJsonStr} from "./note_list_ui_util.js";

function renderingNoteTree2(api, callback) {
    api(getNoteUIParamJsonStr, callback);

    setNoteSideMenu(data.noteUIParam);
    setPageSideMenu(data.noteUIParam);

    const noteItemList = document.querySelector("#note-item-list");

    const html = `
            ${createNoteTree(data.noteTree, data.noteUIParam)}
        `;

    noteItemList.innerHTML = html;
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

export {renderingNoteTree, getNoteUIParamJsonStr}