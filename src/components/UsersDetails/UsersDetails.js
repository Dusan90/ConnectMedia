import React, { Component } from 'react'
import NavWidget from '../../containers/NavWidget/NavWidget'
import '../SiteDetails/SiteDetails.scss'
import SaveButtonEdit from '../../containers/Buttons/SaveButtonEdit'

// const test = [{
//     title: 'vesti',
//     keep: 50,
//     expire: 23,
//     maxAge: 24
// }]

// const test2 = [{ mesto: 'Beograd', title: 'vesti' }, { mesto: 'dobra vest', title: 'vesti' }, { mesto: 'dobra vest', title: 'vesti' }, { mesto: 'kultura', title: 'zanimljivosti' }]

// const test3 = [{ text: 'vesti' }, { text: 'zabava' }]

// const options = ["PUBLISHED", 'DRAFT', 'ERROR', 'TRASH']

export class UsersDetails extends Component {
    constructor(prosp) {
        super(prosp)
        this.state = {
            isIteditable: false,
            whichisit: '',
            dataTest: 'PUBLISHED'
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

    handleButtonActive = (page) => {
        console.log(page);
        this.setState({ whichisit: page })
    }

    handleStatusChange = (status) => {
        this.setState({ dataTest: status })
    }
    render() {
        const { isIteditable } = this.state
        return (
            <div className='mainSiteDetailsDiv'>
                <NavWidget handleWhereEverNav={this.handleWhereEverNav} pageName={'users'} />
                <div className='mainSiteInfoDiv'>
                    <div className='leftSideDiv'>
                        <h1>General</h1>
                        <div className='generalDiv'>


                            <div className='owner_div'>
                                <h4>Email</h4>
                                {!isIteditable && <p></p>}
                                {isIteditable && <input type="text" placeholder='' />}
                            </div>
                            <div className='url_div selectable'>
                                <h4>Roles</h4>
                                {!isIteditable && <p></p>}
                                {isIteditable && <select style={{ flex: '1', marginRight: '20px', border: 'none', background: '#d6dbdc', textIndent: '10px', borderRadius: '5px' }}>
                                    <option className='options' value="test">test</option>
                                    <option className='options' value="test">test</option>
                                </select>}

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
                    <SaveButtonEdit labeltext={'Save changes'} colorization={'ScrapeClass'} customStyle={{ fontWeight: 'bold', height: '58px', width: "260px" }} />
                    <SaveButtonEdit labeltext={'Cancel'} colorization={`ScrapeClass clicked`} customStyle={{ fontWeight: 'bold', height: '58px', width: "184px" }} />
                </div>}
            </div >
        )
    }
}

export default UsersDetails
