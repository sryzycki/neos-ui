export default api => ({
    changeProperty(node, propertyName, value) {
        api.cr.changeProperty(node.contextPath, propertyName, value);
    },
    toolbar: {
        create(toolbarId, configuration) {
            api.ui.contentView.addToolbar(toolbarId, configuration);

            return toolbarId;
        },
        update(toolbar, configuration) {
            api.ui.contentView.updateToolbar(toolbar, configuration);
        },
        show(toolbar, position) {
            api.ui.contentView.showToolbar(toolbar, position);
        },
        hide(toolbar) {
            api.ui.contentView.hideToolbar(toolbar);
        },
        on(toolbar, eventName, callback) {
            api.signals.ui.contentView.toolbar.add(
                payload => {
                    if (payload === eventName) {
                        callback();
                    }
                }
            );
        }
    }
});
