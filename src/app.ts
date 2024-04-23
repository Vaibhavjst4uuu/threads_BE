import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";

const app = express();
const port = process.env.PORT || 8000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const GQLserver = new ApolloServer({
  typeDefs: `
  type Query{
    hello: String,
    say(msg:String): String
  }
  `,
  resolvers: {
    Query: {
      hello:(abc)=> {
        return "Hello World!";
      },
      say: (_, { msg }) => `You said ${msg}`,
      },
  },
});

async function Startgqlserver() {
  await GQLserver.start();
  console.log(`Apollo Server on localhost:${port}/graphql`);
  app.use("/graphQL", expressMiddleware(GQLserver));
}

Startgqlserver().catch((err) => console.error("Error starting server", err));
app.get("/", (req, res) => {
  res.json({ msg: "hello buddy" });
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
