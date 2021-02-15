// Módulos
const questionValidation = require ('../../validators/questionValidation')

// Queries
const getQuestionQuery = require ('../../queries/getQuestionQuery')
const performQuery = require ('../../db/performQuery')



const createQuestionQuery = async data => {

    const query = 
    
        `
        
            INSERT INTO questions (

                userID,
                title,
                body,
                file,
                languages,
                tags,
                creationDate,
                updateDate

            )

            VALUES (

                ${data.userID},
                '${data.title}',
                '${data.body}',
                '${data.file}',
                '${data.languages}',
                '${data.tags}',
                UTC_TIMESTAMP,
                UTC_TIMESTAMP

            )
        
        `

    const result = await performQuery(query) 
    return result

}

const createQuestion = async (req, res) => {

    console.log('*Create Question*');

    let query;
    let question;

    try {

        /*
            Obtener, validar y corregir los datos &
            crear objeto reqData. Contiene:

                - title
                - body
                - languages
                - tags

        */
        
        const reqData = await questionValidation.validateAsync(req.body, {abortEarly: false})

        // Comprobar si la pregunta ya existe en BD
        
            // Crear objeto title
            let title = reqData.title
            title = { title }

            // Obtener query
            query = await getQuestionQuery (title)

            // Enviar query
            question = ( await performQuery (query) ) [0]

            // Enviar un error si ya existe
            if(question) {
            
                throw new Error ('Question Already Registered')
            
            }

        // Procesar los datos

            // Añadir el ID del usuario
            reqData.userID = req.auth.userID
        
        // Enviar a BD
        const result = await createQuestionQuery (reqData)

        // Error
        if (!result) {

            throw new Error ('Database Error')

        }

        console.log(`Successfully Inserted. Affected Rows: ${result.affectedRows}`);

    } catch (e) {

        console.log(`Error Creating Question: ${e.message}`);
        res.status(400).send(e.message)
        return

    }

    res.send('Your question is posted')

}

module.exports = createQuestion