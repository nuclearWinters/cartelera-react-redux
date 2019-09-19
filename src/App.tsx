import React, { FC, useEffect, useCallback } from 'react';
import './App.css';
// Import React Table
import ReactTable, { CellInfo } from "react-table";
import "react-table/react-table.css";
import { useSelector, useDispatch } from "react-redux"
import { fetchPeliculas, fetchPeliculasSuccess } from "./actions/peliculasActions"
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
//import Login from "react-signup-login-component"
import moment, { Moment } from "moment"

const App: FC = () => {

  const dispatch = useDispatch()

  const initFetch = useCallback(() => {
    dispatch(fetchPeliculas());
  }, [dispatch]);

  useEffect(() => {
    initFetch();
  }, [initFetch]);

  const result : any = useSelector<any, any>(state => state.peliculas)
  
  const renderEditableText = (cellInfo: CellInfo) => {
    return (
        <div
          style={{ backgroundColor: "#fafafa" }}
          contentEditable
          suppressContentEditableWarning
          onBlur={e => {
            const data = [...result.items];
            data[cellInfo.index][cellInfo.column.id ? cellInfo.column.id : String(cellInfo.column.id)] = e.target.innerHTML;
            //const objectWithData = data[cellInfo.index]
            //delete objectWithData._id
            console.log(data)
            dispatch(fetchPeliculasSuccess(data))
            //axios.put("http://192.168.0.7:3001/admin-put-movie", {token, pelicula: data[cellInfo.index]})
            //.then(response => {
            //  setDispatchnow(true)
            //})
          }}
          dangerouslySetInnerHTML={{
            __html: result.items[cellInfo.index][cellInfo.column.id ? cellInfo.column.id : ""]
          }}
        />
    );
  }

  const renderEditableDate = (cellInfo: CellInfo) => {
    const format = 'h:mm a';
    const onChange = (value: Moment) => {
      const data = [...result.items];
      data[cellInfo.index][cellInfo.column.id ? cellInfo.column.id : String(cellInfo.column.id)] = value.toISOString();
      console.log(cellInfo.column.id)
      const columnaPorModificar = cellInfo.column.id === "Inicio exhibición" ? "Fin exhibición" : "Inicio exhibición"
      console.log(columnaPorModificar)
      data[cellInfo.index][columnaPorModificar] = cellInfo.column.id === "Inicio exhibición" ? value.add(data[cellInfo.index].Duración, "hours").toISOString() : value.subtract(data[cellInfo.index].Duración, "hours").toISOString()
      console.log(data[cellInfo.index][columnaPorModificar])
      dispatch(fetchPeliculasSuccess(data))
    }
    const data = [...result.items];
    const now = moment(data[cellInfo.index][cellInfo.column.id ? cellInfo.column.id : String(cellInfo.column.id)])
    return (
        <div
          style={{ backgroundColor: "#fafafa", display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <TimePicker
            value={now}
            showSecond={false}
            className="xxx"
            onChange={onChange}
            format={format}
            use12Hours
            inputReadOnly
          />
        </div>
    );
  }

  return (
    <div>
      <ReactTable
        data={result.items}
        columns={[
          {
            Header: "Título",
            accessor: "Titulo",
            Cell: renderEditableText
          },
          {
            Header: "Director",
            accessor: "Director",
            Cell: renderEditableText
          },
          {
            Header: "Duración",
            accessor: "Duración",
            Cell: renderEditableText
          },
          {
            Header: "Inicio exhibición",
            accessor: "Inicio exhibición",
            Cell: renderEditableDate
          },
          {
            Header: "Fin exhibición",
            accessor: "Fin exhibición",
            Cell: renderEditableDate
          }
        ]}
        defaultPageSize={10}
        className="-striped -highlight"
      />
    </div>
  );
}

export default App;