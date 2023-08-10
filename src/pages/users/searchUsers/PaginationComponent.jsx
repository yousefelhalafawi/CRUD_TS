import { Pagination, Dropdown } from "react-bootstrap";

function PaginationComponent({
  page,
  count,
  perPage,
  prevPage,
  handelPageRow,
  nextPage,
  total,
  onCLickPage,
}) {
  let pages = [];
  for (let i = 1; i <= count; i++) {
    pages.push(i);
  }
  return (
    <div className="d-flex justify-content-between align-items-center pb-4">
      <span className="fs-5">
        Showing{" "}
        {perPage * page - perPage + 1} to{" "}
        {perPage * page < total
          ? perPage * page
          : total}{" "}
        of {total}
      </span>
      <div className="d-flex">
        <Dropdown className="mx-3">
          <Dropdown.Toggle variant="primary">
            {perPage}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => handelPageRow(5)}>5</Dropdown.Item>
            <Dropdown.Item onClick={() => handelPageRow(10)}>10</Dropdown.Item>
            <Dropdown.Item onClick={() => handelPageRow(15)}>15</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Pagination className="m-0">
          <Pagination.Prev
            disabled={page === 1}
            onClick={prevPage}
          />
          {pages.map((pageNumber) => (
            <Pagination.Item
              onClick={() => onCLickPage(pageNumber)}
              key={pageNumber}
              active={pageNumber === page}
            >
              {pageNumber}
            </Pagination.Item>
          ))}
          <Pagination.Next
            disabled={page === count}
            onClick={nextPage}
          />
        </Pagination>
      </div>
    </div>
  );
}

export default PaginationComponent;
