import React, { Component } from 'react'
import NavWidget from '../../containers/NavWidget/NavWidget'
import { connect } from 'react-redux'
import '../SiteDetails/SiteDetails.scss'
import SaveButtonEdit from '../../containers/Buttons/SaveButtonEdit'
import { GetSpecUserDetailsActionRequest, UpdateSpecUsersActionRequest, DeleteSpecUsersActionRequest } from '../../store/actions/UsersActions'
import { NotificationManager } from 'react-notifications'
import Select from 'react-select'

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
]

const customSelectStyles = {
    control: (base, state) => ({
        ...base,
        // height: "48px",
        flex: "1",
        fontWeight: "500",
        // background: "white",
        background: '#d6dbdc',
        // !props.organization && props.color && "rgb(245, 192, 192)",
    }),
    placeholder: () => ({
        color: 'black'
    })
};

export class UsersDetails extends Component {
    constructor(prosp) {
        super(prosp)
        this.state = {
            isIteditable: false,
            // whichisit: '',
            dataTest: 'PUBLISHED',
            usersData: '',
            confirmMessage: false
        }
    }


    componentDidMount() {
        this.props.dispatch(GetSpecUserDetailsActionRequest({
            id: this.props.match.params.id
        }))
    }

    componentDidUpdate(prevProps) {
        const { getSpecUserDetails, updateSpecUser, deleteSpecUser } = this.props
        const { loading: getSpecUserDetailsLoading, error: getSpecUserDetailsError, data: getSpecUserDetailsData } = getSpecUserDetails
        const { loading: updateSpecUserLoading, error: updateSpecUserError, data: updateSpecUserData } = updateSpecUser
        const { loading: deleteSpecUserLoading, error: deleteSpecUserError, data: deleteSpecUserData } = deleteSpecUser

        if (prevProps.getSpecUserDetails !== getSpecUserDetails && !getSpecUserDetailsLoading && !getSpecUserDetailsError && getSpecUserDetailsData) {
            this.setState({ usersData: getSpecUserDetailsData.data })
        }

        if (prevProps.deleteSpecUser !== deleteSpecUser && !deleteSpecUserLoading && !deleteSpecUserError && deleteSpecUserData) {
            NotificationManager.success("User successfully deleted", "Success", 2000);
            this.props.history.push('/users')
        }
    }


    handleWhereEverNav = (page) => {
        if (page === 'editDiv') {
            this.setState({ isIteditable: true })
        } else if (page === 'sitesDiv') {
            this.props.history.push({
                pathname: '/sites',
                state: { whichToFilter: 'test' }
            })
            this.setState({ isIteditable: false })
        } else if (page === 'postsDiv') {
            this.props.history.push({
                pathname: '/posts',
                state: { whichToFilter: 'test' }
            })
        } else if (page === 'widgetsDiv') {
            this.props.history.push({
                pathname: '/widgets',
                state: { whichToFilter: 'test' }
            })
        }
        else {
            this.setState({ isIteditable: false })
        }
        this.setState({ tabClicked: page })
    }

    handleButtonActive = () => {
        this.props.dispatch(UpdateSpecUsersActionRequest({
            id: this.props.match.params.id,
            value: 'nestotamo'
        }))
        // this.setState({ whichisit: page })
    }

    handleStatusChange = (status) => {
        this.setState({ dataTest: status })
    }

    handleTrashClick = () => {
        this.setState({ confirmMessage: true })
    }

    deleteuserFunction = () => {
        this.props.dispatch(DeleteSpecUsersActionRequest({
            id: this.props.match.params.id
        }))
    }
    render() {
        const { isIteditable, usersData } = this.state
        console.log(usersData);
        return (
            <div className='mainSiteDetailsDiv'>
                <NavWidget handleWhereEverNav={this.handleWhereEverNav} handleTrashClick={this.handleTrashClick} pageName={'users'} />
                {this.state.confirmMessage && <div className='confurmText'>
                    <h4>Are you sure</h4>
                    <button onClick={this.deleteuserFunction}>Yes</button>
                    <button className="nobutton" onClick={() => this.setState({ confirmMessage: false })}>No</button>
                </div>}
                <div className='mainSiteInfoDiv'>
                    <div className='leftSideDiv'>
                        <h1>General</h1>
                        <div className='generalDiv'>


                            <div className='owner_div'>
                                <h4>Email</h4>
                                {!isIteditable && <p>{usersData?.email}</p>}
                                {isIteditable && <input type="text" placeholder={usersData?.email} />}
                            </div>
                            <div className='url_div selectable'>
                                <h4>Roles</h4>
                                {!isIteditable && <p></p>}
                                {/* {isIteditable && <select style={{ flex: '1', marginRight: '20px', border: 'none', background: '#d6dbdc', textIndent: '10px', borderRadius: '5px' }}>
                                    <option className='options' value="test">test</option>
                                    <option className='options' value="test">test</option>
                                </select>} */}
                                {isIteditable && <Select
                                    className="basic-single"
                                    classNamePrefix="select"
                                    // defaultValue={colourOptions[0]}
                                    // isLoading={true}
                                    styles={customSelectStyles}
                                    // isClearable={true}
                                    isMulti
                                    isSearchable={true}
                                    name="merge"
                                    options={options}
                                />}

                            </div>
                            <div className='name_div'>
                                <h4>Company/ Organisation</h4>
                                {!isIteditable && <p></p>}
                                {isIteditable && <input type="text" placeholder='' />}
                            </div>
                            <div className='name_div'>
                                <h4>Street address</h4>
                                {!isIteditable && <p></p>}
                                {isIteditable && <input type="text" placeholder='' />}
                            </div>
                            <div className='description_div'>
                                <h4>ZIP + City</h4>
                                {!isIteditable && <p></p>}
                                {isIteditable && <input type="text" placeholder='' />}

                            </div>
                            <div className='description_div'>
                                <h4>Country</h4>
                                {!isIteditable && <p></p>}
                                {isIteditable && <input type="text" placeholder='' />}

                            </div>
                            <div className='description_div'>
                                <h4>Contact Person</h4>
                                {!isIteditable && <p></p>}
                                {isIteditable && <input type="text" placeholder='' />}

                            </div>
                            <div className='description_div'>
                                <h4>Contact Phone</h4>
                                {!isIteditable && <p></p>}
                                {isIteditable && <input type="text" placeholder='' />}

                            </div>
                            <div className='description_div'>
                                <h4>VAT Number</h4>
                                {!isIteditable && <p></p>}
                                {isIteditable && <input type="text" placeholder='' />}

                            </div>
                        </div>
                    </div>

                    <div className='rightSideDiv'>
                        <div className='categoriesDiv'>

                        </div>

                    </div>
                </div>

                {isIteditable && <div className='buttonsDiv'>
                    <SaveButtonEdit labeltext={'Save changes'} handleButtonActive={this.handleButtonActive} colorization={'ScrapeClass'} customStyle={{ fontWeight: 'bold', height: '58px', width: "260px" }} />
                    <SaveButtonEdit labeltext={'Cancel'} colorization={`ScrapeClass clicked`} customStyle={{ fontWeight: 'bold', height: '58px', width: "184px" }} />
                </div>}
            </div >
        )
    }
}

const mapStateToProps = (state) => {
    const { UsersReducer } = state;
    const { getSpecUserDetails, updateSpecUser, deleteSpecUser } = UsersReducer
    return {
        getSpecUserDetails,
        updateSpecUser,
        deleteSpecUser

    }
}

export default connect(mapStateToProps, null)(UsersDetails)
