import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import mergeClassNames from 'classnames';
import {$transform, $get} from 'plow-js';

import {Toolbar} from 'Components/index';

import {
    AddNode,
    CopySelectedNode,
    CutSelectedNode,
    DeleteSelectedNode,
    HideSelectedNode,
    PasteClipBoardNode
} from './Buttons/index';

@connect()
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
