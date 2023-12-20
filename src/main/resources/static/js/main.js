import * as noteApi from './note_api.js';
import { getNoteUIParamJsonStr } from './ui/note_list_ui.js';

import './event_handler/event_nav_toggle.js';
import './event_handler/event_side_drag.js';
import './event_handler/event_search_box.js';
import {getPages} from "./note_api.js";

noteApi.getNotes(getNoteUIParamJsonStr());
// document.querySelectorAll('#note-item-list li').forEach(item => {
//     console.log('========================>');
//     console.log(item);
//     item.addEventListener('click', event => {
//         const noteIdNo = item.getAttribute("data-note-id-no");
//         getPages(82);
//     })
// });
