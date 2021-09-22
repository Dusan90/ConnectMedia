import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import NavWidget from '../../containers/NavWidget/NavWidget'
import xButton from '../../assets/img/SiteDetails/xButton.svg'
import '../SiteDetails/SiteDetails.scss'
import SaveButtonEdit from '../../containers/Buttons/SaveButtonEdit'
import Chart from '../../containers/Chart/Chart'
import VerticalChart from '../../containers/Chart/VerticalChart'

// const test = [{
//     title: 'vesti',
//     keep: 50,
//     expire: 23,
//     maxAge: 24
// }]

// const test2 = [{ mesto: 'Beograd', title: 'vesti' }, { mesto: 'dobra vest', title: 'vesti' }, { mesto: 'dobra vest', title: 'vesti' }, { mesto: 'kultura', title: 'zanimljivosti' }]

const data = [
    {
        name: 'Page A',
        uv: 590,
        pv: 800,
        amt: 1400,
    },
    {
        name: 'Page B',
        uv: 590,
        pv: 800,
        amt: 1400,
    },
    {
        name: 'Page C',
        uv: 590,
        pv: 800,
        amt: 1400,
    },
    {
        name: 'Page D',
        uv: 590,
        pv: 800,
        amt: 1400,
    },
]

const test3 = [{ text: 'vesti' }, { text: 'zabava' }]

const options = ["PUBLISHED", 'DRAFT', 'ERROR', 'TRASH']

export class WidgetsDetails extends Component {
    constructor(prosp) {
        super(prosp)
        this.state = {
            isIteditable: false,
            whichisit: '',
            dataTest: 'PUBLISHED',
            tabClicked: ''

        }
    }

    handleWhereEverNav = (page) => {
        if (page === 'editDiv') {
            this.setState({ isIteditable: true })
        } else if (page === 'statsDiv') {
            this.setState({ isIteditable: false })
        } else if (page === 'viewDiv') {
            console.log('nesto');
            this.props.history.push({
                pathname: '/sites',
                state: { whichToFilter: 'test' }
            })
        } else if (page === 'embedDiv') {
            this.setState({ isIteditable: false })
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
        const { isIteditable, dataTest, tabClicked } = this.state
        return (
            <div className='mainSiteDetailsDiv'>
                <NavWidget handleWhereEverNav={this.handleWhereEverNav} pageName={'widgets'} />
                {tabClicked === 'statsDiv' && <> <div style={{ height: '500px', marginTop: '20px' }}>
                    <Chart customStyle={{ padding: '0' }} />
                </div>
                    <h1 style={{ marginTop: '50px', textAlign: 'center', fontSize: '30px' }}>Daily totals for post</h1>
                    <div style={{ height: `200px` }}>
                        <VerticalChart customData={data} customStyle={{ padding: '0' }} />
                    </div>
                </>
                }
                {tabClicked !== 'statsDiv' && tabClicked !== 'embedDiv' && <div className='mainSiteInfoDiv'>
                    <div className='leftSideDiv'>
                        <div className='generalDiv'>
                            <h1>General</h1>
                            <div className='status_div'>
                                <h4>Status</h4>
                                {!isIteditable && <div className='coloredDivStatus' style={{ background: dataTest === 'PUBLISHED' ? '#ABD996' : dataTest === 'DRAFT' ? '#DFE094' : dataTest === 'ERROR' ? '#E09494' : '#295265' }}>
                                    {dataTest}
                                </div>}
                                {isIteditable && <div className='mainOptionDiv'>
                                    {options.map((item, key) => {
                                        return <div key={key} onClick={() => this.handleStatusChange(item)} className='coloredDivStatus' style={{ height: item === dataTest && '47px', background: item === 'PUBLISHED' ? '#ABD996' : item === 'DRAFT' ? '#DFE094' : item === 'ERROR' ? '#E09494' : '#295265' }}>
                                            {item}
                                        </div>

                                    })}
                                </div>
                                }
                            </div>
                            <div className='name_div'>
                                <h4>Name</h4>
                                {!isIteditable && <p>24Online.rs</p>}
                                {isIteditable && <input type="text" placeholder='24Online.rs' />}
                            </div>
                            <div className='url_div'>
                                <h4>Public</h4>
                                {!isIteditable && <p></p>}
                                {isIteditable && <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><input style={{ width: '20px' }} type="checkbox" name="check" /></div>}

                            </div>
                            <h1 style={{ margin: '20px 0' }}>Default content</h1>


                            <div className='owner_div'>
                                <h4>Include site</h4>
                                {!isIteditable && <p></p>}
                                {isIteditable && <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><input style={{ width: '20px' }} type="checkbox" name="check" /></div>}
                            </div>
                            <div className='owner_div'>
                                <h4>Link direct</h4>
                                {!isIteditable && <p></p>}
                                {isIteditable && <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><input style={{ width: '20px' }} type="checkbox" name="check" /></div>}
                            </div>
                            <div className='description_div'>
                                <h4>Open site posts in the same window</h4>
                                {!isIteditable && <p></p>}
                                {isIteditable && <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><input style={{ width: '20px' }} type="checkbox" name="check" /></div>}

                            </div>
                            <div className='description_div'>
                                <h4>Append to links</h4>
                                {!isIteditable && <p></p>}
                                {isIteditable && <input type="text" placeholder='' />}

                            </div>
                            <h1 style={{ margin: '20px 0' }}>Order</h1>
                            <div className='head_div'>
                                <h4>Do not register impressions</h4>
                                {!isIteditable && <p></p>}
                                {isIteditable && <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><input style={{ width: '20px' }} type="checkbox" name="check" /></div>}

                            </div>
                            <h1 style={{ margin: '20px 0' }}>Default content</h1>
                            <div className='description_div'>
                                <h4>Count</h4>
                                {!isIteditable && <p></p>}
                                {isIteditable && <input type="text" placeholder='' />}

                            </div>
                            <div className='description_div'>
                                <h4>Encoding</h4>
                                {!isIteditable && <p></p>}
                                {isIteditable && <input type="text" placeholder='' />}

                            </div>
                            <div className='description_div'>
                                <h4>Image width</h4>
                                {!isIteditable && <p></p>}
                                {isIteditable && <input type="text" placeholder='' />}

                            </div>
                            <div className='description_div'>
                                <h4>Image height</h4>
                                {!isIteditable && <p></p>}
                                {isIteditable && <input type="text" placeholder='' />}

                            </div>
                            <div className='description_div'>
                                <h4>Template</h4>
                                {!isIteditable && <p></p>}
                                {isIteditable && <textarea style={{ flex: '1', background: '#d6dbdc', marginRight: '20px', border: 'none', borderRadius: '5px' }} type="text" placeholder='' />}

                            </div>
                        </div>


                    </div>
                    <div className='rightSideDiv'>
                        <div className='categoriesDiv'>
                            <h1>Categories</h1>


                            <div className='categ_div'>
                                <h4>Categories</h4>
                                <div>
                                    {test3.map((item, key) => {
                                        if (!isIteditable) {
                                            return <p key={key}>{item.text}</p>
                                        }
                                        else {
                                            return <div key={key}>
                                                <img src={xButton} alt="x" />
                                                <p>{item.text}</p>
                                            </div>
                                        }
                                    })}

                                </div>
                            </div>

                            <div className='categ_div selectable'>
                                <h4 style={{ width: '100px' }}>Site</h4>
                                {!isIteditable && <p></p>}
                                {isIteditable && <select style={{ flex: '1', marginRight: '20px', border: 'none', background: '#d6dbdc', textIndent: '10px', borderRadius: '5px' }}>
                                    <option className='options' value="test">test</option>
                                    <option className='options' value="test">test</option>
                                </select>}
                            </div>
                            <div className='categ_div'>
                                <h4>Owner</h4>
                                {!isIteditable && <Link to='nina.aralica@alo.rs'>nina.aralica@alo.rs</Link>}
                                {isIteditable && <input type="text" placeholder='nina.aralica@alo.rs' />}
                            </div>
                            <div className='categ_div'>
                                <h4>Description</h4>
                                {!isIteditable && <p></p>}
                                {isIteditable && <input type="text" placeholder='' />}

                            </div>


                        </div>

                    </div>
                </div>}

                {isIteditable && <div className='buttonsDiv'>
                    <SaveButtonEdit labeltext={'Save changes'} colorization={'ScrapeClass'} customStyle={{ fontWeight: 'bold', height: '58px', width: "260px" }} />
                    <SaveButtonEdit labeltext={'Cancel'} colorization={`ScrapeClass clicked`} customStyle={{ fontWeight: 'bold', height: '58px', width: "184px" }} />
                </div>}
            </div>
        )
    }
}

export default WidgetsDetails
