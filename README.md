# H

## ✨ Features

- Organized table with hackathon information
- Automatic countdown in days
- Sakura blue bento design
- 🚦 Color-coded urgency indicators:
  - 🟢 Green: +30 days
  - 🟡 Yellow: 8-30 days
  - 🔴 Red: ≤7 days (with animation)
  - ⚫ Gray: ended

## Usage

1. Open `index.html` in your browser
2. Hackathons are automatically loaded from `hc.txt`

## Adding Hackathons

Edit `hc.txt` using the format:

```
submission_date,deadline_date,hackathon_name,prize,link
```

Example:
```
2026-02-01,2026-04-30,Hackathon Web3,$20,000,https://example.com
```

## File Structure

```
📂 schedule
├── index.html          # Main page
├── script.js           # Countdown logic
├── style.css           # Sakura blue bento styles
└── hc.txt      # Hackathon data
```

---
