import type { FormEvent } from "react";
import { useState } from "react";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import { login } from "../../services/auth.service";
import type { Usuario } from "../../types/usuario";
import styles from "./Login.module.css";

interface LoginProps {
  onIrParaCadastro: () => void;
  onLoginSucesso: (usuario: Usuario) => void;
}

function Login({ onIrParaCadastro, onLoginSucesso }: LoginProps) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setErro("");
    setCarregando(true);

    try {
      const resposta = await login({ email, senha });
      console.log("Login OK:", resposta);
      onLoginSucesso(resposta.usuario);
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

        <p className={styles.link} onClick={onIrParaCadastro}>
          Não tem conta? Criar conta
        </p>
      </form>
    </div>
  );
}

export default Login;
