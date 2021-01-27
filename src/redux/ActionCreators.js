import * as ActionTypes from "./ActionTypes";
import cheerioModule from "cheerio";

export const addNotices = (notices) => ({
  type: ActionTypes.ADD_NOTICES,
  payload: notices,
});

export const fetchNotices = () => (dispatch) => {
  dispatch(noticesLoading(true));
  fetch(
    "https://cors-anywhere.herokuapp.com/https://www.imsnsit.org/imsnsit/notifications.php"
  )
    .then((response) => response.text())
    .then((html) => {
      let noticesArray = [];
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
            noticesArray.push(noticeObject);
          }
        });
      return noticesArray;
    })
    .then((notices) => dispatch(addNotices(notices)))
    .catch((error) => dispatch(noticesFailed(error.message)));
};

export const noticesLoading = () => ({
  type: ActionTypes.NOTICES_LOADING,
});

export const noticesFailed = (errmess) => ({
  type: ActionTypes.NOTICES_FAILED,
  payload: errmess,
});
