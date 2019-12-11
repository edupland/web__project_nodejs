const assert = require("assert");
const puppeteer = require("puppeteer");
const mongoose = require("mongoose");
const project = require("../../model/project");

const stringConnect = "mongodb+srv://dropert:SXlUQZIM1vQfImm2@progweb-hnise.gcp.mongodb.net/cdp?retryWrites=true&w=majority";

function rdString(length) {
    let result = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

let browser;
let page;
const string_title = rdString((Math.random() * 8) + 1);
const string_desc = rdString((Math.random() * 50) + 1);
const url_home = "https://cdp-ropert-dupland-tomas.000webhostapp.com/";

const test = async () => {

    const test_createproject = async () => {

        await page.waitFor("#connexion");
        await page.click("#connexion");

        await page.waitFor("body");

        await page.type("#login", "test");
        await page.type("#password", "test");

        await page.waitFor("#aut");
        const wait = page.waitForNavigation();
        await page.click("#aut");
        await wait;

        await page.waitFor("#menu1");
        await page.click("#menu1");
        await page.click("a[href='myprojects.html']");

        await page.waitFor("body");
        await page.click("a[href='createproject.html']");

        await page.waitFor("body");

        await page.type("#titre", string_title);
        await page.type("#description", string_desc);

        await page.waitFor("#create");
        const wait1 = page.waitForNavigation();

        await page.click("#create");
        await page.waitFor(".swal2-confirm");
        await page.click(".swal2-confirm");

        await wait1;

        const url_nextPage = await page.url();

        await mongoose.connect(stringConnect, { useNewUrlParser: true, useUnifiedTopology: true }, function (err) {
            if (err) {
                mongoose.connection.close();
            } else {
                project.projectModel.find({ Titre: string_title, Description: string_desc },
                    function (err, doc) {
                        if (err) { mongoose.connection.close(); } else {
                            assert(doc.length === 1);
                            assert(doc[0].Titre === string_title);
                            assert(doc[0].Description === string_desc);
                            assert(doc[0].Proprietaire.Login === "test");
                            assert(doc[0].Clients.length === 0);
                            assert(doc[0].Developpeurs.length === 0);
                            assert(url_nextPage === url_home + "myprojects.html");
                            console.log("Test create project passed");
                            mongoose.connection.close();
                        }
                    }
                );
            }
        });
    };

    const test_editproject = async () => {

        await page.waitFor("#edit_0");
        await page.click("#edit_0");

        await page.waitFor("body");

        await page.type("#titre", string_title + "_modified");
        await page.type("#description", string_desc + "_modified");

        await page.waitFor("#save");
        const wait = page.waitForNavigation();
        await page.click("#save");

        await page.waitFor(".swal2-confirm");
        await page.click(".swal2-confirm");
        await wait;

        const url_nextPage = await page.url();

        await mongoose.connect(stringConnect, { useNewUrlParser: true, useUnifiedTopology: true }, function (err) {
            if (err) {
                mongoose.connection.close();
            } else {
                project.projectModel.find({ Titre: string_title + "_modified", Description: string_desc + "_modified" },
                    function (err, doc) {
                        if (err) { mongoose.connection.close(); } else {
                            assert(doc.length === 1);
                            assert(doc[0].Titre === string_title + "_modified");
                            assert(doc[0].Description === string_desc + "_modified");
                            assert(doc[0].Proprietaire.Login === "test");
                            assert(url_nextPage === url_home + "myprojects.html");
                            console.log("Test edit project passed");
                            mongoose.connection.close();
                        }
                    }
                );
            }
        });

        await page.waitFor("body");
        
        const index = await page.evaluate((string_title) => {
            let projects = document.querySelectorAll("[id^=\"titre_\"]");
            let index = projects.findIndex(element => (element.localeCompare(string_title) === 0));
            return index;
        });

        console.log(index);
        

        //await page.waitFor("#manage_" + index);
        //await page.click("#manage_" + index);
    };

    const test_manageproject = async () => {

        


        await page.waitFor("body");

        await page.type("#developpeur", string_title + "_dev");

        await page.waitFor("#saveDeveloppeur");
        const wait = page.waitForNavigation();
        await page.click("#saveDeveloppeur");
        await wait;

        const url_nextPage = await page.url();

        await mongoose.connect(stringConnect, { useNewUrlParser: true, useUnifiedTopology: true }, function (err) {
            if (err) {
                mongoose.connection.close();
            } else {
                project.projectModel.find({ Titre: string_title + "_modified", Description: string_desc + "_modified" },
                    function (err, doc) {
                        if (err) { mongoose.connection.close(); } else {
                            assert(doc.length === 1);
                            assert(doc[0].Titre === string_title + "_modified");
                            assert(doc[0].Description === string_desc + "_modified");
                            assert(doc[0].Proprietaire.Login === "test");
                            assert(url_nextPage === url_home + "myprojects.html");
                            console.log("Test add dev to project passed");
                            mongoose.connection.close();
                        }
                    }
                );
            }
        });
    };

    browser = await puppeteer.launch({ headless: false, args: ["--no-sandbox"], slowMo: 1 });
    page = await browser.newPage();
    page.goto(url_home);
    page.on("dialog", async dialog => {
        await dialog.dismiss();
    });
    await Promise.all([test_createproject(), test_editproject()]);//, test_manageproject()]);
    //await browser.close();
};

test();
