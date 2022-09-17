# pastyAPI

pastyAPI is a simple API to make, read, update and delete text with Node.JS and Express.

## Requirements

- Node.JS
- NPM package manager. (You have this if you install Node.js with default settings)

## Setting up a workspace
### Install node dependencies
```bash
npm install
```

### Start API server
```bash
npm start
```
Default port is `3000` but you can change it in .env file.

# API usage

## POST requests
### /api/paste

**`Request:`** 
```
http://localhost:3000/api/paste
```

Required **`JSON`** body format:
```json
"content": "example paste content"
```

**`Response:`**
```json
"paste_id": "4790bf53-a976-4788-9130-047486ebcf05",
"pasted_content": "example paste content"
 ```

**`paste_id`** is always different so it will not look like this.

### /api/paste/update

**`Request:`** 
```
http://localhost:3000/api/paste/update
```

Required **`JSON`** body format:
```json
"paste_id": "example paste content",
"new_paste": "example edited paste content"
```

**`Response:`**
```json
"paste_id": "4790bf53-a976-4788-9130-047486ebcf05",
"original_paste_content": "example paste content",
"new_paste_content": "example edited paste content"
 ```

## GET requests
### /api/paste/:paste_id
This request takes `paste_id` as an argument. This will give you **`JSON`** output of a paste.

**`Request:`** 
```
http://localhost:3000/api/paste/4790bf53-a976-4788-9130-047486ebcf05
```
**`Response:`**
```json
"paste_content": "example paste content"
 ```

### /api/paste/:paste_id/raw
This request takes `paste_id` as an argument. This will give you **`RAW`** output of a paste.

**`Request:`** 
```
http://localhost:3000/api/paste/4790bf53-a976-4788-9130-047486ebcf05/raw
```
**`Response:`**
```
example paste content
 ```

### /api/paste/delete/:paste_id
This request takes `paste_id` as an argument. This will delete a paste with a provided id.

**`Request:`** 
```
http://localhost:3000/api/paste/delete/4790bf53-a976-4788-9130-047486ebcf05
```
**`Response:`**
```json
"original_paste_content": "example paste content",
"message": "Paste deleted successfully."
 ```



## License
[MIT](https://github.com/boka60/pastyAPI/blob/main/LICENSE)
