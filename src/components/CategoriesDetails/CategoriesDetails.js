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

export class CategoriesDetails extends Component {
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
                <NavWidget handleWhereEverNav={this.handleWhereEverNav} pageName={'categories'} />
                <div className='mainSiteInfoDiv'>
                    <div className='leftSideDiv'>
                        <h1>B92</h1>
                        <div className='generalDiv'>


                            <div className='name_div'>
                                <h4>Description</h4>
                                {!isIteditable && <p></p>}
                                {isIteditable && <input type="text" placeholder='' />}
                            </div>
                            <div className='name_div'>
                                <h4>Adult</h4>
                                {!isIteditable && <p></p>}
                                {isIteditable && <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><input style={{ width: '20px' }} type="checkbox" name="check" /> <label htmlFor="check"></label></div>}
                            </div>
                            <div className='owner_div'>
                                <h4>Site</h4>
                                {!isIteditable && <p></p>}
                                {isIteditable && <input type="text" placeholder='' />}
                            </div>
                            <div className='owner_div'>
                                <h4>Rename</h4>
                                {!isIteditable && <p></p>}
                                {isIteditable && <input type="text" placeholder='' />}
                            </div>
                            <div className='url_div selectable'>
                                <h4>Merge</h4>
                                {!isIteditable && <p></p>}
                                {isIteditable && <select style={{ flex: '1', marginRight: '20px', border: 'none', background: '#d6dbdc', textIndent: '10px', borderRadius: '5px' }}>
                                    <option className='options' value="test">test</option>
                                    <option className='options' value="test">test</option>
                                </select>}

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

export default CategoriesDetails
