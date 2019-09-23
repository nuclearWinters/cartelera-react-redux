import React from 'react'
import sesionImg from "../imgs/45bab675f2f10124f08d54290addcf3c.png"
import { useSelector, useDispatch } from "react-redux"
import AuthHelperMethods from "./funciones"
import { fetchTokenSuccess, fetchTokenModalSuccess } from "../actions/loginActions"


const Auth = new AuthHelperMethods();

const FixedHeader = (props: any) => {
    const openModal = () => {
        dispatch(fetchTokenModalSuccess(true))
      }
    const dispatch = useDispatch()
    const usuario : any = useSelector<any, any>(state => state.token.Usuario)
    return (
        <div style={{backgroundColor: "#23282d", color: "#eee", fontSize: 13, fontWeight: 400, height: 32, display: "flex", justifyContent: "flex-end", position: "fixed", top: 0, left: 0, right: 0, bottom: 32, zIndex: 100}}>
        <div className="perfil" style={{display: "flex", height: 32, alignItems: "center"}} >
          <div style={{marginRight: 10, marginLeft: 10}}>{usuario ? usuario : "Inicia sesión"}</div>
          <img style={{marginRight: 10}} src={sesionImg} height={18} width={18} />
          <div className="perfilOpciones" style={{position: "fixed", top: 32, right: 0, color: "black", backgroundColor: "#23282d"}}>
            <div className="perfilWrapped" style={{padding: "20px 15px", display: "flex"}}>
              <img src={sesionImg} height={64} width={64} />
              <div style={{display: "flex", flexDirection: "column", margin: "0px 10px"}}>
                <div style={{color: "#eee", flex: 1, display: "flex", justifyContent: "center", alignItems: "center"}}>{usuario ? usuario : "Mi usuario"}</div>
                <div style={{color: "#eee", flex: 1, display: "flex", justifyContent: "center", alignItems: "center"}} onClick={
                  usuario ? () => {
                  Auth.logout()
                  dispatch(fetchTokenSuccess(null, null))
                } : openModal}>{usuario ? "Cerrar sesión" : "Iniciar sesión"}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}

export default FixedHeader
