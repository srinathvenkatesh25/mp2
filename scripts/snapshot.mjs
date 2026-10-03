// Downloads every meal from TheMealDB (search by first letter a-z) and saves
// the RAW responses to src/data/meals.raw.json. Run with: npm run snapshot
import { writeFile } from 'node:fs/promises'

const BASE = 'https://www.themealdb.com/api/json/v1/1'
const letters = 'abcdefghijklmnopqrstuvwxyz'.split('')

const responses = await Promise.all(
  letters.map(async (letter) => {
    const res = await fetch(`${BASE}/search.php?f=${letter}`)
    if (!res.ok) throw new Error(`Letter ${letter} failed: ${res.status}`)
    const json = await res.json()
    return json.meals ?? []
  }),
)

const meals = responses.flat()
await writeFile('src/data/meals.raw.json', JSON.stringify(meals, null, 2) + '\n')
console.log(`Saved ${meals.length} meals to src/data/meals.raw.json`)
