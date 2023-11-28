import {MainComponent, NoteListComponent} from './my_class.js';


window.onload = function () {
    getNotes(render);
}

function render(data) {
    let content = document.getElementById('async');
    let mainComponet = new MainComponent();
    mainComponet.setParent(content);

    let noteListComponent = new NoteListComponent();
    noteListComponent.setData(data);
    noteListComponent.createElement();

    mainComponet.addComponent(noteListComponent);
    mainComponet.createElement();
    mainComponet.render();
}
function getNotes(callback) {
    fetch('http://localhost:8088/api/notes/')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            callback(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

