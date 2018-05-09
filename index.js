var request = require("request");

var csvProcessor = require("./csvProcessor");

const execute = async () => {
    const cards = await csvProcessor.getTrelloCardsFromCsv();
    console.log(cards);
};

execute();

// var options = {
//     method: 'POST',
//     url: 'https://api.trello.com/1/cards',
//     qs: {
//         idList: '596d07cb5b8a92ab0a8276d1'
//     }
// };

// request(options, function (error, response, body) {
//   if (error) throw new Error(error);

//   console.log(body);
// });