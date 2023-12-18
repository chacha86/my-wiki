function extractNoteIdNoFromNoteItem(noteItem) {
    let noteId = noteItem.getAttribute('id');
    return noteId.split('-')[1];
}
function addContextMenuEventToNote() {
    let noteItemList = document.querySelectorAll('#note-item-list li');
    console.log(noteItemList);
    noteItemList.forEach((noteItem) => {

        noteItem.addEventListener('contextmenu', (event) => {
            let noteInfo = {
                'noteIdNo': extractNoteIdNoFromNoteItem(noteItem),
                'noteName': noteItem.getAttribute('data-note-name'),
                'noteType': noteItem.getAttribute('data-note-type') === "0" ? 'note' : 'group'
            }
            console.log(noteInfo);
            event.preventDefault();
            event.stopPropagation();
            let mouseX = event.clientX;
            let mouseY = event.clientY;
            openMenuPopup(mouseX, mouseY, noteInfo);
        })
    });
    // document.querySelectorAll('ul.menu li').forEach((element) => {
    //     element.addEventListener('contextmenu', (event) => {
    //         let noteId = element.getAttribute('data-note-id');
    //         let noteName = element.getAttribute('data-note-name');
    //         let noteType = element.getAttribute('data-note-type');
    //
    //         let noteInfo = {
    //             'noteId': noteId,
    //             'noteName': noteName,
    //             'noteType': noteType
    //         }
    //
    //         event.preventDefault();
    //         event.stopPropagation();
    //         let mouseX = event.clientX;
    //         let mouseY = event.clientY;
    //         openMenuPopup(mouseX, mouseY, noteInfo);
    //     })
    // });
}

function openMenuPopup(mouseX, mouseY, noteInfo) {
    let groupMenuPopupEl = document.querySelector('#note-menu-popup');
    let body = document.querySelector('body');

    if (groupMenuPopupEl != null) {
        body.removeChild(groupMenuPopupEl);
    }

    let menuPopupEl = createNoteMenuPopup(mouseX, mouseY, noteInfo);

    if (noteInfo.noteType === 'group') {
        menuPopupEl = createGroupMenuPopup(mouseX, mouseY, noteInfo);
    }

    body.appendChild(menuPopupEl);
}



function createMenuList(menuItemList) {
    let menuList = document.createElement('ul');
    menuItemList.forEach((element) => {
        let listItem = document.createElement('li');
        let anchor = document.createElement('a');
        anchor.setAttribute('href', element.href);
        anchor.setAttribute('class', 'block w-[100%] hover:bg-gray-500 rounded-md p-[5px]');
        if (element.onclick != null) {
            anchor.setAttribute('onclick', element.onclick);
        }
        anchor.innerText = element.text;
        listItem.appendChild(anchor);
        menuList.appendChild(listItem);
    });

    return menuList;
}

function deleteNote(anchor) {
    let noteUIParamJson = getNoteUIParamJsonStr();
    postFetch(anchor.getAttribute('href'), noteUIParamJson, function (data) {
        getNotes(noteUIParamJson);
    });
}

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
    const noteUIParamJson = getNoteUIParamJsonStr();
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
function createBaseMenuPopup(mouseX, mouseY, noteInfo) {
    let baseMenuPopup = document.createElement('div');
    baseMenuPopup.setAttribute('class', 'absolute p-[5px] left-[' + mouseX + 'px] top-[' + mouseY + 'px] bg-gray-200 w-64 h-64');
    baseMenuPopup.setAttribute('id', 'note-menu-popup');

    // let baseMenuList = document.createElement('ul');
    let noteIdNo = noteInfo.noteIdNo;
    let noteName = noteInfo.noteName;

    let del = {
        'text': '🗑️ 삭제',
        'href': '/api/notes/delete/' + noteIdNo,
        'onclick': 'deleteNote(this, '+noteIdNo+'); return false;'
    }

    // let del = {
    //     'text': '🗑️ 삭제',
    //     'href': '/note/delete/' + noteId,
    //     'onclick': 'submitWithOpenList(this); return false;'
    // }

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
    let baseMenuListItems = [del, update, move];
    let baseMenuListResult = createMenuList(baseMenuListItems);
    baseMenuPopup.appendChild(baseMenuListResult);

    return baseMenuPopup;
}

function createNoteMenuPopup(mouseX, mouseY, noteInfo) {
    return createBaseMenuPopup(mouseX, mouseY, noteInfo);
}

function createGroupMenuPopup(mouseX, mouseY, noteInfo) {

    let baseMenuPopup = createBaseMenuPopup(mouseX, mouseY, noteInfo);

    console.log(noteInfo);

    let addGroup = {
        'text': '🗂️ 새그룹 추가',
        'href': '/api/notes/add-group/' + noteInfo.noteIdNo,
        // 'href': '/note/add-group/' + noteInfo.noteId,
        'onclick': 'addGroupNote(this, '+noteInfo.noteIdNo+'); return false;'
        // 'onclick': 'submitWithOpenList(this); return false;'
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

document.querySelector("#nav-toggle").addEventListener("click", (element) => {

    if (element.target.checked == true) {
        sideMenu = document.querySelector('.left-side-wrap');
        originClass = sideMenu.getAttribute('class');
        sideMenu.setAttribute('class', 'left-side-wrap hidden');
        // sideWrap.removeChild(sideMenu);
    } else {
        sideMenu = document.querySelector('.left-side-wrap');
        sideMenu.setAttribute('class', originClass);
    }
})

function initScrollPosition(noteSideScrollPosition, pageSideScrollPosition) {
    let noteSide = document.querySelector('.left-side-menu-content');
    let pageSide = document.querySelector('.left-second-menu-content');
    noteSide.scrollTo({top: noteSideScrollPosition, behavior: 'smooth'});
    pageSide.scrollTo({top: pageSideScrollPosition, behavior: 'smooth'});
}

function collectOpenList() {
    let tagList = document.querySelectorAll("details");
    let openList = [];
    for (let i = 0; i < tagList.length; i++) {
        let result = tagList[i].getAttribute('open');
        if (result !== null) {
            openList.push(tagList[i].getAttribute('data-note-id'));
        }
    }
    return openList;
}

function getNoteSideWidth() {
    let noteSide = document.querySelector('.left-side-menu');
    return noteSide.offsetWidth;
}

function getPageSideWidth() {
    let pageSide = document.querySelector('.left-second-menu-content');
    return pageSide.offsetWidth;
}

function getNoteSideScrollPosition() {
    let noteSide = document.querySelector('.left-side-menu-content');
    return noteSide.scrollTop;
}

function getPageSideScrollPosition() {
    let pageSide = document.querySelector('.left-second-menu-content');
    return pageSide.scrollTop;
}

function getSideMenuHidden() {
    let sideMenu = document.querySelector('.left-side-wrap');
    return sideMenu == null;
}

function getNoteUIParamJsonStr() {
    let openList = collectOpenList();
    let noteWidth = getNoteSideWidth();
    let pageWidth = getPageSideWidth();
    let noteSideScrollPosition = getNoteSideScrollPosition();
    let pageSideScrollPosition = getPageSideScrollPosition();
    let sideMenuHidden = getSideMenuHidden();
    let noteUIParam = {
        'openList': openList,
        'noteWidth': noteWidth,
        'pageWidth': pageWidth,
        'noteSideScrollPosition': noteSideScrollPosition,
        'pageSideScrollPosition': pageSideScrollPosition,
        'sideMenuHidden': sideMenuHidden
    };

    return JSON.stringify(noteUIParam);
}

function setTokenToForm(form) {
    let token = document.querySelector('#csrf-token');
    let input = document.createElement('input');
    input.setAttribute('type', 'hidden');
    input.setAttribute('name', '_csrf');
    input.setAttribute('value', token.getAttribute('value'));
    form.appendChild(input);

    return form;
}

function submitWithOpenList(paramTag) {

    let noteUIParam = getNoteUIParamJsonStr();
    let form = document.querySelector('#noteUIForm');
    let input = document.querySelector('#noteUIParamJson');
    input.value = noteUIParam;
    form.action = paramTag.getAttribute('href');
    form = setTokenToForm(form);
    form.method = 'post';

    form.submit();
}