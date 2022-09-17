const fs = require("fs/promises");
const express = require("express");
const cors = require("cors");
const { v4: uuid } = require("uuid");
require('dotenv').config()

const app = express();

app.use(express.json());
app.use(cors());

app.post("/api/paste", async(req, res) =>{
    const id = uuid();
    const content = req.body.content;

    if(!content){
        return res.sendStatus(400);
    }

    await fs.mkdir("data/pasted/", {recursive: true});
    await fs.writeFile(`data/pasted/${id}.paste`, content);
    
    res.status(201).json({
        "paste_id": id,
        "pasted_content": content
    });
});

app.get("/api/paste/:paste_id", async(req, res) => {
    const pasteID = req.params.paste_id;
    let content;

    try{
        content = await fs.readFile(`data/pasted/${pasteID}.paste`, "utf-8");
    }catch (err){
        return res.sendStatus(404);
    }

    res.status(200).json({
        "paste_content": content
    });
});

app.get("/api/paste/:paste_id/raw", async(req, res) => {
    const pasteID = req.params.paste_id;
    let content;

    try{
        content = await fs.readFile(`data/pasted/${pasteID}.paste`, "utf-8");
    }catch (err){
        return res.sendStatus(404);
    }

    res.send(content);
});

app.post("/api/paste/update", async(req, res) => {
    const pasteID = req.body.paste_id;
    const newPaste = req.body.new_paste;
    let oldContent;

    try{
        oldContent = await fs.readFile(`data/pasted/${pasteID}.paste`, "utf-8");
    }catch (err){
        return res.sendStatus(404);
    }
    try{
        await fs.writeFile(`data/pasted/${pasteID}.paste`, newPaste);
    }catch (err){
        return res.sendStatus(400);
    }

    res.status(200).json({
        "paste_id": pasteID,
        "original_paste_content": oldContent,
        "new_paste_content": newPaste
    });
});

app.get("/api/paste/delete/:paste_id", async(req, res) => {
    const pasteID = req.params.paste_id;
    let oldContent;

    try{
        oldContent = await fs.readFile(`data/pasted/${pasteID}.paste`, "utf-8");
    }catch (err){
        return res.sendStatus(404);
    }

    try{
        await fs.rm(`data/pasted/${pasteID}.paste`);
    }catch(err){
        res.sendStatus(404);
    }

    res.status(200).json({
        "original_paste_content": oldContent,
        "message": "Paste deleted successfully."
    });
});

app.listen(process.env.PORT, () => console.log("API is running on port " + process.env.PORT));