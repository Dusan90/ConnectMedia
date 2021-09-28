import React from 'react'
import arrowUp from '../../assets/img/TableIcons/arrow(1).svg'
import secondarrowDown from '../../assets/img/TableIcons/arrow.svg'
import secondTrash from '../../assets/img/TableIcons/trash.svg'
import visit from '../../assets/img/TableIcons/visit.svg'
import edit from '../../assets/img/TableIcons/edit.svg'
import posts from '../../assets/img/TableIcons/posts.svg'
import stats from '../../assets/img/TableIcons/stats.svg'
import widgets from '../../assets/img/TableIcons/widgets.svg'
import history from '../../routes/History'

function ShortTableRowContainer({ data, pageName, handleCheckbox, handleTrashFunctionaliti, checkboxList, handleArrowSort, handleHashArrowClick, state }) {



    const handlePageRedirect = (item) => {
        if (pageName === 'widgets') {
            history.push({
                pathname: `/widgets/${item.id}`,
                state: item
            })
        } else {
            history.push({
                pathname: `/sites/${item.id}`,
                state: item
            })
        }
    }

    const haneldeRedirect = (value, tabClicked) => {
        if (tabClicked === 'edit') {
            history.push({
                pathname: `/sites/${value.id}`,
                data: { buttonClicked: 'editDiv' }
            })
        } else if (tabClicked === 'stats') {
            history.push({
                pathname: `/sites/${value.id}`,
                data: { buttonClicked: 'statsDiv' }
            })
        } else if (tabClicked === 'posts') {
            history.push({
                pathname: `/posts`,
                data: { searchBy: value.name }
            })
        } else if (tabClicked === 'widgets') {
            history.push({
                pathname: `/widgets`,
                data: { searchBy: value.name }
            })
        }
    }

    const dataToRender = state.filteredDate ? state.filteredDate : data


    return (
        <div className='shortScreenTableDiv'>
            {dataToRender.length !== 0 && dataToRender.map((item, key) => {
                console.log(item);
                return <div key={key} className='mainDivShotScreen'>
                    <div className='checkAndTrashDiv'>
                        <input type="checkbox" value={checkboxList} checked={checkboxList[item.id]} onChange={(e) => handleCheckbox(e, item)} />
                        <img src={secondTrash} alt="trash" onClick={() => handleTrashFunctionaliti(item.id)} />
                    </div>
                    <div className='statusDiv'>
                        <div>
                            <div className='arrowDiv'>
                                <img src={arrowUp} onClick={() => handleArrowSort('state', 'Up')} alt="arrow" />
                                <img src={secondarrowDown} onClick={() => handleArrowSort('state', 'Down')} alt="arrow" />
                            </div>
                            <p>STATUS</p>
                        </div>
                        <div className='coloredDivStatus' style={{ background: item.state === 1 ? '#ABD996' : item.state === 0 ? '#dfe094' : item.state === 2 ? '#e09494' : item.state === 3 ? '#295265' : '' }}>
                            {item.state === 1 ? 'PUBLISHED' : item.state === 0 ? 'DRAFT' : item.state === 2 ? 'ERROR' : item.state === 3 ? 'TRASH' : ''}
                        </div>
                    </div>
                    <div className='ownerDiv' onClick={() => handlePageRedirect(item)}>
                        <div>
                            <div className='arrowDiv'>
                                <img src={arrowUp} alt="arrow" onClick={() => handleArrowSort(pageName === 'widgets' ? 'name' : 'owner', 'Up')} />
                                <img src={secondarrowDown} onClick={() => handleArrowSort(pageName === 'widgets' ? 'name' : 'owner', 'Down')} alt="arrow" />
                            </div>
                            <p>{pageName === 'widgets' ? 'Name' : 'OWNER'}</p>

                        </div>
                        <div className='ownerClass'>
                            {item.owner.email}
                        </div>
                    </div>
                    <div className='nazivDiv'>
                        <div>
                            <div className='arrowDiv'>
                                <img src={arrowUp} onClick={() => handleArrowSort(pageName === 'widgets' ? 'site' : "name", "Up")} alt="arrow" />
                                <img src={secondarrowDown} onClick={() => handleArrowSort(pageName === 'widgets' ? 'site' : "name", "Down")} alt="arrow" />
                            </div>
                            <p>{pageName === 'widgets' ? 'Site' : "Name"}</p>

                        </div>
                        <div className='ownersNameClass'>
                            {item.name}
                        </div>
                    </div>
                    <div className='mainForIcons'>
                        <div className="divWithClicableIcons">
                            <img src={visit} alt="visit" />
                            <p onClick={() => {
                                if (item.url) {
                                    window.location.href = `${item.url}`
                                } else return null
                            }
                            }>visit</p>
                            <img src={edit} alt="edit" />
                            <p onClick={() => haneldeRedirect(item, 'edit')}>edit</p>
                            <img src={stats} alt="stats" />
                            <p onClick={() => haneldeRedirect(item, 'stats')}>stats</p>
                            {pageName !== 'widgets' && <img src={posts} alt="posts" />}
                            {pageName !== 'widgets' && <p onClick={() => haneldeRedirect(item, 'posts')}>posts</p>}
                            {pageName !== 'widgets' && <img src={widgets} alt="widgets" />}
                            {pageName !== 'widgets' && <p onClick={() => haneldeRedirect(item, 'widgets')}>widgets</p>}

                        </div>
                    </div>
                    <div className='mainDivHashes'>
                        <>
                            <div className="divWithHashes">
                                <p>Kuhinja ljubav moda</p>
                                <div className='box'>
                                    <p>+<span>2</span></p>
                                    <img src={secondarrowDown} alt="arrow" onClick={() => handleHashArrowClick(item)} />
                                </div>
                            </div>
                            {state.hashesArrowDown && item.id === state.hashesArrowWitchIsOn.id && <div className='offeredHashes'>
                                {state.hashesArrowWitchIsOn.hashes.map((item, i) => {
                                    return <div key={i} id='noredirection'>
                                        <p id='noredirection'>{item}</p>
                                    </div>
                                })}
                            </div>}
                        </>
                    </div>
                    <div className='mainDivInOutTxr'>
                        <div className='statistic'>
                            <div>
                                <div className='arrowDiv'>
                                    <img src={arrowUp} alt="arrow" onClick={() => handleArrowSort(pageName === 'widgets' ? "imp" : "in", 'Up')} />
                                    <img src={secondarrowDown} alt="arrow" onClick={() => handleArrowSort(pageName === 'widgets' ? "imp" : "in", "Down")} />
                                </div>
                                <p>{pageName === 'widgets' ? "imp" : "in"}</p>

                            </div>
                            <p>{item.in}</p>
                        </div>
                        <div className='statistic'>

                            <div>
                                <div className='arrowDiv'>
                                    <img src={arrowUp} onClick={() => handleArrowSort(pageName === 'widgets' ? "clk" : "out", "Up")} alt="arrow" />
                                    <img src={secondarrowDown} onClick={() => handleArrowSort(pageName === 'widgets' ? "clk" : "out", "Down")} alt="arrow" />
                                </div>
                                <p>{pageName === 'widgets' ? "clk" : "out"}</p>

                            </div>
                            <p>{item.out}</p>
                        </div>
                        <div className='statistic'>
                            <div>
                                <div className='arrowDiv'>
                                    <img src={arrowUp} onClick={() => handleArrowSort(pageName === 'widgets' ? "ctr" : "txr", 'Up')} alt="arrow" />
                                    <img src={secondarrowDown} onClick={() => handleArrowSort(pageName === 'widgets' ? "ctr" : "txr", 'Down')} alt="arrow" />
                                </div>
                                <p>{pageName === 'widgets' ? "ctr" : "txr"}</p>
                            </div>
                            <p>{item.txr}</p>
                        </div>
                    </div>
                </div>
            })}
        </div>
    )
}

export default ShortTableRowContainer
