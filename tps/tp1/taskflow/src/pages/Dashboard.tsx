import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '../store'
import { logout } from '../features/auth/authSlice'

import Sidebar from '../components/Sidebar'
import MainContent from '../components/MainContent'
import ProjectForm from '../components/ProjectForm'
import ProjectCard from '../components/ProjectCard'
import HeaderBS from '../components/HeaderBS'
import styles from './Dashboard.module.css'

import useProjects from '../hooks/useProjects'

export default function Dashboard() {
  console.log('Dashboard re-render')

  const dispatch = useDispatch()
  const { user } = useSelector((state: RootState) => state.auth)

  const {
    projects,
    columns,
    loading,
    error,
    addProject,
    renameProject,
    deleteProject
  } = useProjects()

  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [showForm, setShowForm] = useState(false)

  if (loading) return <div className={styles.loading}>Chargement...</div>

  return (
    <div className={styles.layout}>

      <HeaderBS
        title="TaskFlow"
        onMenuClick={() => setSidebarOpen(p => !p)}
        userName={user?.name}
        onLogout={() => dispatch(logout())}
      />

      <div className={styles.body}>

        <Sidebar projects={projects} isOpen={sidebarOpen} />

        <div className={styles.content}>

          <div className={styles.toolbar}>
            {error && <div className={styles.error}>{error}</div>}

            {!showForm ? (
              <button
                className={styles.addBtn}
                onClick={() => setShowForm(true)}
              >
                + Nouveau projet
              </button>
            ) : (
              <ProjectForm
                submitLabel="Créer"
                onSubmit={(name, color) => {
                  addProject(name, color)
                  setShowForm(false)
                }}
                onCancel={() => setShowForm(false)}
              />
            )}
          </div>

          <div className={styles.projectsSection}>
            <h2>Projets</h2>
            <div className={styles.projectList}>
              {projects.map(p => (
                <ProjectCard
                  key={p.id}
                  project={p}
                  onRename={renameProject}
                  onDelete={deleteProject}
                />
              ))}
            </div>
          </div>

          <MainContent columns={columns} />

        </div>
      </div>
    </div>
  )
}