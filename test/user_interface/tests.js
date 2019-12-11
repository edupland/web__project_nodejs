const assert = require("assert"); const puppeteer = require("puppeteer");
const mongoose = require("mongoose");
const user = require("../../model/user");

const stringConnect = "mongodb+srv://dropert:SXlUQZIM1vQfImm2@progweb-hnise.gcp.mongodb.net/cdp?retryWrites=true&w=majority";

function rdString(length) {
    let result = ""; const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

const url_home = "https://cdp-ropert-dupland-tomas.000webhostapp.com/";
const string = rdString((Math.random() * 8) + 1);

const test_signup = async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    page.on("dialog", async dialog => {
        await dialog.dismiss();
    });
    await page.goto(url_home);
    await page.waitFor("#inscription");
    await page.click("#inscription");

    await page.waitFor("body");

    await page.type("#nom", string);
    await page.type("#prenom", string);
    await page.type("#mail", string + "@" + string);
    await page.type("#login", string);
    await page.type("#password", string);
    await page.type("#societe", string);

    await page.waitFor("#signup");
    await page.click("#signup");
    await page.waitForNavigation();
    await page.keyboard.press("n");
    const url_nextPage = await page.url();

    await browser.close();

    await mongoose.connect(stringConnect, { useNewUrlParser: true, useUnifiedTopology: true }, function (err) {
        if (err) {
            mongoose.connection.close();
        } else {
            user.userModel.find({ Login: string },
                function (err, doc) {
                    if (err) { mongoose.connection.close(); } else {
                        assert(doc.length === 1); assert(doc[0].Nom === string); assert(doc[0].Prenom
                            === string); assert(doc[0].Mail === string + "@" + string);
                        assert(doc[0].Societe === string); assert(doc[0].Login === string);
                        assert(doc[0].Password === string); assert(url_nextPage === url_home +
                            "index.html"); console.log("Test sign up passed");
                        mongoose.connection.close();
                    }
                });
        }
    });
};

const test_login = async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    page.on("dialog", async dialog => {
        await dialog.dismiss();
    });
    await page.goto(url_home);
    await page.waitFor("#connexion");
    await page.click("#connexion");

    await page.waitFor("body");

    await page.type("#login", "test");
    console.log("login : test");
    await page.type("#password", "test");
    console.log("password : test");

    await page.waitFor("#aut");
    console.log("On attend aut");
    await page.click("#aut");
    console.log("On clique sur connexion");
    await page.waitForNavigation({waitUntil: 'load'});
    console.log("On attend pour naviguer");
    const url_nextPage = await page.url();
    console.log("On récupère l'url");

    assert(url_nextPage === url_home + "index.html");
    console.log("Test log in passed");

    test_logout();
};
