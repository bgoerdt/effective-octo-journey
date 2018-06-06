var csv = require("fast-csv");

const edition3ListId = '596d07cb5b8a92ab0a8276d1';

const labels = {
    edition3: '58eba66ecbbe2a019f720872',
    moved: '57c38c8670824e9b1f717de5',
    quadrants: {
        tools: '55961ae319ad3a5dc2b29349',
        techniques: '55961ae319ad3a5dc2b2934a',
        platforms: '55961ae319ad3a5dc2b2934b',
        languagesAndFrameworks: '55961ae319ad3a5dc2b29348'
    },
    rings: {
        adopt: '559624fc19ad3a5dc2b29f4e',
        trial: '559624d819ad3a5dc2b29ee4',
        assess: '559624c619ad3a5dc2b29ec9',
        hold: '559624c619ad3a5dc2b29ec9'
    }
};

const getBlipFromRawData = (data) => {
    return {
        timestamp: data[0],
        username: data[1],
        name: data[2],
        inPreviousEdition: data[3],
        moveToRing: data[4],
        websiteUrl: data[5],
        whyBlipShouldMove: data[6],
        description: data[7],
        quadrant: data[8],
        whyGoodAddition: data[9],
        ring: data[10],
        elaborateDescription: data[11]
    };
};

const getTrelloRingFromBlip = (blipRing) => {
    if (blipRing.includes('Adopt')) {
        return labels.rings.adopt;
    }

    if (blipRing.includes('Trial')) {
        return labels.rings.trial;
    }
    
    if (blipRing.includes('Assess')) {
        return labels.rings.assess;
    }
    
    if (blipRing.includes('Hold')) {
        return labels.rings.hold;
    }

    return '';
}

const getTrelloQuadrantFromBlip = (blipQuadrant) => {
    if (blipQuadrant === 'Programming language or framework') {
        return labels.quadrants.languagesAndFrameworks;
    }

    if (blipQuadrant === 'Tool') {
        return labels.quadrants.tools;
    }

    if (blipQuadrant === 'Platform') {
        return labels.quadrants.platforms;
    }

    if (blipQuadrant === 'Technique or best practice') {
        return labels.quadrants.techniques;
    }

    return '';
}

const mapBlipToTrelloCards = (blip) => {
    const ringLabelId = getTrelloRingFromBlip(blip.ring);
    const quadrantLabelId = getTrelloQuadrantFromBlip(blip.quadrant);

    return {
        name: `${blip.name} (${blip.username})`,
        desc: `${blip.description}\n\n${blip.whyGoodAddition}\n\n${blip.elaborateDescription}\n\n${blip.websiteUrl}`,
        idList: edition3ListId,
        idLabels: `${labels.edition3},${ringLabelId},${quadrantLabelId}`
    }
};

const getTrelloCardsFromCsv = async () => {
    const cards = [];

    return new Promise((resolve, reject) => {
        csv
        .fromPath("blips.csv")
        .on("data", (data) => {
            const blip = getBlipFromRawData(data);
            cards.push(mapBlipToTrelloCards(blip));
        })
        .on("end", () => {
            resolve(cards.slice(1));
        });
    }); 
};

module.exports = {
    getTrelloCardsFromCsv
};
