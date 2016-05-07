import {actions} from 'Host/Redux/index';
import signals from 'Host/Signals/index';

export default dispatch => ({
    signals,
    ui: {
        flashMessages: {
            add(message, severity = 'error') {

            }
        },
        contentView: {
            focusNode(contextPath, typoscriptPath, x, y) {
                dispatch(actions.CR.Nodes.focus(contextPath, typoscriptPath));
            },
            mouseEnterNode(contextPath, typoScriptPath, x, y, width, height) {

            },
            mouseLeaveNode(contextPath, typoScriptPath) {

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
