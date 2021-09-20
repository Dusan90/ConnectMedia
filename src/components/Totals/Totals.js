import React, { Component } from 'react'
import SearchContainer from '../../containers/SearchContainer/SearchContainer'
import Chart from '../../containers/Chart/Chart'
import VerticalChart from '../../containers/Chart/VerticalChart'
import posts from '../../assets/img/SiteDetails/Frame(2).svg'
import postsBlack from '../../assets/img/SiteDetails/postsBlack.svg'
import './Totals.scss'


const test = [{
    status: 'PUBLISHED',
    owner: 'B92',
    nazivKorisnika: 'B92.net',
    in: '11212',
    out: '2',
    txr: '0.02%'
},
{
    status: 'PUBLISHED',
    owner: 'Novosti',
    nazivKorisnika: 'B92.net',
    in: '11212',
    out: '2',
    txr: '0.02%'
},
]


export class Totals extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataLength: 20,
            whichIsActive: '',
            data: test,
            filteredDate: [],
            inputValue: ''
        }
    }
    handlePageChange = (page) => {
        this.setState({ whichIsActive: page })
    }

    handleHomePageSort = (value, sortBy) => {
        // const { filteredDate, data} = this.state
        // const toTheFilter = filteredDate.length === 0 ? data : filteredDate
        const newData = this.state.data.filter(el => {
            if (sortBy === 'users') {
                if (el.owner === value) {
                    return el
                }
            } else if (sortBy === 'categories') {
                if (el.categories === value) {
                    return el
                }
            } else if (sortBy === 'sites') {
                if (el.sites === value) {
                    return el
                }
            }
        })
        this.setState({ filteredDate: newData })
    }

    render() {
        const { dataLength, whichIsActive } = this.state
        return (
            <>
                <SearchContainer pageName={"TOTALS"} handleHomePageSort={this.handleHomePageSort} secondHeaderCustomStyle={{ height: '55px' }} />
                <div style={{ padding: '0 35px' }}>
                    <div className='mainSiteDetailsNavigation'>
                        <div className='siteDetailsNavigate'>
                            <div onClick={() => { return this.handlePageChange('goback'), this.props.history.goBack() }} className={`goback ${whichIsActive === 'goback' && 'active'}`}><p>GO BACK</p></div>
                            <div onClick={() => this.handlePageChange('siteDetails')} className={`siteDetails ${whichIsActive === 'siteDetails' && 'active'}`}><p>Site details</p></div>
                            <div onClick={() => this.handlePageChange('sitesDiv')} className={`sitesDiv ${whichIsActive === 'sitesDiv' && 'active'}`}>
                                <img src={whichIsActive === 'sitesDiv' ? postsBlack : posts} alt="posts" />
                                <p>sites</p>
                            </div>
                            <div onClick={() => this.handlePageChange('postsPorDiv')} className={`postsPorDiv ${whichIsActive === 'postsPorDiv' && 'active'}`}>
                                <img src={whichIsActive === 'postsPorDiv' ? postsBlack : posts} alt="posts" />

                                <p>posts on portal</p>

                            </div>
                            {<div onClick={() => { return this.handlePageChange('postsDiv'), this.props.history.push('/posts') }} className={`postsDiv ${whichIsActive === 'postsDiv' && 'active'}`}>
                                <img src={whichIsActive === 'postsDiv' ? postsBlack : posts} alt="posts" />
                                <p>posts</p>
                            </div>}
                            {<div onClick={() => this.handlePageChange('widgetsDiv')} className={`widgetsDiv ${whichIsActive === 'widgetsDiv' && 'active'}`}>
                                <img src={whichIsActive === 'widgetsDiv' ? postsBlack : posts} alt="posts" />
                                <p>widgets</p>
                            </div>}
                        </div>
                    </div>
                </div>

                <div style={{ height: '500px', marginTop: '20px' }}>
                    <Chart />
                </div>
                <h1 style={{ marginTop: '50px', textAlign: 'center' }}>Daily totals for sites</h1>
                <div style={{ height: `${dataLength * 30}px` }}>
                    <VerticalChart />
                </div>
            </>
        )
    }
}

export default Totals
