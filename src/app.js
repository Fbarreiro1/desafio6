const app = require('./index')
const {Server} = require("socket.io")
const { port } = require('./config')
const MessageDao = require('./dao/Message.dao')
const Message = new MessageDao()
let messages = [];



  const HTTTPServer = app.listen(port, () => {
  console.log(`server runnning at port ${port}`)
})

const io = new Server(HTTTPServer)


app.get('/',(req,res) => {
  res.send(`INICIO`)
})

app.get('/chat',async (req, res) => {
    
  res.render('chat', {style: "chat.css"})
}) 

app.delete('/chat',async (req, res) => {
  try{
    await Message.deleteMany();
    res.json({"message": "deleted messages"})
  } catch (error) {
  res.status(404).json({ error: error.message })
}
}) 

io.on("connection", (socket) => {
    console.log("server levantado con socket");
    
    socket.on('message', async (data) => {
      try {
        
        const newMessage = {
          user: data.user,
          message: data.message
        };
        
        const response = await Message.create(newMessage);
        
        messages.push(data)
        
        io.emit('messageLogs', messages);
      } catch (error) {
        console.error('Error al guardar el mensaje en la base de datos:', error);
      }
    });

   
  });

 

