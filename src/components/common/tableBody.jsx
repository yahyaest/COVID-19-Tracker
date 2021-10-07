import React from "react";
import _ from "lodash";

const TableBody = ({ countries, columns }) => {
  function renderCell(column, item) {
    if (column.renderFlag) {
      return column.renderFlag(item);
    }
    return _.get(item, column.path);
  }

  return (
    <tbody>
      {countries.map((country) => (
        <tr key={country.name}>
          {columns.map((column) => (
            <td key={country.name + column.path}>{renderCell(column, country)}</td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
