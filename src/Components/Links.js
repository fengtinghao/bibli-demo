import Global from "../Global";

function Links(props){
    return <g transform={`translate(0,${Global.size.padding})`}>
        {props.LinksInfo.map((links,i)=><g key={i.toString()}>
            {links.Refs.map((line,j)=><line key={j.toString()}
            x1={line[0].x} y1={line[0].y}
            x2={line[1].x} y2={line[1].y}
            stroke='#fdcdac'
            strokeWidth='5' />)}
            {links.Reffed.map((line,j)=><line key={j.toString()}
            x1={line[0].x} y1={line[0].y}
            x2={line[1].x} y2={line[1].y}
            stroke='#b3e2cd'
            strokeWidth='5' />)}
            </g>)}
    </g>
}

export default Links;