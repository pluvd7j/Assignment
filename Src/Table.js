
//import liraries
import React, { Component } from 'react';
import { View, Text,TouchableOpacity, Dimensions, FlatList, TextInput, ActivityIndicator, } from 'react-native';
import Modal from "react-native-modal";
import customStyles from '../Css/style';
import { SearchBar } from 'react-native-elements';
import Swipeout from 'react-native-swipeout';
import Icon from 'react-native-vector-icons/FontAwesome';
import FlashMessage, { showMessage, hideMessage } from "react-native-flash-message";

const dataSource = require("../data.json")

// create a component
class Table extends Component {
    constructor(props) {
        super(props)
        this.state = {
            empName: "",
            empId: "",
            empSalary: "",
            empAge: "",
            empRole: "",
            itemId: "",
            data: [],
            isModalVisible: false,
            modalTitle: "",
            modalButton: "",
            name: true,
            id: true,
            age: true,
            salary: true,
            role: true,
            checked: false
        }
    }

    componentDidMount() {
        this.loadList()
        showMessage({
            message: "Note:",
            description: "To Edit/Delete Swipe Right",
            type: "default",
            backgroundColor: "#343C3F",
            color: "#fff",
        });

    }

    loadList = () => {
        this.setState({
            data: dataSource
        })
    }

    deleteRecord = (item, i) => {
        let data = this.state.data
        data.splice(i, 1)
        this.setState({
            data
        })
    }

    search = (searchText) => {
        this.setState({ searchText })
        let name = searchText.toLowerCase()
        let empId = searchText.toString()

        let filteredData = this.state.data.filter(item => {
            return item.emp_name.toLowerCase().match(name) || item.emp_Id.toString().match(empId) || item.emp_role.toLowerCase().match(name)
                || item.emp_salary.toString().match(empId) || item.age.toString().match(empId)
        })
        if (filteredData == "") {
            let Data = [{ emp_name: "false" }]
            this.setState({
                filteredData: Data
            })
        } else {
            this.setState({ filteredData });
        }

    }

    closeEditModal = () => {
        this.setState({
            editModal: false,
            empName: "",
            empId: "",
            empRole: "",
            empAge: "",
            empSalary: "",
            name: true,
            id: true,
            age: true,
            salary: true,
            role: true
        });

    }

    openEditModal = (item) => {
        this.setState({
            modalTitle: "Update Employee Details",
            modalButton: "Update",
            empName: item.emp_name,
            empId: item.emp_Id.toString(),
            empRole: item.emp_role,
            empAge: item.age.toString(),
            empSalary: item.emp_salary.toString(),
            isModalVisible: true,
            itemId: item.id

        })
    }

    updateRecord = () => {
        let { empName, empId, empAge, empRole, empSalary } = this.state
        if (empName == "") {
            this.setState({ name: false })
        }
        else if (empId == "") {
            this.setState({ id: false })
        }
        else if (empSalary == "") {
            this.setState({ salary: false })
        }
        else if (empAge == "") {
            this.setState({ age: false })
        }
        else if (empRole == "") {
            this.setState({ role: false })
        }
        else {
            this.state.data.find(i => i.id == this.state.itemId).emp_name = empName
            this.state.data.find(i => i.id == this.state.itemId).emp_Id = empId
            this.state.data.find(i => i.id == this.state.itemId).age = empAge
            this.state.data.find(i => i.id == this.state.itemId).emp_role = empRole
            this.state.data.find(i => i.id == this.state.itemId).emp_salary = empSalary
            this.closeGroup()
        }
    }

    closeGroup = () => {
        this.setState({
            isModalVisible: false,
            empName: "",
            empId: "",
            empRole: "",
            empAge: "",
            empSalary: "",
            name: true,
            id: true,
            age: true,
            salary: true,
            role: true
        });

    }

    openModal = () => {
        this.setState({
            isModalVisible: true,
            modalTitle: "Add a New Employee",
            modalButton: "Add"
        })
    }

    addRecord = () => {
        let { empName, empId, empAge, empRole, empSalary } = this.state
        if (empName == "") {
            this.setState({ name: false })
        }
        else if (empId == "") {
            this.setState({ id: false })
        }
        else if (empSalary == "") {
            this.setState({ salary: false })
        }
        else if (empAge == "") {
            this.setState({ age: false })
        }
        else if (empRole == "") {
            this.setState({ role: false })
        }
        else {
            var len = this.state.data.length
            for (var i = len; i <= len; i++) {
                this.state.data.push({
                    "id": i + 1,
                    "emp_name": empName,
                    "emp_salary": empSalary,
                    "age": empAge,
                    "emp_role": empRole,
                    "emp_Id": empId,
                })
            }
            this.closeGroup()
        }

    }

    renderRow = (item, index) => {
        const swipeoutBtns = [
            {
                component: (
                    <View
                        style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            marginTop: 5,

                        }}
                    >
                        <Text style={{ color: "#fff", size: 15, fontWeight: "bold" }}>Edit</Text>
                    </View>
                ),
                backgroundColor: "green",
                underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
                onPress: () => this.openEditModal(item, index),

            },
            {
                component: (
                    <View
                        style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            marginTop: 5,

                        }}
                    >
                        <Text style={{ color: "#fff", size: 15, fontWeight: "bold" }}>Delete</Text>
                    </View>
                ),
                backgroundColor: "red",
                underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
                onPress: () => this.deleteRecord(item, index),

            },
        ]
        if (item.emp_name == "false") {
            return (
                <View style={{ alignItems: "center", justifyContent: "center", }}>
                    <Text style={{ marginTop: "50%" }} >No data found</Text>
                </View>
            )
        } else {
            return (
                <Swipeout right={swipeoutBtns} autoClose={true}>
                    <View style={customStyles.renderRowMainContainer}>

                        <View style={customStyles.renderRowContainer}>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ flexDirection: "column", width: "40%" }}>
                                    <Text style={customStyles.textcolorlistleft}>Employee Name </Text>
                                </View>
                                <View style={{ flexDirection: "column", width: "5%" }}>
                                    <Text>:</Text>
                                </View>
                                <View style={{ flexDirection: "column", width: "55%" }}>
                                    <Text style={customStyles.textcolorlistright}>{item.emp_name}</Text>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ flexDirection: "column", width: "40%" }}>
                                    <Text style={customStyles.textcolorlistleft}>Employee Id </Text>
                                </View>
                                <View style={{ flexDirection: "column", width: "5%" }}>
                                    <Text>:</Text>
                                </View>
                                <View style={{ flexDirection: "column", width: "55%" }}>
                                    <Text style={customStyles.textcolorlistright}>{item.emp_Id}</Text>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ flexDirection: "column", width: "40%" }}>
                                    <Text style={customStyles.textcolorlistleft}>Employee Salary </Text>
                                </View>
                                <View style={{ flexDirection: "column", width: "5%" }}>
                                    <Text>:</Text>
                                </View>
                                <View style={{ flexDirection: "column", width: "55%" }}>
                                    <Text style={customStyles.textcolorlistright}>{item.emp_salary}</Text>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ flexDirection: "column", width: "40%" }}>
                                    <Text style={customStyles.textcolorlistleft}>Employee Age </Text>
                                </View>
                                <View style={{ flexDirection: "column", width: "5%" }}>
                                    <Text>:</Text>
                                </View>
                                <View style={{ flexDirection: "column", width: "55%" }}>
                                    <Text style={customStyles.textcolorlistright}>{item.age}</Text>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ flexDirection: "column", width: "40%" }}>
                                    <Text style={customStyles.textcolorlistleft}>Employee Role </Text>
                                </View>
                                <View style={{ flexDirection: "column", width: "5%" }}>
                                    <Text>:</Text>
                                </View>
                                <View style={{ flexDirection: "column", width: "55%" }}>
                                    <Text style={customStyles.textcolorlistright}>{item.emp_role}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </Swipeout>
            )
        }
    }
    showEmptyListView = () => {
        return (
            <View style={customStyles.EmptyFlatlist}>
                <Text style={{ color: "black" }}>{"No Data to Display"}</Text>
            </View>
        )
    }

    renderFooter = () => {

        return this.state.loading ? <ActivityIndicator animating size="large" /> : null
    };



    renderSeparator = () => {
        return (
            <View style={customStyles.RenderSeparator} />
        );
    };

    renderHeader = () => {
        const { navigate } = this.props.navigation;
        return (
            <View style={{ flexDirection: "row", width: "100%", backgroundColor: "#fff" }}>
                <View style={{ width: "90%" }}>
                    <SearchBar
                        inputStyle={customStyles.SearchBarInputStyle}
                        containerStyle={customStyles.containerStyle}
                        placeholder="Search Employee/Details"
                        inputContainerStyle={customStyles.inputContainerStyle}
                        onChangeText={searchText => this.search(searchText)}
                        value={this.state.searchText}
                    />
                </View>
                <View style={{ width: "10%", justifyContent: "center" }}>
                    <TouchableOpacity onPress={this.openModal}>

                        <Icon name="plus" size={25} color={"#000"} />
                    </TouchableOpacity>

                </View>
                <Modal isVisible={this.state.isModalVisible}
                    backdropColor="transparent"
                    avoidKeyboard={true} backdropOpacity={0.90} onBackdropPress={() => this.closeGroup()}>
                    <View style={{ borderColor: "#343C3F", borderWidth: 1, backgroundColor: "#fff" }} >
                        <View style={{ backgroundColor: "#343C3F", padding: 10 }}>

                            <Text style={customStyles.modalTitle}>{this.state.modalTitle}</Text>
                        </View>
                        <View>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ flexDirection: "column", width: "40%", marginTop: 15 }}>
                                    <Text style={customStyles.textcolorlistleft}>Employee Name </Text>
                                </View>
                                <View style={{ flexDirection: "column", width: "5%", marginTop: 15 }}>
                                    <Text>:</Text>
                                </View>
                                <View style={{ flexDirection: "column", width: "55%" }}>
                                    <TextInput
                                        style={customStyles.TextInput}
                                        placeholder="Enter the Employee Name"
                                        placeholderTextColor={this.state.name == true ? "gray" : "#fc3548"}
                                        onChangeText={(empName) => { this.setState({ empName }) }}
                                        value={this.state.empName}
                                    />
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ flexDirection: "column", width: "40%", marginTop: 15 }}>
                                    <Text style={customStyles.textcolorlistleft}>Employee Id </Text>
                                </View>
                                <View style={{ flexDirection: "column", width: "5%", marginTop: 15 }}>
                                    <Text>:</Text>
                                </View>
                                <View style={{ flexDirection: "column", width: "55%" }}>
                                    <TextInput
                                        style={customStyles.TextInput}
                                        keyboardType="number-pad"
                                        placeholder="Enter the Employee Id"
                                        placeholderTextColor={this.state.id == true ? "gray" : "#fc3548"}
                                        onChangeText={(empId) => { this.setState({ empId }) }}
                                        value={this.state.empId}
                                    />
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ flexDirection: "column", width: "40%", marginTop: 15 }}>
                                    <Text style={customStyles.textcolorlistleft}>Employee Salary </Text>
                                </View>
                                <View style={{ flexDirection: "column", width: "5%", marginTop: 15 }}>
                                    <Text>:</Text>
                                </View>
                                <View style={{ flexDirection: "column", width: "55%" }}>
                                    <TextInput
                                        style={customStyles.TextInput}
                                        keyboardType="number-pad"
                                        placeholder="Enter the Employee Salary"
                                        placeholderTextColor={this.state.salary == true ? "gray" : "#fc3548"}
                                        onChangeText={(empSalary) => { this.setState({ empSalary }) }}
                                        value={this.state.empSalary}
                                    />
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ flexDirection: "column", width: "40%", marginTop: 15 }}>
                                    <Text style={customStyles.textcolorlistleft}>Employee Age </Text>
                                </View>
                                <View style={{ flexDirection: "column", width: "5%", marginTop: 15 }}>
                                    <Text>:</Text>
                                </View>
                                <View style={{ flexDirection: "column", width: "55%" }}>
                                    <TextInput
                                        style={customStyles.TextInput}
                                        keyboardType="number-pad"
                                        placeholder={this.state.reasonnull == true ? "Enter the Employee Age" : "Enter the Employee Age"}
                                        placeholderTextColor={this.state.age == true ? "gray" : "#fc3548"}
                                        onChangeText={(empAge) => { this.setState({ empAge }) }}
                                        value={this.state.empAge}
                                    />
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ flexDirection: "column", width: "40%", marginTop: 15 }}>
                                    <Text style={customStyles.textcolorlistleft}>Employee Role </Text>
                                </View>
                                <View style={{ flexDirection: "column", width: "5%", marginTop: 15 }}>
                                    <Text>:</Text>
                                </View>
                                <View style={{ flexDirection: "column", width: "55%" }}>
                                    <TextInput
                                        style={customStyles.TextInput}
                                        placeholder="Enter the Employee Role"
                                        placeholderTextColor={this.state.role == true ? "gray" : "#fc3548"}
                                        onChangeText={(empRole) => { this.setState({ empRole }) }}
                                        value={this.state.empRole}
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={{ flexDirection: "row", marginTop: 10 }}>
                            <View style={{ flexDirection: "column", width: "50%" }}>
                                <TouchableOpacity
                                    style={[customStyles.AddButton, { borderRightColor: "#fff" }]}
                                    onPress={this.state.modalButton == "Add" ? () => this.addRecord() : () => this.updateRecord()}
                                    underlayColor='#fff'>
                                    <Text style={customStyles.WhiteText}>{this.state.modalButton}</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flexDirection: "column", width: "50%" }}>
                                <TouchableOpacity
                                    style={[customStyles.CancelButton, { borderRightColor: "transparent" }]}
                                    onPress={() => this.closeGroup()}
                                    underlayColor='#fff'>
                                    <Text style={customStyles.WhiteText}>Cancel</Text>
                                </TouchableOpacity>

                            </View>

                        </View>
                    </View>
                </Modal>
            </View>
        )
    }
    render() {
        if (!this.state.data) {
            return (
                <View style={{ flex: 1, paddingTop: 20 }}>
                    <ActivityIndicator animating={true}
                        style={customStyles.indicator}
                        color="#0000ff"
                        size="large" />
                </View>
            );
        }
        else {
            return (
                <View style={customStyles.container}>
                    <View style={{ height: Dimensions.get('window').height - 80 }} >
                        <FlatList style={{ flexWrap: "wrap" }}
                            data={this.state.filteredData && this.state.filteredData.length > 0 ? this.state.filteredData : this.state.data}
                            renderItem={({ item, index }) => (
                                this.renderRow(item, index)
                            )}
                            keyExtractor={(item, index) => index}
                            ListEmptyComponent={this.showEmptyListView()}
                            ListHeaderComponent={this.renderHeader}
                            stickyHeaderIndices={[0]}
                        />
                    </View>
                    <FlashMessage position="bottom" duration={2450} floating={true} />
                </View>
            );
        }
    }
}



//make this component available to the app
export default Table

