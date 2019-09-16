import React, { FC, useState } from 'react';
import './App.css';
// Import React Table
import ReactTable, { CellInfo } from "react-table";
import "react-table/react-table.css";
import A from "./components/componentsA"
import B from "./components/componentsB"

const App: FC = () => {
  let [peliculas, setPeliculas] = useState<any[]>([{firstName: "Armando", lastName: "Rueda"}])
  const renderEditable = (cellInfo: CellInfo) => {
    return (
      <div
        style={{ backgroundColor: "#fafafa" }}
        contentEditable
        suppressContentEditableWarning
        onBlur={e => {
          const data = [...peliculas];
          data[cellInfo.index][cellInfo.column.id ? cellInfo.column.id : String(cellInfo.column.id)] = e.target.innerHTML;
          setPeliculas(data)
        }}
        dangerouslySetInnerHTML={{
          __html: peliculas[cellInfo.index][cellInfo.column.id ? cellInfo.column.id : ""]
        }}
      />
    );
  }
  return (
    <div>
      <ReactTable
        data={peliculas}
        columns={[
          {
            Header: "First Name",
            accessor: "firstName",
            Cell: renderEditable
          },
          {
            Header: "Last Name",
            accessor: "lastName",
            Cell: renderEditable
          },
          {
            Header: "Full Name",
            id: "full",
            accessor: (d: any) =>
              <div
                dangerouslySetInnerHTML={{
                  __html: d.firstName + " " + d.lastName
                }}
              />
          }
        ]}
        defaultPageSize={10}
        className="-striped -highlight"
      />
      <div>
        <A/>
        <B/>
      </div>
    </div>
  );
}

export default App;
