import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useMemo } from "react";

export const ProductionChart = ({ production }) => {
  const seriesData = useMemo(() => {
    const sumsByDate = groupTimeSeries(production);

    const timeSeries = flattenGroupedTimeSeries(sumsByDate);

    return timeSeries;
  }, [production]);

  const chartOptions = useMemo(() => {
    if (!seriesData) return null;
    return {
      chart: {
        type: "spline",
      },
      title: {
        text: "Oil, gas, water and water injection production over time",
      },
      xAxis: {
        type: "datetime",
      },
      yAxis: {
        title: {
          text: "Volume (m3)",
        },
        min: 0,
      },
      tooltip: {
        headerFormat: "<b>{series.name}</b><br>",
        pointFormat: "{point.x:%b. %Y}: {point.y:.2f} m",
      },

      plotOptions: {
        series: {
          marker: {
            enabled: true,
            radius: 2.5,
          },
        },
      },

      colors: ["#036", "#D1D100", "#66ccff", "#0000D1"],

      series: [
        {
          name: "Oil",
          data: seriesData.oilSeries,
        },
        {
          name: "Gas",
          data: seriesData.gasSeries,
        },
        {
          name: "Water",
          data: seriesData.waterSeries,
        },
        {
          name: "Water Injection",
          data: seriesData.waterInjSeries,
        },
      ],
    };
  }, [seriesData]);
  return (
    <>
      {chartOptions && (
        <div>
          <HighchartsReact highcharts={Highcharts} options={chartOptions} />
        </div>
      )}
    </>
  );
};

function groupTimeSeries(production) {
  const sumsByDate = new Map();
  production.forEach((prod) => {
    const dateKey = `${prod.Year}-${prod.Month}-1`;
    if (!sumsByDate.has(dateKey)) {
      sumsByDate.set(dateKey, { oil: 0, gas: 0, water: 0, waterInj: 0 });
    }
    const sum = sumsByDate.get(dateKey);
    sum.oil += prod.Qo || 0;
    sum.gas += prod.Qg || 0;
    sum.water += prod.Qw || 0;
    sum.waterInj += prod.Qs || 0;
    sumsByDate.set(dateKey, sum);
  });

  return sumsByDate;
}

// From Map<time, {oil: number, gas: number, water: number, waterInj: number}> to Array<[time, oil, gas, water, waterInj]>
function flattenGroupedTimeSeries(groupTimeSeries) {
  let oilSeries = new Array(groupTimeSeries.size);
  let gasSeries = new Array(groupTimeSeries.size);
  let waterSeries = new Array(groupTimeSeries.size);
  let waterInjSeries = new Array(groupTimeSeries.size);

  let dateStrings = groupTimeSeries.keys();

  let i = 0;
  while (i < groupTimeSeries.size) {
    const dateStr = dateStrings.next().value;
    const sums = groupTimeSeries.get(dateStr);
    const date = Date.parse(dateStr);
    oilSeries[i] = [date, sums.oil];
    gasSeries[i] = [date, sums.gas];
    waterSeries[i] = [date, sums.water];
    waterInjSeries[i] = [date, sums.waterInj];
    i++;
  }

  const sortFn = (a, b) => {
    return a[0] - b[0];
  };

  oilSeries.sort(sortFn);
  gasSeries.sort(sortFn);
  waterSeries.sort(sortFn);
  waterInjSeries.sort(sortFn);
  return { oilSeries, gasSeries, waterSeries, waterInjSeries };
}
