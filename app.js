const PORT = 3000;
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const graphqlHTTP = require('express-graphql');
const graphqlSchema = require('./models/graphql-schema');

// Configurações

    // Body Parser
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    // Morgan
    app.use(morgan('tiny'));

    // Cors
    app.use(cors());

    // GraphQL
    app.use('/graphql', graphqlHTTP ({
      schema: graphqlSchema,
      graphiql: true
    }));

// Arquivos estáticos
// app.use('/dist', express.static(path.join(__dirname, 'dist')));

// Porta
app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});
