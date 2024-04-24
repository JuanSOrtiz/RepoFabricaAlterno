"use client"
import React, { useState, useEffect } from 'react';

interface Flight {
  id: number;
  vuelo: string;
  tipoVuelo: string;
  salida: string;
  horaSalida: string;
  llegada: string;
  horaLlegada: string;
  origen: string;
  destino: string;
  aeronave: string;
  pasajeros: number;
  tiquete: number;
  sobretasa: number;
  impuestos: number;
}

function FlightList() {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
  const [flightToDelete, setFlightToDelete] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);

  useEffect(() => {
    fetch('http://localhost:8000/flights')
      .then((response) => response.json() as Promise<Flight[]>)
      .then((data) => setFlights(data))
      .catch((error) => console.error('Error fetching flights:', error));
  }, []);

  const openModal = (flight: Flight) => {
    setSelectedFlight(flight);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedFlight(null);
    setFlightToDelete(null);
    setModalOpen(false);
    setDeleteConfirmationOpen(false); // Close delete confirmation modal when closing main modal
  };

  const handleDelete = () => {
    if (flightToDelete !== null) {
      // Send request to delete flight with specified ID
      fetch(`http://localhost:8000/flights/${flightToDelete}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (response.ok) {
            // Remove flight from local list after successfully deleting from database
            setFlights(flights.filter((flight) => flight.id !== flightToDelete));
            closeModal(); // Close modal after successful deletion
          } else {
            console.error('Error deleting flight:', response.statusText);
          }
        })
        .catch((error) => console.error('Error deleting flight:', error));
    }
  };

  return (
    <>
      <table className='ml-10'>
        <tbody>
          <tr className='border-b border-gray-300'>
            <th className='py-4 font-semibold text-lg pr-6'>No. Vuelo</th>
            <th className='py-4 font-semibold text-lg pr-6'>Tipo de vuelo</th>
            <th className='py-4 font-semibold text-lg pr-6'>Origen</th>
            <th className='py-4 font-semibold text-lg pr-6'>Destino</th>
            <th className='py-4 font-semibold text-lg pr-6'>Fecha de salida</th>
            <th className='py-4 font-semibold text-lg pr-6'>Hora de salida</th>
            <th className='py-4 font-semibold text-lg pr-6'>Fecha de llegada</th>
            <th className='py-4 font-semibold text-lg pr-6'>Hora de llegada</th>
          </tr>
          {flights.map((flight, index) => (
            <tr key={index} className='border-b border-gray-300'>
              <td className='py-4 pr-10'>{flight.vuelo}</td>
              <td className='py-4 pr-10'>{flight.tipoVuelo}</td>
              <td className='py-4 pr-10'>{flight.origen}</td>
              <td className='py-4 pr-10'>{flight.destino}</td>
              <td className='py-4 pr-10'>{flight.salida}</td>
              <td className='py-4 pr-10'>{flight.horaSalida}</td>
              <td className='py-4 pr-10'>{flight.llegada}</td>
              <td className='py-4 pr-10'>{flight.horaLlegada}</td>
              <td className='py-4 pr-6'>
                <button onClick={() => openModal(flight)}>Ver más</button>
              </td>
              <td className='py-4 pr-6'>
                {/* Button to initiate deletion */}
                <button onClick={() => {
                  setFlightToDelete(flight.id);
                  setDeleteConfirmationOpen(true); // Open delete confirmation modal
                }}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalOpen && (
        <div className="modal fixed inset-0 z-50 overflow-auto bg-gray-500 bg-opacity-50 flex items-center justify-center">
            <div className="modal-content bg-white rounded-lg p-8 relative">
            <span className="close absolute top-5 right-8 -mt-4 -mr-4 text-gray-600 cursor-pointer text-3xl" onClick={closeModal}>&times;</span>
            {/* Contenido de la ventana modal */}
            {selectedFlight && (
                <div className="flight-details">
                <h2 className="text-2xl font-bold mb-4">{selectedFlight.vuelo}</h2>
                <p><span className="font-semibold">Tipo de vuelo:</span> {selectedFlight.tipoVuelo}</p>
                <p><span className="font-semibold">Origen:</span> {selectedFlight.origen}</p>
                <p><span className="font-semibold">Destino:</span> {selectedFlight.destino}</p>
                <p><span className="font-semibold">Fecha de salida:</span> {selectedFlight.salida}</p>
                <p><span className="font-semibold">Hora de salida:</span> {selectedFlight.horaSalida}</p>
                <p><span className="font-semibold">Fecha de llegada:</span> {selectedFlight.llegada}</p>
                <p><span className="font-semibold">Hora de llegada:</span> {selectedFlight.horaLlegada}</p>
                <p><span className="font-semibold">Tipo de aeronave:</span> {selectedFlight.aeronave}</p>
                <p><span className="font-semibold">Cantidad máxima de pasajeros:</span> {selectedFlight.pasajeros}</p>
                <p><span className="font-semibold">Precio:</span> {selectedFlight.tiquete}$</p>
                <p><span className="font-semibold">Sobretasa:</span> {selectedFlight.sobretasa}%</p>
                <p><span className="font-semibold">Impuestos:</span> {selectedFlight.impuestos}%</p>
                {/* Agrega más detalles si es necesario */}
                </div>
            )}
            </div>
        </div>
        )}

      {/* Delete confirmation modal */}
      {deleteConfirmationOpen && (
        <div className='modal fixed inset-0 z-50 overflow-auto bg-gray-500 bg-opacity-50 flex items-center justify-center'>
          <div className='modal-content bg-white rounded-lg p-8 relative'>
            <p>¿Estás seguro de que quieres eliminar este vuelo?</p>
            <div className='buttons'>
              <button onClick={handleDelete} className='bg-red-500 text-white px-4 py-2 mr-2'>
                Eliminar
              </button>
              <button onClick={() => setDeleteConfirmationOpen(false)} className='bg-gray-500 text-white px-4 py-2'>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default FlightList;