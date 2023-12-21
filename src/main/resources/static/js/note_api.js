import { getNoteUIParamJsonStr } from "./ui/note_list_ui_util.js";

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

function getContent(notePageIdNo, callback) {

    const url = "/api/notes/pages/" + notePageIdNo;
    const noteUIParamJson = getNoteUIParamJsonStr();

    postFetch(url, noteUIParamJson, function (data) {
        callback(data);
        // const titleInput = document.querySelector(".title");
        // titleInput.value = data.notePageDto.title;
        // editor.setMarkdown(data.notePageDto.notePageDetailDto.content);
        //
        // const itemPrefix = "page-";
        // const currentItemId = itemPrefix + notePageIdNo;
        // const prevItemId = itemPrefix + prevNotePageIdNo;
        // const customClass = " bg-gray-500 text-white rounded-md";
        //
        // changeSelectedItem(currentItemId, prevItemId, customClass);
        // prevNotePageIdNo = notePageIdNo;

    });
}

function getPages(noteIdNo, callback) {
    const url = "/api/notes/" + noteIdNo + "/pages";
    const noteUIParamJson = getNoteUIParamJsonStr();

    postFetch(url, noteUIParamJson, function (data) {
        callback(data);
    });
    // postFetch(url, noteUIParamJson, function (data) {
    //     renderingNotePage(data);
    //     addContextMenuEventToPage();
    //     const itemPrefix = "note-";
    //     const currentItemId = itemPrefix + noteIdNo;
    //     const prevItemId = itemPrefix + prevNoteIdNo;
    //     const customClass = " bg-gray-500 text-white rounded-md";
    //
    //     changeSelectedItem(currentItemId, prevItemId, customClass);
    //     prevNoteIdNo = noteIdNo;
    //     selectedNoteId = currentItemId;
    // });
}

function getNotes(noteUIParamJson, callback) {
    const url = "/api/notes";

    postFetch(url, noteUIParamJson, function (data) {
        callback(data);
    //     renderingNoteTree(data);
    //     document.querySelectorAll("#note-item-list li a").forEach(item => {
    //         if(item != null) {
    //             item.addEventListener("click", function (e) {
    //                 const noteId = item.parentElement.getAttribute("id");
    //                 const noteIdNo = noteId.split("-")[1];
    //                 getPages(noteIdNo);
    //             });
    //         }
    //     });
    //     addContextMenuEventToNote();
    });
}

function deleteNote(noteIdNo, callback) {
    const noteUIParamJson = getNoteUIParamJsonStr();
    const url = "/api/notes/delete/" + noteIdNo;
    console.log('============================');
    console.log(selectedNoteId);
    console.log(noteIdNo);

    postFetch(url, noteUIParamJson, function (data) {
        getNotes(noteUIParamJson, callback);
    });
}

function deletePage(pageIdNo, callback) {
    const noteUIParamJson = getNoteUIParamJsonStr();
    const url = "/api/notes/delete/" + pageIdNo;

    postFetch(anchor.getAttribute('href'), noteUIParamJson, function (data) {
        getPages(noteUIParamJson, callback);
    });

}
export { postFetch, getPages, getContent, getNotes, deleteNote, deletePage, selectedNoteId };

