import {ItemData, NoteData, NoteRenderer} from "../note_renderer.js";
import {NoteMoveModalRenderer} from "./move/note_move_modal_renderer.js";
import {NoteMenuApi} from "./note_menu_api.js";
import {NoteMenuRenderer} from "./note_menu_renderer.js";
import {RenameModalRenderer} from "./rename/rename_modal_renderer.js";
import {NotePageRenderer} from "../note_page/note_page_renderer.js";

class NoteMenuHandler {
    constructor() {
        this.noteMenuApi = new NoteMenuApi();
    }

    setApiToMenuItem(menuItemAnchorList, param) {

        let itemInfo = param.itemInfo;

        menuItemAnchorList.forEach((anchor) => {
            let apiName = anchor.getAttribute('data-api-name');
            let renderer = new NoteRenderer(param);
            if (itemInfo.itemType === 'page') {
                renderer = new NotePageRenderer(param);
            }

            anchor.addEventListener('click', (event) => {
                let apiFunc = this.getApiFunction(apiName);
                apiFunc(param).then(() => {
                    renderer.render().catch((error) => {
                        console.error(error);
                    });
                });
            });
        });
    }

    setMenuToItem(itemList, data) {
        itemList.forEach((item) => {
            item.addEventListener('contextmenu', (event) => {
                event.preventDefault();
                event.stopPropagation();

                console.log(data);
                let itemId = ItemData.getItemIdByElement(item);
                let itemInfo = ItemData.getItemInfoById(itemId);
                let mousePos = {
                    'mouseX': event.clientX,
                    'mouseY': event.clientY
                };
                let param = {
                    'itemInfo': itemInfo,
                    'mousePos': mousePos,
                    'selectedNoteId': data.selectedNoteId,
                    'prevNoteId': data.prevNoteId,
                    'selectedPageId': data.selectedPageId,
                    'prevPageId': data.prevPageId,
                };

                new NoteMenuRenderer(param).render().catch((e) => {
                    console.error(e);
                });
            })
        });
    }

    getItemMenuData(event, itemInfo) {

    }

    // setMenuToPageItem(pageItemList) {
    //     pageItemList.forEach((pageItem) => {
    //         pageItem.addEventListener('contextmenu', (event) => {
    //             let pageInfo = this.getPageInfoFromElement(pageItem);
    //             event.preventDefault();
    //             event.stopPropagation();
    //             let mouseX = event.clientX;
    //             let mouseY = event.clientY;
    //             this.openMenuPopup(mouseX, mouseY, pageInfo);
    //         })
    //     });
    // }

    // openMenuPopup(mouseX, mouseY, itemInfo) {
    //
    //     let groupMenuPopupEl = document.querySelector('#item-menu-popup');
    //     console.log(groupMenuPopupEl);
    //     let body = document.querySelector('body');
    //
    //     if (groupMenuPopupEl != null) {
    //         body.removeChild(groupMenuPopupEl);
    //     }
    //
    //     let menuPopupEl = this.getMenuPopupEl(itemInfo.itemType, mouseX, mouseY, itemInfo);
    //     body.appendChild(menuPopupEl);
    // }

    // getMenuPopupEl(itemType, mouseX, mouseY, itemInfo) {
    //
    //     if (itemType === 'group') {
    //         return this.createGroupMenuPopup(mouseX, mouseY, itemInfo);
    //     }
    //     if (itemType === 'note') {
    //         return this.createNoteMenuPopup(mouseX, mouseY, itemInfo);
    //     }
    //
    //     return this.createPageMenuPopup(mouseX, mouseY, itemInfo);
    //
    // }

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

    // createGroupMenuPopup(mouseX, mouseY, noteInfo) {
    //
    //     let baseMenuPopup = this.createNoteMenuPopup(mouseX, mouseY, noteInfo);
    //     let groupMenuItemList = this.getGroupMenuItemList(noteInfo);
    //     let groupMenuList = this.createMenuList(groupMenuItemList);
    //
    //     baseMenuPopup.appendChild(groupMenuList);
    //
    //     return baseMenuPopup;
    // }

    getPageMenuItemList(itemInfo) {
        let del = {
            'text': '🗑️ 삭제',
            'url': '/api/pages/delete/' + itemInfo.itemIdNo,
            'itemInfo': itemInfo,
            'itemType': 'page',
            'apiName': '_deletePage'
        }
        let update = {
            'text': '🛠️ 이름변경',
            'url': '/api/pages/update/' + itemInfo.itemIdNo,
            'itemInfo': itemInfo,
            'itemType': 'page',
            'apiName': '_renamePage'
        }
        let move = {
            'text': '➡️ 페이지이동',
            'url': '/page/move/' + itemInfo.itemIdNo,
            'itemInfo': itemInfo,
            'itemType': 'page',
            'apiName': '_movePageModal'
        }

        return [del, update, move];
    }

    getNoteMenuItemList(itemInfo) {

        let del = {
            'text': '🗑️ 삭제',
            'url': '/api/notes/delete/' + itemInfo.itemIdNo,
            'itemInfo': itemInfo,
            'itemType': 'note',
            'apiName': 'deleteNote',
            // 'callback' : callback
            // 'onclick': 'deleteItem(this, "note-' + noteIdNo + '"); return false;'
        }
        let update = {
            'text': '🛠️ 이름변경',
            'url': '/api/notes/update/' + itemInfo.itemIdNo,
            'itemInfo': itemInfo,
            'itemType': 'note',
            'apiName': '_renameNoteModal',
        }
        let move = {
            'text': '➡️ 노트이동',
            'url': '/api/notes/update/' + itemInfo.itemIdNo,
            'itemInfo': itemInfo,
            'itemType': 'note',
            'apiName': '_moveNoteModal',
        }

        return [del, update, move];
    }

    getGroupMenuItemList(itemInfo) {
        let addGroup = {
            'text': '🗂️ 새그룹 추가',
            'itemInfo': itemInfo,
            'url': '/api/notes/add-group/' + itemInfo.itemIdNo,
            'itemType': 'note',
            'apiName': 'addGroupNote'
        }
        let addNote = {
            'text': '➕ 새노트 추가',
            'itemInfo': itemInfo,
            'url': '/api/notes/add/' + itemInfo.itemIdNo,
            'itemType': 'note',
            'apiName': 'addNote'
        }

        return [addGroup, addNote];
    }

    getMenuItemList(itemInfo) {
        if (itemInfo == null) {
            return [];
        }

        let menuItemList = this.getNoteMenuItemList(itemInfo);

        if (itemInfo.itemType === 'page') {
            return this.getPageMenuItemList(itemInfo);
        }

        if (itemInfo.itemType === 'group') {
            const groupMenuItem = this.getGroupMenuItemList(itemInfo);
            return menuItemList.concat(groupMenuItem);
        }

        return this.getNoteMenuItemList(itemInfo);
    }

    // createPageMenuPopup(mouseX, mouseY, pageInfo) {
    //     const pageMenuItemList = this.getPageMenuItemList(pageInfo);
    //     return this.createBaseMenuPopup(mouseX, mouseY, pageInfo, pageMenuItemList);
    // }

    getApiFunction(apiName) {
        switch (apiName) {
            case 'deleteNote':
                return this.deleteNote.bind(this);
            case 'addGroupNote':
                return this.addGroupNote.bind(this);
            case 'addNote':
                return this.addNote.bind(this);
            case '_renameNoteModal':
                return this._renameModal.bind(this);
            case '_moveNoteModal':
                return this._moveNoteModal.bind(this);
            case '_deletePage':
                return this._deletePage.bind(this);
            case '_renamePage':
                return this._renameModal.bind(this);
            case '_movePageModal':
                return this._movePageModal.bind(this);
            default:
                return null;
        }
    }

    async addNote(param) {
        let itemInfo = param.itemInfo;
        this._openAddedGroupNote(itemInfo);
        return await this.noteMenuApi.addNote(itemInfo.itemIdNo);
    }

    async addGroupNote(param) {
        let itemInfo = param.itemInfo;
        this._openAddedGroupNote(itemInfo);
        return await this.noteMenuApi.addGroupNote(itemInfo.itemIdNo);
    }

    _openAddedGroupNote(itemInfo) {
        const detailsElement = NoteData.getGroupNoteDetailsElementByNoteIdNo(itemInfo.itemIdNo);
        const open = detailsElement.getAttribute('open')
        if (open === null || open === undefined) {
            detailsElement.setAttribute('open', '');
        }
    }

    async deleteNote(param) {
        let itemInfo = param.itemInfo;
        return await this.noteMenuApi.deleteNote(itemInfo.itemIdNo);
    }

    async moveNote(itemInfo) {
        return await this.noteMenuApi.moveNote(itemInfo.itemIdNo);
    }

    async _deletePage(param) {
        let itemInfo = param.itemInfo;
        return await this.noteMenuApi.deletePage(itemInfo.itemIdNo);
    }

    async _moveNoteModal(param) {
        const moveModal = document.querySelector('#my_modal_2');
        const itemInfo = param.itemInfo;

        param.targetNoteId = ItemData.getNoteIdByItemNo(itemInfo.itemIdNo);
        param.moveNoteTree = await this.moveNote(itemInfo);

        let noteMoveModalRenderer = new NoteMoveModalRenderer(param);
        noteMoveModalRenderer.render();
        moveModal.show();
    }

    async _movePageModal(param) {
        const moveModal = document.querySelector('#my_modal_2');
        const itemInfo = param.itemInfo;

        param.targetNoteId = ItemData.getNoteIdByItemNo(param.selectedNoteId);
        param.targetPageId = ItemData.getPageIdByItemNo(itemInfo.itemIdNo);
        param.moveNoteTree = await this.moveNote(itemInfo);

        let noteMoveModalRenderer = new NoteMoveModalRenderer(param);
        noteMoveModalRenderer.render();
        moveModal.show();
    }

    async _renameModal(param) {
        const renameModal = document.querySelector('#my_modal_1');
        const itemTextInput = document.querySelector('#new-item-text');
        itemTextInput.value = param.itemInfo.itemText;

        let renameModalRenderer = new RenameModalRenderer(param);
        renameModalRenderer.render();

        renameModal.show();
    }
}


export {
    NoteMenuHandler
};