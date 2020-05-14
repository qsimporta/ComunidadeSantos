import {firebaseAuth, firebaseDatabase} from "../firebase/config";

export interface Usuario {
    nome: string,
    nome_negocio: string,
    ala: string,
    email?: string,
    telefone: string,
    endereco: string,
    tempo_negocio: number,
    faturamento_mensal: number,
    definicao: string,
    oferecimento_produto: string,
    senha?: string,
}

const COLLECTION = 'usuarios'

const UsuarioDAO = {
    createUsuario: async (usuario: Usuario) => {
        if (usuario.email) {
            await firebaseDatabase.collection(COLLECTION).doc(usuario.email).set(usuario);
        } else {
            throw "Não foi inserido e-mail"
        }
    },
    createUserWithAuth: async (usuario: Usuario) => {
        if (usuario.email && usuario.senha) {
            await firebaseAuth.createUserWithEmailAndPassword(usuario.email, usuario.senha)
            let user = {...usuario}
            delete user.senha
            await UsuarioDAO.createUsuario(user)
        } else {
            throw "Não foi inserido Usuário ou Senha"
        }
    }
}

export default UsuarioDAO
