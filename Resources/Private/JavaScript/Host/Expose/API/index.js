import {actions} from 'Host/Redux/index';

export default dispatch => ({
    ui: {
        flashMessages: {
            add(message, severity = 'error') {

            }
        },
        contentView: {
            focusNode(contextPath, typoScriptPath, x, y) {

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
