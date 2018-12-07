import regeneratorRuntime from "regenerator-runtime"; // async await
import {
    regionChartConfig,
    stateChartData,
    companyConfig,
    ratingConfig
} from "./chartData";

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
    selectedRegion: "",
    selectedState: "",
    selectedCompany: "",
    regionName: {
        SE: "Sudeste",
        N: "Norte",
        S: "Sul",
        CO: "Centro Oeste",
        NE: "Nordeste"
    }
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

                this.companyChartCxt = document.getElementById("companyChart");
                this.companyChart = new Chart(
                    this.companyChartCxt,
                    companyConfig
                );

                this.companyMeanRatingCxt = document.getElementById(
                    "ratingChart"
                );
                this.companyMeanRating = new Chart(
                    this.companyMeanRatingCxt,
                    ratingConfig
                );

                resolve(true);
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
                    this.selectedRegion = this.regionName[label];

                    let result = (await API.post(`/state/complaint-rate`, {
                        region: label
                    })).data.states;

                    self.scrollBy({ top: 500, behavior: "smooth" });

                    this.stateChart.data.datasets[0].data = Object.values(
                        result
                    );
                    this.stateChart.data.labels = Object.keys(result);
                    this.stateChart.update();

                    this.stateChartCxt.onclick = async evt => {
                        var activePoints = this.stateChart.getElementsAtEventForMode(
                            evt,
                            "point",
                            this.stateChart.options
                        );

                        var firstPoint = activePoints[0];
                        var label = this.stateChart.data.labels[
                            firstPoint._index
                        ];
                        try {
                            this.showCompanyChart = true;
                            this.selectedState = label;

                            let result = (await API.post(
                                `/state/complaint-company`,
                                {
                                    state: label
                                }
                            )).data.companies;

                            self.scrollBy({ top: 500, behavior: "smooth" });

                            this.companyChart.data.datasets[0].data = Object.values(
                                result
                            );
                            this.companyChart.data.labels = Object.keys(result);
                            this.companyChart.update();

                            
                            this.companyChartCxt.onclick = async evt => {
                                var activePoints = this.companyChart.getElementsAtEventForMode(
                                    evt,
                                    "point",
                                    this.companyChart.options
                                );
        
                                var firstPoint = activePoints[0];
                                var label = this.companyChart.data.labels[
                                    firstPoint._index
                                ];
                                try {
                                    this.showRatingChart = true;
                                    this.selectedCompany = label;
        
                                    let result = (await API.post(
                                        `/company/semester-evaluation`,
                                        {
                                            company: label
                                        }
                                    )).data.evaluation;
        
                                    self.scrollBy({ top: 500, behavior: "smooth" });
        
                                    this.companyMeanRating.data.datasets[0].data = Object.values(
                                        result
                                    );
                                    this.companyMeanRating.data.labels = Object.keys(result);
                                    this.companyMeanRating.update();
                                } catch(error){
                                    console.log(error);
                                }
                            }


                        } catch (error) {
                            console.warn(error);
                        }
                    };
                } catch (error) {
                    console.warn(error);
                }
            };
        } catch (error) {
            console.warn(error);
        };
    }
});
