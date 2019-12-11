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

let browser;
let page;
const url_home = "https://cdp-ropert-dupland-tomas.000webhostapp.com/"; 
const string = rdString((Math.random() * 8) + 1);

const test = async () => {

    const test_signup = async () => {
        
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
        const wait = page.waitForNavigation();

        await page.click("#signup");
        await page.waitFor(".swal2-confirm");
        await page.click(".swal2-confirm");

        await wait;

        const url_nextPage = await page.url();

        await mongoose.connect(stringConnect, {useNewUrlParser: true, useUnifiedTopology: true}, function (err) {
            if (err) {
                mongoose.connection.close();
            } else {
                user.userModel.find({ Login: string },
                    function (err, doc) {
                        if (err) { mongoose.connection.close(); } else {
                            assert(doc.length === 1);
                            assert(doc[0].Nom === string);
                            assert(doc[0].Prenom === string);
                            assert(doc[0].Mail === string + "@" + string);
                            assert(doc[0].Societe === string);
                            assert(doc[0].Login === string);
                            assert(doc[0].Password === string);
                            assert(url_nextPage === url_home + "index.html");
                            console.log("Test sign up passed");
                            mongoose.connection.close();
                        }
                    });
            }
        });
    };

    browser = await puppeteer.launch({headless : true, args: ["--no-sandbox"], slowMo:1});
    page = await browser.newPage();
    page.goto(url_home);
    await Promise.all([test_signup()]);
    await browser.close();
};

test();
