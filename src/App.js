import React, { useState, useEffect, useRef } from 'react';
import rawdata from './Refs.json';

import Vis from './Vis';
import Input from './Input'

function App() {
    const [data, setData] = useState({});
    const [authors, setAuthors] = useState({});
    const [years, setYears] = useState({});
    const [links,setLinks]=useState([]);

    useEffect(() => {
        console.log(rawdata);
        const dd={},yy={},aa={},ll=[];
        rawdata.forEach((d,i) => {
            const y=d.Years.toString().slice(0,-1)+'0';
            // if (!(d.Years in yy)) yy[d.Years] = [];
            // yy[d.Years].push(d.ID);
            if (!(y in yy)) yy[y] = [];
            yy[y].push(d.ID);

            d.Authors = d.Authors.split(' ').map(x => x.trim()).filter(x => x);
            d.Authors.forEach(a => {
                if (!(a in aa)) aa[a] = [];
                aa[a].push(d.ID);
            })

            d.Refs = d.Refs ? d.Refs.split(' ').map(x => x.trim()).filter(x => x) : [];
            d.Reffed = [];
            d.Refs.forEach(r => {
                dd[r].Reffed.push(d.ID);
                ll.push({source:i,target:dd[r].id});
            })
            
            d.id=i;
            dd[d.ID] = d;
        })
        setData(dd);
        setAuthors(aa);
        setYears(yy);
        setLinks(ll);
    },[])


    return (
        <div id="divContainer">
            <Vis Data={data} Years={years} Authors={authors} Links={links} />
            <Input />
        </div>
    );
}

export default App;
