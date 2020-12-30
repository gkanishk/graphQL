# graphQL
just tried to make hands dirty with graphQL

# Requirements:
- Node.js

# Installation:

First clone this repository as:
```
git clone https://github.com/gkanishk/graphQL
cd graphQL
npm install
npm run devStart
open:
http://localhost:3000/
```
## Run queries:

Example:
```
query{
  ratings{
    value,
    description
  },
  frameworks{
    id,
    name,
    rating,
    ratingDesc{
      description
    }
  },
  rating(value:2){
    description,
    value
  },
  framework(id:2){
    name
  }
}
```
## Mutation:

Example:

```
mutation{
  addFramework(name:"Nextjs",rating:4){
    name
  }
}
```
