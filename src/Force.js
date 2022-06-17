import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

function Force({ Nodes, Links }) {
    const refSvg = useRef(null);

    useEffect(() => {
        const svg = d3.select(refSvg.current);

        const simulation = d3.forceSimulation(Nodes)
            .force('charge', d3.forceManyBody().strength(-100))
            .force('center', d3.forceCenter(450, 450))
            .force('link', d3.forceLink().links(Links))
            .on('tick', ticked);

        const link = svg.append("g")
            .attr("stroke", 'black')
            .attr("stroke-opacity", 1)
            .attr("stroke-width", 1)
            // .attr("stroke-linecap", linkStrokeLinecap)
            .selectAll("line")
            .data(Links)
            .join("line");

        const node = svg.append("g")
            .attr("fill", 'blue')
            // .attr("stroke", nodeStroke)
            // .attr("stroke-opacity", nodeStrokeOpacity)
            // .attr("stroke-width", nodeStrokeWidth)
            .selectAll("circle")
            .data(Nodes)
            .join("circle")
            .attr("r", 10)
            .call(drag(simulation));

        function ticked() {
            link
                .attr("x1", d => d.source.x)
                .attr("y1", d => d.source.y)
                .attr("x2", d => d.target.x)
                .attr("y2", d => d.target.y);

            node
                .attr("cx", d => d.x)
                .attr("cy", d => d.y);
        }

        function drag(simulation) {
            function dragstarted(event) {
                if (!event.active) simulation.alphaTarget(0.3).restart();
                event.subject.fx = event.subject.x;
                event.subject.fy = event.subject.y;
            }

            function dragged(event) {
                event.subject.fx = event.x;
                event.subject.fy = event.y;
            }

            function dragended(event) {
                if (!event.active) simulation.alphaTarget(0);
                event.subject.fx = null;
                event.subject.fy = null;
            }

            return d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended);
        }
    })

    return <svg ref={refSvg} viewBox='0 0 900 900'>

    </svg>
}

export default Force;