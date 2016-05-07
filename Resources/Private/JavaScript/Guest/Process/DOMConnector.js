import {nodeComponent} from 'Guest/Components/index';
import ckEditor from 'Guest/Components/Editors/CKEditor/index';

import {closestContextPath} from './DOMUtils.js';

export default api => {
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
};
