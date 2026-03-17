const fs = require('fs');
const path = require('path');

exports.handler = async () => {
  const categories = ['newborns', 'toddlers', 'maternity', 'family'];
  const result = {};
  const imageExts = ['.jpg', '.jpeg', '.JPG', '.JPEG', '.png', '.PNG', '.webp', '.WEBP'];

  categories.forEach(cat => {
    const dir = path.join(__dirname, '../../../images/portfolio', cat);
    try {
      const files = fs.readdirSync(dir).filter(f => {
        const ext = path.extname(f);
        return imageExts.includes(ext) && !f.startsWith('.');
      });
      result[cat] = files.map(f => `images/portfolio/${cat}/${f}`);
    } catch (e) {
      result[cat] = [];
    }
  });

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(result),
  };
};
```

The only change is on this line — I added one extra `../` to go up one more folder level:
```
path.join(__dirname, '../../../images/portfolio', cat);
