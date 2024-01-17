import {} from "./event_handler/event_search_box.js";
import {} from "./event_handler/event_item_menu.js";
import {} from "./event_handler/event_side_drag.js";
import {} from "./event_handler/event_nav_toggle.js";
import {NoteRenderer} from "./note/note_renderer.js";
import {CommonRenderer} from "./common/common_renderer.js";

new CommonRenderer(new Map()).render();
let noteRenderer = new NoteRenderer(new Map());
noteRenderer.render();