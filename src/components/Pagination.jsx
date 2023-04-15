import React, { useMemo } from "react";
import { Pagination as BsPagination } from "react-bootstrap";

const maxNumberOfPages = 10;

export function Pagination({
  rows,
  pageSize,
  activePageNumber,
  setActivePageNumber,
}) {
  const numberOfPages = useMemo(
    () => calculateNumberOfPages(rows, pageSize),
    [rows, pageSize]
  );

  const pages = new Array(numberOfPages).fill(0).map((_, index) => index + 1);

  if (numberOfPages <= maxNumberOfPages) {
    return (
      <SimplePagination
        pages={pages}
        activePageNumber={activePageNumber}
        setActivePageNumber={setActivePageNumber}
        numberOfPages={numberOfPages}
      />
    );
  } else {
    return (
      <ComplexPagination
        pages={pages}
        rows={rows}
        pageSize={pageSize}
        activePageNumber={activePageNumber}
        setActivePageNumber={setActivePageNumber}
        numberOfPages={numberOfPages}
      />
    );
  }
}

const SimplePagination = ({ pages, activePageNumber, setActivePageNumber }) => {
  return (
    <BsPagination>
      {pages.map((page) => {
        return (
          <BsPagination.Item
            active={page === activePageNumber}
            onClick={() => setActivePageNumber(page)}
            key={page}
          >
            {page}
          </BsPagination.Item>
        );
      })}
    </BsPagination>
  );
};

const ComplexPagination = ({
  pages,
  activePageNumber,
  setActivePageNumber,
  numberOfPages,
}) => {
  const activePageNumberIndex = !!activePageNumber ? activePageNumber - 1 : 0;
  const start = Math.max(0, activePageNumberIndex - 5);
  const end = Math.min(numberOfPages, start + maxNumberOfPages);
  const shownPages = pages.slice(start, end);

  return (
    <BsPagination>
      {shownPages[0] !== 1 && (
        <>
          <BsPagination.First onClick={() => setActivePageNumber(1)} />
          <BsPagination.Ellipsis
            onClick={() =>
              setActivePageNumber(
                (activePageNumber || shownPages[shownPages.length - 1]) - 1
              )
            }
          />
        </>
      )}
      {shownPages.map((page) => {
        return (
          <BsPagination.Item
            active={page === activePageNumber}
            onClick={() => setActivePageNumber(page)}
            key={page}
          >
            {page}
          </BsPagination.Item>
        );
      })}
      {shownPages[shownPages.length - 1] !== numberOfPages && (
        <>
          <BsPagination.Ellipsis
            onClick={() =>
              setActivePageNumber(
                (activePageNumber || shownPages[shownPages.length - 1]) + 1
              )
            }
          />
          <BsPagination.Last
            onClick={() => setActivePageNumber(numberOfPages)}
          />
        </>
      )}
    </BsPagination>
  );
};

const calculateNumberOfPages = (rows, pageLength) => {
  const intPart = Math.trunc(rows.length / pageLength);
  const remainder = rows.length % pageLength;
  if (remainder !== 0) {
    return intPart + 1;
  }
  return intPart;
};
