import {getNotes, getNoteUIParamJsonStr} from "./note_list_ui_util.js";
import {deleteNote} from "../note_api";

function getIdNoFromId(id) {
    return id.split('-')[1];
}
function getItemTypeFromId(id) {
    return id.split('-')[0];
}
function extractIdNoFromItem(item) {
    let itemId = item.getAttribute('id');
    return getIdNoFromId(itemId);
}

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
            console.log('============================');
            // getNotes(getNoteUIParamJsonStr());
            // deleteNote(element.noteIdNo, getNotes(getNoteUIParamJsonStr));
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
function addGroupNote(anchor, noteIdNo) {
    let noteUIParamJson = getNoteUIParamJsonStr();
    noteUIParamJson = addOpenList(noteUIParamJson, noteIdNo);
    postFetch(anchor.getAttribute('href'), noteUIParamJson, function (data) {
        getNotes(noteUIParamJson);
    });
}

function addNote(anchor, noteIdNo) {
    let noteUIParamJson = getNoteUIParamJsonStr();
    noteUIParamJson = addOpenList(noteUIParamJson, noteIdNo);
    postFetch(anchor.getAttribute('href'), noteUIParamJson, function (data) {
        getNotes(noteUIParamJson);
    });
}

function renameNote(anchor, noteIdNo) {
    const noteUIParamJson = getNoteUIParamJsonStr();
    const noteName = document.querySelector('#new-note-name').value;
    const noteParam = {
        'noteName': noteName,
    }
    postFetch(anchor.getAttribute('href'), noteParam, function (data) {
        getNotes(noteUIParamJson);
    });
}

function addNotePage(anchor) {
    const noteUIParamJson = getNoteUIParamJsonStr();
    let url = null;
    let noteIdNo = null;

    if(selectedNoteId == null) {
        alert('노트를 선택해주세요.');
        return;
    }
    noteIdNo = getIdNoFromId(selectedNoteId);
    url = anchor.getAttribute('data-uri') + '/' + noteIdNo;

    postFetch(url, noteUIParamJson, function (data) {
        // getNotes(noteUIParamJson);
        getPages(noteIdNo);
    });
}

function getNoteMenuItemList(noteIdNo) {

    let del = {
        'text': '🗑️ 삭제',
        'href': '/api/notes/delete/' + noteIdNo,
        'noteIdNo': noteIdNo,
        'api' : 'deleteNote',
        // 'callback' : callback
        // 'onclick': 'deleteItem(this, "note-' + noteIdNo + '"); return false;'
    }
    let update = {
        'text': '🛠️ 이름변경',
        'href': '/api/notes/update/' + noteIdNo,
        'onclick': 'my_modal_1.showModal(); return false;'
    }
    let move = {
        'text': '➡️ 노트이동',
        'href': '/note/move/' + noteIdNo,
        'onclick': null
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
        'href': '/api/notes/add-group/' + noteInfo.noteIdNo,
        'onclick': 'addGroupNote(this, '+noteInfo.noteIdNo+'); return false;'
    }
    let addNote = {
        'text': '➕ 새노트 추가',
        'href': '/api/notes/add/' + noteInfo.noteIdNo,
        'onclick': 'addNote(this, '+ noteInfo.noteIdNo +'); return false;'
    }

    let groupMenuItemList = [addGroup, addNote];
    let groupMenuList = createMenuList(groupMenuItemList);

    baseMenuPopup.appendChild(groupMenuList);

    return baseMenuPopup;
}

function getPageMenuItemList(notePageIdNo) {

    let del = {
        'text': '🗑️ 삭제',
        'href': '/api/pages/delete/' + notePageIdNo,
        'onclick': 'deleteItem(this, "page-' + notePageIdNo +'"); return false;'
    }
    let update = {
        'text': '🛠️ 이름변경',
        'href': '/api/pages/update/' + notePageIdNo,
        'onclick': 'my_modal_1.showModal(); return false;'
    }
    let move = {
        'text': '➡️ 페이지이동',
        'href': '/page/move/' + notePageIdNo,
        'onclick': null
    }

    return [del, update, move];
}

function createPageMenuPopup(mouseX, mouseY, pageInfo) {
    const pageMenuItemList = getPageMenuItemList(pageInfo.pageIdNo);
    return createBaseMenuPopup(mouseX, mouseY, pageInfo, pageMenuItemList);
}

export {addContextMenuEventToNote, addContextMenuEventToPage}