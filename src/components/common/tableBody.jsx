import React from "react";
import _ from "lodash";
import numeral from "numeral";

const TableBody = ({ countries, columns }) => {
  function renderCell(column, item) {
    if (column.renderFlag) {
      return column.renderFlag(item);
    }
    const cellValue = _.get(item, column.path);
    if (typeof cellValue === "number") {
      return numeral(cellValue).format("0,0");
    }
    return cellValue;
  }

  return (
    <tbody>
      {countries.map((country) => (
        <tr key={country.name}>
          {columns.map((column) => (
            <td key={country.name + column.path}>
              {renderCell(column, country)}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
