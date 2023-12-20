import { getNoteUIParamJsonStr } from "./ui/note_list_ui.js";
import { renderingNoteTree } from "./ui/note_renderer.js";
import { renderingNotePage } from "./ui/note_page_renderer.js";
import { addContextMenuEventToNote, addContextMenuEventToPage } from "./ui/item_menu.js";

let selectedNoteId = null;
let prevNotePageIdNo = null;
let prevNoteIdNo = null;

function postFetch(url, jsonData, callback) {

    const headerName = document.querySelector("#csrf-header").value;
    const token = document.querySelector("#csrf-token").value;

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            [headerName]: token
        },
        body: jsonData
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            callback(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function changeSelectedItem(currentItemId, prevItemId, customClass) {

    const currentItem = document.querySelector("#" + currentItemId);
    const prevItem = document.querySelector("#" + prevItemId);
    //
    let originClass = currentItem.getAttribute("class")
    let newClass = originClass + customClass;
    //
    currentItem.setAttribute("class", newClass);
    if (prevItem != null) {
        prevItem.setAttribute("class", originClass);
    }
}

function getContent(notePageIdNo) {

    const url = "/api/notes/pages/" + notePageIdNo;
    const noteUIParamJson = getNoteUIParamJsonStr();

    postFetch(url, noteUIParamJson, function (data) {

        const titleInput = document.querySelector(".title");
        titleInput.value = data.notePageDto.title;
        editor.setMarkdown(data.notePageDto.notePageDetailDto.content);

        const itemPrefix = "page-";
        const currentItemId = itemPrefix + notePageIdNo;
        const prevItemId = itemPrefix + prevNotePageIdNo;
        const customClass = " bg-gray-500 text-white rounded-md";

        changeSelectedItem(currentItemId, prevItemId, customClass);
        prevNotePageIdNo = notePageIdNo;

    });
}

function getPages(noteIdNo) {
    const url = "/api/notes/" + noteIdNo + "/pages";
    const noteUIParamJson = getNoteUIParamJsonStr();
    console.log("sdfsdfsdfsdfsdf");

    postFetch(url, noteUIParamJson, function (data) {
        renderingNotePage(data);
        addContextMenuEventToPage();
        const itemPrefix = "note-";
        const currentItemId = itemPrefix + noteIdNo;
        const prevItemId = itemPrefix + prevNoteIdNo;
        const customClass = " bg-gray-500 text-white rounded-md";

        changeSelectedItem(currentItemId, prevItemId, customClass);
        prevNoteIdNo = noteIdNo;
        selectedNoteId = currentItemId;
    });
}

function getNotes(noteUIParamJson) {
    const url = "/api/notes";

    postFetch(url, noteUIParamJson, function (data) {
        renderingNoteTree(data);
        document.querySelectorAll("#note-item-list li a").forEach(item => {
            if(item != null) {
                item.addEventListener("click", function (e) {
                    const noteId = item.parentElement.getAttribute("id");
                    const noteIdNo = noteId.split("-")[1];
                    getPages(noteIdNo);
                });
            }
        });
        addContextMenuEventToNote();
    });
}

export { postFetch, getPages, getContent, getNotes, selectedNoteId };

