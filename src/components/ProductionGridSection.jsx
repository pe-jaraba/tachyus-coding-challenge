import { ProductionGrid } from "./ProductionGrid";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Form } from "react-bootstrap";
import { useEffect, useMemo } from "react";
import { useState } from "react";
import { Pagination } from "./Pagination";

export const ProductionGridSection = ({
  production,
  selectedCompletions,
  setSelectedProduction,
}) => {
  const [activePageNumber, setActivePageNumber] = useState(1);
  const [itemsToShow, setItemsToShow] = useState(10);

  const onItemsToShowChange = (e) => {
    setItemsToShow(parseInt(e.target.value));
  };

  const filteredItems = useMemo(() => {
    if (!selectedCompletions) {
      return production;
    }
    return production.filter((prod) =>
      selectedCompletions.some(
        (comp) =>
          comp.wellAPI === prod.wellAPI &&
          comp.boreID === prod.boreID &&
          comp.compSubId === prod.compSubId
      )
    );
  }, [production, selectedCompletions]);

  useEffect(() => {
    if (filteredItems) {
      setSelectedProduction(filteredItems);
    }
  }, [filteredItems, setSelectedProduction]);

  const page = useMemo(
    () => generatePage(filteredItems, activePageNumber, itemsToShow),
    [filteredItems, activePageNumber, itemsToShow]
  );

  return (
    <Col>
      <Row className="mb-4">
        <h3>Production</h3>
      </Row>
      <Row>
        <Form>
          <Form.Group
            as={Row}
            controlId="formGridFilterAndPagination"
            className="align-items-start"
          >
            <Col sm="auto" className="pt-2 pb-2">
              <Form.Label>Items:</Form.Label>
            </Col>
            <Col sm="auto">
              <Form.Select value={itemsToShow} onChange={onItemsToShowChange}>
                {[10, 20, 50].map((pageSize, index) => (
                  <option key={index} value={pageSize}>
                    {pageSize}
                  </option>
                ))}
              </Form.Select>
            </Col>
            <Col sm="4"></Col>
          </Form.Group>
        </Form>
      </Row>
      <Row>
        <ProductionGrid production={page} />
      </Row>
      <Row>
        <Pagination
          pageSize={itemsToShow}
          setActivePageNumber={setActivePageNumber}
          activePageNumber={activePageNumber}
          rows={filteredItems}
        />
      </Row>
    </Col>
  );
};

function generatePage(rows, pageNumber, pageSize) {
  const end = pageNumber * pageSize;
  const start = end - pageSize;
  return rows.slice(start, end);
}
