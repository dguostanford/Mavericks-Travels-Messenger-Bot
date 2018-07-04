const API_AI_TOKEN = '0c5cc11eb10a4d8c845bc4589245a690';
const apiAiClient = require('apiai')(API_AI_TOKEN);

const FACEBOOK_ACCESS_TOKEN = 'EAAY0CZCytZBXQBAOv4QQkVhplPiKr4cg5mZChGeDbIyUZA3hhjsNdY9AjL94pepOT85Y5Ot3NYg0ZBKDJZCEjHvZCY9XbeGoZC2AQCZBiRBLbLrot7xk7UPMBZADnuidMHvJZBBjaTuURknXvRCdu3WJByjvZB26w62aRTYXHCoZCDAP3SOfQlgoD2pMh'
const request = require('request');

const sendTextMessage = (senderId, text)=>  {
	request({
		url: 'https://graph.facebook.com/v2.6/me/messages', 
		qs: {access_token: FACEBOOK_ACCESS_TOKEN },
		method: 'POST',
		json: {
			recipient: { id: senderId}, 
			message : {text},
		}
	});
};

module.exports = (event) => {
 const senderId = event.sender.id;
 const message = event.message.text;
const apiaiSession = apiAiClient.textRequest(message, {sessionId: 'crowdbotics_bot'});
apiaiSession.on('response', (response) => {
 const result = response.result.fulfillment.speech;
sendTextMessage(senderId, result);
 });
apiaiSession.on('error', error => console.log(error));
 apiaiSession.end();
};