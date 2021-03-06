import {handleOutside} from 'Guest/Process/DOMUtils.js';
import createEditor from 'Guest/Components/Editors/CreateEditor/index';

import getConfiguration from './Configuration/index';
import createToolbarConfiguration from './Toolbar/index';
import getSelectionData from './Selection/index';
import ckApi from './API/index';

const createCKEditorInstance = (node, property, editorApi, dom) => {
    let removeBlurEvent = null;
    const configuration = getConfiguration(node, property);
    const editor = ckApi.create(dom, configuration);
    const updateToolbarConfiguration = createToolbarConfiguration(
        editor,
        editorApi,
        configuration
    );
    const handleUserInteraction = event => {
        if (event.name !== 'keyup' || event.data.$.keyCode !== 27) {
            const selectionData = getSelectionData(ckApi)(editor);

            if (selectionData) {
                const {left, top} = selectionData.region;

                editorApi.setToolbarPosition(left, top);
                updateToolbarConfiguration();

                if (selectionData.isEmpty) {
                    editorApi.hideToolbar();
                } else {
                    editorApi.showToolbar();
                }
            }
        }
    };
    const handleEditorBlur = event => {
        const editable = editor.editable();

        editable.removeListener('keyup', handleUserInteraction);
        editable.removeListener('mouseup', handleUserInteraction);

        if (removeBlurEvent) {
            removeBlurEvent();
        }

        handleUserInteraction(event);
        editorApi.hideToolbar();
    };
    const handleEditorFocus = event => {
        const editable = editor.editable();

        editable.attachListener(editable, 'keyup', handleUserInteraction);
        editable.attachListener(editable, 'mouseup', handleUserInteraction);
        removeBlurEvent = handleOutside('click', handleEditorBlur)(editable);
        handleUserInteraction(event);
    };

    editor.once('contentDom', () => {
        const editable = editor.editable();

        editable.attachListener(editable, 'focus', handleEditorFocus);

        editor.on('change', () => {
            updateToolbarConfiguration();
            editorApi.commit(editor.getData());
        });
    });
};

export default createEditor(createCKEditorInstance);
