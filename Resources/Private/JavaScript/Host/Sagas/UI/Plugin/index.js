import {race, take, put, select} from 'redux-saga/effects';
import {$get} from 'plow-js';

import {actionTypes, actions} from 'Host/Redux/index';
import {CR} from 'Host/Selectors/index';
import signals from 'Host/Signals/index';

import {getObservers} from 'Host/Plugins/UI/index';

const getNode = CR.Nodes.byContextPathSelector;
const getFocusedNode = CR.Nodes.focusedSelector;
const getHoveredNode = CR.Nodes.hoveredSelector;

export function* watchNodes() {
    while (true) { // eslint-disable-line no-constant-condition
        const racedActions = yield race([
            take(actionTypes.CR.Nodes.ADD)
        ]);
        const contextPath = Object.keys(racedActions).map(k => racedActions[k]).filter(action => action !== undefined)
            .map(action => action.payload.contextPath)[0];
        const state = yield select();
        const node = getNode(contextPath)(state);
        const observers = getObservers('nodes.byContextPath', contextPath);

        try {
            observers.forEach(observer => observer(node));
        } catch (err) {
            console.error(err);
            yield put(actions.UI.FlashMessages.add('@packagefactory/guevara/ui/plugin/observer/watchNodes',
                err.message, 'error', 5000));
        }
    }
}

export function* watchFocusedNode() {
    while (true) { // eslint-disable-line no-constant-condition
        const before = yield select();
        const nodeBefore = getFocusedNode(before);
        const typoscriptPathBefore = $get('cr.nodes.focused.typoscriptPath', before);

        yield take(actionTypes.CR.Nodes.FOCUS);

        const after = yield select();
        const nodeAfter = getFocusedNode(after);
        const typoscriptPathAfter = $get('cr.nodes.focused.typoscriptPath', after);

        if (nodeBefore.contextPath !== nodeAfter.contextPath) {
            signals.ui.contentView.nodeBlurred.dispatch(nodeBefore, typoscriptPathBefore);
            signals.ui.contentView.nodeFocused.dispatch(nodeAfter, typoscriptPathAfter);
        }
    }
}

export function* watchHoveredNode() {
    while (true) { // eslint-disable-line no-constant-condition
        yield race([
            take(actionTypes.CR.Nodes.HOVER),
            take(actionTypes.CR.Nodes.UNHOVER)
        ]);

        const state = yield select();
        const node = getHoveredNode(state);
        const typoscriptPath = $get('cr.nodes.hovered.typoscriptPath', state);
        const observers = getObservers('nodes.hovered');

        try {
            observers.forEach(observer => observer({node, typoscriptPath}));
        } catch (err) {
            console.error(err);
            yield put(actions.UI.FlashMessages.add('@packagefactory/guevara/ui/plugin/observer/watchHoveredNode',
                err.message, 'error', 5000));
        }
    }
}
