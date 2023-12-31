import React from 'react'
import './graph.scss'
import { Rechart } from '../../components/Rechart'
import { Trending } from '../trendingproduct/Trending'

export const Graph = () => {
  return (
    <div className='Graph'>
        <div className="left">
            <div className="upper">Summary</div>
            <div className="lower">
                <div className="selection">
                    <div className="orders">
                        <span className="figure"><span>MWK</span>7,450K</span>
                        <span className="title">Products</span>
                    </div>
                    <div className="orders">
                        <span className="figure"><span>MWK</span>7,450K</span>
                        <span className="title">Sales</span>
                    </div>
                    <div className="orders active">
                        <span className="figure"><span>MWK</span>7,450K</span>
                        <span className="title">Revenue</span>
                    </div>
                    <div className="orders">
                        <span className="figure"><span>MWK</span>7,450K</span>
                        <span className="title">Cost</span>
                    </div>
                </div>
                <div className="graphyy">
                    <Rechart/>
                </div>
            </div>
        </div>
        <div className="right">
            <div className="upper">Top Selling Products</div>
            <div className="lower">
                <Trending/>
                <Trending/>
                <Trending/>
            </div>
        </div>
    </div>
  )
}
