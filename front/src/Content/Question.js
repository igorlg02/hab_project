import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import GetAnswers from './GetAnswers';
import PostAnswer from './PostAnswer';
import Moment from 'react-moment';
import './Question.css'



function Question() {

    const login = useSelector(state => state.login)

    const [data, setData] = useState()
    const [tags, setTags] = useState([])

    console.log(`Tags: ${tags}`);

    if (login) console.log(`*GetUserProfile* - Usuario registrado con el ID: ${login.userID}, username: ${login.username} y rol: ${login.role} `);

    // Ejecutar fetch al cargar la página
    useEffect(async () => {

        // Enviar consulta a la API
        const res = await fetch(

            // Dirección
            `http://localhost:3001/questions/${questionID}`,
            // Contenido
            {
                headers: { 'Content-Type': 'application/json', auth: login.token },
                method: 'GET'
            })

        const data = await res.json();
        setData(data)
        setTags(data.tags.split(','))

        console.log(`Resultado de la búsqueda: ${JSON.stringify(data)}`)

    }, [])

    // Obtener id de la pregunta
    const { questionID } = useParams()
    console.log(`Buscando la pregunta con ID: ${questionID}`);

    if (!data) return 'Loading ...'

    return (
<<<<<<< HEAD
        <div className="question-main" key={data.id}>
=======

        <div key={data.id}>
>>>>>>> d8c8f9e894d64467ca711bb234116b0f009cc3e4
            <div>
                <Moment format='YYYY/MM/DD'>
                    {data.creationDate}
                </Moment> 
            </div>
            <h2 className="question title"> {data.title}
            </h2>
            <div className="question body">
                {data.body}
            </div>
            <div className='question tags'>
                {tags && tags.map(tag => 
                    <a href={'http://localhost:3001/questions?tags=' + tag}>
                    {tag}
                </a>
                )}

            </div>
            <div>
            <h4>Respuestas:</h4>
                <GetAnswers />
                <PostAnswer />
            
            </div>
        </div>

    )
}


export default Question;