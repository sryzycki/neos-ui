import {handleOutside} from 'Guest/Process/DOMUtils.js';
import getConfiguration from './Configuration/index';
import createToolbarConfiguration from './Toolbar/index';
import getSelectionData from './Selection/index';
import ckApi from './API/index';

export default (el, {node, propertyName}, editorApi) => {
    let removeBlurEvent = null;
    el.setAttribute('contentEditable', true);

    const configuration = getConfiguration(node, propertyName);
    const editor = ckApi.create(el, configuration);
    const toolbarId = `${node.contextPath}::${propertyName}`;
    const toolbar = editorApi.toolbar.create(
        toolbarId,
        createToolbarConfiguration(
            editor,
            editorApi,
            toolbarId,
            configuration
        )
    );
    const handleUserInteraction = event => {
        if (event.name !== 'keyup' || event.data.$.keyCode !== 27) {
            const selectionData = getSelectionData(ckApi)(editor);

            if (selectionData) {
                const {left, top} = selectionData.region;

                if (selectionData.isEmpty) {
                    editorApi.toolbar.hide();
                } else {
                    editorApi.toolbar.show(toolbar, {left, top});
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
        editorApi.toolbar.hide();
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
            editorApi.commit(editor.getData());
        });
    });
};
