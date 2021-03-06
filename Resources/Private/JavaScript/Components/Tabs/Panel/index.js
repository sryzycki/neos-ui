import React, {PropTypes} from 'react';
import style from './style.css';

const Panel = props => <div className={style.panel}>{props.children}</div>;
Panel.displayName = 'Panel';
Panel.propTypes = {
    // Props which are processed in the Parent Tabs Component.
    title: PropTypes.string,
    icon: PropTypes.string,

    // Contents of the Panel.
    children: PropTypes.node.isRequired
};

export default Panel;
