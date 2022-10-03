import express, {json} from "express";


const app = express();
app.use(json());

app.get('/', (req, res)=>{
    return res.send('okay')
})

export default app;