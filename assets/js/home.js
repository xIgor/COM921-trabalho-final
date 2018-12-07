import regeneratorRuntime from "regenerator-runtime"; // async await
import { regionChartConfig, stateChartData } from "./chartData";

var dashboardData = {
    regionChartCxt: null,
    regionChart: null,
    stateChartCxt: null,
    stateChart: null,
    companyChartCxt: null,
    companyChart: null,
    companyMeanRatingCxt: null,
    companyMeanRating: null,
    showStateChart: false,
    showCompanyChart: false,
    showRatingChart: false,
    selectedRegion: '',
};

var dashboardApp = new Vue({
    el: "#dashboardParent",
    data: dashboardData,
    methods: {
        getChartContext() {
            new Promise(resolve => {
                this.regionChartCxt = document.getElementById("regionChart");
                this.regionChart = new Chart(
                    this.regionChartCxt,
                    regionChartConfig
                );

                this.stateChartCxt = document.getElementById("stateChart");
                this.stateChart = new Chart(this.stateChartCxt, stateChartData);

                resolve(1);
            });
        }
    },
    computed: {},
    mounted: async function() {
        try {
            await this.getChartContext();

            let result = (await API.get(`/region/complaint-rate`)).data.regions;
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
                    this.showStateChart = true;
                    this.selectedRegion = label;

                    let result = (await API.post(`/state/complaint-rate`, {
                        region: label
                    })).data.states;

                    self.scrollBy({ top: 500, behavior: "smooth" });

                    this.stateChart.data.datasets[0].data = Object.values(
                        result
                    );
                    this.stateChart.data.labels = Object.keys(result);
                    this.stateChart.update();
                } catch (error) {
                    console.warn(error);
                }
            };
        } catch (error) {
            console.warn(error);
        }
    }
});
