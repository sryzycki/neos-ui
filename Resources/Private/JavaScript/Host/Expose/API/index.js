import {actions} from 'Host/Redux/index';
import signals from 'Host/Signals/index';
import {CR} from 'Host/Selectors/index';

export default ({dispatch, getState}, configuration) => ({
    configuration,
    signals,
    ui: {
        flashMessages: {
            add(message, severity = 'error') {
                const id = String(Math.abs(Math.random() * 10000));

                dispatch(actions.UI.FlashMessages.add(id, message, severity));
            }
        },
        contentView: {
            focusNode(contextPath, typoscriptPath, x, y) {
                dispatch(actions.UI.ContentView.focusNode(contextPath, typoscriptPath, x, y));
            },
            mouseEnterNode(contextPath, typoscriptPath) {
                dispatch(actions.UI.ContentView.hoverNode(contextPath, typoscriptPath));
            },
            mouseLeaveNode(contextPath, typoscriptPath) {
                dispatch(actions.UI.ContentView.unhoverNode(contextPath, typoscriptPath));
            },
            addToolbar(toolbarId, configuration) {
                dispatch(actions.UI.ContentView.addToolbar(toolbarId, configuration));
            },
            updateToolbar(toolbarId, configuration) {
                dispatch(actions.UI.ContentView.updateToolbar(toolbarId, configuration));
            },
            showToolbar(toolbarId, position) {
                dispatch(actions.UI.ContentView.showToolbar(toolbarId, position));
            },
            hideToolbar(toolbarId) {
                dispatch(actions.UI.ContentView.hideToolbar(toolbarId));
            }
        }
    },
    cr: {
        changeProperty(contextPath, name, value) {

        },

        createNode(referenceContextPath, insertMode) {

        },

        moveNode(contextPath, referenceContextPath, insertMode) {

        },

        deleteNode(contextPath) {

        },

        getNodeImmediate(contextPath) {
            const state = getState();
            return CR.Nodes.byContextPathSelector(contextPath)(state);
        }
    }
});
