import * as React from 'react';
import {connect} from 'react-redux';
import {Button, BottomNavigation, BottomNavigationAction} from '@material-ui/core'
import "./IntroductionPage.sass"
import {makeStyles} from "@material-ui/core/styles";
import {useHistory, Link} from 'react-router-dom'
import MoodIcon from '@material-ui/icons/Mood'
import SubjectIcon from '@material-ui/icons/Subject'
import LockOpen from '@material-ui/icons/LockOpen'

const IntroductionPage = props => {

 const story = useHistory()
 const [value, setValue] = React.useState(0)

    const useStyles = makeStyles({
        root: {
            position: 'fixed',
            bottom: '5px',
            width: '100%'
        }
    })

    const classes = useStyles()

 return (
   <div className={'intro_page'}>
       <div className={'content'}>
       <h1>Bem-Vindos</h1>
       <p>Ao programa <b>Comunidade dos Santos</b>! Nós estaremos recolhendo
            informações de membros empreendedores, lojistas, informais, prestadores de serviço, e afins com um
            intuito, de fazer com que possamos crescer como Igreja e como comunidade visando fortalecer a autossuficiência
            nesse período de crise.</p>
     <Button variant={'contained'}
             color={'primary'}
             onClick={() => story.push('/register')}>Começar cadastro</Button>
           <p style={{fontSize: '1.2em'}}>Já é cadastrado? <Link to={'/'}>Fazer Login</Link></p>
       </div>
        <BottomNavigation
           value={value}
           showLabels
           className={classes.root}
       >
           <BottomNavigationAction label="Bem-Vindo" icon={<MoodIcon />} />
           <BottomNavigationAction label="Cadastro" icon={<SubjectIcon />} />
           <BottomNavigationAction label="Conta" icon={<LockOpen />} />
       </BottomNavigation>
   </div>
 );
}

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(IntroductionPage);
