const API = window['@Neos:GuestPluginAPI'];
const RECOMMENDED_VERSION = '1.0.0';
const isCompatibleVersion = () => true;

//
// Check for global neos API
//
if (API === undefined) {
    throw new Error('Neos Guest Plugin API not found!');
}

//
// Check for version constraint
//
if (!isCompatibleVersion(API.version)) {
    console.warn(`Detected incompatible Neos Guest Plugin API ${API.version}, recommended: ${RECOMMENDED_VERSION}`);
}

export default API;
