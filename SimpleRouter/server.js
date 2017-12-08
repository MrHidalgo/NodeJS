const express = require('express'),
    app = express();

const productRouter = express.Router();


productRouter
    .route('/')
    .get((req, res) => {
        res.send('List products');
    }
);
productRouter
    .route('/:id')
    .get((req, res) => {
        res.send(`Product ${req.params['id']}`);
    }
);


app.set('port', process.env.PORT || 3000);


app.get('/', (req, res) => {
    res.send("Home page");
});
app.use('/products', productRouter);


app.listen(app.get('port'), () => {
    console.log(`Server start on port 3000`);
});
