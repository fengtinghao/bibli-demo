import React, { useState, useEffect, useRef } from 'react';
import data from './data.json';

import Vis from './Vis';
import Input from './Input'

function App() {
    const [nodes, setData] = useState(data.data);
    const [authors, setAuthors] = useState(data.author);
    const [years, setYears] = useState(data.year);
    const [links,setLinks]=useState(data.links);
    const [categories,setCategories]=useState(data.category)

    return (
        <div id="divContainer">
            <Vis objData={nodes} objYears={years} objAuthors={authors} objCategories={categories} arrLinks={links} />
            <Input />
        </div>
    );
}

export default App;
