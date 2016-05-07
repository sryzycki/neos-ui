import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import mergeClassNames from 'classnames';
import {$get} from 'plow-js';

import {Toolbar} from 'Components/index';

import {
    AddNode,
    CopySelectedNode,
    CutSelectedNode,
    DeleteSelectedNode,
    HideSelectedNode,
    PasteClipBoardNode
} from './Buttons/index';

@connect(state => ({
    toolbar: {
        x: $get('ui.contentView.focusedNode.x', state) - 9,
        y: $get('ui.contentView.focusedNode.y', state) - 49,
        isVisible: $get('ui.contentView.focusedNode.contextPath', state) !== $get('ui.contentView.contextPath', state)
    }
}))
export default class NodeToolbar extends Component {
    static propTypes = {
        toolbar: PropTypes.shape({
            x: PropTypes.number.isRequired,
            y: PropTypes.number.isRequired,
            isVisible: PropTypes.bool.isRequired
        }).isRequired
    };

    render() {
        const {x, y, isVisible} = this.props.toolbar;

        return (
            <Toolbar position={{x, y}} isVisible={isVisible}>
                <AddNode />
                <HideSelectedNode />
                <CopySelectedNode />
                <CutSelectedNode />
                <PasteClipBoardNode />
                <DeleteSelectedNode />
            </Toolbar>
        );
    }
}
