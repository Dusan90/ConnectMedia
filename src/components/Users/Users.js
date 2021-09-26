import React, { Component } from 'react'
import SearchContainer from '../../containers/SearchContainer/SearchContainer'
import { connect } from 'react-redux'
import arrowUp from '../../assets/img/TableIcons/arrow(1).svg'
import secondarrowDown from '../../assets/img/TableIcons/arrow.svg'
import visit from '../../assets/img/TableIcons/visit.svg'
import edit from '../../assets/img/TableIcons/edit.svg'
import posts from '../../assets/img/TableIcons/posts.svg'
import stats from '../../assets/img/TableIcons/stats.svg'
import widgets from '../../assets/img/TableIcons/widgets.svg'
import history from '../../routes/History'
import AddContainer from '../../containers/AddContainer/AddContainer'
import { CreateUserActionRequest } from '../../store/actions/UsersActions'
import { NotificationManager } from 'react-notifications'
import '../Home/Home.scss'

const test = [{
    status: 'PUBLISHED',
    owner: 'nina.simone@gmail.com',
    nazivKorisnika: 'B92.net',
    in: '11212',
    out: '2',
    txr: '0.02%'
},
{
    status: 'PUBLISHED',
    owner: 'nina.simone@gmail.com',
    nazivKorisnika: 'B92.net',
    in: '11212',
    out: '2',
    txr: '0.02%'
},
]

export class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            data: test,
            filteredDate: [],
            inputValue: '',
            countPerPage: '',
            addButtonClicked: false,
            newUseremail: '',
            newUserpassword: '',
            newUsername: ''

        }
    }

    componentDidUpdate(prevProps) {
        const { createUser } = this.props
        const { loading: createUserLoading, error: createUserError, data: createUserData, errorData: createUserErrorData } = createUser

        if (prevProps.createUser !== createUser && !createUserLoading && !createUserError && createUserData) {
            console.log(createUserData);
            this.setState({
                newUseremail: '',
                newUserpassword: '',
                newUsername: '',
                addButtonClicked: false
            })
            NotificationManager.success("User successfully created", "Success", 2000);

        } else if (prevProps.createUser !== createUser && createUserError && createUserErrorData) {
            NotificationManager.error(`${createUserErrorData.data.message}`, "Failed", 2000)
        }
    }

    handlePageChange = (value) => {
        this.setState({ page: value })
    }

    handleSubtmit = (e) => {
        e.preventDefault()
        const value = this.state.inputValue.toLowerCase()
        const newData = this.state.data.filter(el => {
            return el.owner.toLowerCase().includes(value)
        })
        this.setState({ filteredDate: newData })

        console.log('hell0');
    }

    handleSearchBar = (e) => {
        this.setState({ inputValue: e.target.value })
    }

    haneldeRedirect = (value) => {
        console.log(value);
    }

    handleArrowSort = (value) => {
        console.log(value);
    }

    handlePageRedirect = (e, item) => {
        if (!e.target.id || e.target.id !== 'noredirection') {
            history.push({
                pathname: `/users/${item.id}`,
                state: item
            })
        }
    }

    handleCountPerPage = (e) => {
        this.setState({ countPerPage: e.target.value })
    }

    handleAddSomeMore = () => {
        this.setState({ addButtonClicked: !this.state.addButtonClicked })
    }

    handleCreateUser = (e) => {
        this.setState({ [e.target.id]: e.target.value })
    }

    handleClickCreateUser = () => {
        this.props.dispatch(CreateUserActionRequest({
            mail: this.state.newUseremail,
            password: this.state.newUserpassword,
            name: this.state.newUsername
        }))
    }

    render() {

        return (
            <>
                <SearchContainer page={this.state.page} handleAddSomeMore={this.handleAddSomeMore} pageName={"USERS"} state={this.state} handleCountPerPage={this.handleCountPerPage} handleSearchBar={this.handleSearchBar} handleSubtmit={this.handleSubtmit} handlePageChange={this.handlePageChange} customStyleForlesTabs={true} />
                {this.state.addButtonClicked && <AddContainer>
                    <input type="email" placeholder='Enter email' id='newUseremail' onChange={(e) => this.handleCreateUser(e)} />
                    <input type="password" placeholder='Enter password' id='newUserpassword' onChange={(e) => this.handleCreateUser(e)} />
                    <input type="text" placeholder='Name' id='newUsername' onChange={(e) => this.handleCreateUser(e)} />
                    <button onClick={this.handleClickCreateUser}><p>Create user</p></button>
                </AddContainer>}
                <div className='mainTableDiv'>
                    <div className='shortScreenTableDiv'>
                        {test.map((item, key) => {
                            return <div key={key} className='mainDivShotScreen'>
                                <div className='nazivDiv' onClick={(e) => this.handlePageRedirect(e, item)}>
                                    <div>
                                        <div className='arrowDiv'>
                                            <img src={arrowUp} onClick={() => this.handleArrowSort('emailUp')} alt="arrow" />
                                            <img src={secondarrowDown} onClick={() => this.handleArrowSort('emailDown')} alt="arrow" />
                                        </div>
                                        <p>{"Email"}</p>

                                    </div>
                                    <div className='ownersNameClass'>
                                        {item.nazivKorisnika}
                                    </div>
                                </div>
                                <div className='mainForIcons'>
                                    <div className="divWithClicableIcons">
                                        <img src={visit} alt="visit" />
                                        <p onClick={() => this.haneldeRedirect(item)}>visit</p>
                                        <img src={edit} alt="edit" />
                                        <p onClick={() => this.haneldeRedirect(item)}>edit</p>
                                        <img src={stats} alt="stats" />
                                        <p onClick={() => this.haneldeRedirect(item)}>stats</p>
                                        <img src={posts} alt="posts" />
                                        <p onClick={() => this.haneldeRedirect(item)}>posts</p>
                                        <img src={widgets} alt="widgets" />
                                        <p onClick={() => this.haneldeRedirect(item)}>widgets</p>

                                    </div>
                                </div>
                                <div className='nazivDiv'>
                                    <div>
                                        <div className='arrowDiv'>
                                            <img src={arrowUp} alt="arrow" onClick={() => this.handleArrowSort('rolesUp')} />
                                            <img src={secondarrowDown} alt="arrow" onClick={() => this.handleArrowSort('rolesDown')} />
                                        </div>
                                        <p>{"Roles"}</p>

                                    </div>
                                    <div className='ownersNameClass'>
                                        {item.nazivKorisnika}
                                    </div>
                                </div>
                            </div>
                        })}
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>
                                    <div>
                                        <div>
                                            <img src={arrowUp} alt="arrow" onClick={() => this.handleArrowSort('emailUp')} />
                                            <img src={secondarrowDown} alt="arrow" onClick={() => this.handleArrowSort('emailDown')} />
                                        </div>
                                        <p>Email</p>
                                    </div>
                                </th>
                                <th></th>
                                <th>
                                    <div>
                                        <div>
                                            <img src={arrowUp} alt="arrow" onClick={() => this.handleArrowSort('rolesUp')} />
                                            <img src={secondarrowDown} alt="arrow" onClick={() => this.handleArrowSort('rolesDown')} />
                                        </div>
                                        <p>Roles</p>
                                    </div>
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {test.map((item, key) => {
                                return <tr key={key} onClick={(e) => this.handlePageRedirect(e, item)}>
                                    <td><div className='ownerClass'>
                                        {item.owner}
                                    </div></td>
                                    <td><div className="divWithClicableIcons">
                                        <img src={visit} alt="visit" />
                                        <p onClick={() => this.haneldeRedirect(item)} id='noredirection'>visit</p>
                                        <img src={edit} alt="edit" />
                                        <p onClick={() => this.haneldeRedirect(item)} id='noredirection'>edit</p>
                                        <img src={stats} alt="stats" />
                                        <p onClick={() => this.haneldeRedirect(item)} id='noredirection'>stats</p>
                                        <img src={posts} alt="posts" />
                                        <p onClick={() => this.haneldeRedirect(item)} id='noredirection'>posts</p>
                                        <img src={widgets} alt="widgets" />
                                        <p onClick={() => this.haneldeRedirect(item)} id='noredirection'>widgets</p>

                                    </div></td>
                                    <td>
                                        <div className="divWithHashes">
                                            <p>admin root moderator</p>
                                        </div>
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    const { UsersReducer } = state;
    const { createUser } = UsersReducer
    return {
        createUser

    }
}

export default connect(mapStateToProps, null)(Users)
