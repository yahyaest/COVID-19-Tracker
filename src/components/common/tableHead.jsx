import React from "react";

const TableHead = ({ columns, raiseSort, renderSortIcon }) => {


  return (
    <thead>
      <tr className="table-info">
        {columns.map((column) => (
          <th
            className={
              column.path === "cases" ||
              column.path === "recovered" ||
              column.path === "deaths"
                ? "clickable"
                : ""
            }
            key={column.path}
            onClick={() => raiseSort(column.path)}
          >
            {column.label}
            {renderSortIcon(column)}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHead;
