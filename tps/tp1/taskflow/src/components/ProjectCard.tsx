import styles from './ProjectCard.module.css';

interface Project {
  id: string;
  name: string;
  color: string;
}

interface ProjectCardProps {
  project: Project;
  onRename: (project: Project) => void;
  onDelete: (id: string) => void;
}

export default function ProjectCard({ project, onRename, onDelete }: ProjectCardProps) {

  return (
    <div className={styles.card}>

      <span
        className={styles.colorDot}
        style={{ background: project.color }}
      ></span>

      <span className={styles.name}>
        {project.name}
      </span>

     <div className={styles.actions}>
  <button 
    className={styles.editBtn}
    onClick={() => onRename(project)}> Modifier</button>

  <button 
    className={styles.deleteBtn}
    onClick={() => onDelete(project.id)}>  Supprimer</button>
</div>

    </div>
  );
}