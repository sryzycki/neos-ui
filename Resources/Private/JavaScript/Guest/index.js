import 'Shared/Styles/style.css';
import 'babel-polyfill';

import {nodeComponent} from 'Guest/Components/index';
import {closestContextPath} from 'Guest/Process/DOMUtils.js';
import ckEditor from 'Guest/Components/Editors/CKEditor/index';


//
// Initialize the guest application as soon as the DOM has been fully initialized.
//
document.addEventListener('Neos:UI:ContentLoaded', e => {
    const {api} = e.detail;

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

        ckEditor({contextPath, propertyName}, dom, api);
    });
});
