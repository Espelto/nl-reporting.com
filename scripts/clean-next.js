const fs = require('fs')
const path = require('path')

const dir = path.join(__dirname, '..', '.next')

try {
  fs.rmSync(dir, { recursive: true, force: true })
  console.log('Removed .next cache')
} catch (err) {
  if (err.code === 'EBUSY' || err.code === 'EPERM') {
    console.error(
      'Could not delete .next — stop the dev server first (Ctrl+C in the terminal running npm run dev), then run: npm run clean'
    )
    process.exit(1)
  }
  if (err.code !== 'ENOENT') throw err
}
