/**
 * @file App 样式
 * @author leon<leonlu@outlook.com>
 */

import {StyleSheet} from 'react-native';

export default StyleSheet.create({

    container: {
        flex: 1,
        paddingTop: 22,
        backgroundColor: '#eee'
    },

    navContainer: {
        height: 40,
        flexDirection: 'row',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        justifyContent: 'center'
    },

    uriInput: {
        flex: 1,
        height: 30,
        fontSize: 14,
        backgroundColor: '#fff',
        paddingLeft: 5
    },

    goTouchableHighlight: {
        width: 24,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10
    },

    go: {
        fontSize: 13,
        color: '#007AFF'
    },

    mask: {
        position: 'absolute',
        top: 60,
        left: 0,
        right: 0,
        backgroundColor: '#00000080'
    }


});
