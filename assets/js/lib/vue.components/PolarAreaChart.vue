<script>
import { PolarArea, Bar } from "vue-chartjs";

export default {
  extends: PolarArea,
  data: function() {
    return {};
  },
  mounted() {
    // Overwriting base render method with actual data.
    this.renderChart({
      datasets: [
        {
          data: [11, 16, 7, 3, 14],
          backgroundColor: [
            "#FF6384",
            "#4BC0C0",
            "#FFCE56",
            "#E7E9ED",
            "#36A2EB"
          ],
          label: "My dataset", // for legend
          type: "polarArea"
        }
      ],
      labels: ["Red", "Green", "Yellow", "Grey", "Blue"]
    });
  }
};
</script>

<style>
</style>
