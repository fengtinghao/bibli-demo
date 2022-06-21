import React, { useEffect } from 'react';

import Global from "../Global";
import * as d3 from 'd3';

// useEffect(()=>{
//     d3.selectAll('.cclPapers')
//         .on('mouseover',function(){
//             console.log('haha')
//         })
// },[])

function Timepoint(props) {
    return <g transform={`translate(${props.intPosition},${Global.size.padding})`}>
        <text dy={Global.size.height - Global.size.margin / 2}
            textAnchor='middle'
            fontSize='1.5em'
            onMouseOver={e => { props.SelectPaper(props.Info.map(p => p.ID)) }}
            onMouseOut={e => { props.SelectPaper([]) }}
        >{props.Year + "'"}</text>
        {props.Info.map((paper, i) => <circle key={i.toString()}
            className={Object.keys(props.className).length>0?props.className.l1.includes(paper.ID)?'clsHoverTaget clsSelected1':props.className.l2.includes(paper.ID)?'clsHoverTaget clsSelected2':'clsHoverTaget clsUnSelected':'clsHoverTaget clsNoSelected'}
            cy={props.yScale(i)}
            r={props.rScale(paper.Reffed.length)}
            fill={Global.color(paper.Cat)}
            onMouseEnter={e => { props.SelectPaper([paper.ID]) }}
            onMouseOut={e => { props.SelectPaper([]) }}
            onClick={props.FixSelected}
        />)}
    </g>
}

export default Timepoint;