import React, { Component } from 'react';
import { StyleSheet, Text } from 'react-native';
import Swiper from 'react-native-swiper';
import AppUtil from '../../utils/AppUtil';
import NNImage from '../../components/common/NNImage';

const cellHeight = 280;

export default class ApartmentBannerCell extends Component {

    _renderBannerItems() {
        const { data } = this.props;
        const images = [];
        for (const i in data) {
            images.push(
                <NNImage
                    key={i}
                    style={{ ...styles.image }}
                    source={{ uri: data[i] }}
                    placeholder={AppUtil.placeholderImage}
                />
            );
        }

        return images;
    }

    render() {
        const { data } = this.props;
        if (AppUtil.isEmptyArray(data)) return null;

        return (
            <Swiper
                autoplay={true}
                autoplayTimeout={3.0}
                showsPagination={true}
                containerStyle={styles.swiper}
                renderPagination={(index, total) => (
                    <Text style={styles.indexLabel}>
                        {`${index + 1}/${total}`}
                    </Text>
                )}
            >
                {this._renderBannerItems()}
            </Swiper>
        );
    }
}

const styles = StyleSheet.create({
    swiper: {
        height: cellHeight,
        width: AppUtil.windowWidth
    },
    indexLabel: {
        right: 15,
        bottom: 15,
        height: 15,
        position: 'absolute',
        fontSize: 15,
        color: '#FFFFFF',
        textAlign: 'right',
    },
    image: {
        width: AppUtil.windowWidth,
        height: cellHeight,
        resizeMode: 'cover'
    },
})