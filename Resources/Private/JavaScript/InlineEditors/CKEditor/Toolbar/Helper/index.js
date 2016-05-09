import {createSignal} from 'Guest/Process/SignalRegistry/index';
import ckApi from '../../API/index';

export default (editor, api, toolbar) => {
    //
    // Creates a toolbar configuration
    //
    const createToolbar = (...components) => ({
        components: components.map(component => component())
    });

    //
    // Creates a button configuration
    //
    const createButton = (icon, format, isEnabled) => (parent = '') => {
        //
        // React on format toggle
        //
        api.toolbar.on(toolbar, format, () => {
            ckApi.toggleFormat(editor, format);
            api.toolbar.update(toolbar, parent ? `${parent}.${icon}` : icon, {
                isActive: ckApi.isFormatActive(editor, format)
            });
        });

        return {
            type: 'Button',
            isActive: ckApi.isFormatActive(editor, format),
            isEnabled,
            options: {
                icon,
                payload: format
            }
        };
    };

    //
    // Creates a drop down configuration
    //
    const createDropDown = (name, placeholder, ...items) => (parent = '') => {
        const resolvedItems = items.map(item => item(name));

        return {
            type: 'DropDown',
            name: parent ? `${parent}.${name}` : name,
            isEnabled: resolvedItems.filter(item => item.isEnabled).length > 0,
            options: {
                placeholder,
                items: resolvedItems
            }
        };
    };

    //
    // Creates a drop down item configuration
    //
    const createDropDownItem = (icon, label, format, isEnabled) => (parent = '') => {
        //
        // React on format toggle
        //
        api.toolbar.on(toolbar, format, () => {
            ckApi.toggleFormat(editor, format);
            api.toolbar.update(toolbar, parent ? `${parent}.${icon}` : icon, {
                isActive: ckApi.isFormatActive(editor, format)
            });
        });

        return {
            name: parent ? `${parent}.${icon}` : icon,
            isActive: ckApi.isFormatActive(editor, format),
            icon,
            label,
            isEnabled,
            payload: format
        };
    };

    return {
        createToolbar,
        createButton,
        createDropDown,
        createDropDownItem
    };
};
