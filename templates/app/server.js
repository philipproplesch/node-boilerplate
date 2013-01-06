//setup Dependencies
var connect = require('connect')
			, express = require('express')
			, http = require('http')
			, io = require('socket.io')
			, port = (process.env.PORT || 8081);

//Setup Express
var app = express();
var server = http.createServer(app);

app.configure(function () {
    app.set('views', __dirname + '/views');
    app.set('view options', { layout: false });
    app.use(connect.bodyParser());
    app.use(express.cookieParser());
    app.use(express.session({ secret: "shhhhhhhhh!" }));
    app.use(connect.static(__dirname + '/static'));
    app.use(app.router);
});

//setup the errors
//server.error(function (err, req, res, next) {
//    if (err instanceof NotFound) {
//        res.render('404.jade', {
//            locals: {
//                title: '404 - Not Found'
//                     , description: ''
//                     , author: ''
//                     , analyticssiteid: 'XXXXXXX'
//            }, status: 404
//        });
//    } else {
//        res.render('500.jade', {
//            locals: {
//                title: 'The Server Encountered an Error'
//                     , description: ''
//                     , author: ''
//                     , analyticssiteid: 'XXXXXXX'
//                     , error: err
//            }, status: 500
//        });
//    }
//});
server.listen(port);

//Setup Socket.IO
var io = io.listen(server);
io.sockets.on('connection', function (socket) {
    console.log('Client Connected');
    socket.on('message', function (data) {
        socket.broadcast.emit('server_message', data);
        socket.emit('server_message', data);
    });
    socket.on('disconnect', function () {
        console.log('Client Disconnected.');
    });
});


///////////////////////////////////////////
//              Routes                   //
///////////////////////////////////////////

/////// ADD ALL YOUR ROUTES HERE  /////////

app.get('/', function (req, res) {
    res.render('index.jade', {
        title: 'Your Page Title',
        description: 'Your Page Description',
        author: 'Your Name',
        analyticssiteid: 'XXXXXXX'
    });
});


//A Route for Creating a 500 Error (Useful to keep around)
app.get('/500', function (req, res) {
    throw new Error('This is a 500 Error');
});

//The 404 Route (ALWAYS Keep this as the last route)
app.get('/*', function (req, res) {
    console.log('Requested URL: ' + req.url)
    throw new NotFound;
});

function NotFound(msg) {
    this.name = 'NotFound';
    Error.call(this, msg);
    Error.captureStackTrace(this, arguments.callee);
}


console.log('Listening on http://0.0.0.0:' + port);
