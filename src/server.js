import express from 'express';
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';
import path from 'path';

const app = express();

app.use(express.static(path.join(__dirname, '/build')));
app.use(bodyParser.json());


const withDB = async (operations, res) => {
    try {
        const client = await MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true });
        const db = client.db('my-blog');

        await operations(db);

        client.close();
    } catch (error) {
        res.status(500).json({
            message: 'Error connecting to DB', error
        });
    }
};

app.get('/hello-world', (req, res) => res.status(200).send(`Hello World!`));

app.get('/api/articles-list', async (req, res) => {
    withDB(async db => {
        const articles = await db.collection('articles').find().toArray();

        res.status(200).json(articles);
    }, res);
});

app.get('/api/articles/:name', async (req, res) => {
    withDB(async db => {
        const articleName = req.params.name;
        const article = await db.collection('articles').findOne({slug: articleName});
        const comments = await db.collection('comments').find({post_id: article.id}).toArray();

        res.status(200).json({article, comments});
    }, res);
});

app.post('/api/articles/upvote/:name', async (req, res) => {
    withDB(async db => {
        const articleName = req.params.name;

        const result = await db.collection('articles').findOneAndUpdate({
            slug: articleName
        }, {
            $inc: {
                votes: 1
            }
        }, {
            // new: true, // For Mongoose
            // returnNewDocument: true, // For MongoDB shell
            // returnOriginal: false // For Node.js MongoDB Driver API #deprecated
            returnDocument: 'after' // For Node.js MongoDB Driver API
        });

        res.status(200).json({article: result.value});
    }, res);
});

app.post('/api/articles/add-comment/:name', async (req, res) => {
    withDB(async db => {
        const articleName = req.params.name;
        const article = await db.collection('articles').findOne({slug: articleName});

        if (article) {
            const {fullname: name, comment} = req.body;
            const status = await db.collection('comments').insertOne({post_id: article.id, name, comment, created_at: new Date()});
            const comments = await db.collection('comments').find({post_id: article.id}).toArray();

            return res.status(200).json({
                status,
                comments
            });
        }

        return res.status(400).json({
            message: 'Post not found'
        });
    }, res);
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/build/index.html'));
});

app.listen(8000, () => console.log(`App running on port 8000`));