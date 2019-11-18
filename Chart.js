// Este es un componente que grafica 4 gráficas y debe ser importado
// en un elemento div con características css a lección dentro del forntend
//de react del desarrollador.
//Este realiza solicitudes GET desde el puerto 2000 del forntend hasta el puerto 3001 del backend
//El renderizado de las gráficas se realiza según esté definido en el  setInterval


import React, {Component} from 'react'
//eslint-disable-next-line
import {Bar, Line, Pie} from 'react-chartjs-2'

class Chart extends Component{

    state = {
      datos: [],
      chartData:{
        labels:[0],
        datasets:[
            {
                label:'BW.',
                data:[0],
                backgroundColor:[
                    'rgba(255,99, 192, 0.6)']
            }
        ]
      }
    }

    componentDidMount() {
      this.getData();
      this.interval = setInterval(() => this.getData(), 1000);
    }
    componentWillUnmount() {
      clearInterval(this.interval);
    }

    getData = _ => {
      
      var request = new Request('http://localhost:3001/')
      fetch(request,{
        method:'GET',
        headers: { 'content-type': 'application/json' }
      })
        .then(response => response.json())
        .then(response => {
          console.log(response)
          this.setState({ datos : response})
          
        })
        .catch(err => console.error(err))
    }


    
    render(){
      var datosArray = this.state.datos
      var time=[]
      var bw_h1=[]
      var bw_h2=[]
      var rate_palo=[]
      var MOS=[]
      var FINAL_MOS=0
      datosArray.forEach(element => {
        time.push(element.time)
        bw_h1.push(element.bw_h1)
        bw_h2.push(element.bw_h2)
        rate_palo.push(element.rate_palo)
        MOS.push(element.MOS)
      })  
      MOS.forEach(element =>{
        FINAL_MOS=FINAL_MOS+element
      })
      FINAL_MOS=FINAL_MOS/MOS.length

      console.log(FINAL_MOS)
      console.log(bw_h1)

      
        return(
            <div className="chart">

                <div>
                    <Line
                        data={{
                          labels:time,
                          datasets:[
                              {
                                  label:'BW H1',
                                  data:bw_h1,
                                  backgroundColor:[
                                      'rgba(255,99, 192, 0.6)']
                              }
                          ]
                        }}
                        options={{ maintainAspectRatio: false }}
                    />
                </div>

                <div>
                    <Line
                        data={{
                          labels:time,
                          datasets:[
                              {
                                  label:'BW H2',
                                  data:bw_h2,
                                  backgroundColor:[
                                      'rgba(255,99, 192, 0.6)']
                              }
                          ]
                        }}
                        options={{ maintainAspectRatio: false }}
                    />
                </div>

                
                <div>
                    <Line
                        data={{
                          labels:time,
                          datasets:[
                              {
                                  label:'RATE LOSS',
                                  data:rate_palo,
                                  backgroundColor:[
                                      'rgba(255,99, 192, 0.6)']
                              }
                          ]
                        }}
                        options={{ maintainAspectRatio: false }}
                    />
                </div>

                <div>
                    <Line
                        data={{
                          labels:time,
                          datasets:[
                              {
                                  label:`MOS average:  ${FINAL_MOS}`,
                                  data:MOS,
                                  backgroundColor:[
                                      'rgba(255,99, 192, 0.6)']
                              }
                          ]
                        }}
                        options={{ maintainAspectRatio: false }}
                    />
                </div>



            </div>

        )
    }
}

export default Chart