import { Table } from "react-bootstrap";

export const ProductionGrid = ({ production }) => {
  return (
    <Table response bordered hover>
      <thead>
        <tr>
          <th>Year</th>
          <th>Month</th>
          <th>Well API</th>
          <th>Bore Id</th>
          <th>Comp Sub Id</th>
          <th>BHP</th>
          <th>Oil</th>
          <th>Water</th>
          <th>Gas</th>
          <th>Water Inj</th>
          <th>Gross</th>
          <th>Compl</th>
          <th>Flow Days</th>
          <th>Pressure</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {production.map((prod, i) => {
          return <TableItem prod={prod} key={i} />;
        })}
      </tbody>
    </Table>
  );
};

const TableItem = ({ prod }) => {
  return (
    <tr>
      <td>{prod.Year}</td>
      <td>{prod.Month}</td>
      <td>{prod.wellAPI}</td>
      <td>{prod.boreID}</td>
      <td>{prod.compSubId}</td>
      <td>{prod.BHP}</td>
      <td>{prod.Qo}</td>
      <td>{prod.Qw}</td>
      <td>{prod.Qg}</td>
      <td>{prod.Qs}</td>
      <td>{prod.Qo + prod.Qw}</td>
      <td>{prod.CompL}</td>
      <td>{prod.FlowDays}</td>
      <td>{prod.Pressure}</td>
      <td>{prod.Status}</td>
    </tr>
  );
};
