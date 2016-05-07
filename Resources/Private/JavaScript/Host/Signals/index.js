import {Signal} from 'signals';

export default {
    ui: {
        contentView: {
            nodeFocused: new Signal(),
            nodeBlurred: new Signal(),
            nodeMouseEntered: new Signal(),
            nodeMouseLeft: new Signal()
        }
    }
};
