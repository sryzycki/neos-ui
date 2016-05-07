import {actions} from 'Host/Redux/index';
import signals from 'Host/Signals/index';

export default dispatch => ({
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
                dispatch(actions.CR.Nodes.focus(contextPath, typoscriptPath));
            },
            mouseEnterNode(contextPath, typoscriptPath) {
                dispatch(actions.CR.Nodes.hover(contextPath, typoscriptPath));
            },
            mouseLeaveNode(contextPath, typoscriptPath) {
                dispatch(actions.CR.Nodes.unhover(contextPath, typoscriptPath));
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

        }
    }
});
