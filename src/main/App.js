import React from "react"

import Rotas from "./rotas"
import NavBar from '../components/navbar'

import 'toastr/build/toastr.min.js'

import 'bootswatch/dist/flatly/bootstrap.css'
import '../custom.css'
import 'toastr/build/toastr.css'


import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import ProvedorAutenticacao from "./provedorAutenticacao"

class App extends React.Component {
  render(){
    return(
      <ProvedorAutenticacao>
        <div>
          <NavBar/>
          <div className="container">
            <Rotas/>
          </div>
        </div>
      </ProvedorAutenticacao>
    )   
  }
}

export default App;
