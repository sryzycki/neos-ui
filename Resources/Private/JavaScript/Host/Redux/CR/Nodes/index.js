import {createAction} from 'redux-actions';
import Immutable, {Map} from 'immutable';
import {$set, $get} from 'plow-js';

const ADD = '@packagefactory/guevara/CR/Nodes/ADD';

//
// Export the action types
//
export const actionTypes = {
    ADD
};

/**
 * Adds a node to the application state
 *
 * @param {String} contextPath The context path of the ndoe
 * @param {Object} data        The node's data
 */
const add = createAction(ADD, (contextPath, data) => ({
    contextPath,
    data
}));

//
// Export the actions
//
export const actions = {
    add
};

//
// Export the initial state hydrator
//
export const hydrate = state => $set(
    'cr.nodes',
    new Map({
        byContextPath: Immutable.fromJS($get('cr.nodes.byContextPath', state)) || new Map(),
        siteNode: $get('cr.nodes.siteNode', state) || ''
    })
);

//
// Export the reducer
//
export const reducer = {
    [ADD]: ({contextPath, data}) => $set(['cr', 'nodes', 'byContextPath', contextPath], Immutable.fromJS({...data}))
};
