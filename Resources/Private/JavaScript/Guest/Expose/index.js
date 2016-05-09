export const API_INSTANCE_NAME = '@Neos:GuestPluginAPI';

const createReadOnlyValue = value => ({
    value,
    writable: false,
    enumerable: false,
    configurable: false
});

export default inlineEditorRegistry => {
    const pluginApi = {
        createInlineEditor: (moduleName, factory) => {
            inlineEditorRegistry.register(moduleName, factory);
        }
    };

    Object.defineProperty(window, API_INSTANCE_NAME, createReadOnlyValue(pluginApi));
};
