import {race, take, put, select} from 'redux-saga/effects';

import {actionTypes, actions} from 'Host/Redux/index';
import {UI} from 'Host/Selectors/index';
import signals from 'Host/Signals/index';

const getFocusedNode = UI.ContentView.focusedSelector;
const getHoveredNode = UI.ContentView.hoveredSelector;

export function* watchFocusedNode() {
    while (true) { // eslint-disable-line no-constant-condition
        const before = yield select();
        const nodeBefore = getFocusedNode(before);

        yield take(actionTypes.UI.ContentView.FOCUS_NODE);

        const after = yield select();
        const nodeAfter = getFocusedNode(after);

        if (nodeBefore.contextPath !== nodeAfter.contextPath) {
            setTimeout(() => {
                signals.ui.contentView.nodeBlurred.dispatch(nodeBefore.contextPath, nodeBefore.typoscriptPath);
                signals.ui.contentView.nodeFocused.dispatch(nodeAfter.contextPath, nodeAfter.typoscriptPath);
            }, 0);
        }
    }
}

export function* watchHoveredNode() {
    while (true) { // eslint-disable-line no-constant-condition
        yield take(actionTypes.UI.ContentView.HOVER_NODE);

        const state = yield select();
        const node = getHoveredNode(state);

        setTimeout(() => {
            signals.ui.contentView.nodeMouseEntered.dispatch(node.contextPath, node.typoscriptPath);
        }, 0);

        yield take(actionTypes.UI.ContentView.UNHOVER_NODE);

        setTimeout(() => {
            signals.ui.contentView.nodeMouseLeft.dispatch(node.contextPath, node.typoscriptPath);
        }, 0);
    }
}
