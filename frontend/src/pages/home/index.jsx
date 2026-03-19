import styles from "./styles.module.scss"

const Homepage = () => {
  return (
    <div>
        <div className={styles.mainBody}>
            <div className={styles.header}>
                <h1>Welcome to Task Management App</h1>
                <p>Manage task all at once</p>
            </div>
        </div>
    </div>
  )
}

export default Homepage