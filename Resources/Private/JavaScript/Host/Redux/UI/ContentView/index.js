import {createAction} from 'redux-actions';
import {Map} from 'immutable';
import {$set, $get} from 'plow-js';

const FOCUS_NODE = '@packagefactory/guevara/UI/ContentView/FOCUS_NODE';
const HOVER_NODE = '@packagefactory/guevara/UI/ContentView/HOVER_NODE';
const UNHOVER_NODE = '@packagefactory/guevara/UI/ContentView/UNHOVER_NODE';
const SET_CONTEXT_PATH = '@packagefactory/guevara/UI/ContentView/SET_CONTEXT_PATH';
const SET_PREVIEW_URL = '@packagefactory/guevara/UI/ContentView/SET_PREVIEW_URL';
const SET_SRC = '@packagefactory/guevara/UI/ContentView/SET_SRC';

//
// Export the action types
//
export const actionTypes = {
    FOCUS_NODE,
    HOVER_NODE,
    UNHOVER_NODE,
    SET_CONTEXT_PATH,
    SET_PREVIEW_URL,
    SET_SRC
};

const focusNode = createAction(FOCUS_NODE, (contextPath, typoscriptPath) => ({contextPath, typoscriptPath}));
const hoverNode = createAction(HOVER_NODE, (contextPath, typoscriptPath) => ({contextPath, typoscriptPath}));
const unhoverNode = createAction(UNHOVER_NODE, contextPath => ({contextPath}));
const setContextPath = createAction(SET_CONTEXT_PATH, contextPath => ({contextPath}));
const setPreviewUrl = createAction(SET_PREVIEW_URL, previewUrl => ({previewUrl}));
const setSrc = createAction(SET_SRC, src => ({src}));

//
// Export the actions
//
export const actions = {
    focusNode,
    hoverNode,
    unhoverNode,
    setContextPath,
    setPreviewUrl,
    setSrc
};

//
// Export the initial state hydrator
//
export const hydrate = state => $set(
    'ui.contentView',
    new Map({
        focusedNode: new Map({
            contextPath: '',
            typoscriptPath: ''
        }),
        hoveredNode: new Map({
            contextPath: '',
            typoscriptPath: ''
        }),
        contextPath: $get('ui.contentView.contextPath', state) || '',
        previewUrl: '',
        src: $get('ui.contentView.src', state) || ''
    })
);

//
// Export the reducer
//
export const reducer = {
    [FOCUS_NODE]: ({contextPath, typoscriptPath}) => $set('ui.contentView.focusedNode', new Map({contextPath, typoscriptPath})),
    [HOVER_NODE]: ({contextPath, typoscriptPath}) => $set('ui.contentView.hoveredNode', new Map({contextPath, typoscriptPath})),
    [UNHOVER_NODE]: ({contextPath}) => state => {
        if ($get('ui.contentView.hoveredNode.contextPath', state) === contextPath) {
            return $set('ui.contentView.hoveredNode', '', state);
        }

        return state;
    },
    [SET_CONTEXT_PATH]: ({contextPath}) => $set('ui.contentView.contextPath', contextPath),
    [SET_PREVIEW_URL]: ({previewUrl}) => $set('ui.contentView.previewUrl', previewUrl),
    [SET_SRC]: ({src}) => src ? $set('ui.contentView.src', src) : state => state
};
