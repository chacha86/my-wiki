import {setPageSideMenu, getContent} from "./note_list_ui_util.js";

function createNotePageItem(notePageDto) {
    let pageClass = "hover:bg-gray-500 hover:text-white hover:rounded-md";
    let pageLinkClass = "block p-[10px] text-[15px] hover:cursor-pointer";
    return `
            <li class="${pageClass}" id="page-${notePageDto.id}" data-page-title="${notePageDto.title}">
                <a class="${pageLinkClass}" id="page-${notePageDto.id}">${notePageDto.title}</a>
            </li>
        `
}

function createNotePage(pageDtoList) {
    return `
            ${pageDtoList.map((notePageDto) => {
        return `${createNotePageItem(notePageDto)}`;
    }).join('')}
        `
}

function renderingNotePage(data) {
    setPageSideMenu(data.noteUIParam);
    const pageItemList = document.querySelector("#page-item-list");
    const html = `
            ${createNotePage(data.notePageDtoList)}
        `;

    pageItemList.innerHTML = html;
}

export {renderingNotePage, getContent}