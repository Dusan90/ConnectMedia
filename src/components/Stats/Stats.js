import React, { Component } from 'react'
import Table from 'rc-table';
import './Stats.scss'


const categories = ['Site', 'B92', 'Auto', 'Biznis', 'Kuhinja', 'Ljubav', 'Moda', 'Novosti', 'Total']
const data = [
    { site: 'Jack', address: 'some where', auto: [<p><span>0</span> <span className="span2">2</span></p>], key: '1' },
    { site: 'Rose', auto: [<p><span>36</span> <span className="span2">23</span></p>], address: 'some where', key: '2' },
    { site: 'Total', auto: [<p><span>36</span> <span className="span2">25</span></p>], address: 'some where', key: '3' },
];



export class Stats extends Component {
    constructor(props) {
        super(props)
        this.state = {
            columns: []
        }
    }

    componentDidMount() {
        const test = categories.map((el, i) => {
            return { title: el, dataIndex: el.toLowerCase(), key: el.toLowerCase() }
        })

        this.setState({ columns: test })
    }

    // handleForLoop = (item, categori) => {
    //     let array = Object.keys(item)
    //     for (let index = 0; index < array.length; index++) {
    //         const element = array[index];
    //         // console.log(element, item);
    //         console.log(element, item.element);
    //         // console.log(item['element']);
    //     }
    // }



    render() {
        const { columns } = this.state
        return (
            <div className='mainStatsDiv'>
                <Table columns={columns} data={data}
                    rowClassName={(record, index) => {
                        return record.site === "Rose" ? "creamColor" : "";
                    }}
                />
                <div className='StatsMainShortTable'>
                    {data.map((item, key) => {
                        return <div key={key} className='mainDivShotScreenStats'>

                            <div className='mainDivInOutStats' style={{ background: item.site === 'Rose' && 'rgba(223, 224, 148, 0.75)' }}>
                                {categories.map((el, i) => {
                                    return <div key={i} className='statistic'>
                                        <div>
                                            <p>{el}</p>
                                        </div>
                                        {/* {this.handleForLoop(item, el)} */}
                                        <p className="valueP">{item[`${el}`]}</p>
                                    </div>
                                })}
                            </div>
                        </div>
                    })}
                </div>
            </div>
        )
    }
}

export default Stats
