import React, {Component, PropTypes} from 'react';
import mergeClassNames from 'classnames';

import style from './style.css';

export default class Toolbar extends Component {
    static propTypes = {
        position: PropTypes.shape({
            x: PropTypes.number.isRequired,
            y: PropTypes.number.isRequired
        }),
        isVisible: PropTypes.bool,
        children: PropTypes.node.isRequired
    };

    render() {
        const props = {
            className: style.toolBar__btnGroup__btn
        };
        const {position, isVisible} = this.props.toolbar;
        const classNames = mergeClassNames({
            [style.toolBar]: true,
            [style['toolBar--isFree']]: Boolean(position),
            [style['toolBar--isHidden']]: !isVisible,

        });
        const styles = position ? {
            top: position.y,
            left: position.x
        } : {};

        return (
            <div className={classNames} style={styles}>
                <div className={style.toolBar__btnGroup}>
                    {children}
                </div>
            </div>
        );
    }
}
