const casesController = require("../controllers/cases-controller");

// Importando Tipos para o Schema do GraphQL
const {
  GraphQLSchema,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
} = require("graphql");

/************************************
 * Schema de Keys usadas no GraphQL *
 ************************************/
// Chaves de "growthRate"
const growthRateKeyType = new GraphQLObjectType({
  name: "growthRateKey",
  fields: {
    confirmed: {
      type: GraphQLString,
    },
    deaths: {
      type: GraphQLString,
    },
    recovered: {
      type: GraphQLString,
    }
  },
});

 // Chaves de "in24HoursType"
const in24HoursTypeKeyType = new GraphQLObjectType({
  name: "in24HoursTypeKey",
  fields: {
    confirmed: {
      type: GraphQLInt,
    },
    deaths: {
      type: GraphQLInt,
    },
    recovered: {
      type: GraphQLInt,
    }
  },
});

// Chaves de "cases"
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
    growthRate: {
      type: growthRateKeyType,
    },
    in24Hours: {
      type: in24HoursTypeKeyType,
    },
  },
});

// Chave principal
const dataCaseKeyType = new GraphQLObjectType({
  name: "caseKey",
  fields: {
    country: {
      type: GraphQLString,
    },
    cases: {
      type: new GraphQLList(casesKeyType),
    },
  },
});

// Exportando Schema
module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
      case: {
        type: new GraphQLList(dataCaseKeyType),
        args: {
          country: {
            type: GraphQLString,
            description: "Nome do país (em inglês)",
          },
          firstDate: {
            type: GraphQLString,
            description: "Data inicial",
          },
          lastDate: {
            type: GraphQLString,
            description: "Data final",
          }
        },
        async resolve(_, args) {
          let result = await casesController.allDataMap(args.country, args.firstDate, args.lastDate);
          return result;
        },
      },
    },
  }),
});
