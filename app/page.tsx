"use client";

import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import "./../app/app.css";
import { Amplify } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import outputs from "@/amplify_outputs.json";
import List from "./component/List";

Amplify.configure(outputs);

export default function App() {
  return (
    <Authenticator>
      <main>
        <h1>My To-Do Lists</h1>
        <List />
      </main>
    </Authenticator>
  );
}
