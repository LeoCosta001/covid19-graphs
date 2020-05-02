const casesController = require("../controllers/cases-controller");

// Importando Tipos para o Schema do GraphQL
const {
  GraphQLSchema,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
} = require("graphql");

/**
 * Schema de Keys usadas no GraphQL
*/

const casesKeyType = new GraphQLObjectType({
  name: "casesKey",
  fields: {
    date: {
      type: GraphQLString,
    },
    confirmed: {
      type: GraphQLInt,
    },
    deaths: {
      type: GraphQLInt,
    },
    recovered: {
      type: GraphQLInt,
    },
  },
});

// Exportando Schema
module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
      case: {
        type: new GraphQLList(casesKeyType),
        args: {
          country: {
            type: GraphQLString,
            description: "Nome do país (em inglês)",
          },
        },
        async resolve(_, args) {
          let result = await casesController.countryCases(args.country);
          return result;
        },
      },
    },
  }),
});
