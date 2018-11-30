import BarLineChart from "./lib/vue.components/BarLineChart.vue";
import DoubleBarChart from "./lib/vue.components/DoubleBarChart.vue";
import PolarAreaChart from "./lib/vue.components/PolarAreaChart.vue";

var dashboardData = {

};

var dashboardApp = new Vue({
    el: '#dashboardParent',
    data: dashboardData,
    methods: {

    },
    computed: {

    },
    created: function () {

    },
    components: {
        BarLineChart,
        DoubleBarChart,
        PolarAreaChart
    }
});
