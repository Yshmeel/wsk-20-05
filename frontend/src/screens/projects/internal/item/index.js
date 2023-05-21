import styles from './index.module.css'
import {Link} from "react-router-dom"

const ProjectsItem = (props) => {
    const {
        projectID,
        name,
        active = false,
    } = props;

    return (
        <Link to={`/project/${projectID}`} className={styles.root}>
            <span className={styles.name}>{name}</span>
        </Link>
    )
};

export default ProjectsItem;
