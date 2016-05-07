import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';

export default class Frame extends Component {
    static propTypes = {
        src: PropTypes.string.isRequired,
        onContentLoad: PropTypes.func,
        onError: PropTypes.func
    };

    componentDidMount() {
        const {iframe} = this.refs;
        iframe.addEventListener('load', () => {
            const frameWindow = iframe.contentWindow || iframe;
            const frameDocument = iframe.contentDocument || iframe.contentWindow.document;

            if (frameDocument && frameDocument.readyState === 'complete') {
                return this.initializeFrame(frameWindow);
            }

            frameDocument.addEventListener('DOMContentLoaded', () => this.initializeFrame(frameWindow));
        });
    }

    initializeFrame(frame) {
        const {onContentLoad, onError} = this.props;

        //
        // Forward clicks to the parent frame
        //
        frame.document.addEventListener('click', () => {
            const parentDocument = frame.parent.document;

            if (parentDocument.createEvent) {
                const eventObject = parentDocument.createEvent('MouseEvents');
                eventObject.initEvent('click', true, false);
                parentDocument.dispatchEvent(eventObject);
            } else if (parentDocument.createEventObject) {
                const eventObject = parentDocument.createEventObject();
                parentDocument.fireEvent('onclick', eventObject);
            }
        });

        if (onError) {
            frame.onerror = err => onError(err);
        }

        this._isMounted = true;
        this.renderFrameContents();

        if (onContentLoad) {
            setTimeout(() => onContentLoad(frame), 0);
        }
    }

    componentDidUpdate() {
        this.renderFrameContents();
    }

    renderFrameContents() {
        if (!this._isMounted) {
            return;
        }

        const {iframe} = this.refs;
        const {children} = this.props;
        const frameWindow = iframe.contentWindow || iframe;
        const frameDocument = iframe.contentDocument || iframe.contentWindow.document;

        if (!this._frameComponentRoot) {
            const FrameComponentRoot = frameDocument.registerElement('neos-ui-root');
            this._frameComponentRoot = new FrameComponentRoot();
            frameDocument.body.appendChild(this._frameComponentRoot);
        }

        ReactDOM.unstable_renderSubtreeIntoContainer(this, (
            <div>{children}</div>
        ), this._frameComponentRoot);
    }

    render() {
        const {src, ...directProps} = this.props;

        return (
            <iframe
                ref='iframe'
                src={src}
                {...Object.assign(directProps, { children: null })}
                />
        );
    }
}
