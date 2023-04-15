import React, { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { CompletionsGridSection } from "./components/CompletionsGridSection";
import { ProductionChart } from "./components/ProductionChart";
import { ProductionGridSection } from "./components/ProductionGridSection";
import { getCompletions } from "./services/completions";
import { getProduction } from "./services/production";

function App() {
  const [completions, setCompletions] = useState([]);
  const [production, setProduction] = useState([]);
  const [selectedCompletions, setSelectedCompletions] = useState([]);
  const [selectedProduction, setSelectedProduction] = useState([]);

  // This allows to track the indices of the completions after they are sorted or filtered
  // Having the indices avoids having to filter() every time we want to locate a completion for future operations like mutations
  const indexAndSetCompletions = (data) => {
    let indexedCompletions = data.slice();
    for (let i = 0; i < data.length; i++) {
      indexedCompletions[i].index = i;
    }
    setCompletions(indexedCompletions);
  };

  const mutateCompletion = (completion) => {
    let newCompletions = completions.slice();
    newCompletions[completion.index] = completion;
    setCompletions(newCompletions);
  };

  useEffect(() => {
    getCompletions(indexAndSetCompletions);
    getProduction((data) => setProduction(data));
  }, []);

  const completionsAreReady = completions && completions.length > 0;
  const productionIsReady = production && production.length > 0;
  const selectedCompletionsAreReady =
    selectedCompletions && selectedCompletions.length > 0;

  return (
    <Row style={{ width: "100%" }} className="justify-content-center p-3">
      <Col sm="10">
        <Row className="mb-4">
          {completionsAreReady && (
            <CompletionsGridSection
              completions={completions}
              setSelectedCompletions={setSelectedCompletions}
              mutateCompletion={mutateCompletion}
            />
          )}
        </Row>
        <Row className="mb-4">
          {productionIsReady && selectedCompletionsAreReady && (
            <ProductionGridSection
              production={production}
              selectedCompletions={selectedCompletions}
              setSelectedProduction={setSelectedProduction}
            />
          )}
        </Row>
        <Row>
          <ProductionChart production={selectedProduction} />
        </Row>
      </Col>
    </Row>
  );
}

export default App;
