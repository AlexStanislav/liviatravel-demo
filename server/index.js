const app = require('./api/app');
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(process.env.PORT ? `Server running on port ${port}` : 'Server running on http://localhost:3000');
})