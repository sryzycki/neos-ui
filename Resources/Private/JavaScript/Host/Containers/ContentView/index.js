import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import Immutable from 'immutable';
import mergeClassNames from 'classnames';
import style from './style.css';

@connect(state => {
    return {
        tabs: state.get('tabs')
    };
})
export default class ContentView extends Component {
    static propTypes = {
        tabs: PropTypes.instanceOf(Immutable.Map)
    };

    render() {
        const activeId = this.props.tabs.get('active');

        // Using Maps as children is not yet fully supported in react 0.14.1.
        const tabs = this.props.tabs.get('byId').toArray();

        return (
            <div className="contentView">
                {tabs.map(tab => this.renderTab(tab, activeId))}
            </div>
        );
    }

    renderTab(tab, activeId) {
        const tabClasses = mergeClassNames({
            [style.item]: true,
            [style.activeItem]: tab.get('id') === activeId
        });

        return <iframe src={tab.get('src')} frameBorder="0" name={tab.get('id')} key={tab.get('id')} className={tabClasses} />;
    }
}