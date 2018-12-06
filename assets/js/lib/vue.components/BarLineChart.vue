<script>
import { Line, Bar } from "vue-chartjs";

export default {
  extends: Bar,
  name: "tiazona",
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
      labels: ["January", "February", "March", "April"],
      options: {
        onClick: function(evt) {
          console.log("dfjkdlf");
          var activeElement = this.tooltipActive[0];
          if (typeof activeElement == "undefined") {
            return;
          }
          alert(activeElement._model.label);
        }
      }
    });
  }
};
</script>

<style>
</style>
