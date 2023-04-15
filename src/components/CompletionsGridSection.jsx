import { CompletionsGrid } from "./CompletionsGrid";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Form } from "react-bootstrap";
import { useDebounce } from "use-debounce";
import { useEffect, useMemo } from "react";
import { useState } from "react";
import { Pagination } from "./Pagination";

export const CompletionsGridSection = ({
  completions,
  setSelectedCompletions,
  mutateCompletion,
}) => {
  const [filter, setFilter] = useState(undefined);
  const [activePageNumber, setActivePageNumber] = useState(1);
  const [itemsToShow, setItemsToShow] = useState(10);

  const onFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const onItemsToShowChange = (e) => {
    setItemsToShow(parseInt(e.target.value));
  };

  const debouncedFilter = useDebounce(filter, 500)[0];

  const filteredItems = useMemo(() => {
    if (!debouncedFilter) {
      return completions;
    }
    // We can optimize this by using a tree structure indexed by wellName and do binary search
    return completions.filter((completion) =>
      completion.wellName.startsWith(debouncedFilter)
    );
  }, [completions, debouncedFilter]);

  useEffect(() => {
    if (filteredItems) {
      setSelectedCompletions(filteredItems);
    }
  }, [filteredItems, setSelectedCompletions]);

  const page = useMemo(
    () => generatePage(filteredItems, activePageNumber, itemsToShow),
    [filteredItems, activePageNumber, itemsToShow]
  );

  return (
    <Col>
      <Row className="mb-4">
        <h3>Completions</h3>
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
                {[10, 20, 40].map((pageSize, index) => (
                  <option key={index} value={pageSize}>
                    {pageSize}
                  </option>
                ))}
              </Form.Select>
            </Col>
            <Col sm="3">
              <Form.Control
                type="text"
                placeholder="Type to filter by well name"
                value={filter}
                onChange={onFilterChange}
              />
            </Col>
            <Col sm="4"></Col>
          </Form.Group>
        </Form>
      </Row>
      <Row>
        <CompletionsGrid
          completions={page}
          mutateCompletion={mutateCompletion}
        />
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
