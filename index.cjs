const fs = require('fs');

const getGreeting = (hours, greetings) => 
    hours < 12 ? greetings.morning : hours < 18 ? greetings.afternoon : greetings.evening;

const timeZoneHours = (timeZone) =>
    new Intl.DateTimeFormat('en-US', { timeZone, hour: 'numeric', hour12: false }).format(new Date());

const currTimeBrazil = timeZoneHours("America/Sao_Paulo");
const currTimePST = timeZoneHours("America/Los_Angeles");
const currTimeUTC = new Date().getUTCHours();

const substituicoes = {
    greeting_brazil: getGreeting(currTimeBrazil, { morning: "Bom Dia!", afternoon: "Boa Tarde!", evening: "Boa Noite!" }),
    greeting_usa_pacific: getGreeting(currTimePST, { morning: "Good Morning!", afternoon: "Good Afternoon!", evening: "Good Evening!" }),
    greeting_world: getGreeting(currTimeUTC, { morning: "Good Morning!", afternoon: "Good Afternoon!", evening: "Good Evening!" }),
};

fs.readFile('README_BASE.md', 'utf-8', (err, data) => {
    if (err) throw err;

    const modificado = data.replace(/%\{(.*?)\}/g, (_, key) => substituicoes[key] || `%{${key}}`);

    fs.writeFile('README.md', modificado, 'utf-8', (err) => {
        if (err) throw err;
        console.log('✔ Process finished!');
    });
});
