// import {extractIdNoFromItem, getIdNoFromId, getNoteUIParamJsonStr} from "./note_list_ui_util.js";
// import {renderingNoteTree2, selectedNoteId} from "./note_renderer.js";
// import {renderingNotePage} from "./note_page_renderer.js";
// import {renderingMoveModalNoteTree} from "./move_modal_renderer.js";
// import {postFetch} from "../note_api.js";
//
// function getNoteInfo(element) {
//     return {
//         'noteIdNo': extractIdNoFromItem(element),
//         'noteName': element.getAttribute('data-note-name'),
//         'itemType': element.getAttribute('data-note-type') === "0" ? 'note' : 'group'
//     };
// }
//
// function getPageInfo(element) {
//     return {
//         'pageIdNo': extractIdNoFromItem(element),
//         'pageTitle': element.getAttribute('data-page-title'),
//         'itemType': 'page'
//     };
// }
// function addContextMenuEventToNote() {
//     let noteItemList = document.querySelectorAll('#note-item-list li');
//     noteItemList.forEach((noteItem) => {
//
//         noteItem.addEventListener('contextmenu', (event) => {
//             let noteInfo = getNoteInfo(noteItem);
//             event.preventDefault();
//             event.stopPropagation();
//             let mouseX = event.clientX;
//             let mouseY = event.clientY;
//             openMenuPopup(mouseX, mouseY, noteInfo);
//         })
//     });
// }
// function addContextMenuEventToPage() {
//
//     let pageItemList = document.querySelectorAll('#page-item-list li');
//     console.log(pageItemList);
//     pageItemList.forEach((pageItem) => {
//         pageItem.addEventListener('contextmenu', (event) => {
//             let pageInfo = getPageInfo(pageItem);
//             event.preventDefault();
//             event.stopPropagation();
//             let mouseX = event.clientX;
//             let mouseY = event.clientY;
//             openMenuPopup(mouseX, mouseY, pageInfo);
//         })
//     });
// }
//
// function openMenuPopup(mouseX, mouseY, itemInfo) {
//
//     let groupMenuPopupEl = document.querySelector('#item-menu-popup');
//     console.log(groupMenuPopupEl);
//     let body = document.querySelector('body');
//
//     if (groupMenuPopupEl != null) {
//         body.removeChild(groupMenuPopupEl);
//     }
//
//     let menuPopupEl = getMenuPopupEl(itemInfo.itemType, mouseX, mouseY, itemInfo);
//     body.appendChild(menuPopupEl);
// }
//
// function getMenuPopupEl(itemType, mouseX, mouseY, itemInfo) {
//
//     if (itemType === 'group') {
//         return createGroupMenuPopup(mouseX, mouseY, itemInfo);
//     }
//     if(itemType === 'note') {
//         return createNoteMenuPopup(mouseX, mouseY, itemInfo);
//     }
//
//     return createPageMenuPopup(mouseX, mouseY, itemInfo);
//
// }
// function createMenuList(menuItemList) {
//     let menuList = document.createElement('ul');
//     menuItemList.forEach((element) => {
//         console.log('============================>>>>>>>>>>>>>>>>>>>>>>>>');
//         console.log(element);
//         let listItem = document.createElement('li');
//         let anchor = document.createElement('a');
//         // anchor.setAttribute('href', element.href);
//         anchor.setAttribute('class', 'block w-[100%] hover:bg-gray-500 rounded-md p-[5px]');
//         anchor.addEventListener('click', (event) => {
//             getApiFunction(element.itemType, element.apiName)(element.itemInfo);
//         });
//         // if (element.onclick != null) {
//         //     anchor.setAttribute('onclick', element.onclick);
//         // }
//         anchor.innerText = element.text;
//         listItem.appendChild(anchor);
//         menuList.appendChild(listItem);
//     });
//
//     return menuList;
// }
// function deleteNote(noteInfo) {
//     const noteUIParamJson = getNoteUIParamJsonStr();
//     const url = "/api/notes/delete/" + noteInfo.noteIdNo;
//
//     postFetch(url, noteUIParamJson, function (data) {
//         renderingNoteTree2(noteUIParamJson);
//     });
// }
//
// function deletePage(pageInfo) {
//     const noteUIParamJson = getNoteUIParamJsonStr();
//     const url = "/api/pages/delete/" + pageInfo.pageIdNo;
//     console.log('============================');
//     console.log(selectedNoteId);
//
//     const noteIdNo = getIdNoFromId(selectedNoteId);
//
//     postFetch(url, noteUIParamJson, function (data) {
//         renderingNotePage(noteIdNo);
//     });
// }
// // function deleteItem(anchor, itemId) {
// //     const noteUIParamJson = getNoteUIParamJsonStr();
// //     const itemType = getItemTypeFromId(itemId);
// //     const noteIdNo = getIdNoFromId(selectedNoteId);
// //     console.log('============================');
// //     console.log(selectedNoteId);
// //     console.log(noteIdNo);
// //     console.log(itemType);
// //
// //     postFetch(anchor.getAttribute('href'), noteUIParamJson, function (data) {
// //         itemType === 'page' ? getPages(noteIdNo):getNotes(noteUIParamJson);
// //     });
// // }
//
// function addOpenList(noteUIParamJson, noteIdNo) {
//     const noteUIParam = JSON.parse(noteUIParamJson);
//     noteUIParam.openList.push(noteIdNo);
//     return JSON.stringify(noteUIParam);
// }
// function addGroupNote(noteInfo) {
//
//     let url = "/api/notes/add-group";
//     let noteUIParamJson = getNoteUIParamJsonStr();
//
//     console.log(noteUIParamJson);
//     if(noteInfo != null) {
//         url = url + '/' + noteInfo.noteIdNo;
//         noteUIParamJson = addOpenList(noteUIParamJson, noteInfo.noteIdNo);
//     }
//
//     postFetch(url, noteUIParamJson, function (data) {
//         renderingNoteTree2(noteUIParamJson);
//     });
// }
//
// function addNote(noteInfo) {
//     let noteUIParamJson = getNoteUIParamJsonStr(); // api 호출 후
//     const noteIdNo = noteInfo.noteIdNo;
//     const url = "/api/notes/add/" + noteIdNo;
//     noteUIParamJson = addOpenList(noteUIParamJson, noteIdNo);
//     postFetch(url, noteUIParamJson, function (data) {
//         renderingNoteTree2(noteUIParamJson); // 렌더링
//     });
//
//     // 후처리
// }
//
// let renameNoteInfo = null;
// function renameNoteModal(noteInfo) {
//     renameNoteInfo = noteInfo;
//     const renameModal = document.querySelector('#my_modal_1');
//     const noteNameInput = document.querySelector('#new-note-name');
//     const renameBtn = document.querySelector('#rename-btn');
//     noteNameInput.value = noteInfo.noteName;
//     renameBtn.removeEventListener('click', myEventListner);
//     renameBtn.addEventListener('click', myEventListner);
//     renameModal.show();
// }
// function myEventListner(event) {
//     renameNote(event, renameNoteInfo);
// }
//
// function renameNote(event, noteInfo) {
//     const url = "/api/notes/update/" + noteInfo.noteIdNo;
//     const noteParam = {
//         'noteName': document.querySelector('#new-note-name').value
//     }
//     postFetch(url, JSON.stringify(noteParam), function (data) {
//         renderingNoteTree2(getNoteUIParamJsonStr());
//     });
// }
//
// function addNotePage(noteInfo) {
//     const noteUIParamJson = getNoteUIParamJsonStr();
//     const noteIdNo = noteInfo.noteIdNo;
//     let url = "/api/pages/add/" + noteIdNo;
//     // let noteIdNo = null;
//
//     // if(selectedNoteId == null) {
//     //     alert('노트를 선택해주세요.');
//     //     return;
//     // }
//     // noteIdNo = getIdNoFromId(selectedNoteId);
//
//     postFetch(url, noteUIParamJson, function (data) {
//         renderingNotePage(noteIdNo);
//     });
// }
//
// function moveNoteModal(noteInfo) {
//     const moveModal = document.querySelector('#my_modal_2');
//     renderingMoveModalNoteTree(getNoteUIParamJsonStr(), noteInfo);
//     moveModal.show();
// }
//
// function getNoteMenuItemList(itemInfo) {
//
//     let del = {
//         'text': '🗑️ 삭제',
//         'url' : '/api/notes/delete/' + itemInfo.noteIdNo,
//         'itemInfo': itemInfo,
//         'itemType': 'note',
//         'apiName' : 'deleteNote',
//         // 'callback' : callback
//         // 'onclick': 'deleteItem(this, "note-' + noteIdNo + '"); return false;'
//     }
//     let update = {
//         'text': '🛠️ 이름변경',
//         'url' : '/api/notes/update/' + itemInfo.noteIdNo,
//         'itemInfo': itemInfo,
//         'itemType': 'note',
//         'apiName' : 'renameNoteModal',
//     }
//     let move = {
//         'text': '➡️ 노트이동',
//         'url' : '/api/notes/update/' + itemInfo.noteIdNo,
//         'itemInfo': itemInfo,
//         'itemType': 'note',
//         'apiName' : 'moveNoteModal',
//     }
//
//     return [del, update, move];
// }
//
// function createBaseMenuPopup(mouseX, mouseY, noteInfo, menuItemList) {
//     let baseMenuPopup = document.createElement('div');
//     baseMenuPopup.setAttribute('class', 'absolute p-[5px] left-[' + mouseX + 'px] top-[' + mouseY + 'px] bg-gray-200 w-64 h-64');
//     baseMenuPopup.setAttribute('id', 'item-menu-popup');
//
//     // let baseMenuList = document.createElement('ul');
//     let noteIdNo = noteInfo.noteIdNo;
//
//     // let baseMenuListItems = getNoteMenuItemList(noteIdNo);
//     let baseMenuListResult = createMenuList(menuItemList);
//     baseMenuPopup.appendChild(baseMenuListResult);
//
//     return baseMenuPopup;
// }
//
// function createNoteMenuPopup(mouseX, mouseY, noteInfo) {
//     const noteMenuItemList = getNoteMenuItemList(noteInfo);
//     return createBaseMenuPopup(mouseX, mouseY, noteInfo, noteMenuItemList);
// }
//
// function createGroupMenuPopup(mouseX, mouseY, noteInfo) {
//
//     let baseMenuPopup = createNoteMenuPopup(mouseX, mouseY, noteInfo);
//
//     let addGroup = {
//         'text': '🗂️ 새그룹 추가',
//         'itemInfo': noteInfo,
//         'url' : '/api/notes/add-group/' + noteInfo.noteIdNo,
//         'itemType': 'note',
//         'apiName' : 'addGroupNote'
//     }
//     let addNote = {
//         'text': '➕ 새노트 추가',
//         'itemInfo': noteInfo,
//         'url' : '/api/notes/add/' + noteInfo.noteIdNo,
//         'itemType': 'note',
//         'apiName' : 'addNote'
//     }
//
//     let groupMenuItemList = [addGroup, addNote];
//     let groupMenuList = createMenuList(groupMenuItemList);
//
//     baseMenuPopup.appendChild(groupMenuList);
//
//     return baseMenuPopup;
// }
//
// function getPageMenuItemList(itemInfo) {
//     let del = {
//         'text': '🗑️ 삭제',
//         'url': '/api/pages/delete/' + itemInfo.notePageIdNo,
//         'itemInfo': itemInfo,
//         'itemType': 'page',
//         'apiName' : 'deletePage'
//     }
//     let update = {
//         'text': '🛠️ 이름변경',
//         'url': '/api/pages/update/' + itemInfo.notePageIdNo,
//         'itemInfo': itemInfo,
//         'itemType': 'page',
//         'apiName' : 'renamePage'
//     }
//     let move = {
//         'text': '➡️ 페이지이동',
//         'url': '/page/move/' + itemInfo.notePageIdNo,
//         'itemInfo': itemInfo,
//         'itemType': 'page',
//         'apiName' : 'movePage'
//     }
//
//     return [del, update, move];
// }
//
// function createPageMenuPopup(mouseX, mouseY, pageInfo) {
//     const pageMenuItemList = getPageMenuItemList(pageInfo);
//     return createBaseMenuPopup(mouseX, mouseY, pageInfo, pageMenuItemList);
// }
//
// function getApiFunction(type, apiName) {
//     if (type === 'note') {
//         return getNoteApiFunction(apiName);
//     }
//     return getPageApiFunction(apiName);
// }
//
// function getNoteApiFunction(apiName) {
//     console.log('============================');
//     console.log(apiName);
//     switch (apiName) {
//         case 'deleteNote':
//             return deleteNote;
//         case 'addGroupNote':
//             return addGroupNote;
//         case 'addNote':
//             return addNote;
//         case 'renameNoteModal':
//             return renameNoteModal;
//         case 'moveNoteModal':
//             return moveNoteModal;
//         default:
//             return null;
//     }
// }
//
// function getPageApiFunction(apiName) {
//     switch (apiName) {
//         case 'addNotePage':
//             return addNotePage;
//         case 'deletePage':
//             return deletePage;
//         default:
//             return null;
//     }
// }
// export {addContextMenuEventToNote, addContextMenuEventToPage, addNotePage, addGroupNote, getNoteInfo}