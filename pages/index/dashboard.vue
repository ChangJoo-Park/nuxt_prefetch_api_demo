<template>
  <div class="p-4 flex flex-col space-y-4">
    <div class="grid grid-cols-3 gap-4">
      <widget title="신규 사용자">
        <bar-chart
          v-if="barChartData"
          :data="barChartData"
          :options="chartOptions"
          :height="200"
        />
      </widget>
      <widget title="가입자 성별 변화">
        <line-chart
          v-if="lineChartData"
          :data="lineChartData"
          :options="chartOptions"
          :height="200"
        />
      </widget>
      <widget title="연령비">
        <doughnut-chart
          v-if="doughnutChartData"
          :data="doughnutChartData"
          :options="chartOptions"
          :height="200"
        />
      </widget>
    </div>
    <div class="grid grid-cols-2 gap-4">
      <widget title="Recent Orders">
        <div class="flex flex-row px-4 py-1 justify-between font-mono border-b">
          <div>ORDER ID</div>
          <div>USER</div>
          <div>DATE</div>
          <div>COMPANY</div>
          <div>AMOUNT</div>
          <div>STATUS</div>
        </div>
        <list-item v-for="item in recentOrders" :key="item.id">
          <div># {{ item.id }}</div>
          <div>
            {{ item.user }}
          </div>
          <div>
            {{ item.date }}
          </div>
          <div>
            {{ item.company }}
          </div>
          <div>$ {{ item.amount }}</div>
          <div>
            <span v-if="item.status === 'Paid'" class="text-green-400">{{
              item.status
            }}</span>
            <span
              v-else-if="item.status === 'Pending'"
              class="text-yellow-400"
              >{{ item.status }}</span
            >
          </div>
        </list-item>
      </widget>
      <widget title="Support Tickets">
        <div class="flex flex-row px-4 py-1 justify-between font-mono border-b">
          <div>TICKET ID</div>
          <div>USER</div>
          <div>PRIORITY</div>
          <div>STATUS</div>
          <div>CREATED DATE</div>
        </div>
        <list-item v-for="item in recentTickes" :key="item.id">
          <div># {{ item.id }}</div>
          <div>
            {{ item.user }}
          </div>
          <div>
            <span v-if="item.priority === 'Low'" class="text-gray-400">{{
              item.priority
            }}</span>
            <span v-else-if="item.priority === 'High'" class="text-red-400">{{
              item.priority
            }}</span>
            <span v-else>{{ item.priority }}</span>
          </div>
          <div class="text-green-400">
            <span v-if="item.status === 'Open'" class="text-green-400">{{
              item.status
            }}</span>
            <span v-else class="text-gray-400">{{ item.status }}</span>
          </div>
          <div>
            {{ item.date }}
          </div>
        </list-item>
      </widget>
    </div>
  </div>
</template>

<script>
import BarChart from "@/components/bar-chart";
import LineChart from "@/components/line-chart";
import DoughnutChart from "@/components/doughnut-chart";
import ListItem from "@/components/list-item";
import Widget from "@/components/widget-container";
import {
  ref,
  useFetch,
} from "~/node_modules/@nuxtjs/composition-api/lib/entrypoint";
import usePrefetchStore from "~/composable/prefetch-store";

const chartColors = {
  red: "rgb(255, 99, 132)",
  orange: "rgb(255, 159, 64)",
  yellow: "rgb(255, 205, 86)",
  green: "rgb(75, 192, 192)",
  blue: "rgb(54, 162, 235)",
  purple: "rgb(153, 102, 255)",
  grey: "rgb(201, 203, 207)",
  transparent: "rgba(255, 255, 255, 0)",
};

function randomScalingFactor(min = 0, max = 200) {
  const randomizer = () => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
  };
  return randomizer();
}

export default {
  components: {
    BarChart,
    LineChart,
    DoughnutChart,
    ListItem,
    Widget,
  },
  data() {
    return {
      chartOptions: {
        responsive: true,
        legend: {
          display: false,
        },
        title: {
          display: false,
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    };
  },
  setup() {
    const recentTickes = ref([]);
    const recentOrders = ref([]);
    const barChartData = ref(null);
    const lineChartData = ref(null);
    const doughnutChartData = ref(null);

    const { fetch } = useFetch(async () => {
      const { data } = await usePrefetchStore("dashboard", "/api/dashboard");
      recentTickes.value = data.tickets;
      recentOrders.value = data.orders;
      barChartData.value = data.userChartData;
      barChartData.value.datasets.forEach((dataset) => {
        dataset.backgroundColor = [
          chartColors.red,
          chartColors.orange,
          chartColors.yellow,
        ];
      });
      lineChartData.value = data.genderChartData;
      lineChartData.value.datasets.forEach((dataset) => {
        if (dataset.label == 'Man') {
          dataset.borderColor = chartColors.red
        } else {
          dataset.borderColor = chartColors.yellow
        }
      });

      doughnutChartData.value = data.ageChartData;
      doughnutChartData.value.datasets.forEach((dataset) => {
        dataset.backgroundColor = [
          chartColors.red,
          chartColors.orange,
          chartColors.yellow,
          chartColors.green,
          chartColors.blue,
        ];
      });

    });

    fetch();
    return {
      recentTickes,
      recentOrders,
      barChartData,
      lineChartData,
      doughnutChartData
    };
  },
};
</script>
