import {$get} from 'plow-js';
import {createSelector} from 'reselect';

export const focusedSelector = state => $get('ui.contentView.focusedNode', state).toJS();
export const hoveredSelector = state => $get('ui.contentView.hoveredNode', state).toJS();
export const contextPathSelector = $get('ui.contentView.contextPath');
