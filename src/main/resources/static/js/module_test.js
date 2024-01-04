import {EventMapper, EventTarget, Event, Renderer, EventCallbackManager} from './module.js'

let eventTarget = new EventTarget("list", "#list a");
let renderer = new Renderer("list2Renderer");
let eventCallbackManager = new EventCallbackManager();
let eventMapper = new EventMapper("listClickMapper", eventCallbackManager, renderer);
let event = new Event("click", "click", eventMapper);

console.log(eventTarget);
eventTarget.addEvent(event);

eventTarget.setEventAllElement();

