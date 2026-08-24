import type { FormEvent } from "react";
import { useState } from "react";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import { cadastrar } from "../../services/usuario.service";
import styles from "./Cadastro.module.css";

interface CadastroProps {
  onIrParaLogin: () => void;
}

function Cadastro({ onIrParaLogin }: CadastroProps) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState(false);
  const [carregando, setCarregando] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setErro("");
    setCarregando(true);

    try {
      const resposta = await cadastrar({ email, senha });
      console.log("Cadastro OK:", resposta);
      setSucesso(true);
    } catch (error) {
      console.error("Erro ao criar conta:", error);
      setErro("Erro ao criar conta. Tente outro email.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className={styles.title}>Criar conta</h1>

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
        {sucesso && (
          <p className={styles.sucesso}>Conta criada! Já pode entrar.</p>
        )}

        <Button type="submit" disabled={carregando}>
          {carregando ? "Criando..." : "Criar conta"}
        </Button>

        <p className={styles.link} onClick={onIrParaLogin}>
          Já tem conta? Entrar
        </p>
      </form>
    </div>
  );
}

export default Cadastro;
