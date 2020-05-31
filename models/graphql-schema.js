const casesController = require('../controllers/cases-controller');

// Importando Tipos para o Schema do GraphQL
const {
  GraphQLSchema,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
} = require('graphql');

/************************************
 * Schema de Keys usadas no GraphQL *
 ************************************/

/**
 * Schema da chave "cases"
 */

// Chaves de "growthRate"
const growthRateKeyType = new GraphQLObjectType({
  name: 'growthRateKey',
  fields: {
    confirmed: {
      type: GraphQLString,
    },
    deaths: {
      type: GraphQLString,
    },
    recovered: {
      type: GraphQLString,
    },
  },
});

// Chaves de "in24HoursType"
const in24HoursTypeKeyType = new GraphQLObjectType({
  name: 'in24HoursTypeKey',
  fields: {
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

// Chaves de "cases"
const casesKeyType = new GraphQLObjectType({
  name: 'casesKey',
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

/**
 * Schema da chave "casesSummary"
 */

// Chaves de "date"
const dateKeyType = new GraphQLObjectType({
  name: 'dateKey',
  fields: {
    firstDate: {
      type: GraphQLString,
    },
    lastDate: {
      type: GraphQLString,
    },
  },
});

// Chaves de "growthRate"
const growthRateSummaryKeyType = new GraphQLObjectType({
  name: 'growthRateSummaryKey',
  fields: {
    confirmed: {
      type: GraphQLFloat,
    },
    deaths: {
      type: GraphQLFloat,
    },
    recovered: {
      type: GraphQLFloat,
    },
  },
});

// Chaves de "inBetweenDays"
const inBetweenDaysKeyType = new GraphQLObjectType({
  name: 'inBetweenDaysKey',
  fields: {
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

// Chaves de "casesSummary"
const casesSummaryKeyType = new GraphQLObjectType({
  name: 'casesSummaryKey',
  fields: {
    date: {
      type: dateKeyType,
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
      type: growthRateSummaryKeyType,
    },
    inBetweenDays: {
      type: inBetweenDaysKeyType,
    },
  },
});

/**
 * Schema da chave principal "case"
 */

// Chave principal
const dataCaseKeyType = new GraphQLObjectType({
  name: 'caseKey',
  fields: {
    country: {
      type: GraphQLString,
    },
    cases: {
      type: new GraphQLList(casesKeyType),
    },
    casesSummary: {
      type: casesSummaryKeyType,
    },
  },
});

// Exportando Schema
module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      case: {
        type: new GraphQLList(dataCaseKeyType),
        args: {
          country: {
            type: GraphQLString,
            description: 'Nome do país (em inglês)',
          },
          firstDate: {
            type: GraphQLString,
            description: 'Data inicial',
          },
          lastDate: {
            type: GraphQLString,
            description: 'Data final',
          },
          onlyDate: {
            type: GraphQLString,
            description: 'Unica data',
          },
        },
        async resolve(_, args) {
          let result = await casesController.allDataMap(
            args.country,
            args.firstDate,
            args.lastDate,
            args.onlyDate
          );
          return result;
        },
      },
    },
  }),
});
