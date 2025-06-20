// DUMMY DATA FOR DEVELOPMENT TESTING PURPOSES

import { sql } from "../config/db.js";

const SAMPLE_TASKS = [
  {
    name: "Summon & Complaints",
    notes: 'SC20' ,
    due_date:
      "6/26/25",
  },
  {
    name: "PD",
    notes: '4 Matters' ,
    due_date:
      "6/26/25",
  },
  {
    name: "Calendar",
    notes: '6/30 - 7/4' ,
    due_date:
      "6/20/25",
  },{
    name: "Neetcode",
    notes: 'Two Sums' ,
    due_date:
      "6/22/25",
  },
  {
    name: "Neetcode",
    notes: 'Group Anagram' ,
    due_date:
      "6/2/25",
  }
];

async function seedDatabase() {
  try {
    // first, clear existing data
    await sql`TRUNCATE TABLE tasks RESTART IDENTITY`;

    // insert all tasks
    for (const task of SAMPLE_TASKS) {
      await sql`
        INSERT INTO tasks (name, notes, due_date)
        VALUES (${task.name}, ${task.notes}, ${task.due_date})
      `;
    }

    console.log("Database seeded successfully");
    process.exit(0); // success code
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1); // failure code
  }
}

seedDatabase();