import * as React from 'react';
import {connect} from 'react-redux';
import {BottomNavigation, BottomNavigationAction, MenuItem, Grid, InputAdornment, Button} from "@material-ui/core";
import MoodIcon from "@material-ui/icons/Mood";
import SubjectIcon from "@material-ui/icons/Subject";
import LockOpen from "@material-ui/icons/LockOpen";
import {makeStyles} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import "./RegisterPage.sass"
import {Usuario} from "../DAOs/UsuarioDAO";
import {Actions} from "../redux/actions/actions";
import {useHistory} from 'react-router-dom';

const RegisterPage = props => {

    const [value, setValue] = React.useState(1)
    const [ala, setAla] = React.useState("Guarany")
    const [tempo, setTempo] = React.useState(1)
    const story = useHistory()

    const useStyles = makeStyles({
        root: {
            position: 'fixed',
            bottom: '4px',
            left: 0,
            backgroundColor: '#FFF',
            zIndex: 1001,
            width: '100%'
        },
        textField: {
            marginBottom: '10px'
        }
    })

    const arrayTempoNegocio = () : Array<{value: number, label: string}> => {
        let array = []
        let maxYears = 5
        //@ts-ignore
        array.push({value: 6, label: 'Mais de 5 anos'})
        for (let i = maxYears; i > 0; i--) {
            if (i != 1) {
                //@ts-ignore
                array.push({value: i, label: i+' anos'})
            } else {
                //@ts-ignore
                array.push({value: i, label: i+' ano'})
            }
        }
        for (let i = 11; i > 2; i--) {
            //@ts-ignore
            array.push({value: i / 100, label: i + ' meses'})
        }
        //@ts-ignore
        array.push({value: 2 / 100, label: 'menos de 3 meses'})

        return array;
    }

    let tempoNegocio = arrayTempoNegocio()

    const alas = ["Guarany", "Cidade Nova", "Canaranas", "Campo Dourado", "Monte Sinai", "Riacho Doce"]
    const classes = useStyles()

    const onSubmitForm = e => {
        e.preventDefault()
        const form = e.target

        const userData : Usuario = {
            nome: form.nome.value,
            ala: form.ala.value,
            nome_negocio: form.nome_negocio.value,
            telefone: form.telefone.value,
            endereco: form.endereco.value,
            tempo_negocio: form.tempo_negocio.value,
            definicao: form.definicao.value,
            faturamento_mensal: form.faturamento_mensal.value,
            oferecimento_produto: form.oferecimento_produto.value,
        }

        props.setUserData(userData)

        story.push('/account')
    }

    // @ts-ignore
    return (
        <div className={'register_page'}>

            <h1>Cadastro de Membro Empreendedor</h1>
            <p>Preencha seus dados abaixo para fazer parte de nossa base de dados para que possamos adicionar você como prestador de serviços e fazer parte da comunidade dos santos!</p>
            <form onSubmit={onSubmitForm}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField fullWidth
                                   name={'nome'}
                            className={classes.textField} label={'Nome'} variant={'outlined'}
                                   placeholder={'Exemplo: João Silva'} required/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            name={'nome_negocio'}
                            fullWidth className={classes.textField} label={'Nome do Negócio'} variant={'outlined'}
                                   placeholder={'Exemplo: João Gás e Água'} required/>
                    </Grid>
                </Grid>
                <TextField
                    className={classes.textField}
                    select
                    label={'Ala'}
                    value={ala}
                    name={'ala'}
                    onChange={(e) => setAla(e.target.value)}
                    variant={'outlined'}
                    placeholder={'Exemplo: João Gás e Água'}
                    required>
                    {alas.map((ala, index) =>
                        <MenuItem
                            value={ala}
                            key={index}>
                            {ala}
                        </MenuItem>)}
                </TextField>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            name={'telefone'}
                            fullWidth
                            className={classes.textField}
                            label={'Telefone'} variant={'outlined'} placeholder={'Exemplo: 99999-9999'} required/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            name={'email'}
                            fullWidth
                            className={classes.textField}
                            label={'E-mail'} variant={'outlined'} placeholder={'Exemplo: joao@mail.com'} required/>
                    </Grid>
                </Grid>
                <TextField
                    name={'endereco'}
                    className={classes.textField}
                    label={'Endereço'} variant={'outlined'} placeholder={'Exemplo: R. 42, nº 0'} required/>
                <TextField
                    className={classes.textField}
                    select
                    name={'tempo_negocio'}
                    label={'Tempo de Negócio'}
                    value={tempo}
                    onChange={(e) => {
                        //@ts-ignore
                        setTempo(e.target.value)
                    }}
                    variant={'outlined'}
                    placeholder={'Exemplo: João Gás e Água'}
                    required>
                    {tempoNegocio.map((tempo, index) =>
                        <MenuItem
                            value={tempo.value}
                            key={index}>
                            {tempo.label}
                        </MenuItem>)}
                </TextField>
                <TextField
                    className={classes.textField}
                    name={'definicao'}
                    label={'Definição do Produto ou Serviço'} variant={'outlined'} placeholder={'Defina, com detalhes, todos os' +
                ' detalhes de seu produto ou seviço cujo o qual você oferece.'} required multiline/>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            name={'faturamento_mensal'}
                            fullWidth
                            className={classes.textField}
                                   InputProps={{
                                       startAdornment: <InputAdornment position={'start'}> R$ </InputAdornment>
                                   }}
                            label={'Faturamento Mensal Médio'} variant={'outlined'} type={'number'} placeholder={'Exemplo: 2382,32'} required/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                                    name={'oferecimento_produto'}
                                    fullWidth
                                   className={classes.textField}
                                   label={'Oferecimento do Produto'} variant={'outlined'} placeholder={'Exemplo: Produto Virtual, Físico ou Delivery'} required/>
                    </Grid>
                </Grid>
                <Button type={'submit'} variant={'contained'} color={'primary'}>
                    Confirmar Cadastro
                </Button>
            </form>
            <div className={'content'}>
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
        </div>
    );
}

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({
    setUserData: userData =>
        dispatch({type: Actions.setUserData, payload: userData})
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
