import api from 'Customization/Guest/index';
const {createInlineEditor} = api;

createInlineEditor(
    'PackageFactory.Guevara:SystemTest',
    (el, context, api) => {
        const {propertyName} = context;

        el.addEventListener('click', () => {
            alert(propertyName);
        });
    }
);
