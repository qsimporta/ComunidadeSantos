import React from 'react';
import {connect} from 'react-redux';
import {BottomNavigation, BottomNavigationAction, Grid, Button} from "@material-ui/core";
import MoodIcon from "@material-ui/icons/Mood";
import SubjectIcon from "@material-ui/icons/Subject";
import LockOpen from "@material-ui/icons/LockOpen";
import {makeStyles} from "@material-ui/core/styles";
import UsuarioDAO from "../DAOs/UsuarioDAO";
import {useHistory} from 'react-router-dom';
import TextField from "@material-ui/core/TextField";
import "./AccountPage.sass"

const AccountPage = props => {

    const [value, setValue] = React.useState(2)
    const [errorPassword, setErrorPassword] = React.useState(false)
    const [loading, setLoading] = React.useState(false)

    const story = useHistory()

    const useStyles = makeStyles({
        root: {
            position: 'fixed',
            bottom: '5px',
            width: '100%'
        }
    })

    const onSubmit = async e => {
        e.preventDefault()

        const form = e.target

        const login = {
            email: form.email.value,
            senha: form.senha.value,
        }

        if (form.senha.value === form.confirm_senha.value) {
            try {
                setLoading(true)
                await UsuarioDAO.createUserWithAuth({...props.userData, email: login.email, senha: login.senha})
                alert("Usuário criado com sucesso! Por favor, aguarde a criação do sistema para inciarmos.");
                story.push('/')
            } catch (e) {
                alert(e);
            }
        } else {
            setErrorPassword(true)
        }
        setLoading(false)
    }

    const classes = useStyles()

    return (
        <div className={'account_page'}>
            <div className={'content'}>
                <h1>Registre-se para fazer Login</h1>
                <form onSubmit={onSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            name={'email'}
                            label={'E-mail'} variant={'outlined'}
                            placeholder={'Exemplo: joao@mail.com'} required/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            name={'senha'}
                            type={'password'}
                            label={'Senha'} variant={'outlined'}
                            placeholder={'Informe aqui sua senha.'} required/>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            error={errorPassword}
                            fullWidth
                            helperText={errorPassword ? 'Senhas não conferem': ''}
                            type={'password'}
                            name={'confirm_senha'}
                            label={'Confirmar Senha'} variant={'outlined'}
                            placeholder={'Reinsira sua senha'} required/>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            disabled={loading}
                            type={'submit'}
                            color={'primary'}
                            fullWidth
                            variant={'contained'}>
                            Finalizar Cadastro
                        </Button>
                    </Grid>
                </Grid>
                </form>

            </div>
            <BottomNavigation
                value={value}
                showLabels
                className={classes.root}
            >
                <BottomNavigationAction label="Bem-Vindo" icon={<MoodIcon/>}/>
                <BottomNavigationAction label="Cadastro" icon={<SubjectIcon/>}/>
                <BottomNavigationAction label="Conta" icon={<LockOpen/>}/>
            </BottomNavigation>
        </div>
    );
}

const mapStateToProps = state => ({
    userData: state.general.userData,
});
const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(AccountPage);
