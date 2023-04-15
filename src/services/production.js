import Papa from "papaparse";
import production from "../data/production.csv";

export const getProduction = (onComplete) => {
  Papa.parse(production, {
    download: true,
    header: true,
    complete: (results) => {
      let data = results.data;
      for (let i = 0; i < data.length; i++) {
        data[i].Year = parseInt(data[i].Year);
        data[i].Month = parseInt(data[i].Month);
        data[i].Qo = parseFloat(data[i].Qo || 0);
        data[i].Qw = parseFloat(data[i].Qw || 0);
        data[i].Qg = parseFloat(data[i].Qg || 0);
        data[i].Qs = parseFloat(data[i].Qs || 0);
        data[i].FlowDays = parseFloat(data[i].FlowDays || 0);
      }

      onComplete(data);
    },
  });
};
