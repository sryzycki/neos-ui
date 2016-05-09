import load from 'Customization/index';

export default moduleMapping => {
    const loadedInlineEditors = {};
    const deferred = {};

    return {
        register: (moduleName, factory) => {
            loadedInlineEditors[moduleName] = factory;

            if (deferred[moduleName] !== undefined) {
                deferred[moduleName].forEach(resolve => resolve(factory));
                deferred[moduleName] = undefined;
            }
        },
        get: moduleName => {
            if (moduleMapping[moduleName] === undefined) {
                console.warn('Guest frame is asking for an unknown Inline editor.');
                console.warn(`Cannot find: ${moduleName}. Do you have it correctly configured in your Settings.yaml?`);
            } else {
                load(moduleMapping[moduleName]);
            }

            return new Promise(resolve => {
                if (loadedInlineEditors[moduleName] !== undefined) {
                    resolve(loadedInlineEditors[moduleName]);
                }

                if (deferred[moduleName] === undefined) {
                    deferred[moduleName] = [];
                }

                deferred[moduleName].push(resolve);
            });
        }
    };
};
