import { useCallback } from 'react';
import './style.scss';

export const IframeView = (props) => {
    const { src, title } = props;

    const onLoad = useCallback(
        (e) => {
            console.log('onLoad', { e, src });
        },
        [src]
    );

    if (!src) {
        return (
            <div className="iframe-placeholder">
                <h1>Select site</h1>
            </div>
        );
    }

    return <iframe className="iframe-view" title={title} src={src} onLoad={onLoad} />;
};
