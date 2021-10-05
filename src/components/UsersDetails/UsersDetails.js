import React, { Component } from 'react'
import NavWidget from '../../containers/NavWidget/NavWidget'
import { connect } from 'react-redux'
import '../SiteDetails/SiteDetails.scss'
import SaveButtonEdit from '../../containers/Buttons/SaveButtonEdit'
import { GetSpecUserDetailsActionRequest, UpdateSpecUsersActionRequest, DeleteSpecUsersActionRequest } from '../../store/actions/UsersActions'
import { NotificationManager } from 'react-notifications'
import Select from 'react-select'

const options = [
    { value: '0', label: 'Admin' },
    { value: '1', label: 'Moderator' },
    { value: '2', label: 'Editor' }
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
            usersData: '',
            confirmMessage: false,
            name: null,
            email: null,
            role: null,
            company: null,
            streetAddress: null,
            country: null,
            city: null,
            contactperson: null,
            phone: null,
            vat: null

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
        const { loading: updateSpecUserLoading, error: updateSpecUserError, data: updateSpecUserData, errorData: updateSpecUserErrorData } = updateSpecUser
        const { loading: deleteSpecUserLoading, error: deleteSpecUserError, data: deleteSpecUserData } = deleteSpecUser

        if (prevProps.updateSpecUser !== updateSpecUser && !updateSpecUserLoading && !updateSpecUserError && updateSpecUserData) {
            NotificationManager.success("User successfully updated", "Success", 2000);
            this.props.history.push('/users')
        } else if (prevProps.updateSpecUser !== updateSpecUser && updateSpecUserError && updateSpecUserErrorData) {
            NotificationManager.error(`${updateSpecUserErrorData.data.message}`, "Failed", 2000);

        }


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
                data: { searchBycategory: this.state.usersData, prevPath: '/users' }
            })
            this.setState({ isIteditable: false })
        } else if (page === 'postsDiv') {
            this.props.history.push({
                pathname: '/posts',
                data: { searchBycategory: this.state.usersData, prevPath: '/users' }
            })
        } else if (page === 'widgetsDiv') {
            this.props.history.push({
                pathname: '/widgets',
                data: { searchBycategory: this.state.usersData, prevPath: '/users' }
            })
        }
        else {
            this.setState({ isIteditable: false })
        }
        this.setState({ tabClicked: page })
    }

    handleButtonActive = () => {
        const { streetAddress, city, company, contactperson, country, email, name, vat, phone, role } = this.state
        this.props.dispatch(UpdateSpecUsersActionRequest({
            id: this.props.match.params.id,
            address: streetAddress,
            city,
            company,
            contact: contactperson,
            country,
            email,
            name,
            vat,
            phone,
            roles: role,

        }))
        // this.setState({ whichisit: page })
    }

    handleTrashClick = () => {
        this.setState({ confirmMessage: true })
    }

    deleteuserFunction = () => {
        this.props.dispatch(DeleteSpecUsersActionRequest({
            id: this.props.match.params.id
        }))
    }

    handleUserChanges = (e) => {
        if (e.target.name === 'vat') {
            this.setState({ [e.target.name]: parseInt(e.target.value) })

        } else {
            this.setState({ [e.target.name]: e.target.value })
        }
    }

    handleRolesChange = (value) => {
        const arrayOfRoles = value.map(el => parseInt(el.value))
        this.setState({ role: arrayOfRoles })
    }

    render() {
        const { isIteditable, usersData } = this.state
        return (
            <div className='mainSiteDetailsDiv'>
                <NavWidget handleWhereEverNav={this.handleWhereEverNav} isButtonNamepased={this.props?.location?.data?.buttonClicked} handleTrashClick={this.handleTrashClick} pageName={'users'} />
                {this.state.confirmMessage && <div className='confurmText'>
                    <h4>Are you sure</h4>
                    <button onClick={this.deleteuserFunction}>Yes</button>
                    <button className="nobutton" onClick={() => this.setState({ confirmMessage: false })}>No</button>
                </div>}
                <div className='mainSiteInfoDiv'>
                    <div className='leftSideDiv'>
                        <h1>General</h1>
                        <div className='generalDiv'>
                            <div className='name_div'>
                                <h4>Name</h4>
                                {!isIteditable && <p>{usersData?.name}</p>}
                                {isIteditable && <input name='name' type="text" onChange={(e) => this.handleUserChanges(e)} placeholder={usersData?.name} />}
                            </div>
                            <div className='owner_div'>
                                <h4>Email</h4>
                                {!isIteditable && <p>{usersData?.email}</p>}
                                {isIteditable && <input name='email' type="text" onChange={(e) => this.handleUserChanges(e)} placeholder={usersData?.email} />}
                            </div>
                            <div className='url_div selectable'>
                                <h4>Roles</h4>
                                {!isIteditable && <p>{usersData?.roles?.length !== 0 && usersData?.roles?.map(el => el === 0 ? 'Admin ' : el === 1 ? 'Moderator ' : el === 2 ? 'Editor ' : '')}</p>}
                                {/* {isIteditable && <select style={{ flex: '1', marginRight: '20px', border: 'none', background: '#d6dbdc', textIndent: '10px', borderRadius: '5px' }}>
                                    <option className='options' value="test">test</option>
                                    <option className='options' value="test">test</option>
                                </select>} */}
                                {isIteditable && <Select
                                    defaultValue={usersData?.roles?.length !== 0 && usersData?.roles?.map(el => options[el])}
                                    className="basic-single"
                                    classNamePrefix="select"
                                    // defaultValue={colourOptions[0]}
                                    // isLoading={true}
                                    styles={customSelectStyles}
                                    // isClearable={true}
                                    isMulti
                                    isSearchable={true}
                                    options={options}
                                    onChange={this.handleRolesChange}
                                />}

                            </div>
                            <div className='name_div'>
                                <h4>Company/ Organisation</h4>
                                {!isIteditable && <p>{usersData?.company}</p>}
                                {isIteditable && <input type="text" onChange={(e) => this.handleUserChanges(e)} name='company' placeholder={usersData?.company} />}
                            </div>
                            <div className='name_div'>
                                <h4>Street address</h4>
                                {!isIteditable && <p>{usersData?.address}</p>}
                                {isIteditable && <input type="text" onChange={(e) => this.handleUserChanges(e)} name='streetAddress' placeholder={usersData?.address} />}
                            </div>
                            {/* <div className='description_div'>
                                <h4>ZIP + City</h4>
                                {!isIteditable && <p></p>}
                                {isIteditable && <input type="text" name='zip'  placeholder='' />}

                            </div> */}
                            <div className='description_div'>
                                <h4>Country</h4>
                                {!isIteditable && <p>{usersData?.country}</p>}
                                {isIteditable && <input type="text" onChange={(e) => this.handleUserChanges(e)} name='country' placeholder={usersData?.country} />}

                            </div>
                            <div className='description_div'>
                                <h4>City</h4>
                                {!isIteditable && <p>{usersData?.city}</p>}
                                {isIteditable && <input type="text" onChange={(e) => this.handleUserChanges(e)} name='city' placeholder={usersData?.city} />}

                            </div>
                            <div className='description_div'>
                                <h4>Contact Person</h4>
                                {!isIteditable && <p>{usersData?.contact}</p>}
                                {isIteditable && <input type="text" onChange={(e) => this.handleUserChanges(e)} name='contactperson' placeholder={usersData?.contact} />}

                            </div>
                            <div className='description_div'>
                                <h4>Contact Phone</h4>
                                {!isIteditable && <p>{usersData?.phone}</p>}
                                {isIteditable && <input type="number" name='phone' onChange={(e) => this.handleUserChanges(e)} placeholder={usersData?.phone} />}

                            </div>
                            <div className='description_div'>
                                <h4>VAT Number</h4>
                                {!isIteditable && <p>{usersData?.vat}</p>}
                                {isIteditable && <input type="number" name='vat' onChange={(e) => this.handleUserChanges(e)} placeholder={usersData?.vat} />}

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
