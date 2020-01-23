import { StyleSheet } from 'react-native';

const customStyles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#dcdcdc',
        width: "100%",
    },
    textcolorlistleft: {
        color: '#000',
        fontSize: 14,
        fontWeight: 'bold',
        marginRight: 8,
        marginLeft: 10

    },
    textcolorlistright: {
        color: '#000',
        fontSize: 14,
    },
    AddButton: {
        padding: 10,
        backgroundColor: '#C70039',
        borderWidth: 1,
        borderBottomColor: "transparent",
        borderTopColor: "transparent",
        borderLeftColor: "transparent"

    },
    CancelButton: {
        padding: 10,
        backgroundColor: '#878787',
        borderWidth: 1,
        borderBottomColor: "transparent",
        borderTopColor: "transparent",
        borderLeftColor: "transparent"

    },
    WhiteText: {
        color: '#fff',
        textAlign: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        fontWeight: "bold"
    },
    renderRowMainContainer: {
        backgroundColor: "#fff", marginLeft: "auto", marginTop: 5, marginRight: "auto",
        flexDirection: "row", width: "97%", elevation: 4, padding: 5
    },
    renderRowContainer: {
        flexDirection: "column",
        width: "98%"
    },
    searchBarInputStyle: {
        backgroundColor: 'white',
        borderWidth: 0,
        borderTopWidth: 0,
        borderBottomWidth: 0,
        height: 25
    },
    containerStyle: {
        backgroundColor: "transparent",
        borderWidth: 0,
        borderTopWidth: 0,
        borderBottomWidth: 0,
        width: '100%',
        marginBottom: 10,
        height: 40
    },
    inputContainerStyle: {
        backgroundColor: 'white',
        borderWidth: 0,
        borderRadius: 55,
        height: 25
    },
    modalTitle: {
        textAlign: "center",
        justifyContent: "center",
        fontSize: 15,
        fontWeight: "bold",
        color: "#fff"
    },
    TextInput: {
        fontSize: 14,
        borderColor: "#000",
        borderBottomWidth: 1,
        width: "95%",
        borderWidth: 0
    },
    EmptyFlatlist: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    },
    RenderSeparator: {
        height: 10,
        width: "100%",
        backgroundColor: "#fff",
    },
    indicator: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 80
    },
})

export default customStyles