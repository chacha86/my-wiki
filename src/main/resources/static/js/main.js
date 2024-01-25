import {} from "./event_handler/event_search_box.js";
import {} from "./event_handler/event_item_menu.js";
import {} from "./event_handler/event_side_drag.js";
import {} from "./event_handler/event_nav_toggle.js";
import {Initializer, RendererFactory} from "./initializer.js";
import {NoteRenderer} from "./note/note_renderer.js";
import {CommonRenderer} from "./common/common_renderer.js";
import {NoteParam} from "./note/noteParam.js";

Initializer.init();

RendererFactory.get("common").render(new NoteParam());
RendererFactory.get("note").render(new NoteParam());
// let noteRenderer = new NoteRenderer(new Map());
// noteRenderer.render();