const createEvent = name => () => {
    const event = document.createEvent('CustomEvent');
    event.initCustomEvent(name, true, true, {});

    return event;
};

export const nodeFocused = createEvent('Neos:UI:NodeFocused');
export const nodeBlurred = createEvent('Neos:UI:NodeBlurred');
export const nodeMouseEntered = createEvent('Neos:UI:NodeMouseEntered');
export const nodeMouseLeft = createEvent('Neos:UI:NodeMouseLeft');
