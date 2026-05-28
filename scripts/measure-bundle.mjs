import { readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const assetsDir = join(process.cwd(), 'dist', 'assets')

const files = readdirSync(assetsDir)
  .filter((file) => file.endsWith('.js'))
  .map((file) => {
    const filePath = join(assetsDir, file)
    const sizeBytes = statSync(filePath).size
    return {
      file,
      sizeKb: Number((sizeBytes / 1024).toFixed(2)),
    }
  })
  .sort((a, b) => b.sizeKb - a.sizeKb)

const entryFile =
  files.find((item) => item.file.startsWith('index-')) ?? files[0]

const baseline = JSON.parse(
  readFileSync(join(process.cwd(), 'bundle-stats', 'baseline.json'), 'utf8'),
)

const entryJsKb = entryFile?.sizeKb ?? 0
const reductionPercent = Number(
  (((baseline.entryJsKb - entryJsKb) / baseline.entryJsKb) * 100).toFixed(1),
)

const optimized = {
  label: 'Après code splitting (TP5)',
  entryJsKb,
  chunks: files.length,
  entryReductionPercent: reductionPercent,
  files,
  generatedAt: new Date().toISOString(),
}

writeFileSync(
  join(process.cwd(), 'bundle-stats', 'optimized.json'),
  `${JSON.stringify(optimized, null, 2)}\n`,
)

console.log(`Entrée initiale: ${entryJsKb} kB`)
console.log(`Réduction vs baseline: ${reductionPercent}%`)
