<template>
    <div>
        <h1 class="h2 pt-3 pb-2 mb-3 border-bottom">About</h1>
        <p>XES Visualizer is the result of the bachelor project of Ali Jawad El-Madani
            described in the document &ldquo;<em>Development of a Web-Based Application for Visualization of Process Data</em>&rdquo;.
            Abstract of the thesis:</p>
        
        <p class="font-italic pl-3">The analysis and visualization of event logs are dominated by tools that utilize process mining.
        Such tools have been traditionally used to analyze business processes, and therefore have
        become tailored to this type of analysis. This use case uniformity in the process mining field
        has produced highly specialized tools that present limitations when used outside the intended
        use case. These limitations manifest when trying to use such tools for rapid exploration to
        get a quick overview over one's data. One of the main limitations that hinders such use case
        is the lack of visualization variety. Most of the top mainstream tools rely on the node-link
        dependency diagram to visualize process data. This project aims to address this issue by
        developing a web-based tool that others alternative visualization options for event logs. The
        developed tool others two diagram types, the Sankey and the Chord diagram, and lays the
        groundwork for future work.</p>
        <p>The complete report is availabe at: <a href="https://findit.dtu.dk/en/catalog/2612279097" target="_blank">https://findit.dtu.dk/en/catalog/2612279097</a>.</p>

        <p>The source code of this web-application is available at:</p>
        <ul>
            <li>Backend: <a href="https://github.com/DTU-SPE/xes-visualizer-backend" target="_blank">https://github.com/DTU-SPE/xes-visualizer-backend</a></li>
            <li>Frontend: <a href="https://github.com/DTU-SPE/xes-visualizer-frontend" target="_blank">https://github.com/DTU-SPE/xes-visualizer-frontend</a></li>
        </ul>
        <p> The API are currently hosted at Heroku, and the frontend randomly connects to one of them. To use the API these hosts can currently be used:</p>
        <ul>
            <li v-bind:key="h.hostname"
            v-for="h in hosts">
                <code>{{ h.hostname }}</code> using <code>{{ h.protocol }}</code>
            </li>
        </ul>
        <p>The service is offered with no guarantees.</p>
    </div>
</template>

<script>
export default {
    name: "About",
    data() {
        return {
            hosts: []
        };
    },
    created() {
        this.hosts = require('../assets/backend-hosts.json');
    }
}
</script>
