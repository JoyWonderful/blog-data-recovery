fetch("https://api.github.com/repos/JoyWonderful/joywonderful.github.io/commits?per_page=1").then((res) => {
    if(!res.ok) {
        console.error(res.status);
    }
    return res.json();
}).then((reqcommit) => {
    console.log(reqcommit);
    console.log(reqcommit[0]);
    console.log(reqcommit[0].sha.slice(0, 7));
    console.log(reqcommit[0].commit.message);
    console.log(reqcommit[0].html_url);
    console.log(reqcommit[0].commit.message.length);

    var ghci = document.getElementById("github-commit-info");
    var cmtpar = document.createElement("a");
    cmtpar.innerHTML = reqcommit[0].sha.slice(0, 7);
    cmtpar.href = reqcommit[0].html_url;
    cmtpar.target = "_blank";
    cmtpar.rel = "noopener";
    var cmtmsg = document.createElement("span");
    if(reqcommit[0].commit.message.length > 40) cmtmsg.innerHTML = reqcommit[0].commit.message.slice(0, 40) + "...";
    cmtmsg.innerHTML = reqcommit[0].commit.message;
    var cmtdate = document.createElement("span");
    cmtdate.innerHTML = reqcommit[0].commit.committer.date.slice(0, reqcommit[0].commit.committer.date.indexOf("T"));
    ghci.appendChild(cmtpar);
    ghci.appendChild(cmtmsg);
    ghci.appendChild(cmtdate);
});