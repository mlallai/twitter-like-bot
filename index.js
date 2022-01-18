const twitterClient = require("./init");
console.log(
  "twitterClient",
  twitterClient.accountsAndUsers.accountVerifyCredentials()
);
twitterClient.tweets
  .search({
    q: "Checkout @withFND",
    result_type: "recent", //get latest tweets with this hashtag
    count: 100,
  })
  .then((response) => {
    if (response.statuses) {
      response.statuses.forEach((status) => {
        if (!status.in_reply_to_status_id) {
          twitterClient.tweets
            .favoritesCreate({
              id: status.id_str,
            })
            .then((resp) => console.log(`Liked tweet ${status.id}`))
            .catch((err) =>
              console.error(`ERROR when liking tweet ${status.id}`, err)
            );
        }
      });
    }
  })
  .catch((err) => console.error(err));
