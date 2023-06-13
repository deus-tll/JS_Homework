window.addEventListener("load", () => {
  setTimeout(() => {
    let bannerBlock = document.createElement("div");

    let bannerWidth = 400;

    bannerBlock.style.width = bannerWidth + "px";
    bannerBlock.style.height = "300px";
    bannerBlock.style.position = "fixed";
    bannerBlock.style.zIndex = "99999";
    bannerBlock.style.bottom = "15px";
    bannerBlock.style.right = "15px";
    bannerBlock.style.borderRadius = "5px";
    bannerBlock.style.boxShadow = "0px 0px 15px 3px rgba(0,0,0,0.75)";

    let srcVideo = `src="https://s0.rozetka.com.ua/video/weblayer_birthdayparty_120623.mp4"`;
    let srcPoster = `poster="https://content.rozetka.com.ua/files/images/original/342646172.jpg"`;
    bannerBlock.innerHTML = `<video style="border-radius: 5px" muted="" autoplay="" loop="" name="media" width="400" height="300" id="rz-banner-img" ${srcVideo} ${srcPoster} type="video/mp4">\n</video>`;

    var closeX = document.createElement("img");

    bannerBlock.classList.add("banner-animation");

    document.body.appendChild(bannerBlock);

    closeX.setAttribute(
      "src",
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAug" +
        "AAALoBTx5ghQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAGhSURBVEiJpZS/btNQFIe/392qOixd+iK2mBCqs3" +
        "TjAZBgYYkKlZiY2hipA0tBEBVlYmJnYoq7MOG8BqgP4CAUqfJhoKlC6nt9HX6jzznfd637RwD1QfpA0geDRNhJUs4/s0UWefrYUCGoG3" +
        "h+r6y+qR7efyhrvgI7N31m2NGgnF/0gdd5OhKaALr59NucHTpZM12DA0hoUufp6D/gADtqNHXAXstMtMQDX2XPIc48s52SDjiYzlwyq9" +
        "6aKIKSg+xos/BrmD4LwsWb5PL7u9tiPczGMk49IjPjxeCymqzgZpoG4bPqFZsNMRLnbBkLvyPokgjMPHNtcG9jx5+0pwXuX0lfiQceFE" +
        "RLAnAAF5p12E/AfHUDrOFH2O9J51Fc86wf4ShBD3in5A5gC3hQ8s8exNzQ4LMi3m8+K7egPte/z7OivvBVYiVa5NkT4JMPbqIYzKpxW6" +
        "3O00LoxCdBPNUiz66A/b7wSMmVA5bbwgEG5fzUsNee8tJJOgaut4F3SK7VuOO/m5xnjww+ArvAOCmr81j4ehZ59lJQGNSC0W5ZffkDcV/60qJU4rYAAAAASUVORK5CYII="
    );
    closeX.setAttribute("alt", "Close button");
    closeX.setAttribute("title", "Закрыть Баннер");

    closeX.style.cssText =
      "position: fixed; z-index: 100000; cursor: pointer; right: 1.5%; margin: 10px";

    bannerBlock.appendChild(closeX);

    let moveCounter = 0;
    const maxMoves = 3;

    function getRandomPosition(max) {
      return Math.floor(Math.random() * (max + 1));
    }

    closeX.addEventListener('mouseover', function moveHandler() {
      if (moveCounter < maxMoves) {
        const randomX = getRandomPosition(window.innerWidth - closeX.offsetWidth);
        const randomY = getRandomPosition(window.innerHeight - closeX.offsetHeight);
        closeX.style.left = randomX + 'px';
        closeX.style.top = randomY + 'px';
        moveCounter++;
      }
    });

    closeX.addEventListener("click", () => {
      document.body.removeChild(bannerBlock);
    });

    let patch = document.createElement("div");
    patch.style.width = bannerWidth + "px";
    patch.classList.add("patch");

    let timer = new Timer(new Date("2023-06-30"));
    timer.start();
    patch.appendChild(timer.timerElement);

    let buttonConfirm = document.createElement("button");
    buttonConfirm.innerHTML = "Перейти";
    buttonConfirm.classList.add("button-confirm");

    let buttonContainer = document.createElement("div");
    buttonContainer.classList.add("button-container");
    buttonContainer.appendChild(buttonConfirm);

    patch.appendChild(buttonContainer);
    bannerBlock.appendChild(patch);
  }, 1000);
});
