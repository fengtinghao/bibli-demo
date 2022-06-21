// import Force from './Force';
import Panel from './Panel';

function Vis({ objData, objYears, objAuthors, objCategories, arrLinks }) {
    return <div id='divVis'>
        {/* {Links.length?<Force Nodes={Object.values(Data)} Links={Links} />:null} */}
        <Panel objData={objData} objYears={objYears} objAuthors={objAuthors} objCategories={objCategories} />
    </div>
}

export default Vis