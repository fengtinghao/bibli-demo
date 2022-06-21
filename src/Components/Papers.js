import React, { useEffect} from 'react';
import * as d3 from 'd3';

import Global from "../Global";
import Timepoint from "./Timepoint";
import Links from './Links';

function Papers(props) {
    const subSet={}
    for(const year in props.List){
        subSet[year]=props.List[year].sort((a,b)=>props.objData[b].Reffed.length-props.objData[a].Reffed.length).sort((a,b)=>props.objData[a].Cat.localeCompare(props.objData[b].Cat));
    }
    Object.values(props.List).map(arr=>arr.map(p=>props.objData[p]).sort((a,b)=>b.Reffed.length-a.Reffed.length).sort((a,b)=>a.Cat.localeCompare(b.Cat)))
    const maxCount=d3.max(Object.values(props.List),arr=>arr.length);
    const maxReffed=d3.max(Object.values(props.List),arr=>d3.max(arr,p=>props.objData[p].Reffed.length));
    const maxRadius=(Global.size.height-Global.size.margin*2)/maxCount/2;
    const xScale = d3.scalePoint().range([Global.size.margin, Global.size.width - Global.size.margin]).domain(Object.keys(props.List));
    const yScale = d3.scalePoint().range([maxRadius+Global.size.padding, Global.size.height - Global.size.margin -maxRadius - Global.size.padding]).domain(d3.range(maxCount));
    const rScale = d3.scaleLinear().range([Global.size.padding, maxRadius]).domain([0, maxReffed]);

    const objShowCircle={l1:props.arrSelect,l2:[...new Set(props.arrSelect.map(ID=>[props.objData[ID].Refs,props.objData[ID].Reffed].flat()).flat())].filter(id=>!props.arrSelect.includes(id))}

    // const SelectPaper=arr=>{
    //     props.SelectPaper(arr)
    // }

    const GetPoint=ID=>({x:xScale(props.objData[ID].Year),y:yScale(subSet[props.objData[ID].Year].indexOf(ID))});

    const GenerateLinks=ID=>{
        const point=GetPoint(ID);
        const obj={Refs:[],Reffed:[]};
        props.objData[ID].Refs.forEach(p=>{obj.Refs.push([point,GetPoint(+p)])});
        props.objData[ID].Reffed.forEach(p=>{obj.Reffed.push([point,GetPoint(p)])});

        return obj;
    }

    // const rs=[];
    // useEffect(()=>{
    //     props.arrSelect.forEach(ID=>{
    //         rs.push(GenerateLinks(ID))
    //     })
    // },[props.arrSelect])

    return <g transform={`translate(0,${props.intPosition})`}>
        <line
            x1={Global.size.padding}
            x2={Global.size.width - Global.size.padding}
            y1={Global.size.height - Global.size.margin}
            y2={Global.size.height - Global.size.margin}
            stroke='gray'
        />
        {props.arrSelect.length?<Links LinksInfo={props.arrSelect.map(ID=>GenerateLinks(ID))} />:null}
        {Object.keys(props.List).map((year, i) => <Timepoint key={i.toString()}
            className={props.arrSelect.length>0?objShowCircle:{}}
            intPosition={xScale(year)}
            Year={year}
            // Info={props.List[year].map(p=>props.objData[p]).sort((a,b)=>b.Reffed.length-a.Reffed.length).sort((a,b)=>a.Cat.localeCompare(b.Cat))}
            Info={subSet[year].map(p=>props.objData[p])}
            rScale={rScale}
            yScale={yScale}
            SelectPaper={props.SelectPaper}
            FixSelected={props.FixSelected}
        />)}
    </g>
}

export default Papers;