import {getNoteUIParamJsonStr, extractIdNoFromItem, getIdNoFromId} from "./note_list_ui_util.js";
import {renderingNoteTree2, selectedNoteId} from "./note_renderer.js";
import {renderingNotePage} from "./note_page_renderer.js";
import {postFetch} from "../note_api.js";


function addContextMenuEventToNote() {
    let noteItemList = document.querySelectorAll('#note-item-list li');
    noteItemList.forEach((noteItem) => {

        noteItem.addEventListener('contextmenu', (event) => {
            let noteInfo = {
                'noteIdNo': extractIdNoFromItem(noteItem),
                'noteName': noteItem.getAttribute('data-note-name'),
                'itemType': noteItem.getAttribute('data-note-type') === "0" ? 'note' : 'group'
            }
            event.preventDefault();
            event.stopPropagation();
            let mouseX = event.clientX;
            let mouseY = event.clientY;
            openMenuPopup(mouseX, mouseY, noteInfo);
        })
    });
}
function addContextMenuEventToPage() {

    let pageItemList = document.querySelectorAll('#page-item-list li');
    console.log(pageItemList);
    pageItemList.forEach((pageItem) => {
        pageItem.addEventListener('contextmenu', (event) => {
            let pageInfo = {
                'pageIdNo': extractIdNoFromItem(pageItem),
                'pageTitle': pageItem.getAttribute('data-page-title'),
                'itemType' : 'page'
            }
            event.preventDefault();
            event.stopPropagation();
            let mouseX = event.clientX;
            let mouseY = event.clientY;
            openMenuPopup(mouseX, mouseY, pageInfo);
        })
    });
}

function openMenuPopup(mouseX, mouseY, itemInfo) {

    let groupMenuPopupEl = document.querySelector('#item-menu-popup');
    console.log(groupMenuPopupEl);
    let body = document.querySelector('body');

    if (groupMenuPopupEl != null) {
        body.removeChild(groupMenuPopupEl);
    }

    let menuPopupEl = getMenuPopupEl(itemInfo.itemType, mouseX, mouseY, itemInfo);
    body.appendChild(menuPopupEl);
}

function getMenuPopupEl(itemType, mouseX, mouseY, itemInfo) {

    if (itemType === 'group') {
        return createGroupMenuPopup(mouseX, mouseY, itemInfo);
    }
    if(itemType === 'note') {
        return createNoteMenuPopup(mouseX, mouseY, itemInfo);
    }

    return createPageMenuPopup(mouseX, mouseY, itemInfo);

}
function createMenuList(menuItemList) {
    let menuList = document.createElement('ul');
    menuItemList.forEach((element) => {
        let listItem = document.createElement('li');
        let anchor = document.createElement('a');
        // anchor.setAttribute('href', element.href);
        anchor.setAttribute('class', 'block w-[100%] hover:bg-gray-500 rounded-md p-[5px]');
        anchor.addEventListener('click', (event) => {
            getApiFunction(element.itemType, element.apiName)(element.itemIdNo);
        });
        // if (element.onclick != null) {
        //     anchor.setAttribute('onclick', element.onclick);
        // }
        anchor.innerText = element.text;
        listItem.appendChild(anchor);
        menuList.appendChild(listItem);
    });

    return menuList;
}
function deleteNote(noteIdNo) {
    const noteUIParamJson = getNoteUIParamJsonStr();
    const url = "/api/notes/delete/" + noteIdNo;

    postFetch(url, noteUIParamJson, function (data) {
        renderingNoteTree2();
    });
}

function deletePage(pageIdNo) {
    const noteUIParamJson = getNoteUIParamJsonStr();
    const url = "/api/pages/delete/" + pageIdNo;
    console.log('============================');
    console.log(selectedNoteId);

    const noteIdNo = getIdNoFromId(selectedNoteId);

    postFetch(url, noteUIParamJson, function (data) {
        renderingNotePage(noteIdNo);
    });
}
// function deleteItem(anchor, itemId) {
//     const noteUIParamJson = getNoteUIParamJsonStr();
//     const itemType = getItemTypeFromId(itemId);
//     const noteIdNo = getIdNoFromId(selectedNoteId);
//     console.log('============================');
//     console.log(selectedNoteId);
//     console.log(noteIdNo);
//     console.log(itemType);
//
//     postFetch(anchor.getAttribute('href'), noteUIParamJson, function (data) {
//         itemType === 'page' ? getPages(noteIdNo):getNotes(noteUIParamJson);
//     });
// }

function addOpenList(noteUIParamJson, noteIdNo) {
    const noteUIParam = JSON.parse(noteUIParamJson);
    noteUIParam.openList.push(noteIdNo);
    return JSON.stringify(noteUIParam);
}
function addGroupNote(noteIdNo) {
    let url = "/api/notes/add-group";
    let noteUIParamJson = getNoteUIParamJsonStr();
    if(noteIdNo != null) {
        url = url + "/" + noteIdNo;
    }
    noteUIParamJson = addOpenList(noteUIParamJson, noteIdNo);
    postFetch(url, noteUIParamJson, function (data) {
        renderingNoteTree2();
    });
}

function addNote(noteIdNo) {
    let noteUIParamJson = getNoteUIParamJsonStr();
    const url = "/api/notes/add/" + noteIdNo;
    noteUIParamJson = addOpenList(noteUIParamJson, noteIdNo);
    postFetch(url, noteUIParamJson, function (data) {
        renderingNoteTree2();
    });
}

function renameNote(noteIdNo) {
    const noteUIParamJson = getNoteUIParamJsonStr();
    const url = "/api/notes/update/" + noteIdNo;
    const noteName = document.querySelector('#new-note-name').value;
    const noteParam = {
        'noteName': noteName,
    }
    postFetch(url, function (data) {
        renderingNoteTree2();
    });
}

function addNotePage(noteIdNo) {
    const noteUIParamJson = getNoteUIParamJsonStr();
    let url = "/api/pages/add/" + noteIdNo;
    // let noteIdNo = null;

    // if(selectedNoteId == null) {
    //     alert('노트를 선택해주세요.');
    //     return;
    // }
    // noteIdNo = getIdNoFromId(selectedNoteId);

    postFetch(url, noteUIParamJson, function (data) {
        renderingNotePage(noteIdNo);
    });
}

function getNoteMenuItemList(noteIdNo) {

    let del = {
        'text': '🗑️ 삭제',
        'url' : '/api/notes/delete/' + noteIdNo,
        'itemIdNo': noteIdNo,
        'itemType': 'note',
        'apiName' : 'deleteNote',
        // 'callback' : callback
        // 'onclick': 'deleteItem(this, "note-' + noteIdNo + '"); return false;'
    }
    let update = {
        'text': '🛠️ 이름변경',
        'url' : '/api/notes/update/' + noteIdNo,
        'itemIdNo': noteIdNo,
        'itemType': 'note',
        'apiName' : 'renameNote',
    }
    let move = {
        'text': '➡️ 노트이동',
        'url' : '/api/notes/update/' + noteIdNo,
        'itemIdNo': noteIdNo,
        'itemType': 'note',
        'apiName' : 'moveNote',
    }

    return [del, update, move];
}

function createBaseMenuPopup(mouseX, mouseY, noteInfo, menuItemList) {
    let baseMenuPopup = document.createElement('div');
    baseMenuPopup.setAttribute('class', 'absolute p-[5px] left-[' + mouseX + 'px] top-[' + mouseY + 'px] bg-gray-200 w-64 h-64');
    baseMenuPopup.setAttribute('id', 'item-menu-popup');

    // let baseMenuList = document.createElement('ul');
    let noteIdNo = noteInfo.noteIdNo;

    // let baseMenuListItems = getNoteMenuItemList(noteIdNo);
    let baseMenuListResult = createMenuList(menuItemList);
    baseMenuPopup.appendChild(baseMenuListResult);

    return baseMenuPopup;
}

function createNoteMenuPopup(mouseX, mouseY, noteInfo) {
    const noteMenuItemList = getNoteMenuItemList(noteInfo.noteIdNo);
    return createBaseMenuPopup(mouseX, mouseY, noteInfo, noteMenuItemList);
}

function createGroupMenuPopup(mouseX, mouseY, noteInfo) {

    let baseMenuPopup = createNoteMenuPopup(mouseX, mouseY, noteInfo);

    let addGroup = {
        'text': '🗂️ 새그룹 추가',
        'itemIdNo': noteInfo.noteIdNo,
        'url' : '/api/notes/add-group/' + noteInfo.noteIdNo,
        'itemType': 'note',
        'apiName' : 'addGroupNote'
    }
    let addNote = {
        'text': '➕ 새노트 추가',
        'itemIdNo': noteInfo.noteIdNo,
        'url' : '/api/notes/add/' + noteInfo.noteIdNo,
        'itemType': 'note',
        'apiName' : 'addNote'
    }

    let groupMenuItemList = [addGroup, addNote];
    let groupMenuList = createMenuList(groupMenuItemList);

    baseMenuPopup.appendChild(groupMenuList);

    return baseMenuPopup;
}

function getPageMenuItemList(notePageIdNo) {
    let del = {
        'text': '🗑️ 삭제',
        'url': '/api/pages/delete/' + notePageIdNo,
        'itemIdNo': notePageIdNo,
        'itemType': 'page',
        'apiName' : 'deletePage'
    }
    let update = {
        'text': '🛠️ 이름변경',
        'url': '/api/pages/update/' + notePageIdNo,
        'itemIdNo': notePageIdNo,
        'itemType': 'page',
        'apiName' : 'renamePage'
    }
    let move = {
        'text': '➡️ 페이지이동',
        'url': '/page/move/' + notePageIdNo,
        'itemIdNo': notePageIdNo,
        'itemType': 'page',
        'apiName' : 'movePage'
    }

    return [del, update, move];
}

function createPageMenuPopup(mouseX, mouseY, pageInfo) {
    const pageMenuItemList = getPageMenuItemList(pageInfo.pageIdNo);
    return createBaseMenuPopup(mouseX, mouseY, pageInfo, pageMenuItemList);
}

function getApiFunction(type, apiName) {
    if (type === 'note') {
        return getNoteApiFunction(apiName);
    }
    return getPageApiFunction(apiName);
}

function getNoteApiFunction(apiName) {
    console.log('============================');
    console.log(apiName);
    switch (apiName) {
        case 'deleteNote':
            return deleteNote;
        case 'addGroupNote':
            return addGroupNote;
        case 'addNote':
            return addNote;
        case 'renameNote':
            return renameNote;
        // case 'moveNote':
        //     return moveNote;
        default:
            return null;
    }
}

function getPageApiFunction(apiName) {
    switch (apiName) {
        case 'addNotePage':
            return addNotePage;
        case 'deletePage':
            return deletePage;
        default:
            return null;
    }
}
export {addContextMenuEventToNote, addContextMenuEventToPage, addNotePage, addGroupNote}