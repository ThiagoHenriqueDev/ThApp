import type { FormEvent } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import { useAuth } from "../../contexts/useAuth";
import { login as loginApi } from "../../services/auth.service";
import styles from "./Login.module.css";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setErro("");
    setCarregando(true);

    try {
      const resposta = await loginApi({ email, senha });
      login(resposta.usuario, resposta.token);
      navigate("/home");
    } catch (error) {
      console.error("Erro ao logar:", error);
      setErro("Email ou senha inválidos");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className={styles.title}>Entrar</h1>

        <Input
          id="email"
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <Input
          id="senha"
          label="Senha"
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />

        {erro && <p className={styles.erro}>{erro}</p>}

        <Button type="submit" disabled={carregando}>
          {carregando ? "Entrando..." : "Entrar"}
        </Button>

        <p className={styles.link} onClick={() => navigate("/cadastro")}>
          Não tem conta? Criar conta
        </p>
      </form>
    </div>
  );
}

export default Login;
