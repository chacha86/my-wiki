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
    }

    addComponent(component) {
        this.componentStore[component.constructor.name] = component;
    }

    getComponent(name) {
        return this.componentStore[name];
    }

    getHtml() {
        return this.html;
    }

    render() {
        this.content.innerHTML = this.getHtml();
    }
}

export class MainComponent extends BaseComponent {
    createElement(data) {
        let html = `
            <div class="left-side-menu-content w-[400px]">
                ${this.getComponent('NoteListComponent').getHtml()}
            </div>
        `
        this.html = html;
    }
}

export class NoteListComponent extends BaseComponent {
    createElement() {
        let html = `
            <ul class="menu bg-gray-800">
                ${this.createNoteTree(this.data)};
            </ul>
        `
        this.html = html;
    }

    createNoteTree(noteList) {
        return `
            ${noteList.map((note) => {
                return `${this.createNoteItem(note)}`;
            }).join('')}
        `
    }

    createChildNoteTree(note, recurFunc) {
        return `
            <details>
                <summary>${note.name}</summary>
                <ul>
                    ${note.children.length > 0 ? recurFunc(note.children) : ''}
                </ul>
            </details>
        `
    }

    createNoteItem(note) {
        return `
            <li>
                ${note.groupYn === 0 ? note.name : ''}
                ${note.groupYn === 1 ? this.createChildNoteTree(note, this.createNoteTree.bind(this)) : ''}
            </li>
        `
    }
}




