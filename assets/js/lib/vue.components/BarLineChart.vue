<script>
import { Line, Bar } from "vue-chartjs";

export default {
  extends: Bar,
  data: function() {
    return {};
  },
  mounted() {
    // Overwriting base render method with actual data.
    this.renderChart({
      datasets: [
        {
          label: "Line Dataset",
          data: [10, 20, 30, 40],
          backgroundColor: "rgb(255, 255, 255, 0)",
          borderColor: "rgb(0, 65, 255)",

          // Changes this dataset to become a line
          type: "line"
        },
        {
          label: "Bar Dataset",
          data: [10, 20, 30, 40],
          backgroundColor: "rgb(255, 99, 132)"
        }
      ],
      labels: ["January", "February", "March", "April"]
    });
  }
};
</script>

<style>
</style>
