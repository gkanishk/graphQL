var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var graphql = require('graphql');
const { GraphQLSchema, GraphQLInterfaceType, GraphQLObjectType, GraphQLNonNull, GraphQLInt, GraphQLString, GraphQLList } = require('graphql');

const app = express();

const data=[
    {
        id: 1,name: 'React',rating: 5
    },
    {
        id: 2,name: 'Angular', rating: 4
    },
    {
        id: 3,name: 'Vue', rating:4
    },
    {
        id: 4,name: 'PHP', rating:1
    }
];

const ratings=[
    {
        value: 1, description: 'NOt much popular its a kick'
    },
    {
        value: 2, description: 'Ok not that great'
    },
    {
        value: 3, description: 'Good to go'
    },
    {
        value: 4, description: 'Has good number of stars and high scalibility'
    },
    {
        value: 5, description: 'Kyahi kahena GOD level'
    }
]

// const schema = new GraphQLSchema({
//     query: new GraphQLObjectType({
//         name: 'Test',
//         fields:()=>({
//             message:{
//                 type: graphql.GraphQLString,
//                 resolve:()=> "Hello Kanishk"
//             }
//         })
//     })
// })

// app.use('/',()=>{
//     return "Hello"
// })

const FrameworkType = new GraphQLObjectType({
    name: 'Framework',
    description: 'Frameworks collection',
    fields:()=>({
        id: {type: GraphQLNonNull(GraphQLInt)},
        name: { type: GraphQLNonNull(GraphQLString) },
        rating: { type: GraphQLNonNull(GraphQLInt)},
        ratingDesc: {
            type: RatingType,
            resolve: (data)=>{
                return ratings.find(rating=> rating.value===data.rating)
            }
        }
    })
});

const RatingType = new GraphQLObjectType({
    name: 'Ratings',
    description: 'Ratings description collection',
    fields:()=>({
        value: {type: GraphQLNonNull(GraphQLInt)},
        description: { type: GraphQLNonNull(GraphQLString) },
        frameworks: {
            type: new GraphQLList(FrameworkType),
            resolve: (ratings)=>{
                return data.filter(rating=> rating.rating===ratings.value);
            }
        }
    })
})

const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root query',
    fields:()=>({
        framework:{
            type: FrameworkType,
            description: 'Framework single data',
            args: {
                id:{type: GraphQLInt}
            },
            resolve:(parent,args)=> data.find(framework=>framework.id==args.id)
        },
        frameworks:{
            type: new GraphQLList(FrameworkType),
            description: 'Data for framework',
            resolve:()=> data
        },
        ratings:{
            type: new GraphQLList(RatingType),
            description: 'Data for rating',
            resolve:()=> ratings
        },
        rating:{
            type: RatingType,
            description: 'rating single data',
            args: {
                value:{type: GraphQLInt}
            },
            resolve:(parent,args)=> ratings.find(rating=>rating.value==args.value)
        },
    })
})

const mutationType = new GraphQLObjectType({
    name: 'Mutation',
    description: 'Root mutation types',
    fields: ()=>({
        addFramework: {
            type: FrameworkType,
            description: 'Add frameword',
            args: {
                name: { type: GraphQLNonNull(GraphQLString)},
                rating: { type: GraphQLNonNull(GraphQLInt)}
            },
            resolve: (parent,args)=>{
                const framework = {id: data.length+1, name: args.name, rating: args.rating};
                data.push(framework);
                return framework
            }
        }
    })
})

const schema = new GraphQLSchema({
    query: RootQueryType,
    mutation: mutationType
})

app.use('/', graphqlHTTP({
    schema: schema,
    graphiql: true,
  }));

app.listen(3000,()=>console.log("GraphQL Server is running"));