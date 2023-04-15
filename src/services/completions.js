import Papa from "papaparse";
import completions from "../data/completions.csv";

export const getCompletions = (onComplete) => {
  return Papa.parse(completions, {
    download: true,
    header: true,
    complete: (results) => {
      let data = results.data;
      for (let i = 0; i < data.length; i++) {
        data[i].X = data[i].X ? parseFloat(data[i].X) : undefined;
        data[i].Y = data[i].Y ? parseFloat(data[i].Y) : undefined;
        data[i].TD = data[i].TD ? parseFloat(data[i].TD) : undefined;
        data[i].long = data[i].long ? parseFloat(data[i].long) : undefined;
        data[i].lat = data[i].lat ? parseFloat(data[i].lat) : undefined;
      }
      onComplete(data);
    },
  });
};
