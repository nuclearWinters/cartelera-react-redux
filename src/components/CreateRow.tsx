import React, { useState } from 'react'
import DatePicker from "react-datepicker"
import TimePicker from "rc-time-picker"
import moment, { Moment } from "moment"
import axios from "axios"
import Modal from 'react-modal';
import Countdown from "react-countdown-now"

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

export default function CreateRow() {
    const [timeLeft, setTimeLeft] = useState(0)
    const [titulo, setTitulo] = useState("")
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [director, setDirector] = useState("")
    const [duracion, setDuracion] = useState("0")
    const [inicio, setInicio] = useState(new Date())
    const [fin, setFin] = useState(new Date())

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.name === "titulo") {
            setTitulo(e.currentTarget.value)
        } else if (e.currentTarget.name === "director") {
            setDirector(e.currentTarget.value)
        } else if (e.currentTarget.name === "duracion") {
            if (!isNaN(Number(e.currentTarget.value))) {
                setDuracion(e.currentTarget.value)
                setFin(moment(inicio).add(Number(e.currentTarget.value), "minutes").toDate())
            }
        }
    }
    const handleDateORTimeInicio = (value: Date | Moment | null) => {
        if (value) {
          value = moment(value)
          setInicio(value.toDate())
          console.log(value)
          setFin(moment(value).add(Number(duracion), "minutes").toDate())
        }
    }
    const handleDateORTimeFin = (value: Date | Moment | null) => {
        if (value) {
          value = moment(value)
          setFin(value.toDate())
          setInicio(moment(value).subtract(Number(duracion), "minutes").toDate())
        }
    }
    const closeModal = () => setIsModalOpen(false)
    return (
        <React.Fragment>
            <Modal
              isOpen={isModalOpen}
              onRequestClose={closeModal}
              style={customStyles}
              contentLabel="Example Modal"
            >
              <div style={{position: "absolute", top: 0, right: 0, padding: "20px"}} onClick={closeModal}>x</div>
              <h2>Se debe esperar 5 minutos antes de registrar otra pelicula en la cartelera.</h2>
              <Countdown date={Date.now() + (timeLeft * 1000)} />
            </Modal>
            <div style={{marginTop: 32, display: "flex", alignItems:"center", justifyContent: "center", flexDirection: "column"}}>
                <div className="ReactTable -striped -highlight" style={{width: 1000, margin: "20px 0px" }}>
                    <div className="rt-table">
                      <div className="rt-thead -header">
                        <div className="rt-tr" style={{border: "1px solid rgba(0,0,0,0.05)"}}>
                          <div className="rt-th rt-resizable-header" style={{flex: 1, width: 100}}>
                            <div className="rt-resizable-header-content">Añadir pelicula a cartelera</div>
                            <div className="rt-resizer"></div>
                          </div>
                        </div>
                      </div>
                      <div className="rt-tbody" style={{minWidth: 500}}>
                        <div className="rt-tr-group">
                          <div className="rt-tr -odd">
                            <div className="rt-td" style={{flex: 1, width: 100}}>
                              <div style={{backgroundColor: "rgb(250, 250, 250)", display: "flex"}}>
                                  <input onChange={handleInputChange} placeholder="Título" value={titulo} style={{flex: 1}} name="titulo"/>
                              </div>
                            </div>
                            <div className="rt-td" style={{flex: 1, width: 100}}>
                              <div style={{backgroundColor: "rgb(250, 250, 250)", display: "flex"}}>
                                  <input onChange={handleInputChange} placeholder="Director" value={director} style={{flex: 1}} name="director"/>
                              </div>
                            </div>
                            <div className="rt-td" style={{flex: 1, width: 100}}>
                              <div style={{backgroundColor: "rgb(250, 250, 250)", display: "flex"}}>
                                  <input onChange={handleInputChange} placeholder="Duración" value={duracion} style={{flex: 1}} name="duracion"/>
                              </div>
                            </div>
                            <div className="rt-td" style={{flex: 1, width: 100}}>
                              <div style={{backgroundColor: "rgb(250, 250, 250)"}}>
                                <div
                                  style={{ backgroundColor: "#fafafa", display: "flex", alignItems: "center", justifyContent: "center" }}
                                >
                                  <DatePicker
                                    selected={inicio}
                                    onChange={handleDateORTimeInicio}
                                  />
                                  <TimePicker
                                    clearIcon={<div></div>}
                                    value={moment(inicio)}
                                    showSecond={false}
                                    className="xxx"
                                    onChange={handleDateORTimeInicio}
                                    format={'h:mm a'}
                                    use12Hours
                                    inputReadOnly
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="rt-td" style={{flex: 1, width: 100}}>
                              <div style={{backgroundColor: "rgb(250, 250, 250)"}}>
                                <div
                                  style={{ backgroundColor: "#fafafa", display: "flex", alignItems: "center", justifyContent: "center" }}
                                >
                                  <DatePicker
                                    selected={fin}
                                    onChange={handleDateORTimeFin}
                                  />
                                  <TimePicker
                                    clearIcon={<div></div>}
                                    value={moment(fin)}
                                    showSecond={false}
                                    className="xxx"
                                    onChange={handleDateORTimeFin}
                                    format={'h:mm a'}
                                    use12Hours
                                    inputReadOnly
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                </div>
            <button style={{marginBottom: 20}} onClick={() => {
                axios.post("https://cartelera-node.herokuapp.com/post-movie", {
                    Titulo: titulo,
                    Director: director,
                    Duración: Number(duracion),
                    Inicio_exhibición: inicio,
                    Fin_exhibición: fin 
                })
                .then(response => console.log(response))
                .catch(err => {
                    if (err.response) {
                        if (err.response.status === 429) {
                            setTimeLeft(err.response.data.falta)
                            setIsModalOpen(true)
                        }
                    }
                })
            }}>Añadir pelicula a la cartelera</button>
        </div>
      </React.Fragment>
    )
}
