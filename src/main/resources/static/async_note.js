import {MainComponent, NoteList, PageList} from './my_class.js';

window.onload = function () {
    let content = document.getElementById('async');
    let mainComponent = new MainComponent();
    mainComponent.setParent(content);

    let noteList = new NoteList();
    // noteList.setData(data);
    // noteList.createElement();

    let pageList = new PageList();
    // pageList.createElement();

    mainComponent.addComponent(noteList);
    mainComponent.addComponent(pageList);
    // mainComponent.createElement();
    mainComponent.render();
}

function render(data) {
    let content = document.getElementById('async');
    let mainComponent = new MainComponent();
    mainComponent.setParent(content);

    let noteList = new NoteList();
    noteList.setData(data);
    noteList.createElement();

    let pageList = new PageList();
    pageList.createElement();

    mainComponent.addComponent(noteList);
    mainComponent.addComponent(pageList);
    // mainComponent.createElement();
    mainComponent.render();
}

// function getNotes(callback) {
//     fetch('http://localhost:8088/api/notes/')
//         .then((response) => {
//             return response.json();
//         })
//         .then((data) => {
//             callback(data);
//         })
//         .catch((error) => {
//             console.log(error);
//         });
// }
//
