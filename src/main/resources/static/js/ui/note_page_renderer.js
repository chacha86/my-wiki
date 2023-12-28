import {changeSelectedItem, getNoteUIParamJsonStr} from "./note_list_ui_util.js";
import {addContextMenuEventToPage} from "./item_menu_renderer.js";
import {postFetch} from "../note_api.js";

let selectedPageId = null;
let prevNotePageId = null;

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

        console.log("---------------------> notePageIdNo : " + data.notePageDto.noteid);
        let html = `
            <input class="title block border-b-[1px] font-bold p-[10px] mb-[10px] focus:outline-none" type="text"
                   name="title">
                <div>
                    <a id="page-update-btn" class="font-bold text-blue-500 p-[10px]">🛠️ 저장하기</a>
                    <a id="page-delete-btn" class="font-bold text-red-500 p-[10px]">🗑️ 삭제하기</a>
                </div>`;

        const contentHeader = document.querySelector(".content-header");
        contentHeader.innerHTML = html;

        const pageUpdateBtn = document.querySelector("#page-update-btn");
        const pageDeleteBtn = document.querySelector("#page-delete-btn");

        pageUpdateBtn.addEventListener("click", function (e) {
            const title = document.querySelector(".title").value;
            const content = editor.getMarkdown();
            const url = "/api/pages/update/" + notePageIdNo;
            console.log("---------------------> notePageIdNo : " + data.notePageDto.noteId);
            const notePageParamDto = {
                noteId: data.notePageDto.noteId,
                title: title,
                content: content
            }
            postFetch(url, JSON.stringify(notePageParamDto), function (data) {
                renderingNotePage(data.noteId);

            });
        });

        pageDeleteBtn.addEventListener("click", function (e) {
            const url = "/api/pages/delete/" + notePageIdNo;
            const deleteParamDto = {
                noteId: data.notePageDto.noteId,
            }

            postFetch(url, JSON.stringify(deleteParamDto), function (data) {
                selectedPageId = null;
                const contentHeader = document.querySelector(".content-header");
                contentHeader.innerHTML = "";
                editor.setMarkdown("");
                renderingNotePage(data.noteId);
            });
        });

        const titleInput = document.querySelector(".title");
        titleInput.setAttribute('spellcheck', 'false');
        titleInput.addEventListener('keydown', function (e) {
            if (e.keyCode === 13) {
                e.preventDefault();
                editor.focus();
            }
        });

        titleInput.value = data.notePageDto.title;
        editor.setMarkdown(data.notePageDto.notePageDetailDto.content);
    });
}
function renderingNotePage(noteIdNo) {
    // const url = "/api/notes/pages";
    const url = "/api/notes/" + noteIdNo + "/pages";
    let selectedPageIdNo = null;
    if(selectedPageId != null) {
        selectedPageIdNo = selectedPageId.split("-")[1];
    }
    const pageListParam = {
        noteId: noteIdNo,
        pageId: selectedPageIdNo
    }
    // setPageSideMenu(data.noteUIParam);
    postFetch(url, JSON.stringify(pageListParam), function (data) {
        const pageItemList = document.querySelector("#page-item-list");
        const html = `
            ${createNotePage(data.notePageDtoList)}
        `;

        pageItemList.innerHTML = html;

        addContextMenuEventToPage()

        if(data.pageId != null) {
            const page = document.querySelector("#page-" + data.pageId);
            let customClass = " bg-gray-500 text-white rounded-md";
            let originClass = page.getAttribute("class")
            let newClass = originClass + customClass;
            page.setAttribute("class", newClass);
        }
        document.querySelectorAll("#page-item-list li a").forEach(item => {
            item.addEventListener("click", function (e) {
                const pageId = item.parentElement.getAttribute("id");
                if(pageId != null) {
                    prevNotePageId = selectedPageId;
                    const pageIdNo = pageId.split("-")[1];
                    renderingPageContent(pageIdNo);
                    changeSelectedItem(pageId, prevNotePageId, " bg-gray-500 text-white rounded-md");
                    selectedPageId = pageId;
                }
            });
        });
    });
}

export {renderingNotePage}