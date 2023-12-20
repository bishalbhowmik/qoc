import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'

import { createModuleApi, getModulesApi } from '../../../Api/Admin/ModuleApi'


export const StudentChapter = (props) => {

    const location = useLocation()
    const [modules, setModules] = useState([])
    const [state, setState] = useState({
        module: '',
        paid: false
    })

    useEffect(() => {

        if (location.state) {

            let { chapter } = location.state

            getModulesApi(chapter._id).then(data => {
                if (data.error) throw data.message
                setModules([...data.data])
            }).catch(err => {
                console.log(err)
            })
        }

    }, [location]);


    
    let moduleShow
    if (modules.length === 0) {
        moduleShow = <div className='p-40 text-center col-span-12'>Not module found</div>
    }
    else {
        moduleShow = modules.map((item, index) => {
            return (
                <Link to='/student-dashboard/module' state={{ module: item }} className='card col-span-3 glass bg-inherit hover:bg-slate-600 hover:text-white '>
                    <div className="card-body items-center">
                        <div className="card-title text-center">{item.module}</div>
                    </div>
                </Link>
            )
        })
    }



    return (
        <div>


            <div className='my-10 text-2xl text-center font-bold'>Chapter: {location.state ? location.state.chapter.chapter : ''}</div>

            <div className='mb-16 text-xl text-center'> <span className='bg-red-800 p-3 text-white rounded'>All MODULES</span></div>


            <div className='grid gap-10 grid-cols-12 mt-10'>
                {moduleShow}
            </div>

            <div>

                <div className='text-center my-20 text-xl'> <span className='bg-red-800 p-3 text-white rounded'>MATERIALS</span></div>

                {location.state ? location.state.chapter.materials.map(item => {
                    return (<div className='card glass my-10 m-auto'>
                        <div className="card-body">
                            {item.name}
                        </div>
                    </div>)
                }) : ''}

            </div>

        </div>
    )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(StudentChapter)