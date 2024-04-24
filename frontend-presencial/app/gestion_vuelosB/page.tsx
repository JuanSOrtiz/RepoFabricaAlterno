
import Sidebar from 'components/atoms/Sidebar'
import Header from 'components/atoms/Header'
import Form from 'components/molecules/Form'
import Footer from 'components/atoms/Footer'


const page = () => {
    return(
        <>
            <div className="grid grid-cols-5 h-screen bg-slate-50">

                <div className="row-[1/15]">
                    <Sidebar/>
                </div>
                <div className="col-[2/6] row-[1/3]">
                    <Header/>
                </div>
                <div className="col-[2/6] row-[3/14]">
                    <Form/>
                </div>
                <div className="col-[2/6] row-[14/15]">
                    <Footer/>
                </div>
                {/*include shared UI here e.g. a header or sidebar*/}
        
        </div>
    </>
    )
}

export default page;