import {getNoteUIParamJsonStr} from "../../ui/note_list_ui_util.js";
import {NoteData, NoteRenderer} from "../note_renderer.js";
import {NoteMoveModalRenderer} from "./move/note_move_modal_renderer.js";
import {NoteMenuApi} from "./note_menu_api.js";
import {NoteMenuRenderer} from "./note_menu_renderer.js";
import {RenameModalRenderer} from "./rename/rename_modal_renderer.js";

class NoteMenuHandler {
    constructor() {
        this.noteMenuApi = new NoteMenuApi();
    }

    setApiToMenuItem(menuItemAnchorList) {

        menuItemAnchorList.forEach((anchor) => {
            let apiName = anchor.getAttribute('data-api-name');
            let noteIdNo = anchor.getAttribute('data-note-no');
            anchor.addEventListener('click', (event) => {
                let apiFunc = this.getApiFunction(apiName);
                apiFunc(noteIdNo).then((data) => {
                    new NoteRenderer(new Map()).render().catch((error) => {
                        console.error(error);
                    });
                });
            });
        })
    }

    setMenuToNoteItem(noteItemList) {
        noteItemList.forEach((noteItem) => {
            noteItem.addEventListener('contextmenu', (event) => {
                event.preventDefault();
                event.stopPropagation();
                let mousePos = {
                    'mouseX': event.clientX,
                    'mouseY': event.clientY
                };
                let noteInfo = NoteData.getNoteInfoByNoteIdNo(NoteData.getNo(NoteData.getNoteIdByElement(noteItem)));
                let data = {
                    'noteInfo': noteInfo,
                    'mousePos': mousePos
                }
                let param = new Map();
                param["noteMenuData"] = data;

                new NoteMenuRenderer(param).render().catch((e) => {
                    console.error(e);
                });
            })
        });
    }

    setMenuToPageItem(pageItemList) {
        pageItemList.forEach((pageItem) => {
            pageItem.addEventListener('contextmenu', (event) => {
                let pageInfo = this.getPageInfoFromElement(pageItem);
                event.preventDefault();
                event.stopPropagation();
                let mouseX = event.clientX;
                let mouseY = event.clientY;
                this.openMenuPopup(mouseX, mouseY, pageInfo);
            })
        });
    }

    openMenuPopup(mouseX, mouseY, itemInfo) {

        let groupMenuPopupEl = document.querySelector('#item-menu-popup');
        console.log(groupMenuPopupEl);
        let body = document.querySelector('body');

        if (groupMenuPopupEl != null) {
            body.removeChild(groupMenuPopupEl);
        }

        let menuPopupEl = this.getMenuPopupEl(itemInfo.itemType, mouseX, mouseY, itemInfo);
        body.appendChild(menuPopupEl);
    }

    getMenuPopupEl(itemType, mouseX, mouseY, itemInfo) {

        if (itemType === 'group') {
            return this.createGroupMenuPopup(mouseX, mouseY, itemInfo);
        }
        if (itemType === 'note') {
            return this.createNoteMenuPopup(mouseX, mouseY, itemInfo);
        }

        return this.createPageMenuPopup(mouseX, mouseY, itemInfo);

    }

    createMenuList(menuItemList) {
        let menuList = document.createElement('ul');
        menuItemList.forEach((element) => {
            let listItem = document.createElement('li');
            let anchor = document.createElement('a');

            anchor.setAttribute('class', 'block w-[100%] hover:bg-gray-500 rounded-md p-[5px]');
            anchor.addEventListener('click', (event) => {
                this.getApiFunction(element.itemType, element.apiName)(element.itemInfo);
            });

            anchor.innerText = element.text;
            listItem.appendChild(anchor);
            menuList.appendChild(listItem);
        });

        return menuList;
    }

    createBaseMenuPopup(mouseX, mouseY, noteInfo, menuItemList) {
        let baseMenuPopup = document.createElement('div');
        baseMenuPopup.setAttribute('class', 'absolute p-[5px] left-[' + mouseX + 'px] top-[' + mouseY + 'px] bg-gray-200 w-64 h-64');
        baseMenuPopup.setAttribute('id', 'item-menu-popup');

        let baseMenuListResult = this.createMenuList(menuItemList);
        baseMenuPopup.appendChild(baseMenuListResult);

        return baseMenuPopup;
    }

    createNoteMenuPopup(mouseX, mouseY, noteInfo) {
        const noteMenuItemList = this.getNoteMenuItemList(noteInfo);
        return this.createBaseMenuPopup(mouseX, mouseY, noteInfo, noteMenuItemList);
    }

    createGroupMenuPopup(mouseX, mouseY, noteInfo) {

        let baseMenuPopup = this.createNoteMenuPopup(mouseX, mouseY, noteInfo);
        let groupMenuItemList = this.getGroupMenuItemList(noteInfo);
        let groupMenuList = this.createMenuList(groupMenuItemList);

        baseMenuPopup.appendChild(groupMenuList);

        return baseMenuPopup;
    }

    getPageMenuItemList(itemInfo) {
        let del = {
            'text': '🗑️ 삭제',
            'url': '/api/pages/delete/' + itemInfo.notePageIdNo,
            'itemInfo': itemInfo,
            'itemType': 'page',
            'apiName': '_deletePage'
        }
        let update = {
            'text': '🛠️ 이름변경',
            'url': '/api/pages/update/' + itemInfo.notePageIdNo,
            'itemInfo': itemInfo,
            'itemType': 'page',
            'apiName': '_renamePage'
        }
        let move = {
            'text': '➡️ 페이지이동',
            'url': '/page/move/' + itemInfo.notePageIdNo,
            'itemInfo': itemInfo,
            'itemType': 'page',
            'apiName': '_movePage'
        }

        return [del, update, move];
    }

    getNoteMenuItemList(itemInfo) {

        let del = {
            'text': '🗑️ 삭제',
            'url': '/api/notes/delete/' + itemInfo.noteIdNo,
            'itemInfo': itemInfo,
            'itemType': 'note',
            'apiName': '_deleteNote',
            // 'callback' : callback
            // 'onclick': 'deleteItem(this, "note-' + noteIdNo + '"); return false;'
        }
        let update = {
            'text': '🛠️ 이름변경',
            'url': '/api/notes/update/' + itemInfo.noteIdNo,
            'itemInfo': itemInfo,
            'itemType': 'note',
            'apiName': '_renameNoteModal',
        }
        let move = {
            'text': '➡️ 노트이동',
            'url': '/api/notes/update/' + itemInfo.noteIdNo,
            'itemInfo': itemInfo,
            'itemType': 'note',
            'apiName': '_moveNoteModal',
        }

        return [del, update, move];
    }

    getGroupMenuItemList(noteInfo) {
        let addGroup = {
            'text': '🗂️ 새그룹 추가',
            'itemInfo': noteInfo,
            'url': '/api/notes/add-group/' + noteInfo.noteIdNo,
            'itemType': 'note',
            'apiName': 'addGroupNote'
        }
        let addNote = {
            'text': '➕ 새노트 추가',
            'itemInfo': noteInfo,
            'url': '/api/notes/add/' + noteInfo.noteIdNo,
            'itemType': 'note',
            'apiName': 'addNote'
        }

        return [addGroup, addNote];
    }

    getMenuItemList(noteInfo) {
        if (noteInfo == null) {
            return [];
        }

        let menuItemList = this.getNoteMenuItemList(noteInfo);
        let groupMenuItem = this.getGroupMenuItemList(noteInfo);

        if (noteInfo.noteType === 'group') {
            menuItemList = menuItemList.concat(groupMenuItem);
        }

        return menuItemList;
    }

    createPageMenuPopup(mouseX, mouseY, pageInfo) {
        const pageMenuItemList = this.getPageMenuItemList(pageInfo);
        return this.createBaseMenuPopup(mouseX, mouseY, pageInfo, pageMenuItemList);
    }

    getPageInfoFromElement(element) {
        return {
            'pageIdNo': NoteData.getNo(element.getAttribute('id')),
            'pageTitle': element.getAttribute('data-page-title'),
            'itemType': 'page'
        };
    }

    getApiFunction(apiName) {
        console.log(apiName);
        switch (apiName) {
            case 'deleteNote':
                return this.deleteNote.bind(this);
            case 'addGroupNote':
                return this.addGroupNote.bind(this);
            case 'addNote':
                return this.addNote.bind(this);
            case '_renameNoteModal':
                return this._renameNoteModal.bind(this);
            case '_moveNoteModal':
                return this._moveNoteModal.bind(this);
            default:
                return null;
        }
    }

    async addNote(noteIdNo) {
        return await this.noteMenuApi.addNote(noteIdNo);
    }

    async addGroupNote(noteIdNo) {
        return await this.noteMenuApi.addGroupNote(noteIdNo);
    }

    async deleteNote(noteIdNo) {
        return await this.noteMenuApi.deleteNote(noteIdNo);
    }

    async moveNote(noteIdNo) {
        return await this.noteMenuApi.moveNote(noteIdNo);
    }

    async renameNote(noteIdNo) {
        let noteInfo = NoteData.getNoteInfoByNoteIdNo(noteIdNo);
        return await this.noteMenuApi.renameNote(noteInfo);
    }

    async _moveNoteModal(moveTargetNoteIdNo, noteUIParam) {
        const moveModal = document.querySelector('#my_modal_2');
        let param = new Map();
        param["noteMoveModalData"] = {
            'targetNoteId': NoteData.getId(moveTargetNoteIdNo),
            'moveNoteTree': await this.moveNote(moveTargetNoteIdNo)
        };
        let noteMoveModalRenderer = new NoteMoveModalRenderer(param);
        noteMoveModalRenderer.render();
        moveModal.show();
    }

    async _renameNoteModal(renameTargetNoteIdNo) {
        const renameModal = document.querySelector('#my_modal_1');
        const noteNameInput = document.querySelector('#new-note-name');
        const renameBtn = document.querySelector('#rename-btn');

        let noteInfo = NoteData.getNoteInfoByNoteIdNo(renameTargetNoteIdNo);
        noteNameInput.value = noteInfo.noteName;

        let param = new Map();
        param["renameModalData"] = {
            'noteInfo': noteInfo
        };

        let renameModalRenderer = new RenameModalRenderer(param);
        renameModalRenderer.render();

        renameModal.show();
    }
}


export {NoteMenuHandler};