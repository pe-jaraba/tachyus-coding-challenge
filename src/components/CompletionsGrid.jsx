import { Table } from "react-bootstrap";
import { CompletionEditionModal } from "./CompletionEditionModal";
import { useState } from "react";

export const CompletionsGrid = ({ completions, mutateCompletion }) => {
  const [selectedCompletion, setSelectedCompletion] = useState(undefined);

  const onSelectCompletion = (completion) => {
    setSelectedCompletion(completion);
  };

  const onCloseEdition = () => {
    setSelectedCompletion(undefined);
  };

  return (
    <>
      {selectedCompletion && (
        <CompletionEditionModal
          completion={selectedCompletion}
          onClose={onCloseEdition}
          saveCompletion={mutateCompletion}
        />
      )}
      <Table response bordered hover>
        <thead>
          <tr>
            <th>Well Name</th>
            <th>Well API</th>
            <th>Bore Id</th>
            <th>Comp Sub Id</th>
            <th>Type</th>
            <th>X</th>
            <th>Y</th>
            <th>TD</th>
            <th>IsHorizontal</th>
            <th>Reservoir</th>
            <th>Fault Block</th>
            <th>Compartment</th>
            <th>Max BHP</th>
            <th>Long</th>
            <th>Lat</th>
          </tr>
        </thead>
        <tbody>
          {completions.map((completion, i) => {
            return (
              <TableItem
                completion={completion}
                key={i}
                onSelectCompletion={onSelectCompletion}
              />
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

const TableItem = ({ completion, onSelectCompletion }) => {
  const onRowClick = () => {
    onSelectCompletion(completion);
  };
  return (
    <tr style={{ cursor: "pointer" }} onClick={onRowClick}>
      <td>{completion.wellName}</td>
      <td>{completion.wellAPI}</td>
      <td>{completion.boreID}</td>
      <td>{completion.compSubId}</td>
      <td>{completion.Type}</td>
      <td>{completion.X}</td>
      <td>{completion.Y}</td>
      <td>{completion.TD}</td>
      <td>{completion.isHorizontal ? "Yes" : "No"}</td>
      <td>{completion.reservoir}</td>
      <td>{completion.faultBlock}</td>
      <td>{completion.compartment}</td>
      <td>{completion.maxBHP}</td>
      <td>{completion.long}</td>
      <td>{completion.lat}</td>
    </tr>
  );
};
