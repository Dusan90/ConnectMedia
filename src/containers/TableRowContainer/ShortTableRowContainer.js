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

function ShortTableRowContainer({ data, pageName, handleCheckbox, checkboxList, handleArrowSort, handleHashArrowClick, state }) {



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

    const haneldeRedirect = (value) => {
        console.log(value);
    }

    return (
        <div className='shortScreenTableDiv'>
            {data.length !== 0 && data.map((item, key) => {
                console.log(item);
                return <div key={key} className='mainDivShotScreen'>
                    <div className='checkAndTrashDiv'>
                        <input type="checkbox" value={checkboxList} checked={checkboxList[item.id]} onChange={(e) => handleCheckbox(e, item)} />
                        <img src={secondTrash} alt="trash" />
                    </div>
                    <div className='statusDiv'>
                        <div>
                            <div className='arrowDiv'>
                                <img src={arrowUp} onClick={() => handleArrowSort('statusUp')} alt="arrow" />
                                <img src={secondarrowDown} onClick={() => handleArrowSort('statusDown')} alt="arrow" />
                            </div>
                            <p>STATUS</p>
                        </div>
                        <div className='coloredDivStatus' style={{ background: item.status === 'PUBLISHED' && '#ABD996' }}>
                            {item.auto_publish}
                        </div>
                    </div>
                    <div className='ownerDiv' onClick={() => handlePageRedirect(item)}>
                        <div>
                            <div className='arrowDiv'>
                                <img src={arrowUp} alt="arrow" onClick={() => handleArrowSort(pageName === 'widgets' ? 'NameUp' : 'OWNERUP')} />
                                <img src={secondarrowDown} onClick={() => handleArrowSort(pageName === 'widgets' ? 'NameDown' : 'OWNERDown')} alt="arrow" />
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
                                <img src={arrowUp} onClick={() => handleArrowSort(pageName === 'widgets' ? 'SiteUp' : "NazivkorisnikaUp")} alt="arrow" />
                                <img src={secondarrowDown} onClick={() => handleArrowSort(pageName === 'widgets' ? 'SiteDown' : "NazivkorisnikaDown")} alt="arrow" />
                            </div>
                            <p>{pageName === 'widgets' ? 'Site' : "Naziv korisnika"}</p>

                        </div>
                        <div className='ownersNameClass'>
                            {item.name}
                        </div>
                    </div>
                    <div className='mainForIcons'>
                        <div className="divWithClicableIcons">
                            <img src={visit} alt="visit" />
                            <p onClick={() => haneldeRedirect(item)}>visit</p>
                            <img src={edit} alt="edit" />
                            <p onClick={() => haneldeRedirect(item)}>edit</p>
                            <img src={stats} alt="stats" />
                            <p onClick={() => haneldeRedirect(item)}>stats</p>
                            {pageName !== 'widgets' && <img src={posts} alt="posts" />}
                            {pageName !== 'widgets' && <p onClick={() => haneldeRedirect(item)}>posts</p>}
                            {pageName !== 'widgets' && <img src={widgets} alt="widgets" />}
                            {pageName !== 'widgets' && <p onClick={() => haneldeRedirect(item)}>widgets</p>}

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
                                    <img src={arrowUp} alt="arrow" onClick={() => handleArrowSort(pageName === 'widgets' ? "impUp" : "inUp")} />
                                    <img src={secondarrowDown} alt="arrow" onClick={() => handleArrowSort(pageName === 'widgets' ? "impDown" : "inDown")} />
                                </div>
                                <p>{pageName === 'widgets' ? "imp" : "in"}</p>

                            </div>
                            <p>{item.in}</p>
                        </div>
                        <div className='statistic'>

                            <div>
                                <div className='arrowDiv'>
                                    <img src={arrowUp} onClick={() => handleArrowSort(pageName === 'widgets' ? "clkUp" : "outUp")} alt="arrow" />
                                    <img src={secondarrowDown} onClick={() => handleArrowSort(pageName === 'widgets' ? "clkDown" : "outDown")} alt="arrow" />
                                </div>
                                <p>{pageName === 'widgets' ? "clk" : "out"}</p>

                            </div>
                            <p>{item.out}</p>
                        </div>
                        <div className='statistic'>
                            <div>
                                <div className='arrowDiv'>
                                    <img src={arrowUp} onClick={() => handleArrowSort(pageName === 'widgets' ? "ctrUp" : "txrUp")} alt="arrow" />
                                    <img src={secondarrowDown} onClick={() => handleArrowSort(pageName === 'widgets' ? "ctrDown" : "txrDown")} alt="arrow" />
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
