<html>
<head>
	<title>Chat with socket.io and node.js</title>
	<style>
		#chat{
			height:500px;
		}
	</style>
</head>
<body>
	<div id="chat"></div>
	<form id="send-message">
		<input size="35" id="message"></input>
		<input type="submit"></input>
	</form>
	
	<script src="http://code.jquery.com/jquery-latest.min.js"></script>
	<script src="/socket.io/socket.io.js"></script>
	<script>
		jQuery(function($){
			var socket = io.connect();
			var $messageForm = $('#send-message');
			var $messageBox = $('#message');
			var $chat = $('#chat');
			
			$messageForm.submit(function(e){
				e.preventDefault();
				socket.emit('send message', $messageBox.val());
				$messageBox.val('');
			});
			
			socket.on('new message', function(data){
				$chat.append(data + "<br/>");
			});
		});
	</script>
</body>
</html>
