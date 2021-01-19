<template>
    <div>
        <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 class="h2">Log <code>{{ log.name }}</code></h1>
        </div>

        <b-row fluid>
            <b-col md="3" class="mb-3">
                <b-card>
                    <template #header>
                        <h6 class="mb-0">View configuration</h6>
                    </template>

                    <b-form-group label="Aggregation attribute:" label-for="selectedAttr">
                        <b-form-select id="selectedAttr"
                            :options="log.attributes"
                            v-model="selectedAttr"></b-form-select>
                    </b-form-group>
                    <b-form-group label="Operation aggregation:" label-for="selectedOp">
                        <b-form-select id="selectedOp" v-model="selectedOp">
                            <b-form-select-option :value="'COUNT'">Count</b-form-select-option>
                            <b-form-select-option :value="'SUM'">Sum</b-form-select-option>
                            <b-form-select-option :value="'DIFF'">Difference</b-form-select-option>
                        </b-form-select>
                    </b-form-group>
                    <b-form-group label="Aggregation function:" label-for="selectedAgg">
                        <b-form-select id="selectedAgg" v-model="selectedAgg">
                            <b-form-select-option :value="'SUM'">Sum</b-form-select-option>
                            <b-form-select-option :value="'MAX'">Max</b-form-select-option>
                            <b-form-select-option :value="'MIN'">Min</b-form-select-option>
                            <b-form-select-option :value="'AVG'">Average</b-form-select-option>
                        </b-form-select>
                    </b-form-group>
                    <b-form-group :label="'Variants to consider (' + percentTraces + '% of log):'" label-for="sliderPosition">
                        <b-form-spinbutton
                            id="sliderPosition"
                            :min="minTraces"
                            :max="maxTraces"
                            v-model="sliderPosition"
                            />
                    </b-form-group>

                    <b-form-checkbox
                        v-model="noEnd"
                        switch
                        class="mb-3">
                        Exclude traces with 1 event
                    </b-form-checkbox>

                    <b-button @click="update">Update</b-button>
                </b-card>
            </b-col>
            <b-col md="9">
                <b-tabs
                    v-show="this.configured"
                    content-class="mt-3">
                    <b-tab title="Sankey diagram">
                        <SankeyDiagram :rawData="sankeyData" />
                    </b-tab>
                    <b-tab title="Chord diagram">
                        <ChordDiagram :rawData="chordData" />
                    </b-tab>
                </b-tabs>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import axios from "axios";
import SankeyDiagram from './widgets/SankeyDiagram.vue';
import ChordDiagram from './widgets/ChordDiagram.vue';

export default {
    name: "LogViewer",
    props: ["logs"],
    components: {
        SankeyDiagram, ChordDiagram
    },
    data() {
        return {
            log: {
                name: "",
                percentages: []
            },
            selectedAttr: null,
            selectedOp: 'COUNT',
            selectedAgg: 'SUM',
            noEnd: true,
            sliderPosition: 1,
            
            configured: false,

            sankeyData: "",
            chordData: ""
        }
    },
    computed: {
        minTraces: function () {
            return 1;
        },
        maxTraces: function () {
            return this.log.percentages.length;
        },
        selectedPercentage: function () {
            return this.log.percentages[this.sliderPosition - 1];
        },
        percentTraces: function () {
            return this.log.percentages[this.sliderPosition - 1] * 100;
        },
    },
    created() {
       this.fetchData()
    },
    watch: {
        '$route': 'fetchData'
    },
    methods: {
        fetchData() {
            if ('id' in this.$route.params) {
                if (this.$route.params.id in this.logs) {
                    this.log = this.logs[this.$route.params.id];
                    this.selectedAttr = this.log.attributes[0];
                } else {
                    this.$router.push("/");
                }
            }
        },
        update() {
            const payload = new FormData();
            payload.append("fileName", this.selectedPercentage + "_" + this.log.name);
            payload.append("attributeKey", this.selectedAttr);
            payload.append("operation", this.selectedOp);
            payload.append("aggregationFunc", this.selectedAgg);
            payload.append("noEnd", this.noEnd);

            axios.post(this.$visualizerBackend.getUrlSankey(), payload)
                .then((res) => {
                    this.sankeyData = res.data;
                });

            axios
                .post(this.$visualizerBackend.getUrlChord(), payload)
                .then((res) => {
                    this.chordData = res.data;
                });

            this.configured = true;
        } 
    }
}
</script>

<style>

</style>