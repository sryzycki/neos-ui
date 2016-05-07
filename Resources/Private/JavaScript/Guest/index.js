import 'Shared/Styles/style.css';
import 'babel-polyfill';

import {nodeComponent} from 'Guest/Components/index';
import {closestContextPath, findRelatedDOMNode} from 'Guest/Process/DOMUtils.js';
import ckEditor from 'Guest/Components/Editors/CKEditor/index';

import {
    nodeFocused,
    nodeBlurred,
    nodeMouseEntered,
    nodeMouseLeft
} from './Events/index';

//
// Initialize the guest application as soon as the DOM has been fully initialized.
//
document.addEventListener('Neos:UI:ContentLoaded', e => {
    const {api, contextPath} = e.detail;

    //
    // Initialize node components
    //
    [].slice.call(document.querySelectorAll('[data-__che-node-contextpath]'))
        .forEach(dom => nodeComponent(dom, api));

    //
    // Initialize inline editors
    //
    [].slice.call(document.querySelectorAll('[data-__che-property]')).forEach(dom => {
        const contextPath = closestContextPath(dom);
        const propertyName = dom.dataset.__cheProperty;

        // ckEditor({contextPath, propertyName}, dom, api);
    });

    //
    // Make sure, that when no other node is focused,
    // the host frame gets a signal to focus the document
    //
    document.addEventListener('click', () => {
        api.ui.contentView.focusNode(contextPath);
    });

    //
    // Route host signals to dom events
    //
    const {contentView} = api.signals.ui;

    contentView.nodeFocused.add((contextPath, typoScriptPath) => {
        const dom = findRelatedDOMNode(contextPath, typoScriptPath);
        dom && dom.dispatchEvent(nodeFocused());
    });

    contentView.nodeBlurred.add((contextPath, typoScriptPath) => {
        const dom = findRelatedDOMNode(contextPath, typoScriptPath);
        dom && dom.dispatchEvent(nodeBlurred());
    });

    contentView.nodeMouseEntered.add((contextPath, typoScriptPath) => {
        const dom = findRelatedDOMNode(contextPath, typoScriptPath);
        dom && dom.dispatchEvent(nodeMouseEntered());
    });

    contentView.nodeMouseLeft.add((contextPath, typoScriptPath) => {
        const dom = findRelatedDOMNode(contextPath, typoScriptPath);
        dom && dom.dispatchEvent(nodeMouseLeft());
    });
});
