import 'Shared/Styles/style.css';
import 'babel-polyfill';
import {domConnector} from './Process/index';

const {ui} = window.neos;
const connection = ui.connect();

//
// Initialize the guest application as soon as the DOM has been fully initialized.
//
document.addEventListener('Neos:UI:ContentLoaded', e => {
    const {api} = e.detail;

    api.test();

    domConnector(ui, connection);
    ui.setDocumentInformation(window.name, window['@PackageFactory.Guevara:DocumentInformation']);
});
