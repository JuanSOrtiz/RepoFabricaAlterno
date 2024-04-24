import React from 'react'
import SidebarAlt from 'components/atoms/SidebarAlt'
import HeaderAlt from 'components/atoms/HeaderAlt'
import Footer from 'components/atoms/Footer'
import FlightList from 'components/molecules/FlightList'

const SeeFlightPage = () => {
  return (
    <>
            <div className="grid grid-cols-5 h-screen bg-slate-50">

                <div className="row-[1/15]">
                    <SidebarAlt/>
                </div>
                <div className="col-[2/6] row-[1/3]">
                    <HeaderAlt/>
                </div>
                <div className="col-[2/6] row-[3/14]">
                    <FlightList/>
                </div>
                <div className="col-[2/6] row-[14/15]">
                    <Footer/>
                </div>
                {/*include shared UI here e.g. a header or sidebar*/}
        
        </div>
    </>
  )
}

export default SeeFlightPage