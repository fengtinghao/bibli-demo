import Global from "../Global";

function Categories(props) {
    return <g>
        {Object.keys(props.Obj).sort((a,b)=>props.Obj[b].length-props.Obj[a].length).map((cat, i) => <g key={i.toString()}
            transform={`translate(${i * Global.size.width / 8},${Global.size.margin / 2})`} fill={Global.color(cat)}
            onMouseOver={e => { props.SelectPaper(props.Obj[cat]) }}
            onMouseOut={e => { props.SelectPaper([]) }}
            onClick={props.FixSelected} >
            <rect
                width={Global.size.width / 8}
                y={-Global.size.margin / 4}
                height={Global.size.margin / 2}
                fillOpacity='0.2' />
            <text
                className='clsHoverTaget'
                dx={Global.size.width / 16}
                alignmentBaseline='middle'
                textAnchor='middle'
                fontSize='2em'
                fontWeight='bold'>{cat}</text>
        </g>)}
    </g>
}

export default Categories;