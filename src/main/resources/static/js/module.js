class EventTarget {
    constructor(name, targetElement) {
        this.name = name;
        this.targetElement = targetElement;
        this.eventList = [];
    }

    addEvent(event) {
        this.eventList.push(event);
    }

    setAllEventToElement = () => {
        this.eventList.forEach(event => {
            this.targetElement.addEventListener(event.type, event.eventMapper.doEventFun);
        });
    }
}

class Event {
    constructor(name, type, eventMapper) {
        this.name = name;
        this.type = type;
        this.eventMapper = eventMapper;
        this.targetElement = null;
    }

    setTargetElement = (targetElement) => {
        this.targetElement = targetElement;
        this.eventMapper.setTargetElement(targetElement);
    }
}

class Renderer {
    constructor(name) {
        this.name = name;
    }

    render() {
        let list2 = document.querySelector("#list2");
        list2.innerHTML = `
            <li>test1</li>
            <li>test2</li>
            <li>test3</li>
        `;
    }

}

class EventCallbackManager {

    constructor(callbackTarget) {

    }

    doEventCallback(renderer, element) {
        console.log("-----------------------------");
        console.log(element);
        renderer.render();
    }
}

class EventMapper {
    constructor(name, eCallbackMgr, renderer) {
        this.name = name;
        this.eCallbackMgr = eCallbackMgr;
        this.renderer = renderer;
        this.targetElement = null;
    }

    setTargetElement = (targetElement) => {
        this.targetElement = targetElement;
    }

    doEventFun = () => {
        this.eCallbackMgr.doEventCallback(this.renderer, this.targetElement);
    }
}

export {Event, EventTarget, EventMapper, Renderer, EventCallbackManager}