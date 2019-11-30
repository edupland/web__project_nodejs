const baseString = "<nav class=\"navbar navbar-expand-md navbar-dark bg-dark\">\n" +
    "        <div class=\"container\">\n" +
    "            <a class=\"btn btn-dark\" href=\"index.html\">\n" +
    "                 Accueil\n" +
    "            </a>\n" +
    "\n";

if(document.cookie.includes("login=")){
    document.write(baseString +
        "            <div class=\"container\">\n" +
        "                <div class=\"dropdown\">\n" +
        "                    <button class=\"btn btn-success btn-sm ml-3 dropdown-toggle\" id=\"menu1\" type=\"button\"\n" +
        "                        data-toggle=\"dropdown\">Mon compte\n" +
        "                        <span class=\"caret\"></span></button>\n" +
        "                    <ul class=\"dropdown-menu\" role=\"menu\" aria-labelledby=\"menu1\">\n" +
        "                        <li role=\"presentation\"><a role=\"menuitem\" tabindex=\"-1\" href=\"myaccount.html\">Mon profil</a></li>\n" +
        "                        <li role=\"presentation\"><a role=\"menuitem\" tabindex=\"-1\" href=\"myprojects.html\">Mes projets</a></li>\n" +
        "                    </ul>\n" +
        "                </div>\n" +
        "            </div>\n" +
        "\n" +
        "            <div class=\"collapse navbar-collapse justify-content-end\" id=\"navbarsExampleDefault\">\n" +
        "                <form class=\"form-inline my-2 my-lg-0\">\n" +
        "                    <a id=\"deconnect\" class=\"btn btn-success btn-sm ml-3\" href=\"index.html\">Déconnexion</a>\n" +
        "                </form>\n" +
        "            </div>\n" +
        "        </div>\n" +
        "    </nav>");
}else
    document.write(baseString +
        "            <div class=\"collapse navbar-collapse justify-content-end\" id=\"navbarsExampleDefault\">\n" +
        "\n" +
        "\n" +
        "                <form class=\"form-inline my-2 my-lg-0\">\n" +
        "                    <!--<div class=\"input-group input-group-sm\">\n" +
        "                        <input type=\"text\" class=\"form-control\" aria-label=\"Small\" aria-describedby=\"inputGroup-sizing-sm\"\n" +
        "                            placeholder=\"Rechercher...\">\n" +
        "                        <div class=\"input-group-append\">\n" +
        "                            <button type=\"button\" class=\"btn btn-secondary btn-number\">\n" +
        "                                <i class=\"fa fa-search\"></i>\n" +
        "                            </button>\n" +
        "                        </div>\n" +
        "                    </div>-->\n" +
        "\n" +
        "                    <a class=\"btn btn-success btn-sm ml-3\" href=\"signup.html\">\n" +
        "                        <i class=\"fa fa-pencil\"></i> Inscription\n" +
        "                    </a>\n" +
        "                    <a class=\"btn btn-success btn-sm ml-3\" href=\"login.html\">\n" +
        "                        <i class=\"fa fa-lock\"></i> Connexion\n" +
        "                    </a>\n" +
        "                </form>\n" +
        "            </div>\n" +
        "        </div>\n" +
        "    </nav>");

document.querySelector("#deconnect").addEventListener("click", onClick);

function onClick(){
    document.cookie = 'login=deco; expires=Fri, 01 Jan 2010 00:0:00 UTC; path=./*';
    document.cookie = 'mdp=deco; expires=Fri, 01 Jan 2010 00:0:00 UTC; path=./*';
    document.location.reload();
}
