import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

import { LowSync } from 'lowdb'
import { JSONFile, JSONFileSync } from 'lowdb/node'

// File path
const __dirname = dirname(fileURLToPath(import.meta.url));
const file = join(__dirname, 'db.json')

// Configure lowdb to write to JSONFile
const adapter = new JSONFileSync(file)
const db = new LowSync(adapter)

// Read data from JSON file, this will set db.data content
db.read()
// set one dog example as defaults
db.data = db.data || { dogs: [{ name: 'Bella', age: 2, breed: 'Labrador', pfp: 'https://images.unsplash.com/photo-1616489953388-8e1f2e1b2b1c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' }] }

db.write()

export default db