import React, { useState } from 'react'
import arrowUp from '../../assets/img/TableIcons/arrow(1).svg'
import secondarrowDown from '../../assets/img/TableIcons/arrow.svg'
import secondTrash from '../../assets/img/TableIcons/trash.svg'
import visit from '../../assets/img/TableIcons/visit.svg'
import edit from '../../assets/img/TableIcons/edit.svg'
import posts from '../../assets/img/TableIcons/posts.svg'
import stats from '../../assets/img/TableIcons/stats.svg'
import widgets from '../../assets/img/TableIcons/widgets.svg'
import history from '../../routes/History'


function TableRowContainer({ data, pageName, handleCheckbox, checkboxList, handleArrowSort, handleHashArrowClick, state }) {

    const haneldeRedirect = (value) => {
        console.log(value);
    }

    const handlePageRedirect = (e, item) => {
        console.log(e.target);
        if (!e.target.id || e.target.id !== 'noredirection') {
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
    }

    return (
        <table>
            <thead>
                <tr>
                    <th></th>
                    <th></th>
                    <th>
                        <div>
                            <div>
                                <img src={arrowUp} onClick={() => handleArrowSort('statusUp')} alt="arrow" />
                                <img src={secondarrowDown} onClick={() => handleArrowSort('statusDown')} alt="arrow" />
                            </div>
                            <p>STATUS</p>
                        </div>
                    </th>
                    <th>
                        <div>
                            <div>
                                <img src={arrowUp} onClick={() => handleArrowSort(pageName === 'widgets' ? 'NameUp' : 'OWNERUP')} alt="arrow" />
                                <img src={secondarrowDown} onClick={() => handleArrowSort(pageName === 'widgets' ? 'NameDown' : 'OWNERDown')} alt="arrow" />
                            </div>
                            <p>{pageName === 'widgets' ? 'Name' : 'OWNER'}</p>
                        </div>
                    </th>
                    <th>
                        <div>
                            <div>
                                <img src={arrowUp} onClick={() => handleArrowSort(pageName === 'widgets' ? 'SiteUp' : "NazivkorisnikaUp")} alt="arrow" />
                                <img src={secondarrowDown} onClick={() => handleArrowSort(pageName === 'widgets' ? 'SiteDown' : "NazivkorisnikaDown")} alt="arrow" />
                            </div>
                            <p>{pageName === 'widgets' ? 'Site' : "Naziv korisnika"}</p>
                        </div>
                    </th>
                    <th></th>
                    <th></th>
                    <th>
                        <div>
                            <div>
                                <img src={arrowUp} onClick={() => handleArrowSort(pageName === 'widgets' ? "impUp" : "inUp")} alt="arrow" />
                                <img src={secondarrowDown} onClick={() => handleArrowSort(pageName === 'widgets' ? "impDown" : "inDown")} alt="arrow" />
                            </div>
                            <p>{pageName === 'widgets' ? "imp" : "in"}</p>
                        </div>
                    </th>
                    <th>
                        <div>
                            <div>
                                <img src={arrowUp} onClick={() => handleArrowSort(pageName === 'widgets' ? "clkUp" : "outUp")} alt="arrow" />
                                <img src={secondarrowDown} onClick={() => handleArrowSort(pageName === 'widgets' ? "clkDown" : "outDown")} alt="arrow" />
                            </div>
                            <p>{pageName === 'widgets' ? "clk" : "out"}</p>
                        </div>
                    </th>
                    <th>
                        <div>
                            <div>
                                <img src={arrowUp} onClick={() => handleArrowSort(pageName === 'widgets' ? "ctrUp" : "txrUp")} alt="arrow" />
                                <img src={secondarrowDown} onClick={() => handleArrowSort(pageName === 'widgets' ? "ctrDown" : "txrDown")} alt="arrow" />
                            </div>
                            <p>{pageName === 'widgets' ? "ctr" : "txr"}</p>
                        </div>
                    </th>
                </tr>
            </thead>

            <tbody>
                {data.length !== 0 && data.map((item, key) => {
                    return <tr key={key} onClick={(e) => handlePageRedirect(e, item)}>
                        <td><input type="checkbox" value={checkboxList} id='noredirection' checked={checkboxList[item.id]} onChange={(e) => handleCheckbox(e, item)} /></td>
                        <td><img src={secondTrash} alt="trash" id='noredirection' /></td>
                        <td> <div className='coloredDivStatus' style={{ background: item.status === 'PUBLISHED' && '#ABD996' }}>
                            {item.auto_publish}
                        </div>
                        </td>
                        <td><div className='ownerClass' id='noredirection' onClick={() => history.push(`/users/${item.owner.id}`)}>
                            {item.owner.email}
                        </div></td>
                        <td><div className='ownersNameClass'>
                            {item.name}
                        </div></td>
                        <td><div className="divWithClicableIcons">
                            <img src={visit} alt="visit" />
                            <p onClick={() => haneldeRedirect(item)} id='noredirection'>visit</p>
                            <img src={edit} alt="edit" />
                            <p onClick={() => haneldeRedirect(item)} id='noredirection'>edit</p>
                            <img src={stats} alt="stats" />
                            <p onClick={() => haneldeRedirect(item)} id='noredirection'>stats</p>
                            {pageName !== 'widgets' && <img src={posts} alt="posts" />}
                            {pageName !== 'widgets' && <p onClick={() => haneldeRedirect(item)} id='noredirection'>posts</p>}
                            {pageName !== 'widgets' && <img src={widgets} alt="widgets" />}
                            {pageName !== 'widgets' && <p onClick={() => haneldeRedirect(item)} id='noredirection'>widgets</p>}

                        </div></td>
                        <td>
                            <>
                                <div className="divWithHashes">
                                    <p>Kuhinja ljubav moda</p>
                                    <div className='box'>
                                        <p>+<span>2</span></p>
                                        <img src={secondarrowDown} onClick={() => handleHashArrowClick(item)} alt="arrow" id='noredirection' />
                                    </div>
                                </div>
                                {state.hashesArrowDown && item.id === state.hashesArrowWitchIsOn.id && <div className='offeredHashes' >
                                    {state.hashesArrowWitchIsOn.hashes.map((item, i) => {
                                        return <div key={i} id='noredirection'>
                                            <p id='noredirection'>{item}</p>
                                        </div>
                                    })}
                                </div>}
                            </>
                        </td>
                        <td>{item.in}</td>
                        <td>{item.out}</td>
                        <td>{item.txr}</td>
                    </tr>
                })}
            </tbody>
        </table >
    )
}

export default TableRowContainer
