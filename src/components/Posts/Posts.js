import React, { Component } from 'react'
import SearchContainer from '../../containers/SearchContainer/SearchContainer'
import arrowUp from '../../assets/img/TableIcons/arrow(1).svg'
import secondarrowDown from '../../assets/img/TableIcons/arrow.svg'
import secondTrash from '../../assets/img/TableIcons/trash.svg'
import visit from '../../assets/img/TableIcons/visit.svg'
import edit from '../../assets/img/TableIcons/edit.svg'
import posts from '../../assets/img/TableIcons/posts.svg'
import stats from '../../assets/img/TableIcons/stats.svg'
import widgets from '../../assets/img/TableIcons/widgets.svg'
import EditableInline from '../../containers/EditableInline/EditableInline'
import history from '../../routes/History'


import '../Home/Home.scss'

const test = [{
    status: 'PUBLISHED',
    owner: 'nina.simone@gmail.com',
    nazivKorisnika: 'B92.net',
    in: '11212',
    out: '2',
    txr: '0.02%',
    id: '1'
},
{
    status: 'PUBLISHED',
    owner: 'nina.simone@gmail.com',
    nazivKorisnika: 'B92.net',
    in: '11212',
    out: '2',
    txr: '0.02%',
    id: '2'
},
]

export class Posts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            data: test,
            filteredDate: [],
            inputValue: '',
            checkboxList: []

        }
    }

    handlePageChange = (value) => {
        this.setState({ page: value })
    }

    handleSortByStatus = (value) => {
        const newData = this.state.data.filter(el => {
            if (el.status === value) {
                return el
            }
        })
        this.setState({ filteredDate: newData })
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


    handleCheckbox = (e, item) => {
        if (e.target.checked) {
            this.setState({ checkboxList: [...this.state.checkboxList, item] })

        } else {
            const deleted = this.state.checkboxList.filter((el) => el.id !== item.id)
            this.setState({ checkboxList: deleted })
        }
    }

    handleEditableInlineStatus = (value) => {
        console.log(value);
    }

    handleEditableInlineDropDown = (value) => {
        console.log(value);
    }

    haneldeRedirect = (value) => {
        console.log(value);
    }

    handleArrowSort = (value) => {
        console.log(value);
    }

    handlePageRedirect = (e, item) => {
        console.log(e.target);
        if (!e.target.id || e.target.id !== 'noredirection') {
            history.push({
                pathname: `/posts/${item.id}`,
                state: item
            })
        }

    }

    render() {
        console.log(this.state);
        return (
            <>
                <SearchContainer page={this.state.page} pageName={"POSTS"} handleSearchBar={this.handleSearchBar} handleSubtmit={this.handleSubtmit} handleSortByStatus={this.handleSortByStatus} handleHomePageSort={this.handleHomePageSort} handlePageChange={this.handlePageChange} />
                {this.state.checkboxList.length !== 0 && <EditableInline state={this.state} handleEditableInlineStatus={this.handleEditableInlineStatus} handleEditableInlineDropDown={this.handleEditableInlineDropDown} />}

                <div className='mainTableDiv'>
                    <div className='shortScreenTableDiv'>
                        {test.map((item, key) => {
                            return <div key={key} className='mainDivShotScreen'>
                                <div className='checkAndTrashDiv'>
                                    <input type="checkbox" value={this.state.checkboxList} checked={this.state.checkboxList[item.id]} onChange={(e) => this.handleCheckbox(e, item)} />
                                    <img src={secondTrash} alt="trash" />
                                </div>
                                <div className='statusDiv'>
                                    <div>
                                        <div className='arrowDiv'>
                                            <img src={arrowUp} onClick={() => this.handleArrowSort('statusUp')} alt="arrow" />
                                            <img src={secondarrowDown} onClick={() => this.handleArrowSort('statusDown')} alt="arrow" />
                                        </div>
                                        <p>STATUS</p>
                                    </div>
                                    <div className='coloredDivStatus' style={{ background: item.status === 'PUBLISHED' && '#ABD996' }}>
                                        {item.status}
                                    </div>
                                </div>

                                <div className='ownerDiv' onClick={(e) => this.handlePageRedirect(e, item)}>
                                    <div>
                                        <div className='arrowDiv'>
                                            <img src={arrowUp} onClick={() => this.handleArrowSort('siteUp')} alt="arrow" />
                                            <img src={secondarrowDown} onClick={() => this.handleArrowSort('siteDown')} alt="arrow" />
                                        </div>
                                        <p>Site</p>
                                    </div>
                                    <div className='ownerClass'>
                                        {item.owner}
                                    </div>
                                </div>
                                <div className='ownerDiv'>
                                    <div>
                                        <div className='arrowDiv'>
                                            <img src={arrowUp} onClick={() => this.handleArrowSort('imgUp')} alt="arrow" />
                                            <img src={secondarrowDown} onClick={() => this.handleArrowSort('imgDown')} alt="arrow" />
                                        </div>
                                        <p>img</p>
                                    </div>
                                    <div className='ownerClass tdWithImgDiv'>
                                        <img src={edit} alt="" />
                                    </div>
                                </div>
                                <div className='ownerDiv'>
                                    <div>
                                        <div className='arrowDiv'>
                                            <img src={arrowUp} onClick={() => this.handleArrowSort('dateUp')} alt="arrow" />
                                            <img src={secondarrowDown} onClick={() => this.handleArrowSort('dateDown')} alt="arrow" />
                                        </div>
                                        <p>Date</p>
                                    </div>
                                    <div className='ownerClass'>
                                        {item.owner}
                                    </div>
                                </div>


                                <div className='ownerDiv'>
                                    <div>
                                        <div className='arrowDiv'>
                                            <img src={arrowUp} onClick={() => this.handleArrowSort('nameUp')} alt="arrow" />
                                            <img src={secondarrowDown} onClick={() => this.handleArrowSort('nameDown')} alt="arrow" />
                                        </div>
                                        <p>Name</p>
                                    </div>
                                    <div className='ownerClass'>
                                        {item.owner}
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
                                <div className='mainDivHashes'>
                                    <div className="divWithHashes">
                                        <p>Kuhinja ljubav moda</p>
                                        <div>
                                            <p>+<span>2</span></p>
                                            <img src={secondarrowDown} alt="arrow" />
                                        </div>
                                    </div>
                                </div>
                                <div className='mainDivInOutTxr bigStatics'>
                                    <div className='statistic'>
                                        <div>
                                            <div className='arrowDiv'>
                                                <img src={arrowUp} onClick={() => this.handleArrowSort('impUp')} alt="arrow" />
                                                <img src={secondarrowDown} onClick={() => this.handleArrowSort('impDown')} alt="arrow" />
                                            </div>
                                            <p>imp</p>
                                        </div>
                                        <p>{item.in}</p>
                                    </div>
                                    <div className='statistic'>

                                        <div>
                                            <div className='arrowDiv'>
                                                <img src={arrowUp} onClick={() => this.handleArrowSort('clkUp')} alt="arrow" />
                                                <img src={secondarrowDown} onClick={() => this.handleArrowSort('clkDown')} alt="arrow" />
                                            </div>
                                            <p>clk</p>
                                        </div>
                                        <p>{item.out}</p>
                                    </div>
                                    <div className='statistic'>
                                        <div>
                                            <div className='arrowDiv'>
                                                <img src={arrowUp} onClick={() => this.handleArrowSort('ctrUp')} alt="arrow" />
                                                <img src={secondarrowDown} onClick={() => this.handleArrowSort('ctrDown')} alt="arrow" />
                                            </div>
                                            <p>ctr</p>
                                        </div>
                                        <p>{item.txr}</p>
                                    </div>
                                    <div className='statistic'>
                                        <div>
                                            <div className='arrowDiv'>
                                                <img src={arrowUp} onClick={() => this.handleArrowSort('wimpUp')} alt="arrow" />
                                                <img src={secondarrowDown} onClick={() => this.handleArrowSort('wimpDown')} alt="arrow" />
                                            </div>
                                            <p>wimp</p>
                                        </div>
                                        <p>{item.txr}</p>
                                    </div>
                                    <div className='statistic'>
                                        <div>
                                            <div className='arrowDiv'>
                                                <img src={arrowUp} onClick={() => this.handleArrowSort('wclkUp')} alt="arrow" />
                                                <img src={secondarrowDown} onClick={() => this.handleArrowSort('wclkDown')} alt="arrow" />
                                            </div>
                                            <p>wclk</p>
                                        </div>
                                        <p>{item.txr}</p>
                                    </div>
                                    <div className='statistic'>
                                        <div>
                                            <div className='arrowDiv'>
                                                <img src={arrowUp} onClick={() => this.handleArrowSort('wctrUp')} alt="arrow" />
                                                <img src={secondarrowDown} onClick={() => this.handleArrowSort('wctrDown')} alt="arrow" />
                                            </div>
                                            <p>wctr</p>
                                        </div>
                                        <p>{item.txr}</p>
                                    </div>
                                    <div className='statistic'>
                                        <div>
                                            <div className='arrowDiv'>
                                                <img src={arrowUp} onClick={() => this.handleArrowSort('pimpUp')} alt="arrow" />
                                                <img src={secondarrowDown} onClick={() => this.handleArrowSort('pimpDown')} alt="arrow" />
                                            </div>
                                            <p>pimp</p>
                                        </div>
                                        <p>{item.txr}</p>
                                    </div>
                                </div>
                            </div>
                        })}
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th></th>
                                <th></th>
                                <th>
                                    <div>
                                        <div>
                                            <img src={arrowUp} onClick={() => this.handleArrowSort('statusUp')} alt="arrow" />
                                            <img src={secondarrowDown} onClick={() => this.handleArrowSort('statusDown')} alt="arrow" />
                                        </div>
                                        <p>STATUS</p>
                                    </div>
                                </th>
                                <th>
                                    <div>
                                        <div>
                                            <img src={arrowUp} onClick={() => this.handleArrowSort('siteUp')} alt="arrow" />
                                            <img src={secondarrowDown} onClick={() => this.handleArrowSort('siteDown')} alt="arrow" />
                                        </div>
                                        <p>Site</p>
                                    </div>
                                </th>
                                <th>
                                    <div>
                                        <div>
                                            <img src={arrowUp} onClick={() => this.handleArrowSort('imgUp')} alt="arrow" />
                                            <img src={secondarrowDown} onClick={() => this.handleArrowSort('imgDown')} alt="arrow" />
                                        </div>
                                        <p>Img</p>
                                    </div>
                                </th>
                                <th>
                                    <div>
                                        <div>
                                            <img src={arrowUp} onClick={() => this.handleArrowSort('dateUp')} alt="arrow" />
                                            <img src={secondarrowDown} onClick={() => this.handleArrowSort('dateDown')} alt="arrow" />
                                        </div>
                                        <p>Date</p>
                                    </div>
                                </th>
                                <th>
                                    <div>
                                        <div>
                                            <img src={arrowUp} onClick={() => this.handleArrowSort('nameUp')} alt="arrow" />
                                            <img src={secondarrowDown} onClick={() => this.handleArrowSort('nameDown')} alt="arrow" />
                                        </div>
                                        <p>Name</p>
                                    </div>
                                </th>
                                <th></th>
                                {/* <th></th> */}
                                <th>
                                    <div>
                                        <div>
                                            <img src={arrowUp} onClick={() => this.handleArrowSort('impUp')} alt="arrow" />
                                            <img src={secondarrowDown} onClick={() => this.handleArrowSort('impDown')} alt="arrow" />
                                        </div>
                                        <p>imp</p>
                                    </div>
                                </th>
                                <th>
                                    <div>
                                        <div>
                                            <img src={arrowUp} onClick={() => this.handleArrowSort('clkUp')} alt="arrow" />
                                            <img src={secondarrowDown} onClick={() => this.handleArrowSort('clkDown')} alt="arrow" />
                                        </div>
                                        <p>clk</p>
                                    </div>
                                </th>
                                <th>
                                    <div>
                                        <div>
                                            <img src={arrowUp} onClick={() => this.handleArrowSort('ctrUp')} alt="arrow" />
                                            <img src={secondarrowDown} onClick={() => this.handleArrowSort('ctrDown')} alt="arrow" />
                                        </div>
                                        <p>ctr</p>
                                    </div>
                                </th>
                                <th>
                                    <div>
                                        <div>
                                            <img src={arrowUp} onClick={() => this.handleArrowSort('wimpUp')} alt="arrow" />
                                            <img src={secondarrowDown} onClick={() => this.handleArrowSort('wimpDown')} alt="arrow" />
                                        </div>
                                        <p>wimp</p>
                                    </div>
                                </th>
                                <th>
                                    <div>
                                        <div>
                                            <img src={arrowUp} onClick={() => this.handleArrowSort('wclkUp')} alt="arrow" />
                                            <img src={secondarrowDown} onClick={() => this.handleArrowSort('wclkDown')} alt="arrow" />
                                        </div>
                                        <p>wclk</p>
                                    </div>
                                </th>
                                <th>
                                    <div>
                                        <div>
                                            <img src={arrowUp} onClick={() => this.handleArrowSort('wctrUp')} alt="arrow" />
                                            <img src={secondarrowDown} onClick={() => this.handleArrowSort('wctrDown')} alt="arrow" />
                                        </div>
                                        <p>wctr</p>
                                    </div>
                                </th>
                                <th>
                                    <div>
                                        <div>
                                            <img src={arrowUp} onClick={() => this.handleArrowSort('pimpUp')} alt="arrow" />
                                            <img src={secondarrowDown} onClick={() => this.handleArrowSort('pimpDown')} alt="arrow" />
                                        </div>
                                        <p>pimp</p>
                                    </div>
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {test.map((item, key) => {
                                return <tr key={key} onClick={(e) => this.handlePageRedirect(e, item)}>
                                    <td><input type="checkbox" id='noredirection' value={this.state.checkboxList} checked={this.state.checkboxList[item.id]} onChange={(e) => this.handleCheckbox(e, item)} /></td>
                                    <td><img src={secondTrash} alt="trash" id='noredirection' /></td>
                                    <td> <div className='coloredDivStatus' style={{ background: item.status === 'PUBLISHED' && '#ABD996' }}>
                                        {item.status}
                                    </div>
                                    </td>
                                    <td><div className='ownerClass'>
                                        b92.rs
                                    </div></td>
                                    <td><div className='ownersNameClass tdWithImgDiv'>
                                        <img src={edit} alt="" />
                                    </div></td>
                                    {/* <td><div className="divWithClicableIcons">
                                        <img src={visit} alt="visit" />
                                        <p>visit</p>
                                        <img src={edit} alt="edit" />
                                        <p>edit</p>
                                        <img src={stats} alt="stats" />
                                        <p>stats</p>
                                        <img src={posts} alt="posts" />
                                        <p>posts</p>
                                        <img src={widgets} alt="widgets" />
                                        <p>widgets</p>

                                    </div></td> */}
                                    <td>31.12.2001</td>
                                    <td>Neki tamo je udario nekog tamo i od toga se napravila pometnja pa je taj neko pozvao nekoga pa se sve nastavilo</td>
                                    <td>
                                        <div className="divWithHashes">
                                            <p>Kuhinja ljubav moda</p>
                                            <div>
                                                <p>+<span>2</span></p>
                                                <img src={secondarrowDown} id='noredirection' alt="arrow" />
                                            </div>
                                        </div>
                                    </td>
                                    <td>{item.txr}</td>
                                    <td>{item.txr}</td>
                                    <td>{item.txr}</td>
                                    <td>{item.txr}</td>
                                    <td>{item.txr}</td>
                                    <td>{item.txr}</td>
                                    <td>{item.txr}</td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>
            </>
        )
    }
}

export default Posts
