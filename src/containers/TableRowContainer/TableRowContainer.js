import React, { useState } from 'react'
import arrowUp from '../../assets/img/TableIcons/arrow(1).svg'
import { useHistory } from 'react-router'
import secondarrowDown from '../../assets/img/TableIcons/arrow.svg'
import secondTrash from '../../assets/img/TableIcons/trash.svg'
import visit from '../../assets/img/TableIcons/visit.svg'
import edit from '../../assets/img/TableIcons/edit.svg'
import posts from '../../assets/img/TableIcons/posts.svg'
import stats from '../../assets/img/TableIcons/stats.svg'
import widgets from '../../assets/img/TableIcons/widgets.svg'
import history from '../../routes/History'


function TableRowContainer({ data, pageName, handleCheckbox, handleTrashFunctionaliti, checkboxList, handleArrowSort, handleHashArrowClick, state }) {

    const history = useHistory()
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

    const dataToRender = state.filteredDate ? state.filteredDate : data

    return (
        <table>
            <thead>
                <tr>
                    <th></th>
                    <th></th>
                    <th>
                        <div>
                            <div>
                                <img src={arrowUp} onClick={() => handleArrowSort('state', 'Up')} alt="arrow" />
                                <img src={secondarrowDown} onClick={() => handleArrowSort('state', 'Down')} alt="arrow" />
                            </div>
                            <p>STATUS</p>
                        </div>
                    </th>
                    <th>
                        <div>
                            <div>
                                <img src={arrowUp} onClick={() => handleArrowSort(pageName === 'widgets' ? 'name' : 'owner', 'Up')} alt="arrow" />
                                <img src={secondarrowDown} onClick={() => handleArrowSort(pageName === 'widgets' ? 'name' : 'owner', 'Down')} alt="arrow" />
                            </div>
                            <p>{pageName === 'widgets' ? 'Name' : 'OWNER'}</p>
                        </div>
                    </th>
                    <th>
                        <div>
                            <div>
                                <img src={arrowUp} onClick={() => handleArrowSort(pageName === 'widgets' ? 'site' : "name", 'Up')} alt="arrow" />
                                <img src={secondarrowDown} onClick={() => handleArrowSort(pageName === 'widgets' ? 'site' : "name", 'Down')} alt="arrow" />
                            </div>
                            <p>{pageName === 'widgets' ? 'Site' : "Name"}</p>
                        </div>
                    </th>
                    <th></th>
                    <th></th>
                    <th>
                        <div>
                            <div>
                                <img src={arrowUp} onClick={() => handleArrowSort(pageName === 'widgets' ? "imp" : "in", 'Up')} alt="arrow" />
                                <img src={secondarrowDown} onClick={() => handleArrowSort(pageName === 'widgets' ? "imp" : "in", 'Down')} alt="arrow" />
                            </div>
                            <p>{pageName === 'widgets' ? "imp" : "in"}</p>
                        </div>
                    </th>
                    <th>
                        <div>
                            <div>
                                <img src={arrowUp} onClick={() => handleArrowSort(pageName === 'widgets' ? "clk" : "out", 'Up')} alt="arrow" />
                                <img src={secondarrowDown} onClick={() => handleArrowSort(pageName === 'widgets' ? "clk" : "out", 'Down')} alt="arrow" />
                            </div>
                            <p>{pageName === 'widgets' ? "clk" : "out"}</p>
                        </div>
                    </th>
                    <th>
                        <div>
                            <div>
                                <img src={arrowUp} onClick={() => handleArrowSort(pageName === 'widgets' ? "ctr" : "txr", 'Up')} alt="arrow" />
                                <img src={secondarrowDown} onClick={() => handleArrowSort(pageName === 'widgets' ? "ctr" : "txr", 'Down')} alt="arrow" />
                            </div>
                            <p>{pageName === 'widgets' ? "ctr" : "txr"}</p>
                        </div>
                    </th>
                </tr>
            </thead>

            <tbody>
                {dataToRender.length !== 0 && dataToRender.map((item, key) => {
                    return <tr key={key} onClick={(e) => handlePageRedirect(e, item)}>
                        <td><input type="checkbox" value={checkboxList} id='noredirection' checked={checkboxList[item.id]} onChange={(e) => handleCheckbox(e, item)} /></td>
                        <td><img src={secondTrash} onClick={() => handleTrashFunctionaliti(item.id)} alt="trash" id='noredirection' /></td>
                        <td>
                            {pageName !== 'widgets' && <div className='coloredDivStatus' style={{ background: item.state === 1 ? '#ABD996' : item.state === 0 ? '#dfe094' : item.state === 2 ? '#e09494' : item.state === 3 ? '#295265' : '' }}>
                                {item.state === 1 ? 'PUBLISHED' : item.state === 0 ? 'DRAFT' : item.state === 2 ? 'ERROR' : item.state === 3 ? 'TRASH' : ''}
                            </div>}
                            {pageName === 'widgets' && <div className='coloredDivStatus' style={{ background: item.status === 1 ? '#ABD996' : item.status === 0 ? '#dfe094' : item.status === 2 ? '#e09494' : item.status === 3 ? '#295265' : '' }}>
                                {item.status === 1 ? 'PUBLISHED' : item.status === 0 ? 'DRAFT' : item.status === 2 ? 'ERROR' : item.status === 3 ? 'TRASH' : ''}
                            </div>}
                        </td>
                        <td>
                            {pageName !== 'widgets' && <div className='ownerClass' id='noredirection' onClick={() => history.push(`/users/${item.owner.id}`)}>
                                {item.owner.email}
                            </div>}
                            {pageName === 'widgets' && <div className='ownerClass' id='noredirection' onClick={() => history.push(`/sites/${item.site?.id}`)}>
                                {item.site?.name}
                            </div>}
                        </td>
                        <td><div className='ownersNameClass'>
                            {item.name}
                        </div></td>
                        <td><div className="divWithClicableIcons">
                            <img src={visit} alt="visit" />
                            <p onClick={() => {
                                if (item.url) {
                                    window.location.href = `${item.url}`
                                } else return null
                            }
                            } id='noredirection'>visit</p>
                            <img src={edit} alt="edit" />
                            <p onClick={() => haneldeRedirect(item, 'edit')} id='noredirection'>edit</p>
                            <img src={stats} alt="stats" />
                            <p onClick={() => haneldeRedirect(item, 'stats')} id='noredirection'>stats</p>
                            {pageName !== 'widgets' && <img src={posts} alt="posts" />}
                            {pageName !== 'widgets' && <p onClick={() => haneldeRedirect(item, 'posts')} id='noredirection'>posts</p>}
                            {pageName !== 'widgets' && <img src={widgets} alt="widgets" />}
                            {pageName !== 'widgets' && <p onClick={() => haneldeRedirect(item, 'widgets')} id='noredirection'>widgets</p>}

                        </div></td>
                        <td>
                            <>
                                <div className="divWithHashes">
                                    <p>{item?.categories?.map(el => el.name)}</p>
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
