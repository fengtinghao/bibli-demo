import Force from './Force';

function Vis({ Data, Years, Authors, Links }) {
    console.log(Data, Years, Authors, Links)

    return <div id='divVis'>
        {Links.length?<Force Nodes={Object.values(Data)} Links={Links} />:null}
    </div>
}

export default Vis