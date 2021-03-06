import QuestionsFilter from "./QuestionsFilter";
import LatestQuestions from "./LatestQuestions";
import './QuestionsPortal.css'
import useFetch from "../useFetch";



// Portal de preguntas
function QuestionsPortal() {

    // Obtener listado de preguntas
    let data = useFetch('http://localhost:3001/questions') || []
    
    // Contador de tags
    let counter = []

    console.log(`data para obtener tags: ${data}`);

    // Obtener tags y contador de tags
    if (data.length >= 1) {

        for (const question of data) {

            const questionTags = question.tags.split(',')

            for(const tag of questionTags){

                const index = counter.findIndex(count => count.tag === tag)
                
                if(index === -1) {
                    counter.push({tag, count: 1})
                } else {
                    counter[index].count ++
                }
            }
        }
    }

    return (
        
        // Falta enviar una función a filterquestions 
        // para que al lanzar una búsqueda desaparezca
        // el listado de ultimas preguntas

        <div className="questions-portal">
            <aside className='left-aside'>
                <div className='links'>
                    <a href="">Tags</a>
                    <a href="">Users</a>
                    <a href="">Jobs</a>
                    <a href="">Courses</a>
                    <a href="">Software</a>
                </div>
                <QuestionsFilter />
            </aside>
            <LatestQuestions />
            <aside className='right-aside'>
                <section className='blog'>
                    <h6>Latest Blog Posts:</h6>
                    <ul className='post-list'>
                       <li>
                           <h6>Lorem ipsum dolor sit amet consectetur.</h6>
                           <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Esse exercitationem error placeat...</p>
                       </li>
                       <li>
                           <h6>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi, earum!</h6>
                           <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Esse exercitationem error placeat...</p>
                       </li>
                       <li>
                           <h6>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt optio odio minus?</h6>
                           <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Esse exercitationem error placeat...</p>
                       </li>
                    </ul>
                </section>
                <section className="tags">
                    {counter && counter.map(count =>             
                        <div className='tag-counter'>
                            <a href={'http://localhost:3001/questions?tags=' + count.tag}>
                                {count.tag} 
                            </a>
                            <span>x {count.count}</span>
                        </div>
                    )}
                </section>
            </aside>
        </div >
    );
}


export default QuestionsPortal;
