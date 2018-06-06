var request = require("request");

var csvProcessor = require("./csvProcessor");

var trelloApiKey = '3914190ac44fdf686a0fd364ddcba980';
var trelloOathToken = '567fa8701421a7c4b0e76a9282fc08f76f02a2ba7f3fc1091793e8981bf43bc8';

var defaultOptions = {
    method: 'POST',
    url: 'https://api.trello.com/1/cards',
    qs: {
        idList: '596d07cb5b8a92ab0a8276d1'
    }
};

const execute = async () => {
    const cards = await csvProcessor.getTrelloCardsFromCsv();

    cards.forEach(card => {
        var options = {
            ...defaultOptions,
            qs: {
                idList: '596d07cb5b8a92ab0a8276d1',
                key: trelloApiKey,
                token: trelloOathToken,
                ...card
            }
        };

        request(options, (error, response, body) => {
            if (error) throw new Error(error);

            console.log('Created: ' + card.name);
        });
    });
};

execute();
