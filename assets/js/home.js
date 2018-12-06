import regeneratorRuntime from "regenerator-runtime"; // async await
import { regionChartConfig } from "./chartData";

var dashboardData = {
    regionChartCxt: null,
    regionChart: null
};

var dashboardApp = new Vue({
    el: "#dashboardParent",
    data: dashboardData,
    methods: {},
    computed: {},
    mounted: function() {
        (async function getRegionComplaintRate() {
            try {
                this.regionChartCxt = document.getElementById("regionChart");
                this.regionChart = new Chart(
                    this.regionChartCxt,
                    regionChartConfig
                );

                let result = (await API.get(`/region/complaint-rate`)).data
                    .regions;
                this.regionChart.data.datasets[0].data = Object.values(result);
                this.regionChart.data.labels = Object.keys(result);
                this.regionChart.update();

                this.regionChartCxt.onclick = async evt => {
                    var activePoints = this.regionChart.getElementsAtEventForMode(
                        evt,
                        "point",
                        this.regionChart.options
                    );

                    var firstPoint = activePoints[0];
                    var label = this.regionChart.data.labels[firstPoint._index];
                    try {
                        let result = (await API.get(``)).data;
                    } catch (error) {
                        console.warn(error);
                    }
                };
            } catch (error) {
                console.warn(error);
            }
        })();
    }
});
