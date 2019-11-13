import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Text,
    Image
} from 'react-native';
import ApartmentNavigationBar from './ApartmentNavigationBar';
import NavigationUtil from '../../utils/NavigationUtil';
import ApartmentBannerCell from './ApartmentBannerCell';
import EachHouseCell from '../../components/common/EachHouseCell';
import AppUtil from '../../utils/AppUtil';
import { Types } from '../../redux/base/actions';

import { connect } from 'react-redux';
import {
    init,
    loadData,
    getStoreName
} from '../../redux/apartment';
import Toaster from '../../components/common/Toaster';
import NNPlaneLoading from '../../components/common/NNPlaneLoading';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

class ApartmentPage extends Component {

    constructor(props) {
        super(props);

        this.state = { isTransparent: true };

        this.params = this.props.navigation.state.params;
        
        this.storeName = getStoreName(this.params.apartmentId);

        this.props.init(this.storeName);
    }

    componentWillMount() {
        const { apartmentId, isTalent } = this.params;

        const params = { estateId: apartmentId, isTalent };
        this.props.loadData(this.storeName, params, error => Toaster.autoDisapperShow(error));
    }

    componentWillUnmount() {
        NavigationUtil.dispatch(Types.APARTMENT_WILL_UNMOUNT, this.storeName);
    }

    _renderApartmentItemsTitle(data) {
        if (AppUtil.isEmptyArray(data)) return null;

        return (
            <Text style={{ ...styles.sectionHeader, marginBottom: 5 }}>房型</Text>
        );
    }

    _renderApartmentItems(data) {
        const tmp = [];
        for (const i in data) {
            tmp.push(
                <TouchableWithoutFeedback
                    key={i}
                    onPress={() => {
                        const { estateRoomTypeId, price } = data[i];
                        const params = { estateRoomTypeId, rentPrice: price };
                        NavigationUtil.goPage('CentraliedDetailPage', params);
                    }}>
                    <EachHouseCell apartment={data[i]} />
                </TouchableWithoutFeedback>
            );
        }

        return tmp;
    }

    render() {
        const anApartment = this.props.apartments[this.storeName];
        if (AppUtil.isEmptyObject(anApartment)) return null;

        const { apartment, isLoading } = anApartment;
        return (
            <View style={styles.container}>
                <ScrollView
                    onScroll={e => {
                        const isTransparent = e.nativeEvent.contentOffset.y <= 100;
                        if (isTransparent !== this.state.isTransparent) {
                            this.setState({ isTransparent });
                        }
                    }}
                >
                    <ApartmentBannerCell data={apartment.imageUrls} />
                    <Text style={styles.name}>{apartment.estateName}</Text>
                    <View style={styles.addressContainer}>
                        <Image
                            style={styles.addressIcon}
                            source={require('../../resource/images/location.png')}
                        />
                        <Text style={styles.address}>{apartment.address}</Text>
                    </View>
                    <View style={styles.dividingLine} />
                    <Text style={{ ...styles.sectionHeader }}>公寓简介</Text>
                    <Text numberOfLines={0} style={styles.description}>
                        {apartment.introduction}
                    </Text>
                    <View style={styles.dividingLine} />
                    {this._renderApartmentItemsTitle(apartment.estateRoomTypes)}
                    {this._renderApartmentItems(apartment.estateRoomTypes)}
                </ScrollView>
                <ApartmentNavigationBar
                    isTransparent={this.state.isTransparent}
                    backHandler={() => NavigationUtil.goBack()}
                />
                <NNPlaneLoading show={isLoading} />
            </View>
        );
    }
}

const mapStateToProps = state => ({ apartments: state.apartments });

const mapDispatchToProps = dispatch => ({
    init: storeName => dispatch(init(storeName)),
    loadData: (storeName, params) =>
        dispatch(loadData(storeName, params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ApartmentPage);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    name: {
        marginLeft: 15,
        marginRight: 15,
        marginTop: 20,
        fontSize: 18,
        fontWeight: '400',
        color: AppUtil.app_black,
    },
    addressContainer: {
        marginLeft: 15,
        marginRight: 15,
        marginTop: 10,
        marginBottom: 20,
        height: 15,
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    addressIcon: {
        width: 15,
        height: 15,
        resizeMode: 'cover',
        marginRight: 5
    },
    address: {
        fontSize: 12,
        color: AppUtil.app_gray
    },
    dividingLine: {
        marginLeft: 15,
        marginRight: 15,
        height: 0.5,
        backgroundColor: AppUtil.app_dividing_line
    },
    sectionHeader: {
        marginTop: 20,
        marginLeft: 15,
        fontSize: 16,
        fontWeight: '400',
        color: AppUtil.app_black,
    },
    description: {
        marginLeft: 15,
        marginRight: 15,
        marginTop: 20,
        marginBottom: 20,
        color: AppUtil.app_black,
        fontSize: 14,
        lineHeight: 20,
        textAlign: 'auto'
    }
});