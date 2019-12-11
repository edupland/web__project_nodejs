const assert = require("assert");
const puppeteer = require("puppeteer");
const mongoose = require("mongoose");
const user = require("../../model/user");

const stringConnect = "mongodb+srv://dropert:SXlUQZIM1vQfImm2@progweb-hnise.gcp.mongodb.net/cdp?retryWrites=true&w=majority";

function rdString(length) {
    let result = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

const url_home = "https://cdp-ropert-dupland-tomas.000.webhostapp.com/";

const test_editmyaccount = async () => {
    const string = rdString((Math.random() * 8) + 1);
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    page.on("dialog", async dialog => {
        await dialog.dismiss();
    });
    await page.goto(url_home);

    await page.waitFor("#connexion");
    await page.click("#connexion");

    await page.waitFor("body");

    await page.type("#login", "test");
    await page.type("#password", "test");

    await page.waitFor("#aut");
    await page.click("#aut");

    await page.waitFor("body");

    await page.waitFor("#menu1");
    await page.click("#menu1");

    await page.waitFor("#myaccount");
    await page.click("#myaccount");

    await page.waitFor("body");

    await page.type("#nom", string);
    await page.type("#prenom", string);
    await page.type("#mail", string + "@" + string);
    await page.type("#login", "test");
    await page.type("#password", "test");
    await page.type("#societe", string);

    await page.waitFor("#save");
    await page.click("#save");
    await page.waitForNavigation({waitUntil: 'load'});

    const url_nextPage = await page.url();

    await browser.close();

    await mongoose.connect(stringConnect, {useNewUrlParser: true, useUnifiedTopology: true}, function (err) {
        if (err) {
        mongoose.connection.close();
        } else {
        user.userModel.find({ Login : "test" },
            function (err, doc) {
              if (err) { mongoose.connection.close(); } else {
                  assert(doc.length === 1);
                  assert(doc[0].Nom === string);
                  assert(doc[0].Prenom === string);
                  assert(doc[0].Mail === string + "@" + string);
                  assert(doc[0].Societe === string);
                  assert(doc[0].Login === "test");
                  assert(doc[0].Password === "test");
                  assert(url_nextPage === url_home + "index.html");
                  console.log("Test edit my account passed");
                  mongoose.connection.close();
              }
            });
        }
    });
}

test_editmyaccount();
