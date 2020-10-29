// loader
function isLoading(loading, idElement) {
  if (loading) {
    $(idElement).wrap("<div class='loader'></div>");
  } else {
    $(idElement).unwrap();
  }
}
// const isLoading = (loading, idElement) =>
//   loading
//     ? $(idElement).wrap("<div class='loader'></div>")
//     : $(idElement).unwrap();

// make qoute
function makeQuote(numItem, item) {
  let active = "";
  if (!numItem) {
    active = "active";
  }
  $("#makeQoute").append(`
  <div class="carousel-item ${active} px-5">
  <div class="row d-flex justify-content-center align-items-center">
    <div class="col-12 col-sm-4 d-flex justify-content-sm-end justify-content-center ">
      <img src="${item.pic_url}" class="rounded-circle carousel-img" alt="...">
    </div>
    <div class="col pr-5 mr-4 pt-5 pt-sm-0">
      <p class="font-italic"> &lsaquo;&lsaquo;${item.text}&rsaquo;&rsaquo;</p>
      <h6 class="font-weight-bold m-0 mb-1">Person Name</h6>
      <p class="font-italic m-0">weather presenter</p>
    </div>
  </div>
</div>
    `);
}

// make videos
function makePopularVideos(numItem, item, idElement) {
  let active = "";
  if (!numItem) {
    active = "active";
  }
  $(idElement).append(
    `
    <div class="card mr-3" style="width: 16rem;">
              <div class=" d-flex align-items-center justify-content-center">
                <img src="${item.thumb_url}" alt="" class="card-img-top" />
                <img src="./images/play.png" alt="" class="position-absolute icon__size" />
              </div>

              <div class="card-body">
                <h5 class="card-title font-weight-bold text-left">${item.title}</h5>
                <p class="card-text text-muted text-left">${item["sub-title"]}</p>
                <div class="d-flex align-items-center">
                  <div class="mr-3">
                    <img src=${item.author_pic_url}  alt="" class="carousel__user__img rounded-circle">
                  </div>
                  <div class="carousel__user color-pink">
                  ${item.author}
                  </div>
                </div>

                <div class="d-flex justify-content-between mt-3 align-items-center">
                  <img src="./images/star_on.png" alt="" class="star" />
                  <img src="./images/star_on.png" alt="" class="star" />
                  <img src="./images/star_on.png" alt="" class="star" />
                  <img src="./images/star_on.png" alt="" class="star" />
                  <img src="./images/star_off.png" alt="" class="star" />
                  <div class="color-pink carousel-time">${item.duration}</div>
                </div>
              </div>
            </div>
            `
  );
}

function getLatestVideos() {
  $.ajax({
    dataType: "json",
    beforeSend: isLoading(true, "#latestVideos"),
    contentType: "application/json",
    url: `https://smileschool-api.hbtn.info/latest-videos`,
    success: function (result) {
      $("#latestVideos").empty()
      isLoading(false, "#latestVideos")
      result.forEach((item, i) => {
        makePopularVideos(i, item, "#latestVideos")
      });
    }
  });
}


function getPopularVideos() {
  $.ajax({
    dataType: "json",
    beforeSend: isLoading(true, "#makeVideos"),
    contentType: "application/json",
    url: `https://smileschool-api.hbtn.info/popular-tutorials`,
    success: function (result) {
      $("#makeVideos").empty()
      isLoading(false, "#makeVideos")
      result.forEach((item, i) => {
        makePopularVideos(i, item, "#makeVideos")
      });
    }
  });
}
// get quote from api and change state of loading
function getQuote() {
  $.ajax({
    dataType: "json",
    beforeSend: isLoading(true, "#makeQoute"),
    contentType: "application/json",
    url: `https://smileschool-api.hbtn.info/quotes`,
    success: function (result) {
      $("#makeQoute").empty();
      isLoading(false, "#makeQoute");
      result.forEach((item, i) => {
        makeQuote(i, item);
      });
    },
  });
}

$(document).ready(function () {
  getQuote();
  getPopularVideos();
  getLatestVideos();
});
