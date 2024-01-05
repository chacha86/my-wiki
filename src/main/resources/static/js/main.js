import './event_handler/event_nav_toggle.js';
import './event_handler/event_side_drag.js';
import './event_handler/event_search_box.js';
import './event_handler/event_item_menu.js';
import './event_handler/event_btn.js';

import {NoteApi, NoteEventHandler, NoteRenderer, NoteData} from "./note/note_renderer.js";

let noteRenderer = new NoteRenderer(new Map());
noteRenderer.render();
