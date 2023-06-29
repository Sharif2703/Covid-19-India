const express = require("express");
const app = express();
const sqlite = require("sqlite");
const sqlite3 = require("sqlite3");
const { open } = sqlite;
const path = require("path");
const dbPath = path.join(__dirname, "covid19India.db");
db = null;
app.use(express.json());

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("Server Running at http://localhost:3000");
    });
  } catch (error) {
    console.log(`DB Error:${error.message}`);
    process.exit(1);
  }
};

initializeDBAndServer();

//Returns a list of all states in the state table
//API 1

app.get("/states/", async (request, response) => {
  const stateListQuery = `
    select state_name from state ;
    `;
  const getResponse = await db.all(stateListQuery);
  response.send(getResponse);
});

//Returns a state based on the state ID
//API 2

app.get("/states/:stateId/", async (request, response) => {
  const { stateId } = request.params;
  const stateIdQuery = `
    select * from state where state_id=${stateId};
    `;
  const getResponse = await db.get(stateIdQuery);
  response.send(getResponse);
});
