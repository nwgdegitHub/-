import React, { Component } from 'react';
import { Image, View } from 'react-native';
import { CachedImage } from 'react-native-img-cache';
import { PropTypes } from 'prop-types';

const getNewSize = ({ limitedW, limitedH, originalW, originalH }) => {
    if (limitedW && !limitedH) {
        return {
            width: limitedW,
            height: originalH * (limitedW / originalW)
        };
    } else if (!limitedW && limitedH) {
        return {
            width: originalW * (limitedH / originalH),
            height: limitedH
        };
    } else if (limitedW && limitedH) {
        return {
            width: limitedW,
            height: limitedH
        };
    } else {
        return {
            width: originalW,
            height: originalH
        };
    }
}

export default class NNImage extends Component {

    static propTypes = {
        source: PropTypes.any.isRequired,
        style: PropTypes.object.isRequired,
        enableAdaptation: PropTypes.bool,
        placeholder: PropTypes.number,
    }

    static defaultProps = {
        enableAdaptation: false,
        style: {}
    }

    state = {
        showPlaceholder: true,
    };

    componentWillMount() {
        const { style, source, enableAdaptation } = this.props;
        if (!enableAdaptation) return;

        if (typeof source === 'object') {
            Image.getSize(source.uri || source.url, (width, height) => {
                const newSize = getNewSize({
                    limitedW: style.width,
                    limitedH: style.height,
                    originalW: width,
                    originalH: height
                });

                this.setState({ ...newSize });
            });
        } else {
            const { width, height } = Image.resolveAssetSource(source);
            const newSize = getNewSize({
                limitedW: style.width,
                limitedH: style.height,
                originalW: width,
                originalH: height
            });
            this.setState({ ...newSize });
        }
    }

    render() {
        const { style, source, enableAdaptation, placeholder } = this.props;
        const { showPlaceholder } = this.state;
        const newStyle = !enableAdaptation ? style : { ...style, width: this.state.width, height: this.state.height };

        return (
            showPlaceholder && placeholder ?
                <View>
                    <CachedImage style={newStyle} source={placeholder} resizeMode='cover' />
                    <CachedImage
                        style={{ width: 1, height: 1 }}
                        source={source}
                        onLoadStart={() => this.setState({ showPlaceholder: true })}
                        onLoad={() => this.setState({ showPlaceholder: false })}
                    />
                </View> :
                <CachedImage style={newStyle} source={source} />
        );
    }
}