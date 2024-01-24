import {} from "./event_handler/event_search_box.js";
import {} from "./event_handler/event_item_menu.js";
import {} from "./event_handler/event_side_drag.js";
import {} from "./event_handler/event_nav_toggle.js";
import {Initializer, RendererFactory} from "./initializer.js";
import {NoteRenderer} from "./note/note_renderer.js";
import {CommonRenderer} from "./common/common_renderer.js";

Initializer.init();

RendererFactory.get("common").render(null);
RendererFactory.get("note").render(null);
// let noteRenderer = new NoteRenderer(new Map());
// noteRenderer.render();