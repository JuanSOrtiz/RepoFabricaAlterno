"use client";
import { randomUUID } from 'crypto';
import React from 'react' 
import { useState} from 'react';


const Form = () => {

  const [vuelo,setVuelo] = useState<string>("")
  const [tipoVuelo, setTipoVuelo] = useState<string>('na');
  const [salida,setSalida] = useState<string>("")
  const [llegada,setLlegada] = useState<string>("")
  const [horaSalida,setHoraSalida] = useState<string>("")
  const [horaLlegada,setHoraLlegada] = useState<string>("")
  const [origen,setOrigen] = useState<string>("Bogota")
  const [destino,setDestino] = useState<string>("Bogota")
  const [aeronave,setAeronave] = useState<string>("")
  const [pasajeros,setPasajeros] = useState<number | ''>('')
  const [tiquete,setTiquete] = useState<number | ''>('')
  const [impuestos,setImpuestos] = useState<number | ''>('')
  const [sobretasa,setSobretasa] = useState<number | ''>('')
  const [error, setError] = useState<boolean>(false);
  const [confirmation, setConfirmation] = useState<boolean>(false);


  


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevents the form from submitting and refreshing the page
    const formData: { [key: string]: string } = {};
    const elements = e.currentTarget.elements;
    

    for (let i = 0; i < elements.length; i++) {
      const element = elements[i] as HTMLInputElement;
      formData[element.name] = element.value;
    }

    

    if([vuelo,tipoVuelo,salida,llegada,horaSalida,horaLlegada,aeronave,pasajeros,tiquete,impuestos,sobretasa].includes('')){
      setError(true) 
    }
    else {
      setError(false);
      setConfirmation(true);
      
    }
  };

  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTipoVuelo(e.target.value);
  };

  const handleImpuestos = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || (Number(value) >= 0 && Number(value) <= 100)) {
      setImpuestos(value === '' ? '' : Number(value));
    }
    
  };

  const handleSobretasa = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || (Number(value) >= 0 && Number(value) <= 100)) {
      setSobretasa(value === '' ? '' : Number(value));
    }
    
  };

  const handlePasajeros = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || (Number(value) >= 0)) {
      setPasajeros(value === '' ? '' : Number(value));
    }
    
  };

  const handleTiquete = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || (Number(value) >= 0)) {
      setTiquete(value === '' ? '' : Number(value));
    }
    
  };

  const handleConfirmation = () =>{
    const formData = {
      vuelo,
      tipoVuelo,
      salida,
      llegada,
      horaSalida,
      horaLlegada,
      origen,
      destino,
      aeronave,
      pasajeros,
      tiquete,
      impuestos,
      sobretasa
    };
  
    // Realiza la solicitud POST al servidor
    fetch('http://localhost:8000/flights', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      console.log('Flight data saved successfully');
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);

    });
    setConfirmation(false);
    setVuelo("")
    setTipoVuelo("na")
    setSalida("")
    setLlegada("")
    setHoraSalida("")
    setHoraLlegada("")
    setOrigen("Bogota")
    setDestino("Bogota")
    setAeronave("")
    setPasajeros("")
    setTiquete("")
    setImpuestos("")
    setSobretasa("")
  }



  return (
    <div className='px-32 w-[1255px] mt-8'>
      {error && <h2 className="bg-red-800 text-white text-center p-3 uppercase font-bold mb-3 rounded-md">Todos los campos son obligatorios</h2>}
      
      <form onSubmit={handleSubmit}>
        <div className='pt-5 relative'>
          <label className='absolute top-0 left-0 ml-7 py-3 px-3 text-xs font-light  bg-slate-50 w-32 h-1 align-top'>Número de vuelo </label>
          <input type='text'
            name='vuelo' 
            className='border-2 border-gray-300 pl-5 h-14 w-[1000px]' 
            placeholder='SA-1234' 
            value={vuelo} 
            onChange={(e)=>setVuelo(e.target.value)}>
          </input>
        </div>

        <div className='pt-5'>
          <label className='block'>Tipo de vuelo: </label>
          <div className='pt-2'>
            <label className='pr-12'>
              <input type='radio' name='tipo' value='Nacional' className='mr-2' checked={tipoVuelo === 'Nacional'} onChange={handleOptionChange}></input>
              Nacional 
            </label>
        
            <label className=''>
              <input type='radio' name='tipo' value='Internacional' className='mr-2' checked={tipoVuelo === 'Internacional'} onChange={handleOptionChange}></input>
              Internacional
            </label>
          </div>
          
        </div>

        <div className='pt-5 relative'>
          <label className='absolute top-0 left-0 ml-7 py-3 px-3 text-xs font-light  bg-slate-50 w-32 h-1 align-top'>Ciudad de origen: </label>
          <select name='origen' className='border-2 border-gray-300 pl-5 h-14 w-[1000px]' value={origen} onChange={(e)=>setOrigen(e.target.value)} >
            <option value="Bogota">(BOG) Aeropuerto Internacional El Dorado - Bogotá</option>
            <option value="Cali">(CLO) Aeropuerto Internacional Alfonso Bonilla Aragón - Cali</option>
            <option value="Cartagena">(CTG) Aeropuerto Internacional Rafael Núñez - Cartagena</option>
            <option value="Medellin">(MDE) Aeropuerto Internacional José María Córdova - Rionegro/Medellín</option>
            <option value="Paris">(CDG) Aeropuerto Charles de Gaulle - París, Francia</option>
            <option value="Dubai">(DXB) Aeropuerto Internacional de Dubái - Dubái, Emiratos Árabes Unidos</option>
            <option value="Nueva York">(JFK) Aeropuerto Internacional John F. Kennedy - Nueva York, Estados Unidos</option>
            <option value="Ciudad de Mexico">(MEX) Aeropuerto Internacional Benito Juárez - Ciudad de México, México</option>
          </select>
        </div>

        <div className='pt-5 relative'>
          <label className='absolute top-0 left-0 ml-7 py-3 px-3 text-xs font-light  bg-slate-50 w-36 h-1 align-top'>Ciudad de destino: </label>
          <select name='destino' className='border-2 border-gray-300 pl-5 h-14 w-[1000px]' value={destino} onChange={(e)=>setDestino(e.target.value)}>
            <option value="Bogota">(BOG) Aeropuerto Internacional El Dorado - Bogotá</option>
            <option value="Cali">(CLO) Aeropuerto Internacional Alfonso Bonilla Aragón - Cali</option>
            <option value="Cartagena">(CTG) Aeropuerto Internacional Rafael Núñez - Cartagena</option>
            <option value="Medellin">(MDE) Aeropuerto Internacional José María Córdova - Rionegro/Medellín</option>
            <option value="Paris">(CDG) Aeropuerto Charles de Gaulle - París, Francia</option>
            <option value="Dubai">(DXB) Aeropuerto Internacional de Dubái - Dubái, Emiratos Árabes Unidos</option>
            <option value="Nueva York">(JFK) Aeropuerto Internacional John F. Kennedy - Nueva York, Estados Unidos</option>
            <option value="Ciudad de Mexico">(MEX) Aeropuerto Internacional Benito Juárez - Ciudad de México, México</option>
          </select>
        </div>

        <div className='flex'>

          <div className='pt-5 pr-12 relative'>
            <label className='absolute top-0 left-0 ml-7 py-3 px-3 text-xs font-light bg-slate-50 w-32 h-1 align-top'>Fecha de salida: </label>
            <input type='date' className='border-2 border-gray-300 pl-5 h-14 w-[474px]'
              name='fechaSalida'
              value={salida} 
              onChange={(e)=>setSalida(e.target.value)}>       
            </input>
          </div>

          <div className='pt-5 relative'>
            <label className='absolute top-0 left-0 ml-7 py-3 px-3 text-xs font-light bg-slate-50 w-28 h-1 align-top'>Hora de salida: </label>
            <input type='time' className='border-2 border-gray-300 pl-5 h-14 w-[476px]'
              value={horaSalida} 
              name='horaSalida'
              onChange={(e)=>setHoraSalida(e.target.value)}>
            </input>
          </div>

        </div>

        <div className='flex'>

          <div className='pt-5 pr-12 relative'>
            <label className='absolute top-0 left-0 ml-7 py-3 px-3 text-xs font-light bg-slate-50 w-36 h-1 align-top'>Fecha de llegada: </label>
            <input type='date' className='border-2 border-gray-300 pl-5 h-14 w-[474px]'
              value={llegada} 
              name='fechaLlegada'
              onChange={(e)=>setLlegada(e.target.value)}>
            </input>
          </div>

          <div className='pt-5 relative'>
            <label className='absolute top-0 left-0 ml-7 py-3 px-3 text-xs font-light bg-slate-50 w-32 h-1 align-top'>Hora de llegada: </label>
            <input type='time' className='border-2 border-gray-300 pl-5 h-14 w-[476px]'
            value={horaLlegada} 
            name='horaLlegada'
            onChange={(e)=>setHoraLlegada(e.target.value)}>
            </input>
          </div>  

        </div>

        <div className='flex'>

          <div className='pt-5 pr-12 relative'>
            <label className='absolute top-0 left-0 ml-7 py-3 px-3 text-xs font-light bg-slate-50 w-32 h-1 align-top'>Tipo de aeronave: </label>
            <input type='text' className='border-2 border-gray-300 pl-5 h-14 w-[600px]'
              value={aeronave}
              name='tipoAeronave'
              onChange={(e)=>setAeronave(e.target.value)}>
            </input>
          </div>

          <div className='pt-5 relative'>
            <label className='absolute top-0 left-0 ml-7 py-3 px-3 text-xs font-light bg-slate-50 w-52 h-1 align-top'>Cantidad máxima de pasajeros: </label>
            <input type='number' className='border-2 border-gray-300 pl-5 h-14 w-[350px]'
              value={pasajeros}
              name='cantidadPasajeros'
              onChange={handlePasajeros}>
            </input>
          </div>

        </div>

        <div className='flex'>

          <div className='pt-5 pr-8 relative'>
            <label className='absolute top-0 left-0 ml-7 py-3 px-3 text-xs font-light bg-slate-50 w-32 h-1 align-top'>Precio de tiquete: </label>
            <input type='number' className='border-2 border-gray-300 pl-5 h-14 w-[435px]'
              value={tiquete} 
              name='precioTicket'
              onChange={handleTiquete}>
            </input>
          </div>

          <div className='pt-5 pr-8 relative'>
            <label className='absolute top-0 left-0 ml-7 py-3 px-3 text-xs font-light bg-slate-50 w-24 h-1 align-top'>Impuestos(%): </label>
            <input type='number' className='border-2 border-gray-300 pl-5 h-14 w-[250px]'
              value={impuestos} 
              name='impuestos'
              onChange={handleImpuestos}>
            </input>
          </div>

          <div className='pt-5 relative'>
            <label className='absolute top-0 left-0 ml-7 py-3 px-3 text-xs font-light bg-slate-50 w-24 h-1 align-top'>Sobretasa(%): </label>
            <input type='number' className='border-2 border-gray-300 pl-5 h-14 w-[250px]'
              value={sobretasa} 
              name='sobretasa'
              onChange={handleSobretasa}>
            </input>
          </div>  

        </div>
        
        <button className='bg-blue-400 text-white mt-4 rounded-sm px-6 h-10' type='submit'>CREAR VUELO  </button>
      </form>

      {confirmation && (
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md shadow-lg">
            <p>¿Estás seguro de crear el vuelo?</p>
            <div className="flex justify-center mt-4">
              <button className="bg-blue-400 text-white mr-4 px-4 py-2 rounded-md" onClick={()=>setConfirmation(false)}>Cancelar</button>
              <button className="bg-green-400 text-white px-4 py-2 rounded-md" onClick={handleConfirmation}>Confirmar</button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default Form