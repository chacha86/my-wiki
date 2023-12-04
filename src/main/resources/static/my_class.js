class BaseComponent {
    constructor() {
        this.html = '';
        this.componentStore = {};
    }

    setParent(parent) {
        this.content = parent;
    }

    setData(data) {
        this.data = data;
        this.rerender();
    }

    addComponent(component) {
        component.setData(this.data);
        this.componentStore[component.constructor.name] = component;
    }

    getComponent(name) {
        return this.componentStore[name];
    }

    getHtml() {
        return this.html;
    }

    rerender() {
    }
}

export class MainComponent extends BaseComponent {
    render() {
        let html = `
            <div class="left-side-menu-content w-[400px] flex">
                ${this.getComponent('NoteList').getHtml()}
                ${this.getComponent('PageList').getHtml()}
            </div>
        `
        document.createElement(html);
        this.content.innerHTML = html;
    }
}

export class NoteList extends BaseComponent {
    constructor() {
        super();
        this.getNotes().then((data) => {
            this.setData(data);
        });
    }

    getNotes() {
        return fetch('http://localhost:8088/api/notes/')
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                return data;
            })
            .catch((error) => {
                console.log(error);
            });
    }
    rerender() {
        if(!this.data) return;
        super.rerender();
        let html = `
            <ul class="menu bg-gray-800">
               ${this.createNoteTree(this.data)} 
            </ul>
        `
        this.html = html;
    }

    // createElement(data) {
    //     let html = `
    //         <ul class="menu bg-gray-800">
    //            ${this.createNoteTree(data)}
    //         </ul>
    //     `
    //     this.html = html;
    // }

    createNoteTree(noteList) {
        return `
            ${noteList.map((note) => {
            return `${this.createNoteItem(note)}`;
        }).join('')}
        `
    }

    createChildNoteTree(note, noteItemClass, recurFunc) {
        return `
            <details>
                <summary class="${noteItemClass}"><a>${note.name}</a></summary>
                <ul>
                    ${note.children.length > 0 ? recurFunc(note.children) : ''}
                </ul>
            </details>
        `
    }

    createNoteItem(note) {

        let noteItemClass = "hover:bg-gray-500 hover:text-white hover:rounded-md";
        let groupItemClass = note.groupYn === 0 ? noteItemClass : "";

        return `
            <li class="${groupItemClass}">
                ${note.groupYn === 0 ? `<a>${note.name}</a>` : ``}
                ${note.groupYn === 1 ? this.createChildNoteTree(note, noteItemClass, this.createNoteTree.bind(this)) : ''}
            </li>
        `
    }
}

export class PageList extends BaseComponent {
    createElement() {
        let html = `
            <ul class="page-side-menu-content">
                <li>asdfasdf</li>
                <li>asdfasdf</li>
                <li>asdfasdf</li>
                <li>asdfasdf</li>
                <li>asdfasdf</li>
                <li>asdfasdf</li>
                <li>asdfasdf</li>
            </ul>
        `
        this.html = html;
    }
}




