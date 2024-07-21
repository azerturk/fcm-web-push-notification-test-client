self.addEventListener("push", function (e) {
  console.log("push: ", e.data.json());
});