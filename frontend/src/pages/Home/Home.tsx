import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import { useAuth } from "../../contexts/useAuth";
import styles from "./Home.module.css";

function Home() {
  const navigate = useNavigate();
  const { usuario, logout } = useAuth();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <p>Olá, {usuario?.email}</p>
        <Button onClick={handleLogout}>Sair</Button>
      </header>

      <main className={styles.content}>
        <h1>Página inicial</h1>
        <p>Aqui vamos construir os módulos: financeiro, mercado e tarefas.</p>
      </main>
    </div>
  );
}

export default Home;
