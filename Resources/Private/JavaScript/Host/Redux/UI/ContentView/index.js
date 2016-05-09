import {createAction} from 'redux-actions';
import {Map} from 'immutable';
import {$set, $merge, $get} from 'plow-js';

const FOCUS_NODE = '@packagefactory/guevara/UI/ContentView/FOCUS_NODE';
const HOVER_NODE = '@packagefactory/guevara/UI/ContentView/HOVER_NODE';
const UNHOVER_NODE = '@packagefactory/guevara/UI/ContentView/UNHOVER_NODE';
const SET_CONTEXT_PATH = '@packagefactory/guevara/UI/ContentView/SET_CONTEXT_PATH';
const SET_PREVIEW_URL = '@packagefactory/guevara/UI/ContentView/SET_PREVIEW_URL';
const SET_SRC = '@packagefactory/guevara/UI/ContentView/SET_SRC';
const TOOLBAR_ADD = '@packagefactory/guevara/UI/ContentView/TOOLBAR_ADD';
const TOOLBAR_UPDATE = '@packagefactory/guevara/UI/ContentView/TOOLBAR_UPDATE';
const TOOLBAR_SHOW = '@packagefactory/guevara/UI/ContentView/TOOLBAR_SHOW';
const TOOLBAR_HIDE = '@packagefactory/guevara/UI/ContentView/TOOLBAR_HIDE';

//
// Export the action types
//
export const actionTypes = {
    FOCUS_NODE,
    HOVER_NODE,
    UNHOVER_NODE,
    SET_CONTEXT_PATH,
    SET_PREVIEW_URL,
    SET_SRC,
    TOOLBAR_ADD,
    TOOLBAR_UPDATE,
    TOOLBAR_SHOW,
    TOOLBAR_HIDE
};

const focusNode = createAction(FOCUS_NODE, (contextPath, typoscriptPath, x, y) => ({contextPath, typoscriptPath, x, y}));
const hoverNode = createAction(HOVER_NODE, (contextPath, typoscriptPath) => ({contextPath, typoscriptPath}));
const unhoverNode = createAction(UNHOVER_NODE, contextPath => ({contextPath}));
const setContextPath = createAction(SET_CONTEXT_PATH, contextPath => ({contextPath}));
const setPreviewUrl = createAction(SET_PREVIEW_URL, previewUrl => ({previewUrl}));
const setSrc = createAction(SET_SRC, src => ({src}));
const addToolbar = createAction(TOOLBAR_ADD, (toolbarId, configuration) => ({toolbarId, configuration}));
const updateToolbar = createAction(TOOLBAR_UPDATE, (toolbarId, delta) => ({toolbarId, delta}));
const showToolbar = createAction(TOOLBAR_SHOW, (toolbarId, position) => ({toolbarId, position}));
const hideToolbar = createAction(TOOLBAR_HIDE, toolbarId => ({toolbarId}));

//
// Export the actions
//
export const actions = {
    focusNode,
    hoverNode,
    unhoverNode,
    setContextPath,
    setPreviewUrl,
    setSrc,
    addToolbar,
    updateToolbar,
    showToolbar,
    hideToolbar
};

//
// Export the initial state hydrator
//
export const hydrate = state => $set(
    'ui.contentView',
    new Map({
        focusedNode: new Map({
            contextPath: '',
            typoscriptPath: '',
            x: 0,
            y: 0
        }),
        hoveredNode: new Map({
            contextPath: '',
            typoscriptPath: ''
        }),
        contextPath: $get('ui.contentView.contextPath', state) || '',
        previewUrl: '',
        src: $get('ui.contentView.src', state) || '',
        toolbars: new Map({
            current: '',
            position: new Map({
                left: 0,
                top: 0
            }),
            configurations: new Map()
        })
    })
);

//
// Export the reducer
//
export const reducer = {
    [FOCUS_NODE]: attributes => $set('ui.contentView.focusedNode', new Map(attributes)),
    [HOVER_NODE]: (attributes) => $set('ui.contentView.hoveredNode', new Map(attributes)),
    [UNHOVER_NODE]: ({contextPath}) => state => {
        if ($get('ui.contentView.hoveredNode.contextPath', state) === contextPath) {
            return $set('ui.contentView.hoveredNode', '', state);
        }

        return state;
    },
    [SET_CONTEXT_PATH]: ({contextPath}) => $set('ui.contentView.contextPath', contextPath),
    [SET_PREVIEW_URL]: ({previewUrl}) => $set('ui.contentView.previewUrl', previewUrl),
    [SET_SRC]: ({src}) => src ? $set('ui.contentView.src', src) : state => state,
    [TOOLBAR_ADD]: ({toolbarId, configuration}) => $set(
        ['ui', 'contentView', 'toolbars', 'configurations', toolbarId],
        configuration
    ),
    [TOOLBAR_UPDATE]: ({toolbarId, path, delta}) => $merge(
        ['ui', 'contentView', 'toolbars', 'configurations', toolbarId, ...path.split('.')],
        delta
    ),
    [TOOLBAR_SHOW]: ({toolbarId, position}) => $merge(
        ['ui', 'contentView', 'toolbars'], {
            current: toolbarId,
            position
        }
    ),
    [TOOLBAR_HIDE]: ({toolbarId}) => $merge(
        ['ui', 'contentView', 'toolbars'], {
            current: toolbarId,
            position: {left: 0, top: 0}
        }
    )
};
