// // import {addContextMenuEventToNote, addContextMenuEventToPage} from './ui/item_menu_renderer.js'
// import {getPages} from './note_api.js'
// import {renderingNotePage, getContent} from "./ui/note_page_renderer.js";
//
// function getContentCallback(data) {
//     const titleInput = document.querySelector(".title");
//     titleInput.value = data.notePageDto.title;
//     editor.setMarkdown(data.notePageDto.notePageDetailDto.content);
//
//     // const itemPrefix = "page-";
//     // const currentItemId = itemPrefix + notePageIdNo;
//     // const prevItemId = itemPrefix + prevNotePageIdNo;
//     // const customClass = " bg-gray-500 text-white rounded-md";
//     //
//     // changeSelectedItem(currentItemId, prevItemId, customClass);
//     // prevNotePageIdNo = notePageIdNo;
// }
// function getPagesCallback(data, renderer) {
//     // renderingNotePage(data);
//     renderer(data);
//     document.querySelectorAll("#page-item-list li a").forEach(item => {
//         item.addEventListener("click", function (e) {
//             const pageId = item.parentElement.getAttribute("id");
//             if(pageId != null) {
//                 const pageIdNo = pageId.split("-")[1];
//                 getContent(pageIdNo, getContentCallback);
//             }
//         });
//     });
//
//     // addContextMenuEventToPage();
//     // const itemPrefix = "note-";
//     // const currentItemId = itemPrefix + noteIdNo;
//     // const prevItemId = itemPrefix + prevNoteIdNo;
//     // const customClass = " bg-gray-500 text-white rounded-md";
//
//     // changeSelectedItem(currentItemId, prevItemId, customClass);
//     // prevNoteIdNo = noteIdNo;
//     // selectedNoteId = currentItemId;
// }
//
// function getNotesCallback(data, renderer) {
//     // renderingNoteTree(data);
//     renderer(data);
//     document.querySelectorAll("#note-item-list li a").forEach(item => {
//         item.addEventListener("click", function (e) {
//             const noteId = item.parentElement.getAttribute("id");
//             if(noteId != null) {
//                 const noteIdNo = noteId.split("-")[1];
//                 getPages(noteIdNo, renderingNotePage, getPagesCallback);
//             }
//         });
//     });
//     // addContextMenuEventToNote(getNotesCallback);
// }
//
// export {getNotesCallback}