import React, { FC, useEffect, useCallback, useState } from 'react';
import './App.css';
import ReactTable, { CellInfo } from "react-table";
import "react-table/react-table.css";
import { useSelector, useDispatch } from "react-redux"
import { fetchPeliculas, fetchPeliculasSuccess } from "./actions/peliculasActions"
import { fetchToken, fetchTokenModalSuccess } from "./actions/loginActions"
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import moment, { Moment } from "moment"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { EnhancedWrapped } from "./components/AuthHelperMethods"
import Modal from 'react-modal';
import CreateRow from "./components/CreateRow"
import FixedHeader from "./components/FixedHeader"

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

const App: FC = () => {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const dispatch = useDispatch()

  const initFetch = useCallback(() => {
    dispatch(fetchPeliculas());
  }, [dispatch]);

  useEffect(() => {
    initFetch();
  }, [initFetch]);

  const peliculas : any = useSelector<any, any>(state => state.peliculas)

  const modalIsOpen : any = useSelector<any, any>(state => state.token.isOpenModal)
  
  const renderEditableText = (cellInfo: CellInfo) => {
    const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if(e.keyCode === 13){
        if (document.activeElement instanceof HTMLElement) {
          document.activeElement.blur();
        }
      }
    }
    return (
        <div
          style={{ backgroundColor: "#fafafa" }}
          contentEditable
          suppressContentEditableWarning
          onKeyDown={handleKeyPress}
          onBlur={e => {
            const data = [...peliculas.items];
            data[cellInfo.index][cellInfo.column.id ? cellInfo.column.id : String(cellInfo.column.id)] = e.target.innerHTML;
            if (cellInfo.column.id === "Duración") {
              const value = moment(data[cellInfo.index]["Inicio exhibición"])
              data[cellInfo.index]["Fin exhibición"] = value.add(data[cellInfo.index].Duración, "minutes").toISOString()
              dispatch(fetchPeliculasSuccess(data))
            } else{
              dispatch(fetchPeliculasSuccess(data))
            }
            //const objectWithData = data[cellInfo.index]
            //delete objectWithData._id
            
            //axios.put("http://192.168.0.7:3001/admin-put-movie", {token, pelicula: data[cellInfo.index]})
            //.then(response => {
            //  setDispatchnow(true)
            //})
          }}
          dangerouslySetInnerHTML={{
            __html: peliculas.items[cellInfo.index][cellInfo.column.id ? cellInfo.column.id : ""]
          }}
        />
    );
  }

  const renderEditableDate = (cellInfo: CellInfo) => {
    const handleDateORTime = (value: Moment | Date | null) => {
      if (value) {
        value = moment(value)
        const data = [...peliculas.items]
        data[cellInfo.index][cellInfo.column.id ? cellInfo.column.id : String(cellInfo.column.id)] = value.toISOString()
        const columnaPorModificar = cellInfo.column.id === "Inicio exhibición" ? "Fin exhibición" : "Inicio exhibición"
        data[cellInfo.index][columnaPorModificar] = cellInfo.column.id === "Inicio exhibición" ? value.add(data[cellInfo.index].Duración, "minutes").toISOString() : value.subtract(data[cellInfo.index].Duración, "minutes").toISOString()
        dispatch(fetchPeliculasSuccess(data))
      }
    }
    const data = [...peliculas.items];
    const nowDate = new Date(data[cellInfo.index][cellInfo.column.id ? cellInfo.column.id : String(cellInfo.column.id)])
    const nowMoment = moment(nowDate)
    return (
        <div
          style={{ backgroundColor: "#fafafa", display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <DatePicker
            selected={nowDate}
            onChange={handleDateORTime}
          />
          <TimePicker
            clearIcon={<div></div>}
            value={nowMoment}
            showSecond={false}
            className="xxx"
            onChange={handleDateORTime}
            format={'h:mm a'}
            use12Hours
            inputReadOnly
          />
        </div>
    );
  }
 
  const closeModal = () => {
    dispatch(fetchTokenModalSuccess(false))
  }

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2>Iniciar sesión</h2>
        <div style={{position: "absolute", top: 0, right: 0, padding: "20px"}} onClick={closeModal}>x</div>
        <div style={{display: "flex", flexDirection: "column"}}>
          <input placeholder="nuclearWinters" onChange={e => setUsername(e.currentTarget.value)}/>
          <input placeholder="armando123" onChange={e => setPassword(e.currentTarget.value)}/>
          <button onClick={() => {
            dispatch(fetchToken(username, password))

          }}>Iniciar sesión</button>
        </div>
      </Modal>
      <FixedHeader />
      <CreateRow />
      <div className="ReactTable -striped -highlight">
        <div className="rt-table">
          <div className="rt-thead -header">
            <div className="rt-tr" style={{border: "1px solid rgba(0,0,0,0.05)"}}>
              <div className="rt-th rt-resizable-header" style={{flex: 1, width: 100}}>
                <div className="rt-resizable-header-content">Películas en cartela</div>
                <div className="rt-resizer"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ReactTable
        data={peliculas.items}
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
      <EnhancedWrapped />
    </div>
  );
}

export default App;