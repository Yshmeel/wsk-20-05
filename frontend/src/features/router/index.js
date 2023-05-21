import React, { useContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import AppContext from '../../contexts/app.context'
import LoginScreen  from '../../screens/login'
import ProjectsScreen from "../../screens/projects"
import ProjectScreen from "../../screens/project"

const Router = () => {
    const context = useContext(AppContext);

    return (
        <Routes>
            <Route path='/' element={context.authorized ? <ProjectsScreen /> : <LoginScreen />} />
            <Route path='/project/:id' element={<ProjectScreen />} />
        </Routes>
    )
};

export default Router;
