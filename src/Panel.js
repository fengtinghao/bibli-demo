import React, { useState} from 'react';

import Global from "./Global";

import Categories from "./Components/Categories";
import Authors from "./Components/Authors";
import Papers from "./Components/Papers";

function Panel({ objData, objYears, objAuthors, objCategories }){
    const [arrSelect,setSelect]=useState([]);
    const [arrFixed,setFixed]=useState([]);
    const [ifFixed,setIfFixed]=useState(false);

    const SelectPaper=arr=>{
        if(!ifFixed){
            setSelect(arr);
        }else{
            setSelect(arr.length>0?arr:arrFixed);
        }
        
    }

    const SameArray=(arr1,arr2)=>{
        if(arr1.length!==arr2.length) return false;
        for(let i=0;i<arr1.length;i++){
            if(arr1[i]!==arr2[i]) return false;
        }
        return true;
    }

    const FixSelected=e=>{
        if(ifFixed){
            const blnTemp=SameArray(arrFixed,arrSelect);
            setIfFixed(!blnTemp);
            setFixed(blnTemp?[]:arrSelect);
        }else{
            setIfFixed(true);
            setFixed(arrSelect);
        }
        // setIfFixed(!ifFixed || !SameArray(arrFixed,arrSelect));
    }

    // useEffect(()=>{
    //     console.log(ifFixed)
    //     setFixed(ifFixed?arrSelect:[]);
    // },[ifFixed])

    return <svg viewBox={`0 0 ${Global.size.width} ${Global.size.width}`}>
        <Categories Obj={objCategories} SelectPaper={SelectPaper} FixSelected={FixSelected} />
        <Authors intPosition={Global.size.margin} Obj={objAuthors} SelectPaper={SelectPaper} FixSelected={FixSelected} />
        <Papers intPosition={Global.size.margin*2} List={objYears} objData={objData} arrSelect={arrSelect} SelectPaper={SelectPaper} FixSelected={FixSelected} />
    </svg>
}

export default Panel;