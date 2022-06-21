import Global from "../Global";
import * as d3 from 'd3';

function Authors(props) {
    const scale = d3.scaleLinear().domain(d3.extent(Object.keys(props.Obj), x => props.Obj[x].length)).range([1, 2])
    return <g transform={`translate(0,${props.intPosition})`}>
        <rect width={Global.size.width} height={props.intPosition} fill='lightgray' fillOpacity='0.5' />
        {Object.keys(props.Obj).sort((a, b) => props.Obj[b].length - props.Obj[a].length).map((author, i, arr) => <text key={i.toString()}
            className='clsHoverTaget'
            transform={`translate(${i * Global.size.width / arr.length},${props.intPosition / 2})`}
            dx={Global.size.padding}
            alignmentBaseline='middle'
            fontSize={scale(props.Obj[author].length) + 'em'}
            fontWeight='bold'
            onMouseOver={e => { props.SelectPaper(props.Obj[author]) }}
            onMouseOut={e => { props.SelectPaper([]) }}
            onClick={props.FixSelected} >{author}</text>)}
    </g>
}

export default Authors;