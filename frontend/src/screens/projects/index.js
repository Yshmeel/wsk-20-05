import React, {useCallback, useContext, useEffect, useMemo, useState} from 'react'
import styles from './index.module.css'
import AppContext from "../../contexts/app.context"
import projectsRequests from "../../services/http/projects"
import ProjectsItem from "./internal/item"
import Button from "../../components/button"
import Header from "../../containers/header"
import { useNavigate } from 'react-router'

const ProjectsScreen = () => {
    const [init, setInit] = useState(false);
    const [projects, setProjects] = useState([]);

    /**
     * @type {{
     *     logout: function
     * }}
     */
    const context = useContext(AppContext);

    const navigate = useNavigate();

    /* Holds active project ID. Used for showcase its data and make actions on active project */
    /* Example action: move to edit screen */
    const [activeProjectID, setActiveProjectID] = useState(null);

    /* Loading projects and then init screen with *fade-in* animation */
    useEffect(() => {
        (async function() {
            try {
                const response = await projectsRequests.list();
                setProjects(response.data.data);

                setActiveProjectID(0);
                setInit(true);
            } catch(e) {
                console.error(e);
            }
        }());
    }, []);

    const renderedList = useMemo(() => {
        return projects.map((project) => (
            <ProjectsItem projectID={project.id}
                          name={project.name}
                          key={`project-${project.id}`} />
        ));
    }, [projects]);

    const createProject = useCallback(async () => {
        try {
            const response = await projectsRequests.create();
            navigate(`/project/${response.data.data.id}`)
        } catch(e) {
            console.error(e);
        }
    }, [navigate]);

    const rootClassName = `${styles.root} ${(init ? styles.ready : '')}`;

    return (
        <>
            <Header pageName={"Projects"}
                    additionalButton={(
                        <Button variant={'success'}
                                type={'button'}
                                text={'Create'}
                                onClick={createProject}/>
                    )}
                    backButton={(
                        <Button variant={'danger'}
                                type={'button'}
                                text={'Logout'}
                                onClick={context.logout}/>
                    )} />

            <section className={rootClassName}>
                <div className={styles.sectionContainer}>
                    <div className={styles.list}>
                        {renderedList}
                    </div>
                </div>
            </section>
        </>
    );
};

export default ProjectsScreen;
