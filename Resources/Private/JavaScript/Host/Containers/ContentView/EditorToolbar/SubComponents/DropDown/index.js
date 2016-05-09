import React, {Component, PropTypes} from 'react';

import {DropDown, Icon} from 'Components/index';

import style from './style.css';

export default class ToolbarDropDown extends Component {
    static propTypes = {
        configuration: PropTypes.shape({
            placeholder: PropTypes.string.isRequired,
            items: PropTypes.arrayOf(
                PropTypes.shape({
                    icon: PropTypes.string.isRequired,
                    label: PropTypes.string.isRequired,
                    isActive: PropTypes.bool.isRequired,
                    isEnabled: PropTypes.bool.isRequired,
                    onSelect: PropTypes.string.isRequired
                })
            ).isRequired
        }).isRequired,

        dispatchEditorSignal: PropTypes.func.isRequired
    };

    render() {
        const {dispatchEditorSignal} = this.props;
        const {items, placeholder} = this.props.configuration;

        return (
            <div style={{width: '220px', display: 'inline-block'}}>
                <DropDown>
                    <DropDown.Header>
                        {items.filter(
                            item => item.isActive
                        ).map(item =>
                            [
                                <Icon icon={item.icon} />,
                                item.label
                            ]
                        )[0] || placeholder}
                    </DropDown.Header>
                    <DropDown.Contents>
                        {items.filter(
                            item => item.isEnabled
                        ).map(
                            item => (
                                <li>
                                    <button type="button" onClick={() => dispatchEditorSignal(item.onSelect)}>
                                        <Icon icon={item.icon} />
                                        {item.label}
                                    </button>
                                </li>
                            )
                        )}
                    </DropDown.Contents>
                </DropDown>
            </div>
        );
    }
}
