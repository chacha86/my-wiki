
// 노트 트리에서 열려있는 노트 재현
// if (localStorage.getItem('openList') !== null) {
//     reproduce();
// }
//
initScrollPosition('left-side-menu-content');
initScrollPosition('left-second-menu-content');

document.querySelectorAll('ul.menu li').forEach((element) => {
    element.addEventListener('contextmenu', (event) => {
        let noteId = element.getAttribute('data-note-id');
        let noteName = element.getAttribute('data-note-name');
        let noteType = element.getAttribute('data-note-type');

        let noteInfo = {
            'noteId' : noteId,
            'noteName' : noteName,
            'noteType' : noteType
        }

        event.preventDefault();
        event.stopPropagation();
        let mouseX = event.clientX;
        let mouseY = event.clientY;
        openMenuPopup(mouseX, mouseY, noteInfo);
    })
});

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

function setTargetNote(noteId, noteName) {
    let modal = document.querySelector('#my_modal_1')
    let form = modal.querySelector('form');
    form.action = '/note/update/' + noteId;
    form.querySelector('input[name="noteName"]').value = noteName;

}


function createMenuList(menuItemList) {
    let menuList = document.createElement('ul');
    menuItemList.forEach((element) => {
        let listItem = document.createElement('li');
        let anchor = document.createElement('a');
        anchor.setAttribute('href', element.href);
        anchor.setAttribute('class', 'block w-[100%] hover:bg-gray-500 rounded-md p-[5px]');
        if(element.onclick != null){
            anchor.setAttribute('onclick', element.onclick);
        }
        anchor.innerText = element.text;
        listItem.appendChild(anchor);
        menuList.appendChild(listItem);
    });

    return menuList;
}
function createBaseMenuPopup(mouseX, mouseY, noteInfo) {
    let baseMenuPopup = document.createElement('div');
    baseMenuPopup.setAttribute('class', 'absolute p-[5px] left-['+mouseX+'px] top-[' + mouseY + 'px] bg-gray-200 w-64 h-64');
    baseMenuPopup.setAttribute('id', 'note-menu-popup');

    // let baseMenuList = document.createElement('ul');
    let noteId = noteInfo.noteId;
    let noteName = noteInfo.noteName;

    let del = {
        'text' : '🗑️ 삭제',
        'href' : '/note/delete/' + noteId,
        'onclick' : 'submitWithOpenList(this); return false;'
    }
    let update = {
        'text' : '🛠️ 이름변경',
        'href' : '#',
        'onclick' : 'my_modal_1.showModal();setTargetNote('+noteId+ ', "' + noteName + '");'
    }
    let move = {
        'text' : '➡️ 노트이동',
        'href' : '/note/move/' + noteId,
        'onclick' : null
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

    let addGroup = {
        'text' : '🗂️ 새그룹 추가',
        'href' : '/note/add-group/' + noteInfo.noteId,
        'onclick' : 'submitWithOpenList(this); return false;'
    }
    let addNote = {
        'text' : '➕ 새노트 추가',
        'href' : '/note/add/' + noteInfo.noteId,
        'onclick' : 'submitWithOpenList(this); return false;'
    }

    let groupMenuItemList = [addGroup, addNote];
    let groupMenuList = createMenuList(groupMenuItemList);

    baseMenuPopup.appendChild(groupMenuList);

    return baseMenuPopup;
    // let noteMenuPopup = document.createElement('div');
    // noteMenuPopup.setAttribute('class', 'absolute p-[5px] left-['+mouseX+'px] top-[' + mouseY + 'px] bg-gray-200 w-64 h-64');
    // noteMenuPopup.setAttribute('id', 'note-menu-popup');
    //
    // let noteMenuList = document.createElement('ul');
    // let noteId = noteInfo.noteId;
    // let noteName = noteInfo.noteName;

    // let del = {
    //     'text' : '🗑️ 삭제',
    //     'href' : '/note/delete/' + noteId,
    //     'onclick' : 'submitWithOpenList(this); return false;'
    // }
    // let addGroup = {
    //     'text' : '🗂️ 새그룹 추가',
    //     'href' : '/note/add-group/' + noteId,
    //     'onclick' : 'submitWithOpenList(this); return false;'
    // }
    // let addNote = {
    //     'text' : '➕ 새노트 추가',
    //     'href' : '/note/add/' + noteId,
    //     'onclick' : 'submitWithOpenList(this); return false;'
    // }
    // let update = {
    //     'text' : '🛠️ 이름변경',
    //     'href' : '#',
    //     'onclick' : 'my_modal_1.showModal();setTargetNote('+noteId+ ', "' + noteName + '");'
    // }
    // let move = {
    //     'text' : '➡️ 노트이동',
    //     'href' : '/note/move/' + noteId,
    //     'onclick' : null
    // }
    // let noteMenuListItems = [del, addGroup, addNote, update, move];
    // noteMenuListItems.forEach((element) => {
    //     let listItem = document.createElement('li');
    //     let anchor = document.createElement('a');
    //     anchor.setAttribute('href', element.href);
    //     anchor.setAttribute('class', 'block w-[100%] hover:bg-gray-500 rounded-md p-[5px]');
    //     if(element.onclick != null){
    //         anchor.setAttribute('onclick', element.onclick);
    //     }
    //     anchor.innerText = element.text;
    //     listItem.appendChild(anchor);
    //     noteMenuList.appendChild(listItem);
    // });
    //
    // noteMenuPopup.appendChild(noteMenuList);

    // return noteMenuPopup;
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

function initScrollPosition(className) {
    const element = document.querySelector('.' + className);
    const savedPosition = localStorage.getItem(className + '_scrollPosition');
    if (!(savedPosition === 'undefined' || savedPosition == null)) {
        element.scrollTop = savedPosition;
    }
}

function collectOpenList() {
    let tagList = document.querySelectorAll("details");
    let openList = [];
    for (let i = 0; i < tagList.length; i++) {
        result = tagList[i].getAttribute('open');
        if (result !== null) {
            openList.push(tagList[i].getAttribute('note-id'));
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
function getNoteUIParamJsonStr() {
    let openList = collectOpenList();
    let noteWidth = getNoteSideWidth();
    let pageWidth = getPageSideWidth();
    let noteUIParam = {
        'openList': openList,
        'noteWidth' : noteWidth,
        'pageWidth' : pageWidth
    };

    return JSON.stringify(noteUIParam);
}
function submitWithOpenList(paramTag) {

    let noteUIParam = getNoteUIParamJsonStr();
    let form = document.querySelector('#noteUIForm');
    let input = document.querySelector('#noteUIParamJson');
    input.value = noteUIParam;
    form.action = paramTag.getAttribute('href');
    form.submit();
}