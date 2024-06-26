import ApiService from "../apiservice";
import ErroValidacao from "../exception/ErroValidacao";

class UsuarioService extends ApiService{

    constructor(){
        super('/api/usuarios')
    }

    autenticar(credenciais){
        return this.post('/autenticar', credenciais)
    }

    obterSaldoPorIdUsuario(id){
        return this.get(`/${id}/saldo`)
    }

    salvar(usuario){
        return this.post('/', usuario);
    }

    validar(usuario){
        const erros = []

        if(!this.state.nome){
            erros.push('O campo nome é obrigatório')
        }
        if(!this.state.email){
            erros.push('O campo email é obrigatório')
        }else if (!this.state.email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/)){
            erros.push('Informe um e-mail valido')
        }
        if(!this.state.senha || !this.state.senhaRepeticao){
            erros.push('Digite a senha 2x')
        }else if (this.state.senha !== this.state.senhaRepeticao){
            erros.push('As senhas não são iguais')
        }

        if(erros && erros.length > 0){
            throw new ErroValidacao(erros);
        }
    }

}

export default UsuarioService;