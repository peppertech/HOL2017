var apiHost = window.location.hostname || 'localhost';
var apiPort = apiHost.match(/localhost/) ? ':3000' : '';
const socket = io(apiHost+":"+apiPort,{autoConnect: false});

function cb(err, timestamp){
	if (err){
		console.log('Subscriber Error: '+err);
	}else{
		console.log('The server says: '+ timestamp);
	}
};

function startConnection() {
	socket.connect();
};

function subscribeToTimer() {
	socket.on('timer', timestamp => cb(null, timestamp));
	socket.emit('subscribeToTimer', 2000);
}

function subscribeToNotifications() {
	socket.on('notify', timestamp => cb(null, timestamp));
	socket.emit('subscribeToNotifications', 2000);
}

function closeConnection(){
		console.log('Connection id: '+socket.id+' closed');
		socket.close()
};

socket.on('connect', () => {
		console.log('Connection started with id: '+socket.id);
});

socket.on('connect_error', (error) => {
		console.log('Connection Error: '+error);
});
