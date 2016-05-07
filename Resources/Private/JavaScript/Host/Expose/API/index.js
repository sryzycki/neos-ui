import {actions} from 'Host/Redux/index';

export default dispatch => ({
    ui: {
        flashMessages: {
            add(message, severity = 'error') {

            }
        },
        contentView: {
            setDocumentInformation(documentInformation) {
                dispatch(actions.UI.ContentView.setContextPath(documentInformation.metaData.contextPath));
                dispatch(actions.UI.ContentView.setPreviewUrl(documentInformation.metaData.previewUrl));

                Object.keys(documentInformation.nodes).forEach(contextPath => {
                    const node = documentInformation.nodes[contextPath];
                    dispatch(actions.CR.Nodes.add(contextPath, node));
                });
            },
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
