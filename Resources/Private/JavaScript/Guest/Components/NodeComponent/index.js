import {
    handle,
    stopPropagation,
    preventDefault,
    position
} from 'Guest/Process/DOMUtils.js';

import style from './style.css';

export default (el, api) => {
    const {
        focusNode,
        mouseEnterNode,
        mouseLeaveNode
    } = api.ui.contentView;
    const contextPath = el.dataset.__cheNodeContextpath;
    const typoscriptPath = el.dataset.__cheTyposcriptPath;

    el.classList.add(style.node);

    //
    // React on guest events
    //
    handle('click', () => {
        const {x, y} = position(el);
        focusNode(contextPath, typoscriptPath, x, y);
    }, stopPropagation, preventDefault)(el);
    handle('mouseover', () => mouseEnterNode(contextPath, typoscriptPath), stopPropagation)(el);
    handle('mouseout', () => mouseLeaveNode(contextPath, typoscriptPath))(el);

    //
    // React on host events
    //
    handle('Neos:UI:NodeFocused', () => el.classList.add(style['node--focused']), stopPropagation)(el);
    handle('Neos:UI:NodeBlurred', () => el.classList.remove(style['node--focused']), stopPropagation)(el);
    handle('Neos:UI:NodeMouseEntered', () => el.classList.add(style['node--hover']), stopPropagation)(el);
    handle('Neos:UI:NodeMouseLeft', () => el.classList.remove(style['node--hover']), stopPropagation)(el);
};
