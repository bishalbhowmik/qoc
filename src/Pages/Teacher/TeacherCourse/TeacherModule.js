import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { createChapterApi, getChaptersApi } from '../../../Api/Admin/ChapterApi'
import { createModuleApi, getModulesApi } from '../../../Api/Admin/ModuleApi'


export const TeacherModule = (props) => {

    const location = useLocation()

    return (
        <div>
            <div className='my-10 text-2xl text-center font-bold'>Module: {location.state ? location.state.module.module : ''}</div>

            <div>

                <div className='text-center my-20 text-xl'> <span className='bg-red-800 p-3 text-white rounded'>MATERIALS</span></div>

                {location.state ? location.state.module.materials.map(item => {
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

export default connect(mapStateToProps, mapDispatchToProps)(TeacherModule)