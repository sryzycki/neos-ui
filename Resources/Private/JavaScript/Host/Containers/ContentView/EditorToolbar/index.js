import React, {Component, PropTypes} from 'react';
import Measure from 'react-measure';
import {connect} from 'react-redux';
import {$transform, $get} from 'plow-js';

import {Toolbar} from 'Components/index';

import * as SubComponents from './SubComponents/index';

@connect(state => $transform({
    x: $get('ui.contentView.toolbars', state).toJS().position.left,
    y: $get('ui.contentView.toolbars', state).toJS().position.top,
    isVisible: $get('ui.contentView.toolbars.current', state) !== '',
    configuration: $get([
        'ui', 'contentView', 'toolbars', 'configurations',
        $get('ui.contentView.toolbars.current', state)
    ])
}, state))
export default class EditorToolbar extends Component {
    static propTypes = {
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
        isVisible: PropTypes.bool.isRequired,
        configuration: PropTypes.shape({
            components: PropTypes.arrayOf(
                PropTypes.shape({
                    type: PropTypes.oneOf(Object.keys(SubComponents)),
                    options: PropTypes.object
                })
            ).isRequired
        }),

        dispatch: PropTypes.func.isRequired
    };

    state = {
        dimensions: {width: 0}
    };

    render() {
        const {isVisible, configuration, dispatch} = this.props;

        return (
            <Measure
                whitelist={['width', 'left']}
                shouldMeasure={mutations => mutations ? mutations[0].target : false}
                onMeasure={dimensions => this.setState({dimensions})}
                >
                <Toolbar position={this.getPosition()} isVisible={isVisible}>
                    {configuration && configuration.components.filter(
                        component => component.isEnabled
                    ).map(
                        (component, index) => {
                            const SubComponent = SubComponents[component.type];
                            return (
                                <SubComponent
                                    key={index}
                                    configuration={component.options}
                                    onAction={payload => dispatch()}
                                    />
                            );
                        }
                    )}
                </Toolbar>
            </Measure>
        );
    }

    getPosition() {
        const {x, y} = this.props;
        const {width} = this.state.dimensions;

        return {
            y: y - 49,
            x: Math.min(x, window.innerWidth - width - 20) - 9
        };
    }
}
