import cheerioModule from "cheerio";
import React from "react";

function RenderNotice({ notice }) {
  return (
    <div>
      <p>{notice.date}</p>
      <h1>{notice.title}</h1>
      <p>{notice.publisher}</p>
    </div>
  );
}

function Notices() {
  const proxyurl = "https://cors-anywhere.herokuapp.com/";
  const url = "https://www.imsnsit.org/imsnsit/notifications.php";
  const notices = [];
  fetch(proxyurl + url)
    .then((response) => response.text())
    .then((html) => {
      const $ = cheerioModule.load(html);
      $("tr")
        .slice(4)
        .each((index, notice) => {
          if (notice.children.length !== 1) {
            const noticeObject = {
              url: $(notice).find("a").attr("href"),
              date: notice.firstChild.firstChild.firstChild.data.trim(),
              publisher: $(notice).find("b").text(),
              title: $(notice).find("a").text(),
            };
            notices.push(noticeObject);
          }
        });
    })
    .catch(() => console.log("Can’t access " + url + " response."));
  console.log(notices);

  const noticesList = notices.map((notice) => {
    return (
      <li>
        <RenderNotice notice={notice} />
      </li>
    );
  });

  return (
    <div>
      <h1>Notices</h1>
      <ul>{noticesList}</ul>
    </div>
  );
}

export default Notices;
