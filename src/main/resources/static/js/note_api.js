import {getNoteUIParamJsonStr} from "./ui/note_list_ui_util.js";


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

// function getContent(notePageIdNo, callback) {
//
//     const url = "/api/notes/pages/" + notePageIdNo;
//     const noteUIParamJson = getNoteUIParamJsonStr();
//
//     postFetch(url, noteUIParamJson, function (data) {
//         callback(data);
//         // const titleInput = document.querySelector(".title");
//         // titleInput.value = data.notePageDto.title;
//         // editor.setMarkdown(data.notePageDto.notePageDetailDto.content);
//         //
//         // const itemPrefix = "page-";
//         // const currentItemId = itemPrefix + notePageIdNo;
//         // const prevItemId = itemPrefix + prevNotePageIdNo;
//         // const customClass = " bg-gray-500 text-white rounded-md";
//         //
//         // changeSelectedItem(currentItemId, prevItemId, customClass);
//         // prevNotePageIdNo = notePageIdNo;
//
//     });
// }
//
// function getPages(noteIdNo, renderer, callback) {
//     const url = "/api/notes/" + noteIdNo + "/pages";
//     const noteUIParamJson = getNoteUIParamJsonStr();
//
//     postFetch(url, noteUIParamJson, function (data) {
//         callback(data, renderer);
//     });
//     // postFetch(url, noteUIParamJson, function (data) {
//     //     renderingNotePage(data);
//     //     addContextMenuEventToPage();
//     //     const itemPrefix = "note-";
//     //     const currentItemId = itemPrefix + noteIdNo;
//     //     const prevItemId = itemPrefix + prevNoteIdNo;
//     //     const customClass = " bg-gray-500 text-white rounded-md";
//     //
//     //     changeSelectedItem(currentItemId, prevItemId, customClass);
//     //     prevNoteIdNo = noteIdNo;
//     //     selectedNoteId = currentItemId;
//     // });
// }
//
// async function getNotes(noteUIParamJson, callback) {
//     const url = "/api/notes";
//     await postFetch(url, noteUIParamJson, function (data) {
//         console.log('*************************************1');
//         callback(data);
//         console.log('*************************************2');
//         //     renderingNoteTree(data);
//         //     document.querySelectorAll("#note-item-list li a").forEach(item => {
//         //         if(item != null) {
//         //             item.addEventListener("click", function (e) {
//         //                 const noteId = item.parentElement.getAttribute("id");
//         //                 const noteIdNo = noteId.split("-")[1];
//         //                 getPages(noteIdNo);
//         //             });
//         //         }
//         //     });
//         //     addContextMenuEventToNote();
//     });
// }
//
// function deleteNote(noteIdNo) {
//     const noteUIParamJson = getNoteUIParamJsonStr();
//     const url = "/api/notes/delete/" + noteIdNo;
//
//     postFetch(url, noteUIParamJson, function (data) {
//         getNotes(noteUIParamJson, callback);
//     });
// }
//
// function deletePage(pageIdNo) {
//     const noteUIParamJson = getNoteUIParamJsonStr();
//     const url = "/api/pages/delete/" + pageIdNo;
//
//     postFetch(url, noteUIParamJson, function (data) {
//         getPages(noteUIParamJson);
//     });
//
// }

export {postFetch};

