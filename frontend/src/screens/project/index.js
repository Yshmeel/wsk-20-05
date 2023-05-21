import React, {useCallback, useContext, useEffect, useRef, useState} from 'react'
import styles from './index.module.css'
import {useNavigate, useParams} from "react-router"
import projectsRequests from "../../services/http/projects"
import AppContext from "../../contexts/app.context"
import Header from "../../containers/header"
import Button from "../../components/button"
import Input from "../../components/input"

const ProjectScreen = () => {
    const [init, setInit] = useState(false);
    const [project, setProject] = useState(null);

    const navigate = useNavigate();
    /**
     * @type {{
     *     authorized: boolean
     * }}
     */
    const context = useContext(AppContext);
    const params = useParams();

    const timeoutRef = useRef(null);

    useEffect(() => {
        if(!context.authorized) {
            navigate("/");
            return;
        }

        setInit(false);

        (async function() {
            try {
                const response = await projectsRequests.one(params.id);

                setProject(response.data.data);
                setInit(true);
            } catch(e) {
                navigate('/');
                console.error(e);
            }
        }());
    }, [params.id]);

    const changeName = useCallback(async () => {
        try {
            await projectsRequests.editName(project.id, project.name);
        } catch(e) {
            console.error(e);
        }
    }, [project]);

    const triggerChange = useCallback(() => {
        window.clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            changeName();
        }, 1000);
    }, [project, changeName]);

    const onChangeProjectName = useCallback((ev) => {
        setProject((prev) => {
            return {
                ...prev,
                name: ev.target.value
            };
        });

        triggerChange();
    }, [setProject, changeName]);

    const rootClassName = `${styles.root} ${(init ? styles.ready : '')}`;

    return (
        <>
            <Header pageName={project ? `Project with name ${project?.name}` : `Project`}
                    additionalButton={null}
                    backButton={(
                        <Button variant={'danger'}
                                type={'button'}
                                text={'Back'}
                                link={'/'}/>
                    )} />

            <section className={rootClassName}>
                <div className={styles.container}>
                    <div className={styles.form}>
                        <Input type={"text"}
                               label={"Project name"}
                               value={project?.name}
                               onChange={onChangeProjectName} />
                    </div>
                </div>
            </section>
        </>
    );
};

export default ProjectScreen;
