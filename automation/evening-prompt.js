#!/usr/bin/env node
/**
 * Evening Reflection Prompt
 * Run at 10:00 PM daily
 * Generates reflection questions and prompts for logging
 */

const fs = require('fs')
const path = require('path')

const DATA_DIR = process.env.DATA_DIR || '/home/ubuntu/.openclaw/workspace/data'
const OUTPUT_DIR = process.env.OUTPUT_DIR || '/home/ubuntu/.openclaw/workspace/output'

function generateEveningPrompt() {
  const now = new Date()
  
  const prompt = `# Evening Reflection — ${now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}

Take 5 minutes to reflect on your day. Answer these questions:

## 📊 Daily Review

### 1. What moved the needle today?
*(Business, health, relationships — what actually mattered?)*

> 

### 2. What got in the way?
*(Distractions, obstacles, energy drains)*

> 

### 3. Energy (1-10): ___
### 4. Focus (1-10): ___
### 5. Mood (3 words): ___ ___ ___

## ✅ Check-ins

### Training completed? [ ] Yes [ ] No
If yes, log your session details:
- Exercises:
- Sets/Reps:
- RPE (effort 1-10):
- Pain level (0-10):

### Nutrition notes:
- Protein estimate:
- Any off-plan foods?
- Hydration (glasses):

## 🏆 Today's Wins
*(At least one, however small)*

1. 
2. 
3. 

## 🎯 Tomorrow's Intentions

Top 3 priorities for tomorrow:
1. 
2. 
3. 

---

*Log this in your daily tracker: tracking/daily-logs/${now.toISOString().split('T')[0]}.md*

*Generated at ${now.toLocaleTimeString()}*
`

  const filename = `evening-reflection-${now.toISOString().split('T')[0]}.md`
  fs.writeFileSync(path.join(OUTPUT_DIR, filename), prompt)
  
  console.log(`Evening reflection prompt generated: ${filename}`)
  return prompt
}

if (require.main === module) {
  console.log(generateEveningPrompt())
}

module.exports = { generateEveningPrompt }
