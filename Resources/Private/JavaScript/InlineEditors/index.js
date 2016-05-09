import api from 'Customization/Guest/index';

import textArea from './TextArea/index';
import ckEditor from './CKEditor/index';

const {createInlineEditor} = api;

createInlineEditor(
    'PackageFactory.Guevara:TextArea',
    textArea
);

createInlineEditor(
    'PackageFactory.Guevara:CKEditor',
    ckEditor
);
