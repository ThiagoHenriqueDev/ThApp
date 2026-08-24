import Button from "../../components/Button/Button";
import type { Usuario } from "../../types/usuario";
import styles from "./Home.module.css";

interface HomeProps {
  usuario: Usuario;
  onSair: () => void;
}

function Home({ usuario, onSair }: HomeProps) {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <p>Olá, {usuario.email}</p>
        <Button onClick={onSair}>Sair</Button>
      </header>

      <main className={styles.content}>
        <h1>Página inicial</h1>
        <p>Aqui vamos construir os módulos: financeiro, mercado e tarefas.</p>
      </main>
    </div>
  );
}

export default Home;
