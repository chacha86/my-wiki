import {changeSelectedItem, getNoteUIParamJsonStr} from "./note_list_ui_util.js";
import {addContextMenuEventToPage} from "./item_menu_renderer.js";
import {postFetch} from "../note_api.js";

let prevNotePageIdNo = null;

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

function renderingPageContent(notePageIdNo) {
    const url = "/api/notes/pages/" + notePageIdNo;
    const noteUIParamJson = getNoteUIParamJsonStr();

    postFetch(url, noteUIParamJson, function (data) {
        const titleInput = document.querySelector(".title");
        titleInput.value = data.notePageDto.title;
        editor.setMarkdown(data.notePageDto.notePageDetailDto.content);
    });
}
function renderingNotePage(noteIdNo) {
    // const url = "/api/notes/pages";
    const url = "/api/notes/" + noteIdNo + "/pages";
    // setPageSideMenu(data.noteUIParam);
    postFetch(url, getNoteUIParamJsonStr(), function (data) {
        const pageItemList = document.querySelector("#page-item-list");
        const html = `
            ${createNotePage(data.notePageDtoList)}
        `;

        pageItemList.innerHTML = html;

        addContextMenuEventToPage()

        document.querySelectorAll("#page-item-list li a").forEach(item => {
            item.addEventListener("click", function (e) {
                const pageId = item.parentElement.getAttribute("id");
                if(pageId != null) {
                    const pageIdNo = pageId.split("-")[1];
                    renderingPageContent(pageIdNo);
                    changeSelectedItem(pageId, prevNotePageIdNo, " bg-gray-500 text-white rounded-md");
                    prevNotePageIdNo = pageId;
                }
            });
        });
    });
}

export {renderingNotePage}