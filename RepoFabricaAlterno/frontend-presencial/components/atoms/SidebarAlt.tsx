import React from 'react'
import AirlinesIcon from "@mui/icons-material/Airlines";
import Link from "next/link";

const SidebarAlt = () => {
  return (
    <aside
      className="bg-[#CFD1E0]
          flex flex-col
          justify-between items-start
          h-full p-10 gap-20"
    >

      <div className="h-auto">
        <AirlinesIcon className="text-8xl"/>
        <h2 className="font-medium text-4xl">Gestionar vuelos</h2>
      </div>

      <div className="flex flex-col h-full gap-4">
        <Link href={"/gestion_vuelosB/see-flight"} className="bg-blue-400 w-60 h-10 rounded-md py-2.5 px-6 text-white font-normal text-sm">Ver vuelos</Link>
        <Link href={"/gestion_vuelosB"} className="w-60 h-10 rounded-md py-2.5 px-6 hover:bg-zinc-400 font-normal text-sm" >Crear nuevo vuelo</Link>
      </div>

      <div className="flex flex-col h-auto gap-4">
        <Link href={""} className="w-60 h-10 rounded-md py-2.5 px-6 hover:bg-zinc-400 font-normal text-sm">Perfil</Link>
        <button className="bg-red-300 w-60 h-10 rounded-md py-2.5 px-6 text-red-700 font-normal text-sm text-start">Cerrar sesión</button>
      </div>


    </aside>
  )
}

export default SidebarAlt
