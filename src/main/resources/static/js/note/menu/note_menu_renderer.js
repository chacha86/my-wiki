import {NoteMenuApi} from "./note_menu_api.js";
import {NoteMenuEventHandle} from "./note_menu_event_handler.js";

class NoteMenuRenderer {
    constructor(paramData) {
        this.paramData = paramData;
        let dataName = "noteMenuData";
        // if (paramData[dataName] == null || paramData[dataName] === undefined) {
        //     this.paramData[dataName] = new NoteMenuData();
        // }
        // this.noteMenuApi = new NoteMenuApi();
        this.eventHandler = new NoteMenuEventHandle(this.paramData);
    }

    async render() {
        let noteData = this.paramData["noteData"];

        let mouseX = noteData.mousePos.mouseX;
        let mouseY = noteData.mousePos.mouseY;

        let menuItemList = this.getMenuItemList(noteData.noteInfo);

        let itemMenuPopup = document.querySelector('#item-menu-popup');
        let body = document.querySelector('body');
        if (itemMenuPopup != null) {
            body.removeChild(itemMenuPopup);
        }

        let popupClass = 'absolute p-[5px] left-[' + mouseX + 'px] top-[' + mouseY + 'px] bg-gray-200 w-64 h-64'
        let menuItemClass = 'block w-[100%] hover:bg-gray-500 rounded-md p-[5px]';
        let html = `
            <div id="item-menu-popup" class="${popupClass}">
                <ul>
                    ${menuItemList.map((element) => {
            return `
                            <li><a data-api-name=${element.apiName} data-note-no=${element.itemInfo.noteIdNo} class="${menuItemClass}">${element.text}</a></li>
                        `;
        }).join('')}
                </ul>
            </div>
        `;
        body.insertAdjacentHTML('beforeend', html);
        this.postRender();
    }

    postRender() {
        this.eventHandler.addEvent();
    }

    getMenuItemList(noteInfo) {
        if (noteInfo == null) {
            return [];
        }

        let del = {
            'text': '🗑️ 삭제',
            'url': '/api/notes/delete/' + noteInfo.noteIdNo,
            'itemInfo': noteInfo,
            'itemType': 'note',
            'apiName': 'deleteNote',
        }
        let update = {
            'text': '🛠️ 이름변경',
            'url': '/api/notes/update/' + noteInfo.noteIdNo,
            'itemInfo': noteInfo,
            'itemType': 'note',
            'apiName': 'renameNoteModal',
        }
        let move = {
            'text': '➡️ 노트이동',
            'url': '/api/notes/update/' + noteInfo.noteIdNo,
            'itemInfo': noteInfo,
            'itemType': 'note',
            'apiName': 'moveNoteModal',
        }
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

        let menuItemList = [del, update, move];

        if (noteInfo.noteType === 'group') {
            menuItemList.push(addGroup, addNote);
        }

        return menuItemList;
    }
}

export {NoteMenuRenderer}