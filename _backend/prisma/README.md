# Prisma GraphQL Backend

Quickstart https://www.prismagraphql.com/docs/quickstart/

`npm install -g prisma`

`prisma deploy`

Your GraphQL database endpoint is live:

HTTP: https://eu1.prisma.sh/public-stormscribe-426/react-native-academy-backend/dev
WS: wss://eu1.prisma.sh/public-stormscribe-426/react-native-academy-backend/dev

Token:

```
HTTP Headers:
{
  "Authorization": "Bearer your_token"
}
```

Create post with user:

```
mutation {
  createPost (data: {title: "Skusobny", text: "haaha", isPublished: true, author: {
    create: {
      email: "jurosh@gmail.com",
      password: "nepoviem",
      name: "Juraj"
    }
  }}) {
    title
  }
}
```
